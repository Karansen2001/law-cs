import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoadingToaster = ({ isLoading, message }) => {
  React.useEffect(() => {
    if (isLoading) {
      toast.loading(message, {
        position: "top-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        closeButton: false,
      });
    } else {
      toast.dismiss();
    }
  }, [isLoading, message]);

  return null;
};

export default LoadingToaster;
