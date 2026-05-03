import {create} from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios.js';

export const useAuthStore = create((set,get)=>({
    authUser:null,
    isSigningIn:false,
    isCheckingAuth:true,

    checkAuth:async()=>{
        try {
            set({isCheckingAuth:true})
            const res = await axiosInstance.get("auth/profile");
            set({authUser:res.data});
        } catch (error) {
            console.log("error in check Auth",error);
            set({authUser:null})
        } finally{
            set({isCheckingAuth:false})
        }
    },
    
    login:async(data)=>{
        try {
            set({isSigningIn:true});
            await axiosInstance.post("auth/login",data);
            await get().checkAuth();
            toast.success("Login successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        }finally{
            set({isSigningIn:false});
        }
    },

    logout:async()=>{
        try {
            await axiosInstance.post("auth/logout");
            toast.success("logout successfully");
            set({authUser:null})
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed");
        }
    }
}))
