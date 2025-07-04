import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const url = import.meta.env.VITE_SERVER_URL;
import { useTranslation } from 'react-i18next';


interface RoomConfiguration {
    roomType: string;
    price: number;
    numberOfBeds: number;
    bedType: string;
    maxPeople: number;
}

interface Room {
    _id?: string;
    title: string;
    roomNumber: string;
    description: string;
    configurations: RoomConfiguration[];
    status: string;
    amenities: string[];
    frontViewPicture: string;
    pictures: string[];
}


const defaultValues = {
    title: '',
    roomNumber: '',
    description: '',
    configurations: [
        {
            roomType: '',
            price: 0,
            numberOfBeds: 1,
            bedType: '',
            maxPeople: 1
        }
    ],
    status: 'available',
    amenities: [],
    frontViewPicture: '',
    pictures: [],
};

const AmenityChoices = [
    "Room 20m²", "Room 26m²", "Toothbrush", "Shampoo", "Slippers", "Room 16m²", "Room 24m²", "Room 28m²", "Double Beds", "Single Bed", "Tripple", "Smart TV", "Sauna", "Room Service", "Bath tab",
    "AC", "Booking", "Storage", "Outdoor Kitchen", "Towels",
    "Big Wardrobe", "Cable TV", "Family Room", "Shower", "Breakfast", "Soundproof", "Dryer",
];

const RoomManager: React.FC = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(false);
    const [editingRoom, setEditingRoom] = useState<Room | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [loadingRooms, setRoomsLoading] = useState(false);
    const [frontImage, setFrontImage] = useState<File | null>(null);
    const [roomImages, setRoomImages] = useState<File[]>([]);
    const [existingPictures, setExistingPictures] = useState<string[]>([]);
    const [existingFrontImage, setExistingFrontImage] = useState<string | null>(null);
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
    const [controller, setController] = useState<AbortController | null>(null);
    const { t } = useTranslation();

    const { register, handleSubmit, reset } = useForm<Room>({ defaultValues });

    const fetchRooms = async () => {
        setRoomsLoading(true);
        try {
            const response = await axios.get(`${url}/api/user/rooms`);
            if (response.status === 200) {
                setRooms(response.data);
            }
            console.log(response.data)
        } catch (error: any) {
            const msg = error?.response?.data?.message;
            if (error.response?.status === 404 && msg) {
                toast.error(t(msg));
            } else {
                toast.error(t("An error occurred during fetching rooms."));
            }
        } finally {
            setRoomsLoading(false);
        }
    };

    const extractKeyFromUrl = (url: string): string => {
        try {
            const parts = url.split('/');
            const keyWithParams = parts[parts.length - 1];
            return keyWithParams.split('?')[0];
        } catch {
            return url;
        }
    };
    useEffect(() => {
        if (editingRoom) {
            setConfigurations(editingRoom.configurations || defaultValues.configurations);
            reset(editingRoom);
            setExistingFrontImage(editingRoom.frontViewPicture || null);
            setExistingPictures(editingRoom.pictures || []);
            setSelectedAmenities(editingRoom.amenities || []);
        } else {
            setConfigurations(defaultValues.configurations);
            reset(defaultValues);
            setExistingFrontImage(null);
            setExistingPictures([]);
            setSelectedAmenities([]);
        }
    }, [editingRoom, reset]);


    //configurations
    const [configurations, setConfigurations] = useState<RoomConfiguration[]>([
        { roomType: 'Single', price: 0, numberOfBeds: 1, bedType: '', maxPeople: 1 }
    ]);

    const updateConfigField = <K extends keyof RoomConfiguration>(
        index: number,
        field: K,
        value: RoomConfiguration[K]
    ) => {
        const updated = [...configurations];
        updated[index][field] = value;
        setConfigurations(updated);
    };


    const addConfig = () => {
        setConfigurations([...configurations, {
            roomType: '',
            price: 0,
            numberOfBeds: 1,
            bedType: '',
            maxPeople: 1
        }]);
    };

    const removeConfig = (index: number) => {
        setConfigurations((prev) => prev.filter((_, idx) => idx !== index));
    };


    const onSubmit = async (data: any) => {
        const abortController = new AbortController();
        setController(abortController);
        setLoading(true);
        try {
            if (!frontImage && !existingFrontImage) {
                toast.error(t("Front view image is required."));
                setLoading(false);
                return;
            }

            if (roomImages.length === 0 && existingPictures.length === 0) {
                toast.error(t("At least one slideshow image is required."));
                setLoading(false);
                return;
            }

            const pictureKeys = existingPictures.map(extractKeyFromUrl);
            const frontImageKey = existingFrontImage ? extractKeyFromUrl(existingFrontImage) : null;

            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('roomNumber', data.roomNumber);
            formData.append('description', data.description);
            formData.append('configurations', JSON.stringify(configurations));
            formData.append('status', data.status);
            formData.append('amenities', JSON.stringify(selectedAmenities));
            formData.append('imagesToKeep', JSON.stringify(pictureKeys));
            if (frontImageKey && !frontImage) {
                formData.append('keepFrontView', 'true');
            }

            if (frontImage) formData.append('frontViewPicture', frontImage);
            roomImages.forEach((file) => formData.append('pictures', file));

            const config = {
                headers: { 'Content-Type': 'multipart/form-data' },
                signal: abortController.signal,
            };

            if (editingRoom?._id) {
                const response = await axios.put(`${url}/api/admin/room/${editingRoom._id}`, formData, config);
                if (response.status === 200) toast.success(t('Room updated successfully'));
            } else {
                const response = await axios.post(`${url}/api/admin/create-room`, formData, config);
                if (response.status === 201) toast.success(t('Room created successfully'));
            }

            fetchRooms();
            reset(defaultValues);
            setConfigurations(defaultValues.configurations);
            setFrontImage(null);
            setRoomImages([]);
            setExistingPictures([]);
            setExistingFrontImage(null);
            setSelectedAmenities([]);
            setEditingRoom(null);
            setShowModal(false);

        } catch (error: any) {
            if (axios.isCancel(error)) {
                toast.info(t('Room creation was cancelled.'));
            } else {
                toast.error(t(error?.response?.data?.message || 'Operation failed'));
            }
        } finally {
            setLoading(false);
            setController(null);
        }
    };

    const handleEdit = (room: Room) => {
        setEditingRoom(room);
        setShowModal(true);
    };


    const handleDelete = async (id: string) => {
        try {
            const response = await axios.delete(`${url}/api/admin/room/${id}`);
            if (response.status === 200) {
                fetchRooms();
                toast.success(t('Room deleted successfully'));
            }
        } catch (error) {
            toast.error(t('Failed to delete room'));
        }
    };

    const handleCancel = () => {
        if (loading && controller) {
            controller.abort();
            return;
        }
        reset(defaultValues);
        setFrontImage(null);
        setRoomImages([]);
        setExistingPictures([]);
        setExistingFrontImage(null);
        setSelectedAmenities([]);
        setEditingRoom(null);
        setShowModal(false);
    };

    const handleRemoveExistingImage = (imgUrl: string) => {
        setExistingPictures((prev) => prev.filter((img) => img !== imgUrl));
    };

    const handleRemoveFrontImage = () => {
        setExistingFrontImage(null);
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    return (
        <div className="p-4 sm:p-6 text-black">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-slate-300">{t("Room Management")}</h1>
            <button className="btn btn-primary flex items-center gap-2 mb-4" onClick={() => {
                setEditingRoom(null);
                setShowModal(true);
            }}>
                <AiOutlinePlus /> {t("Add Room")}
            </button>

            {loadingRooms ? (
                <div className="flex justify-center items-center h-40">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            ) : rooms.length === 0 ? (
                <div className="text-center text-gray-400 py-10 text-lg">{t("No rooms available.")}</div>
            ) : (
                <div className="overflow-x-auto rounded-lg bg-white shadow-md">
                    <table className="table w-full text-sm">
                        <thead className="bg-gray-900 text-white">
                            <tr>
                                <th className="text-left px-4 py-3">{t("Title")}</th>
                                <th className="text-left px-4 py-3">{t("Room #")}</th>
                                <th className="text-left px-4 py-3">{t("Price")}</th>
                                <th className="text-left px-4 py-3">{t("Max People")}</th>
                                <th className="text-left px-4 py-3">{t("Status")}</th>
                                <th className="text-center px-4 py-3">{t("Actions")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rooms.map((room, index) => (
                                <tr
                                    key={room._id}
                                    className={`${index % 2 === 0 ? "bg-white text-black" : "bg-black text-white"
                                        } hover:bg-gray-700 transition-colors`}
                                >
                                    <td className="px-4 py-3">{room.title}</td>
                                    <td className="px-4 py-3">{room.roomNumber}</td>
                                    <td className="px-4 py-3">
                                        {room.configurations?.[0]?.price ? `$${room.configurations[0].price}` : 'N/A'}
                                    </td>
                                    <td className="px-4 py-3">
                                        {room.configurations?.[0]?.maxPeople ?? 'N/A'}
                                    </td>

                                    <td className="px-4 py-3">
                                        <span
                                            className={`font-medium ${room.status === "available"
                                                ? "text-green-500"
                                                : room.status === "booked"
                                                    ? "text-yellow-400"
                                                    : "text-red-500"
                                                }`}
                                        >
                                            {t(room.status)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                className="btn btn-sm btn-outline btn-info"
                                                onClick={() => handleEdit(room)}
                                            >
                                                <AiOutlineEdit />
                                            </button>
                                            <button
                                                disabled={loading}
                                                className="btn btn-sm btn-error text-white"
                                                onClick={() => handleDelete(room._id!)}
                                            >
                                                {!loading ? <AiOutlineDelete /> : t("deleting..")}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


            )}

            {showModal && (
                <AnimatePresence>
                    <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <motion.div className="bg-white rounded-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto p-6 shadow-xl" initial={{ scale: 0.9, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }}>
                            <h2 className="text-xl font-semibold mb-4 text-center text-black">{editingRoom ? t('Edit Room') : t('Add Room')}</h2>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-black">
                                {existingFrontImage && (
                                    <div className="mb-2">
                                        <p className="font-medium">{t("Existing Front View:")}</p>
                                        <div className="flex gap-2 items-center">
                                            <img src={existingFrontImage} alt={t("Front")} className="w-24 h-16 object-cover rounded" />
                                            <button type="button" className="btn btn-xs btn-error" onClick={handleRemoveFrontImage}>{t("Remove")}</button>
                                        </div>
                                    </div>
                                )}
                                {existingPictures.length > 0 && (
                                    <div className="mb-2">
                                        <p className="font-medium">{t("Existing Slide Show Images:")}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {existingPictures.map((img, idx) => (
                                                <div key={idx} className="relative">
                                                    <img src={img} alt={t("room")} className="w-24 h-16 object-cover rounded" />
                                                    <button type="button" className="btn btn-xs btn-error absolute top-0 right-0" onClick={() => handleRemoveExistingImage(img)}>x</button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <fieldset disabled={loading} className="space-y-4">
                                    <div>
                                        <label className="label">{t("Title")}</label>
                                        <input className="input input-bordered w-full" {...register('title')} />
                                    </div>
                                    <div>
                                        <label className="label">{t("Room Number")}</label>
                                        <input className="input input-bordered w-full" {...register('roomNumber')} />
                                    </div>
                                    <div>
                                        <label className="label">{t("Description")}</label>
                                        <textarea className="textarea textarea-bordered w-full" {...register('description')} />
                                    </div>
                                    <div>
                                        <label className="label">{t("Room Configurations")}</label>
                                        {configurations.map((config, idx) => (
                                            <div key={idx} className="border p-2 mb-2 rounded">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div>
                                                        <select className="select select-bordered w-full" value={config.roomType}
                                                            onChange={(e) => updateConfigField(idx, 'roomType', e.target.value)}>
                                                            <option value="">{t("Choose room type")}</option>
                                                            <option value="Tripple">{t("Tripple")}</option>
                                                            <option value="Small Double">{t("Small Double")}</option>
                                                            <option value="Single">{t("Single")}</option>
                                                            <option value="Double">{t("Family")}</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="label">{t("Price for the room type")}</label>
                                                        <input type="number" placeholder="Price" className="input input-bordered w-full"
                                                            value={config.price}
                                                            onChange={(e) => updateConfigField(idx, 'price', +e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="label">{t("Number of beds of room type")}</label>
                                                        <input type="number" placeholder="Number of Beds" className="input input-bordered w-full"
                                                            value={config.numberOfBeds}
                                                            onChange={(e) => updateConfigField(idx, 'numberOfBeds', +e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="label">{t("Bed type")}</label>
                                                        <select className="select select-bordered w-full" value={config.bedType}
                                                            onChange={(e) => updateConfigField(idx, 'bedType', e.target.value)}>
                                                            <option value="">{t("Choose bed type")}</option>
                                                            <option value="Single">{t("Single")}</option>
                                                            <option value="Queen">{t("Queen")}</option>
                                                            <option value="Double">{t("Double")}</option>
                                                            <option value="King">{t("King")}</option>
                                                            <option value="Bunk">{t("Bunk")}</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="label">{t("Maximum people")}</label>
                                                        <input type="number" placeholder="Max People" className="input input-bordered w-full"
                                                            value={config.maxPeople}
                                                            onChange={(e) => updateConfigField(idx, 'maxPeople', +e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <button type="button" className="btn btn-sm btn-error mt-2" onClick={() => removeConfig(idx)}>{t("Remove")}</button>
                                            </div>
                                        ))}
                                        <button type="button" className="btn btn-sm btn-outline mt-2" onClick={addConfig}>
                                            <AiOutlinePlus /> {t("Add Configuration")}
                                        </button>
                                    </div>


                                    <div>
                                        <label className="label">{t("Front View Picture")}</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="file-input file-input-bordered w-full"
                                            onChange={(e) => setFrontImage(e.target.files?.[0] || null)}
                                        />
                                    </div>
                                    <div>
                                        <label className="label">{t("Room Pictures (Slide Show)")}</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            className="file-input file-input-bordered w-full"
                                            onChange={(e) => setRoomImages(Array.from(e.target.files || []))}
                                        />
                                    </div>
                                    <div>
                                        <label className="label">{t("Amenities")}</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {AmenityChoices.map((item) => (
                                                <label key={item} className="flex gap-2 items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="checkbox"
                                                        checked={selectedAmenities.includes(item)}
                                                        onChange={(e) => {
                                                            const checked = e.target.checked;
                                                            setSelectedAmenities((prev) =>
                                                                checked ? [...prev, item] : prev.filter((a) => a !== item)
                                                            );
                                                        }}
                                                    />
                                                    {t(item)}
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="label">{t("Status")}</label>
                                        <select className="select select-bordered w-full" {...register('status')}>
                                            <option value="available">{t("Available")}</option>
                                            <option value="booked">{t("Booked")}</option>
                                            <option value="maintenance">{t("Maintenance")}</option>
                                        </select>
                                    </div>
                                </fieldset>
                                <div className="flex gap-4 justify-end mt-4">
                                    <button type="submit" className="btn btn-primary" disabled={loading}>
                                        {loading ? (
                                            <span className="loading loading-spinner loading-sm"></span>
                                        ) : editingRoom ? t('Update') : t('Create')}
                                    </button>
                                    <button
                                        type="button"
                                        disabled={loading}
                                        className="btn btn-outline"
                                        onClick={handleCancel}
                                    >
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

export default RoomManager;
