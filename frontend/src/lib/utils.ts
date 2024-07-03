import {Toast} from "primereact/toast";

type MessageOrCustom<B> = string | (
  (body: B, display: (
    (detail: string) => void
  )) => void
)

export async function fetchServer<B> (
  toast: Toast,
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
  messageOrCustom?: MessageOrCustom<B>,
): Promise<boolean> {
  if (!toast) throw new Error('Cannot fetch because the toast ref is null');

  const res: Response = await fetch(import.meta.env.VITE_BACKEND_URL.concat(input), init);

  const body = await res.json();

  if (!res.ok) {
    toast.show({
      severity: 'error',
      summary: 'Error',
      detail: body.message,
    });
    return false;
  }

  function displaySuccess(detail: string) {
    toast.show({
      severity: 'success',
      summary: 'Success',
      detail,
    });
  }

  if (!messageOrCustom) return true;
  if (typeof messageOrCustom !== 'string') {
    messageOrCustom(body, displaySuccess);
    return true;
  }

  displaySuccess(messageOrCustom);
  return true;
}
