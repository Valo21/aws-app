import {createContext, RefObject, useCallback, useRef} from "react";
import { Toast } from "primereact/toast";

export const ToastContext = createContext({
  ref: null,
});

export function useToast() {
  const toastRef: RefObject<Toast> = useRef<Toast>(null);

  const fetchServer = useCallback(async (
    input: RequestInfo | URL,
    init?: RequestInit | undefined,
    messageOrCustom?: string | ((toast: Toast) => void),
  ) => {
    const toast: Toast | null = toastRef.current;
    if (!toast) throw new Error('Cannot fetch because the toast ref is null');

    const res: Response = await fetch(input, init);

    const body = await res.json();

    if (!res.ok) {
      toast.show({
        severity: 'error',
        summary: 'Error',
        detail: body.message,
      });
      return;
    }

    if (!messageOrCustom) return;
    if (typeof messageOrCustom !== 'string') {
      messageOrCustom(toast);
      return;
    }

    toast.show({
      severity: 'success',
      summary: 'Success',
      detail: messageOrCustom,
    });
  }, []);

  return { toastRef, fetchServer };
}
