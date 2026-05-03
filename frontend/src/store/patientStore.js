import { create } from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios.js';

export const usePatientStore = create((set, get) => ({

    allPatient: [],
    isAddingPat: false,
    isUpdatingPat: false,
    isSearchingPat: false,
    isDelPat: false,
    patientProfile: null,

    
    fetchAllPatients: async () => {
        try {
            const res = await axiosInstance.get('/patient/get');
            set({ allPatient: res.data });
        } catch (error) {
            toast.error(error.message || "Error fetching patients");
        }
    },

    addPat: async (patData) => {
        try {
            set({ isAddingPat: true });
            const res = await axiosInstance.post('/patient/add', patData);

            toast.success(res.data?.message || 'Patient added successfully');

            const savedPatient = res.data?.patient;
            if (savedPatient) {
                set((state) => {
                    const exists = state.allPatient.some((pat) => pat._id === savedPatient._id);

                    return {
                        allPatient: exists
                            ? state.allPatient.map((pat) =>
                                pat._id === savedPatient._id ? savedPatient : pat
                            )
                            : [savedPatient, ...state.allPatient],
                        patientProfile:
                            state.patientProfile?._id === savedPatient._id
                                ? savedPatient
                                : state.patientProfile
                    };
                });
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Error adding patient");
        } finally {
            set({ isAddingPat: false });
        }
    },

    searchPat: async (phone) => {
        try {
            set({ isSearchingPat: true });

            const res = await axiosInstance.get('/patient/search', {
                params: { phone }
            });

            set({ patientProfile: res.data });

            toast.success(res.data?.message || "Patient fetched successfully");

        } catch (error) {
            set({ patientProfile: null });
            toast.error(error.response?.data?.message || "Error searching patient");
        } finally {
            set({ isSearchingPat: false });
        }
    },

    updatePatient: async (patId, updatedPatData) => {
        try {
            set({ isUpdatingPat: true });

            const res = await axiosInstance.put(
                `/patient/updatePatient/${patId}`,
                updatedPatData
            );

            toast.success(res.data?.message || "Patient updated successfully");

            set((state) => ({
                allPatient: state.allPatient.map((pat) =>
                    pat._id === patId ? res.data : pat
                ),
                patientProfile: state.patientProfile?._id === patId ? res.data : state.patientProfile
            }));

        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating patient");
        } finally {
            set({ isUpdatingPat: false });
        }
    },

    updatePatientCase: async (patientId, caseId, caseData) => {
        try {
            set({ isUpdatingPat: true });

            const res = await axiosInstance.put(
                `/patient/updateCase/${patientId}/${caseId}`,
                caseData
            );

            toast.success(res.data?.message || "Case updated successfully");

            set((state) => ({
                allPatient: state.allPatient.map((pat) =>
                    pat._id === patientId ? res.data : pat
                ),
                patientProfile: state.patientProfile?._id === patientId ? res.data : state.patientProfile
            }));
        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating case");
        } finally {
            set({ isUpdatingPat: false });
        }
    },

    delPatient: async (patId) => {
        try {
            set({ isDelPat: true });

            const res = await axiosInstance.post(`/patient/delete/${patId}`);

            toast.success(res.data?.message || "Patient deleted successfully");

            set((state) => ({
                allPatient: state.allPatient.filter((pat) => pat._id !== patId),
                patientProfile: state.patientProfile?._id === patId ? null : state.patientProfile
            }));

        } catch (error) {
            toast.error(error.response?.data?.message || "Error deleting patient");
        } finally {
            set({ isDelPat: false });
        }
    },

    delPatientCase: async (patientId, caseId) => {
        try {
            set({ isDelPat: true });

            const res = await axiosInstance.post(`/patient/deleteCase/${patientId}/${caseId}`);

            toast.success(res.data?.message || "Case deleted successfully");

            set((state) => ({
                allPatient: state.allPatient.map((pat) =>
                    pat._id === patientId ? res.data : pat
                ),
                patientProfile: state.patientProfile?._id === patientId ? res.data : state.patientProfile
            }));
        } catch (error) {
            toast.error(error.response?.data?.message || "Error deleting case");
        } finally {
            set({ isDelPat: false });
        }
    }

}));
