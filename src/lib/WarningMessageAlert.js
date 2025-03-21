import Swal from "sweetalert2";

const WarningMessageAlert = (message) => {
  return Swal.fire({
    title: "Warning",
    text: message,
    icon: "warning",
    timer: 3000,
    toast: true,
    position: "top-end",
    showConfirmButton: false,
  });
};

export default WarningMessageAlert;
