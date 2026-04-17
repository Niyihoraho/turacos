"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Loader2, Image as ImageIcon, MapPin, FileText, Upload, CheckCircle2 } from 'lucide-react';
import { updateTour, uploadImage } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { slugify } from '@/lib/slug';

interface EditTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  tour: {
    slug: string;
    title: string;
    location: string;
    image: string;
    description: string;
  } | null;
}

type FormData = {
  title: string;
  slug: string;
  location: string;
  image: string;
  description: string;
};

const EditTourModal = ({ isOpen, onClose, tour }: EditTourModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const router = useRouter();
  
  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      title: tour?.title || "",
      slug: tour?.slug || "",
      location: tour?.location || "",
      image: tour?.image || "",
      description: tour?.description || "",
    }
  });

  // Re-sync form with tour prop when it changes
  useEffect(() => {
    if (tour && isOpen) {
      reset({
        title: tour.title,
        slug: tour.slug,
        location: tour.location,
        image: tour.image,
        description: tour.description,
      });
      setUploadSuccess(false);
    }
  }, [tour, reset, isOpen]);

  if (!isOpen || !tour) return null;

  const imageUrl = watch("image");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadSuccess(false);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const result = await uploadImage(formData);
      if (result.success && result.url) {
        setValue("image", result.url);
        setUploadSuccess(true);
      } else {
        setError(result.error || "Upload failed");
      }
    } catch (err) {
      setError("Error uploading image");
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Sanitize slug on submission
      const sanitizedData = {
        ...data,
        slug: slugify(data.slug),
      };
      
      const result = await updateTour(tour.slug, sanitizedData);
      if (result.success) {
        onClose();
        router.refresh();
      } else {
        setError(result.error || "Failed to update tour");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-charcoal outline-none focus:ring-2 focus:ring-kivu-blue/20 focus:border-kivu-blue transition-all placeholder:text-stone-400";
  const labelClasses = "block text-sm font-semibold text-kivu-blue mb-1.5 flex items-center gap-2";

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
            className="fixed inset-0 bg-kivu-blue/40 backdrop-blur-sm z-[999]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[1000] p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-[2.5rem] shadow-2xl pointer-events-auto flex flex-col"
            >
              {/* Header */}
              <div className="p-8 border-b border-stone-100 flex items-center justify-between bg-gradient-to-r from-gold to-sand text-kivu-blue">
                <div>
                  <h2 className="text-2xl font-serif font-bold">Edit Tour Package</h2>
                  <p className="text-kivu-blue/70 text-sm">Refine your curated adventure</p>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-kivu-blue/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Form Body */}
              <div className="flex-1 overflow-y-auto p-10">
                <form id="edit-tour-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Title */}
                    <div className="md:col-span-2">
                      <label className={labelClasses}><FileText className="w-4 h-4" /> Tour Title</label>
                      <input
                        {...register("title", { required: "Title is required" })}
                        className={inputClasses}
                        placeholder="e.g., Gorillas in the Mist Adventure"
                      />
                      {errors.title && <span className="text-red-500 text-xs mt-1">{errors.title.message}</span>}
                    </div>

                    {/* Slug & Location */}
                    <div>
                      <label className={labelClasses}>Slug (URL ID)</label>
                      <input
                        {...register("slug", { 
                          required: "Slug is required",
                          onChange: (e) => {
                            setValue("slug", slugify(e.target.value));
                          }
                        })}
                        className={inputClasses}
                        placeholder="e.g., gorilla-adventure"
                      />
                      {errors.slug && <span className="text-red-500 text-xs mt-1">{errors.slug.message}</span>}
                    </div>
                    <div>
                      <label className={labelClasses}><MapPin className="w-4 h-4" /> Location</label>
                      <input
                        {...register("location", { required: "Location is required" })}
                        className={inputClasses}
                        placeholder="e.g., Volcanoes National Park"
                      />
                      {errors.location && <span className="text-red-500 text-xs mt-1">{errors.location.message}</span>}
                    </div>

                    {/* Image Upload */}
                    <div className="md:col-span-2">
                      <label className={labelClasses}>
                        <ImageIcon className="w-4 h-4" /> Tour Image
                      </label>
                      
                      <div className="relative">
                        {!imageUrl ? (
                          <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-stone-200 rounded-3xl cursor-pointer bg-stone-50 hover:bg-stone-100/50 hover:border-kivu-blue/30 transition-all group">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              {isUploading ? (
                                <Loader2 className="w-10 h-10 text-kivu-blue/40 animate-spin mb-3" />
                              ) : (
                                <Upload className="w-10 h-10 text-stone-300 group-hover:text-kivu-blue/40 mb-3 transition-colors" />
                              )}
                              <p className="mb-2 text-sm text-stone-500">
                                <span className="font-semibold">{isUploading ? "Uploading..." : "Click to upload"}</span> or drag and drop
                              </p>
                              <p className="text-xs text-stone-400">PNG, JPG or WebP (max. 5MB)</p>
                            </div>
                            <input 
                              type="file" 
                              className="hidden" 
                              accept="image/*"
                              onChange={handleFileChange}
                              disabled={isUploading}
                            />
                          </label>
                        ) : (
                          <div className="relative w-full h-64 rounded-3xl overflow-hidden group border border-stone-100">
                            <img 
                              src={imageUrl} 
                              alt="Tour preview" 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-kivu-blue/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <button
                                type="button"
                                onClick={() => {
                                  setValue("image", "");
                                  setUploadSuccess(false);
                                }}
                                className="bg-white text-kivu-blue p-3 rounded-2xl font-bold shadow-xl hover:scale-110 transition-transform flex items-center gap-2"
                              >
                                <X className="w-5 h-5" /> Change Image
                              </button>
                            </div>
                            {uploadSuccess && (
                              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-kivu-blue px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg border border-kivu-blue/10 animate-in fade-in zoom-in duration-300">
                                <CheckCircle2 className="w-4 h-4" /> Uploaded Successfully
                              </div>
                            )}
                          </div>
                        )}
                        <input type="hidden" {...register("image", { required: "Please upload an image" })} />
                      </div>
                      {errors.image && <span className="text-red-500 text-xs mt-2 block">{errors.image.message}</span>}
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                      <label className={labelClasses}>Description</label>
                      <textarea
                        {...register("description", { required: "Description is required" })}
                        rows={4}
                        className={inputClasses}
                        placeholder="Update the magical experience details..."
                      />
                      {errors.description && <span className="text-red-500 text-xs mt-1">{errors.description.message}</span>}
                    </div>
                  </div>
                </form>
              </div>

              {/* Footer */}
              <div className="p-8 border-t border-stone-100 bg-stone-50 flex gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-4 rounded-xl font-bold text-charcoal bg-white border border-stone-200 hover:bg-stone-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="edit-tour-form"
                  disabled={isSubmitting || isUploading}
                  className="flex-[2] py-4 bg-kivu-blue text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-kivu-blue/90 transition-colors shadow-lg shadow-kivu-blue/20 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Save className="w-5 h-5" />
                  )}
                  <span>{isSubmitting ? "Saving..." : "Save Changes"}</span>
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EditTourModal;
