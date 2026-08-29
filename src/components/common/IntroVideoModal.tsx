import React, { useRef, useEffect, useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, ArrowRight, Sparkles } from 'lucide-react';

interface IntroVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc?: string;
}

export const IntroVideoModal: React.FC<IntroVideoModalProps> = ({
  isOpen,
  onClose,
  videoSrc = './assets/video/genera_video_de_intro_para_la (1).mp4'
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

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-district-darker/95 backdrop-blur-2xl animate-in fade-in duration-500 p-2 sm:p-6"
      onClick={onClose}
    >
      {/* Main Container */}
      <div 
        className="relative w-full max-w-5xl glass-card rounded-3xl border border-district-lime/40 shadow-glow-lime overflow-hidden my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Bar Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-district-darker/90 shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-district-lime animate-ping" />
            <span className="text-xs sm:text-sm font-extrabold text-white font-display uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-district-lime" />
              Video Intro Oficial • DISTRICT Arquitectura
            </span>
          </div>

          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-district-card text-xs font-bold text-slate-300 hover:text-white border border-slate-700 hover:border-district-lime transition-all"
          >
            <span>Saltar Intro</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player Area */}
        <div className="relative flex-1 bg-black flex items-center justify-center group overflow-hidden min-h-[300px]">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={onClose}
            className="w-full h-full object-contain"
          >
            <source src={videoSrc} type="video/mp4" />
            <source src="./assets/video/intro.mp4" type="video/mp4" />
            Tu navegador no soporta el formato de video HTML5.
          </video>

          {/* Quick Controls Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-2xl bg-district-darker/85 backdrop-blur-md border border-slate-700/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="p-2.5 rounded-xl bg-district-gradient text-district-darker font-bold hover:scale-105 transition-transform"
                title={isPlaying ? "Pausar" : "Reproducir"}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>

              <button
                onClick={toggleMute}
                className="p-2.5 rounded-xl bg-slate-800 text-slate-200 hover:text-white transition-colors"
                title={isMuted ? "Activar Sonido" : "Silenciar"}
              >
                {isMuted ? <VolumeX className="w-5 h-5 text-district-lime" /> : <Volume2 className="w-5 h-5" />}
              </button>
            </div>

            <button
              onClick={onClose}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-district-darker bg-district-gradient shadow-glow-cyan hover:opacity-95 transition-all"
            >
              <span>Entrar al Sitio Web</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Footer Info */}
        <div className="px-6 py-3.5 bg-district-darker/90 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400 shrink-0">
          <span>DISTRICT Arquitectura • Arq. Jaime Facundo (Tel. 419-707-9143)</span>
          <button
            onClick={onClose}
            className="text-xs font-bold text-district-cyan hover:text-district-lime transition-colors"
          >
            Cerrar Video [x]
          </button>
        </div>

      </div>
    </div>
  );
};
