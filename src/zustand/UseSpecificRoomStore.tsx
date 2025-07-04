import axios from "axios";
import { create } from "zustand";
const url = import.meta.env.VITE_SERVER_URL;

interface RoomConfiguration {
  roomType: string;
  price: number;
  numberOfBeds: number;
  bedType: string;
  maxPeople: number;
}

interface RoomsProp {
  _id: string;
  title: string;
  roomNumber: string;
  description: string; 
  amenities: string[];
  configurations: RoomConfiguration[]; 
  pictures: string[];
  frontViewPicture: string;
  status: 'available' | 'booked' | 'maintenance';
  starRating: number;
  createdAt?: string;
}


interface RoomState {
    loading: boolean,
    err: string | null,
    room: RoomsProp | null
    fetchRoom: (id: string) => Promise<void>
}


const UseSpecificRoomStore = create<RoomState>((set) => ({
    room: null,
    loading: false,
    err: null,
    fetchRoom: async (id: string) => {
        set({ loading: true, err: "" })
        try {
            const response = await axios.get(`${url}/api/user/room/${id}`);
            if (response.status === 200) {
                set({ room: response.data })
            }
        } catch (error: any) {
            set({ err: error?.response?.data?.message || "Failed to fetch room" });
        } finally {
            set({ loading: false })
        }
    }
}))

export default UseSpecificRoomStore;