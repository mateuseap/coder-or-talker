import type { Sizes } from "../types";
import { ToastPosition, toast } from "react-toastify";

export const classNames = (...classes: any[]): string =>
  classes.filter(Boolean).join(" ");

export function chooseIconSize(size: Sizes | string): string {
  switch (size) {
    case "xs":
      return "h-4 w-4";
    case "sm":
      return "h-6 w-6";
    case "md":
      return "h-8 w-8";
    case "lg":
      return "h-10 w-10";
    case "xl":
      return "h-12 w-12";
    case "2xl":
      return "h-16 w-16";
    case "3xl":
      return "h-20 w-20";
    case "4xl":
      return "h-24 w-24";
    case "5xl":
      return "h-28 w-28";
    case "6xl":
      return "h-44 w-44";
    case "7xl":
      return "h-60 w-60";
    case "8xl":
      return "h-72 w-72";
    case "9xl":
      return "h-80 w-80";
    case "10xl":
      return "h-96 w-96";
    default:
      return size;
  }
}

export const showSuccessToast = (
  message: string,
  autoclose?: number,
  position?: ToastPosition
) => {
  toast.success(message, {
    position: `${position ? position : "bottom-center"}`,
    autoClose: autoclose || false,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export const showErrorToast = (
  message: string,
  autoclose?: number,
  position?: ToastPosition
) => {
  toast.error(message, {
    position: `${position ? position : "bottom-center"}`,
    autoClose: autoclose || false,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export const showInfoToast = (
  message: string,
  autoclose?: number,
  position?: ToastPosition
) => {
  toast.info(message, {
    position: `${position ? position : "bottom-center"}`,
    autoClose: autoclose || false,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export const showWarningToast = (
  message: string,
  autoclose?: number,
  position?: ToastPosition
) => {
  toast.warning(message, {
    position: `${position ? position : "bottom-center"}`,
    autoClose: autoclose || false,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export function formatImageUrl(imageUrl: string) {
  if (imageUrl.startsWith("data:image")) {
    return imageUrl;
  }
  if (imageUrl.includes("jpeg")) {
    return `data:image/jpeg;base64,${imageUrl}`;
  }
  if (imageUrl.includes("jpg")) {
    return `data:image/jpg;base64,${imageUrl}`;
  }
  if (imageUrl.includes("gif")) {
    return `data:image/gif;base64,${imageUrl}`;
  }

  return `data:image/jpeg;base64,${imageUrl}`;
}
