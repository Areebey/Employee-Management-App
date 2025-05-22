import { toast } from 'react-toastify';

export const notify = (message, type) => {
  const toastTypes = {
    success: toast.success,
    error: toast.error,
    info: toast.info,
    warning: toast.warn,
    warn: toast.warn,
  };

  if (toastTypes[type]) {
    toastTypes[type](message);
  } else {
    toast(message); // fallback to default
  }
};