import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// success notification
export const handleSuccess = (msg) => {
  toast.success(msg, { position: "top-right" });
};

// error notification
export const handleError = (msg) => {
  toast.error(msg, { position: "top-right" });
};



