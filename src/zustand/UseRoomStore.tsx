import axios from "axios";
import { create } from "zustand";
const url = import.meta.env.VITE_SERVER_URL;

interface RoomsProp {
    _id: string,
    title: string,
    roomNumber: string,
    description: string[],
    amenities: string[],
    price: number,
    maxPeople: number,
    numberOfBeds: number,
    roomType: string,
    pictures: string,
    frontViewPicture: string,
    status: string,
    starRating: number,
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
            if (response.status === 201) {
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