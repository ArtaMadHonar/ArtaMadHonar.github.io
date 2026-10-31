import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw } from 'lucide-react';

export interface HeroVideoPlayerHandle {
  play: () => void;
  pause: () => void;
}

const WONDERFUL_DAY_VIDEO =
  'https://s1.uploadkon.ir/749db110-5043-4619-b4b0-1b2734e7fdea/749db110-5043-4619-b4b0-1b2734e7fdea-Wonderful%20Day%20-%20Trailer_%20Telegram%20.mp4';
const WONDERFUL_DAY_POSTER = '/assets/wonderful-day-hero.webp';
const WONDERFUL_DAY_POSTER_FALLBACK =
  'https://s1.uploadkon.ir/9e2cf738-3ac0-4cf6-ae0d-d021a84546c6/9e2cf738-3ac0-4cf6-ae0d-d021a84546c6-WonderfulDay.webp';

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export const HeroVideoPlayer = forwardRef<HeroVideoPlayerHandle, { className?: string }>(
  ({ className = '' }, ref) => {
    const [hasStarted, setHasStarted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isBuffering, setIsBuffering] = useState(false);
    const [showControls, setShowControls] = useState(true);

    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const hideTimeoutRef = useRef<number | null>(null);

    const playVideo = useCallback(() => {
      const video = videoRef.current;
      if (!video) return;
      video
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasStarted(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }, []);

    const pauseVideo = useCallback(() => {
      const video = videoRef.current;
      if (!video) return;
      video.pause();
      setIsPlaying(false);
    }, []);

    const togglePlay = useCallback(() => {
      if (isPlaying) {
        pauseVideo();
      } else {
        playVideo();
      }
    }, [isPlaying, playVideo, pauseVideo]);

    useImperativeHandle(ref, () => ({
      play: playVideo,
      pause: pauseVideo,
    }));

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

    const toggleMute = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (videoRef.current) {
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
      }
    };

    const toggleFullscreen = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!containerRef.current) return;
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen?.().catch(() => {});
      } else {
        document.exitFullscreen?.().catch(() => {});
      }
    };

    // Auto-hide controls during playback on inactivity
    const resetHideTimer = () => {
      setShowControls(true);
      if (hideTimeoutRef.current) {
        window.clearTimeout(hideTimeoutRef.current);
      }
      if (isPlaying) {
        hideTimeoutRef.current = window.setTimeout(() => {
          setShowControls(false);
        }, 3200);
      }
    };

    useEffect(() => {
      return () => {
        if (hideTimeoutRef.current) {
          window.clearTimeout(hideTimeoutRef.current);
        }
      };
    }, []);

    const progressPercent = duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;

    return (
      <div
        ref={containerRef}
        id="hero-video-player"
        onMouseMove={resetHideTimer}
        onMouseLeave={() => isPlaying && setShowControls(false)}
        className={`relative aspect-video w-full bg-[#121616] overflow-hidden select-none group ${className}`}
      >
        {/* HTML5 Video element */}
        <video
          ref={videoRef}
          src={WONDERFUL_DAY_VIDEO}
          poster={WONDERFUL_DAY_POSTER}
          playsInline
          preload="none"
          className={`w-full h-full object-cover cursor-pointer transition-opacity duration-300 ${
            hasStarted ? 'opacity-100' : 'opacity-0 absolute'
          }`}
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
          onEnded={() => {
            setIsPlaying(false);
            setShowControls(true);
          }}
        />

        {/* Initial Poster & Thumbnail Canvas (shown before user starts playback) */}
        {!hasStarted && (
          <div
            onClick={playVideo}
            className="absolute inset-0 cursor-pointer flex items-center justify-center overflow-hidden"
          >
            {/* Full-bleed 16:9 Poster Artwork without side margins */}
            <img
              src={WONDERFUL_DAY_POSTER}
              alt="پوستر انیمیشن سینمایی روز شگفت‌انگیز"
              referrerPolicy="no-referrer"
              loading="eager"
              decoding="sync"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== WONDERFUL_DAY_POSTER_FALLBACK) {
                  target.src = WONDERFUL_DAY_POSTER_FALLBACK;
                }
              }}
              className="w-full h-full object-cover relative z-10 transition-transform duration-700 group-hover:scale-[1.02]"
            />

            {/* Subtle soft dark vignette on hover */}
            <div className="absolute inset-0 z-10 bg-black/10 group-hover:bg-black/25 transition-colors duration-300 pointer-events-none" />

            {/* Clean, Elegant Center Play Button with Warm Ochre & Turquoise Aura */}
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
              <div className="relative group/btn flex items-center justify-center">
                <div className="absolute -inset-3 sm:-inset-5 rounded-full bg-[#D6B16A]/35 blur-xl group-hover:scale-125 transition-all duration-300" />
                <button
                  type="button"
                  aria-label="پخش تیزر سینمایی روز شگفت‌انگیز"
                  className="keep-light-pill relative w-13 h-13 sm:w-18 sm:h-18 lg:w-20 lg:h-20 rounded-full bg-[#FAF8F4] text-[#1E2424] flex items-center justify-center shadow-[0_10px_35px_rgba(0,0,0,0.45)] transition-all duration-300 group-hover:scale-110 active:scale-95 border border-white/50"
                >
                  <Play className="keep-light-icon w-6 h-6 sm:w-8 sm:h-8 lg:w-9 lg:h-9 translate-x-0.5 fill-current text-[#3E777A]" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Buffering Spinner */}
        {isBuffering && hasStarted && (
          <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none bg-black/20">
            <div className="w-12 h-12 rounded-full border-2 border-white/20 border-t-[#D6B16A] animate-spin" />
          </div>
        )}

        {/* Center Pause/Play overlay toggle when paused during playback */}
        {hasStarted && !isPlaying && (
          <div
            onClick={playVideo}
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors cursor-pointer"
          >
            <div className="relative group/resume flex items-center justify-center">
              <div className="absolute -inset-4 rounded-full bg-[#D6B16A]/30 blur-xl group-hover/resume:bg-[#D6B16A]/45 transition-all" />
              <button
                type="button"
                aria-label="ادامه پخش"
                className="keep-light-pill relative w-15 h-15 sm:w-20 sm:h-20 rounded-full bg-[#FAF8F4] text-[#1E2424] flex items-center justify-center shadow-2xl transition-transform group-hover/resume:scale-110 active:scale-95"
              >
                {currentTime >= duration - 0.5 ? (
                  <RotateCcw className="keep-light-icon w-7 h-7 sm:w-8 sm:h-8 text-[#3E777A]" />
                ) : (
                  <Play className="keep-light-icon w-7 h-7 sm:w-8 sm:h-8 translate-x-0.5 fill-current text-[#3E777A]" />
                )}
              </button>
            </div>
          </div>
        )}

        {/* Custom Video Controls Bar - Displays when video has started */}
        {hasStarted && (
          <div
            className={`absolute bottom-0 inset-x-0 z-30 bg-gradient-to-t from-black/95 via-black/75 to-transparent pt-12 pb-3.5 px-3 sm:px-6 flex flex-col gap-2.5 transition-opacity duration-300 ${
              showControls || !isPlaying ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Seeker / Progress bar: FORCED dir="ltr" so it strictly moves LEFT to RIGHT */}
            <div
              dir="ltr"
              className="relative w-full h-2 sm:h-2.5 bg-white/20 hover:bg-white/30 rounded-full flex items-center cursor-pointer group/seek transition-all"
            >
              {/* Filled progress track starting from LEFT (dir="ltr") */}
              <div
                className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#65B7B5] to-[#D6B16A] rounded-full transition-[width] duration-75"
                style={{ width: `${progressPercent}%` }}
              />

              {/* Seeker Thumb moving from LEFT to RIGHT */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#FAF8F4] shadow-lg border-2 border-[#D6B16A] group-hover/seek:scale-125 transition-transform"
                style={{ left: `${progressPercent}%` }}
              />

              {/* Range input for drag & click scrubbing, strictly dir="ltr" */}
              <input
                dir="ltr"
                type="range"
                min={0}
                max={duration || 100}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                aria-label="نوار پیشروی ویدیو از چپ به راست"
              />
            </div>

            {/* Bottom Controls Row */}
            <div className="flex items-center justify-between text-white text-xs select-none">
              {/* Play/Pause & Sound & Dynamic LTR Timecode */}
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                  className="p-1 hover:text-[#D6B16A] transition-colors"
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
                  className="p-1 hover:text-[#D6B16A] transition-colors"
                  aria-label={isMuted ? 'فعال‌سازی صدا' : 'قطع صدا'}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                  ) : (
                    <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>

                {/* Real-time Timecode (LTR) - dynamic from video element */}
                <div dir="ltr" className="font-mono text-[11px] sm:text-xs text-white/90 tabular-nums">
                  <span className="font-semibold">{formatTime(currentTime)}</span>
                  <span className="mx-1 text-white/40">/</span>
                  <span className="text-white/60">{formatTime(duration)}</span>
                </div>
              </div>

              {/* Title & Fullscreen Button */}
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="hidden sm:inline text-[11px] text-[#D6B16A] font-fa font-medium">
                  تیزر رسمی «روز شگفت‌انگیز»
                </span>
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="p-1 hover:text-[#D6B16A] transition-colors"
                  aria-label="نمایش تمام‌صفحه"
                >
                  <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);
