import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { FormEvent, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { useAppSelector } from '../hooks/redux.ts';
import { useGetUserAlbumsQuery } from '../store/api/photosApi.ts';
import { ProgressSpinner } from 'primereact/progressspinner';

function AlbumsPage() {
  const toast = useRef<Toast>(null);
  const user = useAppSelector((state) => state.auth.user);
  const [inputName, setInputName] = useState<string>();
  const [selectedAlbum, setSelectedAlbum] =
    useState<Pick<Album, 'id' | 'name'>>();
  const { data: albums } = useGetUserAlbumsQuery(user!.id);

  if (!albums) {
    return <ProgressSpinner></ProgressSpinner>;
  }

  const options: Pick<Album, 'id' | 'name'>[] = albums.map((album) => ({
    name: album.name,
    id: album.id,
  }));

  async function handleCreate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await fetch(
      import.meta.env.VITE_BACKEND_URL.concat('/v1/albums/'),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken') ?? ''
        },
        body: JSON.stringify({
          name: form.get('name'),
        }),
      },
    );
    const body = await res.json();

    if (!res.ok) {
      toast.current!.show({
        severity: 'error',
        summary: 'Error',
        detail: body.message,
      });
      return;
    }

    toast.current!.show({
      severity: 'success',
      summary: 'Success',
      detail: 'Album created!',
    });
  }
  async function handleUpdate() {
    if (!selectedAlbum) {
      toast.current!.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Album not selected',
      });
      return;
    }

    const res = await fetch(
      import.meta.env.VITE_BACKEND_URL.concat('/v1/albums/', selectedAlbum.id),
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken') ?? ''
        },
        body: JSON.stringify({
          name: inputName,
        }),
      },
    );

    const body = await res.json();
    if (!res.ok) {
      toast.current!.show({
        severity: 'error',
        summary: 'Error',
        detail: body.message,
      });
      return;
    }

    toast.current!.show({
      severity: 'success',
      summary: 'Success',
      detail: 'Album name updated!',
    });
  }

  async function handleDelete() {
    if (!selectedAlbum) {
      toast.current!.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Album not selected',
      });
      return;
    }

    const res = await fetch(
      import.meta.env.VITE_BACKEND_URL.concat('/v1/albums/', selectedAlbum.id),
      {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken') ?? ''
        },
      },
    );
    const body = await res.json();
    if (!res.ok) {
      toast.current!.show({
        severity: 'error',
        summary: 'Error',
        detail: body.message,
      });
      return;
    }

    toast.current!.show({
      severity: 'success',
      summary: 'Success',
      detail: 'Album deleted!',
    });
  }

  return (
    <main className="flex justify-center items-center">
      <Toast ref={toast} />
      <form onSubmit={handleCreate} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Album name</label>
          <InputText
            value={inputName}
            onChange={(e) => setInputName(e.currentTarget.value)}
            id="name"
            name="name"
            aria-describedby="username-help"
            required
            autoComplete="off"
          />
        </div>
        <span className="flex flex-col gap-2 md:flex-row md:min-w-[500px]">
          <Button label="Add" type="submit" />
          <Button label="Change" type="button" onClick={handleUpdate} />
          <Button
            label="Delete album"
            type="button"
            severity="danger"
            onClick={handleDelete}
          />
        </span>
        <Dropdown
          value={selectedAlbum}
          onChange={(e) => setSelectedAlbum(e.value)}
          options={options}
          optionLabel="name"
          placeholder="Select an album"
          className="w-full"
          name="album"
        />
      </form>
    </main>
  );
}

export default AlbumsPage;
