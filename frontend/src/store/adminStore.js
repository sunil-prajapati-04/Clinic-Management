import {create} from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios.js';


export const useAdminStore = create((set,get)=>({
    isAddingEmp:false,

    addEmp : async(data)=>{
        try {
            set({isAddingEmp:true})
            const response = await axiosInstance.post("admin/add",data);
            toast.success(response.data?.message || "Employee added successfully")
        } catch (error) {
            console.log("error in addEmp Store:",error);
            toast.error(error.response?.data?.message || "Error adding employee");
        }finally{
            set({isAddingEmp:false})
        }
    }

}))
