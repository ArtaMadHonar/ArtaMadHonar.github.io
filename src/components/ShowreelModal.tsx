import React, { useState, useRef, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { useModalScrollLock } from '../hooks/useModalScrollLock';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
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

export const ShowreelModal: React.FC<ShowreelModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useModalScrollLock(isOpen, containerRef);

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

  if (!isOpen) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasStarted(true);
        })
        .catch(() => {});
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-black/85 backdrop-blur-md overscroll-none"
    >
      <div
        className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-black/80 border-b border-white/10 text-white shrink-0">
          <div className="text-right">
            <span className="text-[10px] font-mono tracking-widest text-[#65B7B5] uppercase">
              STUDIO SHOWREEL
            </span>
            <h4 className="text-xs sm:text-sm font-bold">شوریل استودیو آرتا ماد هنر</h4>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="بستن"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div
          ref={containerRef}
          className="relative aspect-video w-full bg-black flex items-center justify-center cursor-pointer group"
          onClick={togglePlay}
        >
          <video
            ref={videoRef}
            src={WONDERFUL_DAY_VIDEO}
            poster={WONDERFUL_DAY_POSTER}
            playsInline
            onTimeUpdate={() => {
              if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
            }}
            onLoadedMetadata={() => {
              if (videoRef.current) setDuration(videoRef.current.duration);
            }}
            onEnded={() => setIsPlaying(false)}
            className="w-full h-full object-contain"
          />

          {!hasStarted && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-[#3E777A]/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 ml-1 fill-white" />
              </div>
            </div>
          )}

          {/* Controls Bar */}
          {hasStarted && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 to-transparent flex items-center justify-between text-white text-xs"
            >
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="p-1 hover:text-[#65B7B5] cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.muted = !isMuted;
                      setIsMuted(!isMuted);
                    }
                  }}
                  className="p-1 hover:text-[#65B7B5] cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span className="font-mono text-[11px] tabular-nums" dir="ltr">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
