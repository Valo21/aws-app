import { FileUpload } from 'primereact/fileupload';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { FormEvent, useRef, useState } from 'react';
import {useGetUserAlbumsQuery, useUploadAlbumPhotoMutation} from '../store/api/photosApi.ts';
import { useAppSelector } from '../hooks/redux.ts';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';

function UploadPage() {
  const toast = useRef<Toast>(null);
  const user = useAppSelector((state) => state.auth.user)!;
  const { data: albums } = useGetUserAlbumsQuery(user.id);
  const [selectedAlbum, setSelectedAlbum] =
    useState<Pick<Album, 'id' | 'name'>>();
  const [selectedPhoto, setSelectedPhoto] = useState<File>();
  const [uploadPhoto] = useUploadAlbumPhotoMutation();

  if (!albums) {
    return <ProgressSpinner></ProgressSpinner>;
  }

  let options = albums.map((album: Album) => ({
    name: album.name,
    id: album.name,
  }));

  if (albums.length === 0) {
    options = [
      {
        name: 'Album 1',
        id: 'A1',
      },
    ];
  }
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form: FormData = new FormData(e.currentTarget);

    const buffer: ArrayBuffer = await selectedPhoto!.arrayBuffer();
    const blob: Blob = new Blob([buffer], {
      type: selectedPhoto!.type,
    });
    form.append('image', blob, selectedPhoto!.name);
    if (!selectedAlbum) {
      toast.current!.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Album not selected',
      });
      return;
    }
    form.set('album', selectedAlbum.name);

    const res = await uploadPhoto(form);

    if ('error' in res && 'message' in res.error) {
      toast.current!.show({
        severity: 'error',
        summary: 'Error',
        detail: res.error.message,
      });
      return;
    }

    toast.current!.show({
      severity: 'success',
      summary: 'Success',
      detail: 'Image uploaded!',
    });
    return;
  }

  return (
    <main className="flex items-center justify-center">
      <Toast ref={toast} />
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <FileUpload
          mode="basic"
          onSelect={(e) => setSelectedPhoto(e.files[0])}
        />
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Photo name</label>
          <InputText
            id="name"
            aria-describedby="username-help"
            name="name"
            placeholder="My Photo"
            required
          />
        </div>
        <Dropdown
          value={selectedAlbum}
          onChange={(e) => setSelectedAlbum(e.value)}
          options={options}
          optionLabel="name"
          placeholder="Select an album"
          className="w-full"
          name="album"
        />
        <Button label="Upload" />
      </form>
    </main>
  );
}

export default UploadPage;
