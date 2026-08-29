import React, { useRef, useEffect, useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc?: string;
  title?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoSrc = './assets/video/genera_video_de_intro_para_la (1).mp4',
  title = 'Video de Presentación • DISTRICT Arquitectura'
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch(() => {});
          }
        });
      }
      setIsPlaying(true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-district-darker/95 backdrop-blur-2xl animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-5xl glass-card rounded-3xl border border-district-lime/40 shadow-glow-cyan overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-district-darker/90">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-district-lime animate-ping" />
            <h3 className="text-sm sm:text-base font-extrabold text-white font-display">
              {title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-slate-800/80 text-slate-300 hover:text-white hover:bg-district-card border border-slate-700 transition-all cursor-pointer"
            title="Cerrar Video [X]"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Video Player Area */}
        <div className="relative aspect-video bg-black flex items-center justify-center group overflow-hidden">
          <video
            ref={videoRef}
            controls
            playsInline
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="w-full h-full object-contain"
          >
            <source src="./assets/video/genera_video_de_intro_para_la (1).mp4" type="video/mp4" />
            <source src="./assets/video/intro.mp4" type="video/mp4" />
            <source src={videoSrc} type="video/mp4" />
            Tu navegador no soporta la reproducción de video HTML5.
          </video>

          {/* Overlay Controls */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-2xl bg-district-darker/80 backdrop-blur-md border border-slate-700/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="p-2.5 rounded-xl bg-district-gradient text-district-darker font-bold hover:scale-105 transition-transform"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>

              <button
                onClick={toggleMute}
                className="p-2.5 rounded-xl bg-slate-800 text-slate-200 hover:text-white transition-colors"
              >
                {isMuted ? <VolumeX className="w-5 h-5 text-district-lime" /> : <Volume2 className="w-5 h-5" />}
              </button>
            </div>

            <button
              onClick={handleFullscreen}
              className="p-2.5 rounded-xl bg-slate-800 text-slate-200 hover:text-white transition-colors"
              title="Pantalla Completa"
            >
              <Maximize className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Footer Bar with explicit Close button */}
        <div className="px-6 py-3.5 bg-district-darker/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold text-slate-300">DISTRICT Arquitectura • Arq. Jaime Facundo (Tel. 419-707-9143)</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-district-card text-white font-bold transition-all border border-slate-700 hover:border-district-lime"
          >
            Cerrar Video [X]
          </button>
        </div>

      </div>
    </div>
  );
};
