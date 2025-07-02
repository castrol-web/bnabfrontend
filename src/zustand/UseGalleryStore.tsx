import axios from "axios";
import { create } from "zustand";
const url = import.meta.env.VITE_SERVER_URL;

interface GalleryEntry {
  _id: string;
  caption: string;
  category: string;
  pictures: string[]; // image URLs
}

interface GalleryState {
  loading: boolean;
  err: string | null;
  gallery: GalleryEntry[];
  fetchGallery: () => Promise<void>;
}

const UseGalleryStore = create<GalleryState>((set) => ({
  gallery: [],
  loading: false,
  err: null,
  fetchGallery: async () => {
    set({ loading: true, err: "" });
    try {
      const res = await axios.get(`${url}/api/user/gallery`);
      if (res.status === 200) {
        set({ gallery: res.data });
      }
    } catch (error: any) {
      set({ err: error?.response?.data?.message || "Failed to fetch gallery" });
    } finally {
      set({ loading: false });
    }
  },
}));

export default UseGalleryStore;
