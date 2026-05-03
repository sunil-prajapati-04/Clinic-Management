import { create } from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios.js';

export const useMedStore = create((set, get) => ({

    allMedicine: [],
    isSearchingMedicine: false,
    isAddingMedicine: false,

    getMed: async (medQuery) => {
        try {
            set({ isSearchingMedicine: true });

            const res = await axiosInstance.get('/medicine/search', {
                params: typeof medQuery === "string" ? { med: medQuery } : medQuery
            });

            set({ allMedicine: res.data });
            if (res.data?.message) {
                toast.success(res.data.message);
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetching medicine");
        } finally {
            set({ isSearchingMedicine: false });
        }
    },

    addMed: async (medData) => {
        try {
            set({ isAddingMedicine: true });

            const res = await axiosInstance.post('/medicine/add', medData);
            toast.success(res.data?.message || "Medicine added successfully");

            set((state) => ({
                allMedicine: [res.data?.medicine || medData, ...state.allMedicine]
            }));
        } catch (error) {
            toast.error(error.response?.data?.message || "Error adding medicine");
        } finally {
            set({ isAddingMedicine: false });
        }
    }

}));
