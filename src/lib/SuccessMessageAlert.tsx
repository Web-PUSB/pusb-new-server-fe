import Swal from "sweetalert2";

const SuccessMessageAlert = (isUpdate: boolean) => {
  Swal.fire({
    title: "Success",
    text: `Data ${isUpdate ? "updated" : "created"} successfully`,
    icon: "success",
    timer: 3000,
    toast: true,
    position: "top-end",
    showConfirmButton: false,
  });
};

export default SuccessMessageAlert;
