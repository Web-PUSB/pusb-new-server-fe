import Swal from "sweetalert2";

const SelectDateAlert = ({
  formattedDate,
  eventDetailsList,
}: {
  formattedDate: string;
  eventDetailsList?: string[];
}) => {
  const htmlContent =
    eventDetailsList && eventDetailsList.length > 0
      ? `<ul style="text-align: left; font-size: 20px;">${eventDetailsList.join("")}</ul>`
      : "No events on this day.";

  return Swal.fire({
    title: `<p style="font-size: 20px; font-weight: bold;">On ${formattedDate}</p>`,
    html: htmlContent,
    showClass: {
      popup: `
        animate__animated
        animate__fadeInUp
        animate__faster
      `,
    },
    hideClass: {
      popup: `
        animate__animated
        animate__fadeOutDown
        animate__faster
      `,
    },
  });
};

export default SelectDateAlert;
