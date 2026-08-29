import React, { useRef, useEffect } from 'react';
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
  videoSrc = './assets/video/intro.mp4',
  title = 'Presentación Arquitectónica DISTRICT'
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isMuted, setIsMuted] = React.useState(false);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        setIsMuted(true);
        videoRef.current?.play().catch(() => {});
      });
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-district-darker/90 backdrop-blur-2xl animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* Container - Stop propagation on inner click */}
      <div 
        className="relative w-full max-w-5xl glass-card rounded-3xl border border-district-cyan/40 shadow-glow-cyan overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-district-darker/80">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-district-lime animate-ping" />
            <h3 className="text-sm sm:text-base font-bold text-white font-display">
              {title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800/80 text-slate-300 hover:text-white hover:bg-district-card border border-slate-700 transition-all"
            title="Cerrar Video"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Area */}
        <div className="relative aspect-video bg-black flex items-center justify-center group overflow-hidden">
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            playsInline
            controls
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="w-full h-full object-contain"
          >
            <source src={videoSrc} type="video/mp4" />
            Tu navegador no soporta la reproducción de video HTML5.
          </video>

          {/* Controls Overlay Bar */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-2xl bg-district-darker/80 backdrop-blur-md border border-slate-700/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="p-2 rounded-xl bg-district-gradient text-district-darker font-bold hover:scale-105 transition-transform"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                onClick={toggleMute}
                className="p-2 rounded-xl bg-slate-800 text-slate-200 hover:text-white transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-district-lime" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            <button
              onClick={handleFullscreen}
              className="p-2 rounded-xl bg-slate-800 text-slate-200 hover:text-white transition-colors"
              title="Pantalla Completa"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-district-darker/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>DISTRICT Arquitectura • Arq. Jaime Facundo</span>
          <button
            onClick={onClose}
            className="text-district-cyan font-bold hover:underline"
          >
            Cerrar Video [x]
          </button>
        </div>

      </div>
    </div>
  );
};
