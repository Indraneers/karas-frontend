import { toast } from "sonner";

export function toastError(text: string, description = '') {
  toast.error(text, {
    description
  });
}