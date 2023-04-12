import { ToastPosition } from "react-toastify";

export const configToast = {
  position: "top-right" as ToastPosition, // Vị trí của thông báo (có thể chọn 'top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left')
  autoClose: 3000, // Thời gian tự động đóng thông báo (đơn vị: ms)
  hideProgressBar: false, // Ẩn thanh tiến độ
  closeOnClick: true, // Đóng thông báo khi click vào nó
  pauseOnHover: true, // Tạm dừng đóng thông báo khi di chuột qua
  draggable: true, // Cho phép kéo thông báo
};
