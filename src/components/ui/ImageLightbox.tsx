'use client';

import React, { useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ArrowRight, ZoomIn } from 'lucide-react';

export interface LightboxData {
  image: string;
  title: string;
  category?: string;
  description?: string;
  slug?: string;
  projectUrl?: string;
}

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  data: LightboxData | null;
}

export default function ImageLightbox({ isOpen, onClose, data }: ImageLightboxProps) {
  // Handle ESC key press
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !data) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl"
        role="dialog"
        aria-modal="true"
        aria-label={data.title}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all backdrop-blur-md border border-white/10 shadow-lg focus:outline-none"
          title="Tutup (Esc)"
          aria-label="Tutup preview gambar"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Modal Content Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-5xl w-full max-h-[92vh] flex flex-col bg-[#0b0c16]/95 border border-white/15 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Top Bar with Badge & Title */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-2.5 min-w-0 pr-4">
              {data.category && (
                <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-mono text-[11px] uppercase tracking-wider shrink-0">
                  {data.category}
                </span>
              )}
              <h3 className="text-sm sm:text-base font-semibold text-white font-display truncate">
                {data.title}
              </h3>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-mono text-gray-400 shrink-0">
              <ZoomIn className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">16:9 HD Preview</span>
            </div>
          </div>

          {/* 16:9 Image Area */}
          <div className="relative w-full aspect-video bg-black/60 flex items-center justify-center overflow-hidden">
            <img
              src={data.image}
              alt={data.title}
              className="w-full h-full object-contain select-none"
            />
          </div>

          {/* Bottom Bar: Description & Action Buttons */}
          <div className="p-4 sm:p-5 border-t border-white/10 bg-white/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div className="min-w-0 flex-1">
              {data.description ? (
                <p className="text-xs sm:text-sm text-gray-300 font-light line-clamp-2 leading-relaxed">
                  {data.description}
                </p>
              ) : (
                <p className="text-xs text-gray-400 font-mono">Portofolio Inalabs Indonesia</p>
              )}
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              {data.projectUrl && (
                <a
                  href={data.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs flex items-center gap-1.5 transition-colors"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                </a>
              )}

              {data.slug && (
                <Link
                  href={`/projects/${data.slug}`}
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-mono text-xs font-medium flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all hover:scale-[1.02]"
                >
                  <span>Detail Studi Kasus</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
