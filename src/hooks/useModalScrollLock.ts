import { useEffect, RefObject } from 'react';

let activeLockCount = 0;
let savedBodyOverflow = '';
let savedHtmlOverflow = '';
let savedBodyOverscroll = '';
let savedHtmlOverscroll = '';
let savedPaddingRight = '';

function lockDocumentScroll() {
  if (typeof document === 'undefined') return;
  if (activeLockCount === 0) {
    const html = document.documentElement;
    const body = document.body;

    savedBodyOverflow = body.style.overflow;
    savedHtmlOverflow = html.style.overflow;
    savedBodyOverscroll = body.style.overscrollBehavior;
    savedHtmlOverscroll = html.style.overscrollBehavior;
    savedPaddingRight = body.style.paddingRight;

    const scrollbarWidth = window.innerWidth - html.clientWidth;
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    html.style.overscrollBehavior = 'none';
    body.style.overscrollBehavior = 'none';
  }
  activeLockCount += 1;
}

function unlockDocumentScroll() {
  if (typeof document === 'undefined') return;
  activeLockCount = Math.max(0, activeLockCount - 1);
  if (activeLockCount === 0) {
    const html = document.documentElement;
    const body = document.body;

    body.style.overflow = savedBodyOverflow;
    html.style.overflow = savedHtmlOverflow;
    body.style.overscrollBehavior = savedBodyOverscroll;
    html.style.overscrollBehavior = savedHtmlOverscroll;
    body.style.paddingRight = savedPaddingRight;
  }
}

/**
 * Strictly isolates scroll to the active modal/card on both Desktop (mouse wheel)
 * and Mobile (touch), preventing any scroll-chaining or background page movement.
 */
export function useModalScrollLock(
  isOpen: boolean,
  scrollContainerRef?: RefObject<HTMLElement | null>
) {
  useEffect(() => {
    if (!isOpen) return;

    lockDocumentScroll();

    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;

      const target = e.target as HTMLElement | null;
      // Allow range sliders (e.g., video player scrubber)
      if (target && target.closest('input[type="range"]')) {
        return;
      }

      const scrollEl = scrollContainerRef?.current;
      if (!scrollEl) {
        if (e.cancelable) e.preventDefault();
        return;
      }

      // If touch started/moved outside the modal's scrollable body (e.g. backdrop or sticky header)
      if (!target || !scrollEl.contains(target)) {
        if (e.cancelable) e.preventDefault();
        return;
      }

      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY - currentY; // > 0 means scrolling down (finger moving up)
      const { scrollTop, scrollHeight, clientHeight } = scrollEl;
      const isScrollable = scrollHeight > clientHeight + 1;

      if (!isScrollable) {
        if (e.cancelable) e.preventDefault();
        return;
      }

      const isAtTop = scrollTop <= 0;
      const isAtBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

      if ((isAtTop && deltaY < 0) || (isAtBottom && deltaY > 0)) {
        if (e.cancelable) e.preventDefault();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return; // Allow pinch-zoom

      const target = e.target as HTMLElement | null;
      const scrollEl = scrollContainerRef?.current;

      if (!scrollEl) {
        if (e.cancelable) e.preventDefault();
        return;
      }

      const { scrollTop, scrollHeight, clientHeight } = scrollEl;
      const isScrollable = scrollHeight > clientHeight + 1;

      // If mouse cursor is over the backdrop or fixed modal header (outside scrollEl),
      // prevent background scroll and forward the wheel delta directly to the card's scroll container!
      if (!target || !scrollEl.contains(target)) {
        if (e.cancelable) e.preventDefault();
        if (isScrollable) {
          const multiplier = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? clientHeight : 1;
          scrollEl.scrollTop += e.deltaY * multiplier;
        }
        return;
      }

      if (!isScrollable) {
        if (e.cancelable) e.preventDefault();
        return;
      }

      const isAtTop = scrollTop <= 0;
      const isAtBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

      if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
        if (e.cancelable) e.preventDefault();
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('wheel', handleWheel);
      unlockDocumentScroll();
    };
  }, [isOpen, scrollContainerRef]);
}
