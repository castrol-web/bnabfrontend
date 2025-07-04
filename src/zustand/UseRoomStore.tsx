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
    err: string,
    rooms: RoomsProp[]
    fetchRooms: () => Promise<void>
}

const UseRoomStore = create<RoomState>((set) => ({
    rooms: [],
    loading: false,
    err: '',
    fetchRooms: async () => {
        set({ loading: true });
        try {
            const response = await axios.get(`${url}/api/user/rooms`)
            if (response.status === 200) {
                set({ rooms: response.data });
            }
        } catch (error: any) {
            if (error) {
                set({ err: error })
            }
        } finally {
            set({ loading: false });
        }
    }
}))


export default UseRoomStore;