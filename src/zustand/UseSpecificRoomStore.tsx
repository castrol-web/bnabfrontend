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
    pictures: string[],
    frontViewPicture: string,
    status: string,
    starRating: number,
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