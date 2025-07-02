import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import { AiOutlinePlus } from 'react-icons/ai';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from "react-i18next";

const url = import.meta.env.VITE_SERVER_URL;

interface Gallery {
    _id?: string;
    caption: string;
    category: string;
    pictures: string[];
}

const defaultValues = {
    caption: '',
    category: '',
    pictures: [],
};

const GalleryManager: React.FC = () => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [editingGallery, setEditingGallery] = useState<Gallery | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [galleryImages, setGalleryImages] = useState<File[]>([]);
    const [existingPictures, setExistingPictures] = useState<string[]>([]);
    const [controller, setController] = useState<AbortController | null>(null);

    const { register, handleSubmit, reset } = useForm<Gallery>({ defaultValues });

    const extractKeyFromUrl = (url: string): string => {
        try {
            const parts = url.split('/');
            const keyWithParams = parts[parts.length - 1];
            return keyWithParams.split('?')[0];
        } catch {
            return url;
        }
    };

    const onSubmit = async (data: any) => {
        const abortController = new AbortController();
        setController(abortController);
        setLoading(true);
        try {
            if (galleryImages.length === 0 && existingPictures.length === 0) {
                toast.error("At least one image is required.");
                setLoading(false);
                return;
            }

            const formData = new FormData();
            formData.append('caption', data.caption);
            formData.append('category', data.category);
            formData.append('imagesToKeep', JSON.stringify(existingPictures.map(extractKeyFromUrl)));

            galleryImages.forEach((file) => formData.append('pictures', file));

            const config = {
                headers: { 'Content-Type': 'multipart/form-data' },
                signal: abortController.signal,
            };

            if (editingGallery?._id) {
                const res = await axios.put(`${url}/api/admin/gallery/${editingGallery._id}`, formData, config);
                if (res.status === 200) toast.success('Gallery updated successfully');
            } else {
                const res = await axios.post(`${url}/api/admin/post-gallery`, formData, config);
                if (res.status === 201) toast.success('Gallery created successfully');
            }

            reset(defaultValues);
            setGalleryImages([]);
            setExistingPictures([]);
            setEditingGallery(null);
            setShowModal(false);
            // Optionally: refresh gallery list
        } catch (error: any) {
            if (axios.isCancel(error)) {
                toast.info('Operation cancelled.');
            } else {
                toast.error(error?.response?.data?.message || 'Operation failed');
            }
        } finally {
            setLoading(false);
            setController(null);
        }
    };

    const handleCancel = () => {
        if (loading && controller) {
            controller.abort();
            return;
        }
        reset(defaultValues);
        setGalleryImages([]);
        setExistingPictures([]);
        setEditingGallery(null);
        setShowModal(false);
    };

    const handleRemoveExistingImage = (imgUrl: string) => {
        setExistingPictures((prev) => prev.filter((img) => img !== imgUrl));
    };

    return (
        <div className="p-4 sm:p-6 text-white">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">Gallery Management</h1>
            <button
                className="btn btn-primary flex items-center gap-2 mb-4"
                onClick={() => {
                    setEditingGallery(null);
                    reset(defaultValues);
                    setShowModal(true);
                }}
            >
                <AiOutlinePlus /> {t("Add Gallery")}
            </button>

            {showModal && (
                <AnimatePresence>
                    <motion.div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white rounded-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto p-6 shadow-xl"
                            initial={{ scale: 0.9, y: 40 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                        >
                            <h2 className="text-xl font-semibold mb-4 text-center text-black">
                                {editingGallery ? 'Edit Gallery' : 'Add Gallery'}
                            </h2>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-black">
                                {existingPictures.length > 0 && (
                                    <div>
                                        <p className="font-medium">{t("Existing Images")}:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {existingPictures.map((img, idx) => (
                                                <div key={idx} className="relative">
                                                    <img src={img} alt="gallery" className="w-24 h-16 object-cover rounded" />
                                                    <button
                                                        type="button"
                                                        className="btn btn-xs btn-error absolute top-0 right-0"
                                                        onClick={() => handleRemoveExistingImage(img)}
                                                    >
                                                        x
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label className="label">{t("Caption")}</label>
                                    <input type="text" className="input input-bordered w-full" {...register('caption')} />
                                </div>

                                <div>
                                    <label className="label">{t("Category")}</label>
                                    <select className="select select-bordered w-full" {...register('category')}>
                                        <option value="">{t("Select Category")}</option>
                                        <option value="Rooms & Suites">{t("Rooms & Suites")}</option>
                                        <option value="Dining & Cuisine">{t("Dining & Cuisine")}</option>
                                        <option value="Reception & Lounge">{t("Reception & Lounge")}</option>
                                        <option value="Amenities">{t("Amenities")}</option>
                                        <option value="Outdoor & Garden">{t("Outdoor & Garden")}</option>
                                        <option value="Events & Conferences">{t("Events & Conferences")}</option>
                                        <option value="Guest Experience">{t("Guest Experience")}</option>
                                        <option value="Nearby Attractions">{t("Nearby Attractions")}</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="label">{t("Upload Pictures")}</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        className="file-input file-input-bordered w-full"
                                        onChange={(e) => setGalleryImages(Array.from(e.target.files || []))}
                                    />
                                </div>

                                <div className="flex gap-4 justify-end mt-4">
                                    <button type="submit" className="btn btn-primary" disabled={loading}>
                                        {loading ? (
                                            <span className="loading loading-spinner loading-sm"></span>
                                        ) : editingGallery ? 'Update' : 'Create'}
                                    </button>

                                    <button type="button" className="btn btn-outline" onClick={handleCancel} disabled={loading}>
                                        {t("Cancel")}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            )}

            <ToastContainer />
        </div>
    );
};

export default GalleryManager;
