import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const success=(msg)=>{
    toast.success(msg)
}
const loading=(msg)=>{
    toast.loading(msg)
}
const error=(msg)=>{
    toast.error(msg)
}


export const notify={
    success,
    loading,
    error
}
