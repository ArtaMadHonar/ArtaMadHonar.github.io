import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw } from 'lucide-react';
import { useModalScrollLock } from '../hooks/useModalScrollLock';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WONDERFUL_DAY_VIDEO =
  'https://s1.uploadkon.ir/749db110-5043-4619-b4b0-1b2734e7fdea/749db110-5043-4619-b4b0-1b2734e7fdea-Wonderful%20Day%20-%20Trailer_%20Telegram%20.mp4';
const WONDERFUL_DAY_POSTER = '/assets/wonderful-day-hero.webp';

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export const ShowreelModal: React.FC<ShowreelModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useModalScrollLock(isOpen, containerRef);

  // Stop video and reset on modal close
  useEffect(() => {
    if (!isOpen) {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      setIsPlaying(false);
      setCurrentTime(0);
      setHasStarted(false);
    }
  }, [isOpen]);

  // Handle keyboard shortcuts (Escape, Space)
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isPlaying]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasStarted(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  if (!isOpen) return null;

  const progressPercent = duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-black/90 backdrop-blur-md overscroll-none"
      onClick={onClose}
    >
      <div
        ref={containerRef}
        className="relative w-full max-w-5xl bg-[#0C0B0A] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col max-h-[94vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-white/10 shrink-0 bg-[#18181B]/80 backdrop-blur-sm">
          <div className="flex items-center gap-3 text-right">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-white font-fa">
                تریلر انیمیشن سینمایی «روز شگفت‌انگیز»
              </span>
              <span className="hidden md:inline text-[11px] font-mono text-white/50 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                4K MASTER
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="بستن پنجره"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Container (True 16:9) */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden select-none">
          {/* HTML5 Video Player */}
          <video
            ref={videoRef}
            src={WONDERFUL_DAY_VIDEO}
            poster={WONDERFUL_DAY_POSTER}
            playsInline
            preload="metadata"
            className="w-full h-full object-cover cursor-pointer"
            onClick={togglePlay}
            onPlay={() => {
              setIsPlaying(true);
              setHasStarted(true);
            }}
            onPause={() => setIsPlaying(false)}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onWaiting={() => setIsBuffering(true)}
            onPlaying={() => setIsBuffering(false)}
            onEnded={() => setIsPlaying(false)}
          />

          {/* Center Big Play Button (when paused or before start) */}
          {!isPlaying && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors cursor-pointer"
              onClick={togglePlay}
            >
              <div className="relative group flex items-center justify-center">
                <div className="absolute -inset-4 rounded-full bg-amber-500/20 blur-xl group-hover:bg-amber-500/30 transition-all" />
                <button
                  type="button"
                  className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-stone-950 flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110 active:scale-95"
                  aria-label="پخش ویدیو"
                >
                  {currentTime >= duration - 0.5 ? (
                    <RotateCcw className="w-7 h-7 sm:w-8 sm:h-8 text-stone-950" />
                  ) : (
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 translate-x-0.5 fill-current text-stone-950" />
                  )}
                </button>
              </div>
              {!hasStarted && (
                <div className="absolute bottom-16 sm:bottom-20 px-4 py-2 rounded-full bg-black/75 border border-white/10 backdrop-blur-md text-white text-xs sm:text-sm font-medium">
                  کلیک کنید تا تریلر پخش شود
                </div>
              )}
            </div>
          )}

          {/* Buffering Indicator */}
          {isBuffering && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-12 h-12 rounded-full border-2 border-white/20 border-t-amber-500 animate-spin" />
            </div>
          )}

          {/* Bottom Custom Control Overlay */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent pt-8 pb-3 px-3 sm:px-6 flex flex-col gap-2 transition-opacity">
            {/* Seeker Slider: FORCED dir="ltr" to move LEFT to RIGHT */}
            <div
              dir="ltr"
              className="relative w-full h-2 bg-white/20 hover:bg-white/30 rounded-full flex items-center cursor-pointer group/seek transition-all"
            >
              <div
                className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white shadow-md border-2 border-amber-500"
                style={{ left: `${progressPercent}%` }}
              />
              <input
                dir="ltr"
                type="range"
                min={0}
                max={duration || 100}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                aria-label="نوار زمان ویدیو از چپ به راست"
              />
            </div>

            {/* Controls Bar */}
            <div className="flex items-center justify-between text-white text-xs">
              {/* Left: Play/Pause, Mute, Time */}
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="p-1 hover:text-amber-400 transition-colors"
                  aria-label={isPlaying ? 'توقف' : 'پخش'}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-1 hover:text-amber-400 transition-colors"
                  aria-label={isMuted ? 'فعال‌سازی صدا' : 'قطع صدا'}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                  ) : (
                    <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>

                <div dir="ltr" className="font-mono text-[11px] sm:text-xs text-white/80 select-none">
                  <span>{formatTime(currentTime)}</span>
                  <span className="mx-1 text-white/40">/</span>
                  <span className="text-white/60">{formatTime(duration)}</span>
                </div>
              </div>

              {/* Right: Title Tag & Fullscreen */}
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="hidden sm:inline text-[11px] font-mono text-amber-400/90 font-medium">
                  «روز شگفت‌انگیز» · تریلر رسمی
                </span>
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="p-1 hover:text-amber-400 transition-colors"
                  aria-label="تمام‌صفحه"
                >
                  <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
