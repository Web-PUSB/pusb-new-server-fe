import Swal from "sweetalert2";

const FailedMessageAlert = (message) => {
  return Swal.fire({
    title: "Error",
    text: message,
    icon: "error",
    timer: 3000,
    toast: true,
    position: "top-end",
    showConfirmButton: false,
  });
};

export default FailedMessageAlert;
