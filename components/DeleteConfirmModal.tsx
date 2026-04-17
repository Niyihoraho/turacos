"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Loader2, AlertTriangle } from 'lucide-react';
import { deleteTour } from '@/lib/actions';
import { useRouter } from 'next/navigation';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  tourTitle: string | null;
  tourSlug: string | null;
}

const DeleteConfirmModal = ({ isOpen, onClose, tourTitle, tourSlug }: DeleteConfirmModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!tourSlug) return;
    setIsDeleting(true);
    setError(null);

    try {
      const result = await deleteTour(tourSlug);
      if (result.success) {
        onClose();
        router.refresh();
      } else {
        setError(result.error || "Failed to delete tour");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen || !tourTitle || !tourSlug) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-red-950/20 backdrop-blur-sm z-[999]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[1000] p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-md overflow-hidden rounded-[2.5rem] shadow-2xl pointer-events-auto border border-red-100"
            >
              {/* Header Icon */}
              <div className="pt-10 pb-6 flex justify-center">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-500 animate-pulse">
                  <AlertTriangle className="w-10 h-10" />
                </div>
              </div>

              {/* Content */}
              <div className="px-10 pb-8 text-center">
                <h2 className="text-2xl font-serif font-bold text-kivu-blue mb-4">
                  Confirm Deletion
                </h2>
                <p className="text-charcoal/70 leading-relaxed mb-6">
                  Are you absolutely sure you want to delete <span className="font-bold text-red-600">"{tourTitle}"</span>? This action cannot be undone.
                </p>

                {error && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-6 font-medium">
                    {error}
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="w-full py-4 bg-red-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-colors shadow-lg shadow-red-200 disabled:opacity-70 disabled:cursor-not-allowed group"
                  >
                    {isDeleting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Trash2 className="w-5 h-5 group-hover:shake" />
                    )}
                    <span>{isDeleting ? "Deleting..." : "Yes, Delete Package"}</span>
                  </button>
                  <button
                    onClick={onClose}
                    disabled={isDeleting}
                    className="w-full py-4 bg-stone-50 text-charcoal rounded-2xl font-bold hover:bg-stone-100 transition-colors border border-stone-100"
                  >
                    No, Cancel
                  </button>
                </div>
              </div>

              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-400 hover:text-charcoal"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmModal;
