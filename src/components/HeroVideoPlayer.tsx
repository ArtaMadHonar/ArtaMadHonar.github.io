import React, {
  useState,
  useRef,
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
  'https://my.uploadkon.ir/d/YA3wusaJ06XWF9R1yDFHf9nPpntKTf/MTA3MDg5fHBhZA.mp4';
const WONDERFUL_DAY_POSTER = '/assets/wonderful-day-hero.webp';

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

    return (
      <div
        id="hero-video-player"
        ref={containerRef}
        className={`relative w-full aspect-[21/9] min-h-[260px] sm:min-h-[380px] md:min-h-[460px] bg-[#121616] overflow-hidden select-none group cursor-pointer ${className}`}
        onClick={togglePlay}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        <video
          ref={videoRef}
          src={WONDERFUL_DAY_VIDEO}
          poster={WONDERFUL_DAY_POSTER}
          preload="metadata"
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onWaiting={() => setIsBuffering(true)}
          onPlaying={() => setIsBuffering(false)}
          onEnded={() => {
            setIsPlaying(false);
            setHasStarted(false);
          }}
          className="w-full h-full object-cover"
        />

        {/* Ambient Overlay Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

        {/* Initial Big Play Button */}
        {!hasStarted && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 gap-3 pointer-events-none">
            <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-[#3E777A]/90 text-white flex items-center justify-center shadow-2xl backdrop-blur-md transform group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1 fill-white" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-white/95 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md">
              پخش تیزر سینمایی روز شگفت‌انگیز
            </span>
          </div>
        )}

        {/* Buffering Indicator */}
        {isBuffering && hasStarted && (
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className="w-10 h-10 border-3 border-white/20 border-t-[#65B7B5] rounded-full animate-spin" />
          </div>
        )}

        {/* Player Controls Bar */}
        {hasStarted && (
          <div
            onClick={(e) => e.stopPropagation()}
            className={`absolute bottom-0 inset-x-0 p-3 sm:p-5 bg-gradient-to-t from-black/85 via-black/50 to-transparent z-30 transition-opacity duration-300 ${
              showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Scrubber Range */}
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 sm:h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#65B7B5] mb-2 sm:mb-3"
            />

            <div className="flex items-center justify-between text-white text-xs sm:text-sm">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="p-1.5 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
                  aria-label={isPlaying ? 'توقف' : 'پخش'}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
                  ) : (
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-1.5 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
                  aria-label={isMuted ? 'صدا وصل' : 'صدا قطع'}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-white/70" />
                  ) : (
                    <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>

                <span className="font-mono text-[11px] sm:text-xs text-white/80 tabular-nums" dir="ltr">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="p-1.5 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
                  aria-label="تمام صفحه"
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
