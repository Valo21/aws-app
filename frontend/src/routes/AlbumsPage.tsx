import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import {FormEvent, useRef, useState} from "react";
import {Toast} from "primereact/toast";
import {useAppSelector} from "../hooks/redux.ts";
import {useGetUserAlbumsQuery} from "../store/api/photosApi.ts";
import {ProgressSpinner} from "primereact/progressspinner";

function AlbumsPage() {
  const toast = useRef<Toast>(null);
  const user = useAppSelector(state => state.auth.user);
  const [inputName, setInputName] = useState<string>();
  const [selectedAlbum, setSelectedAlbum] = useState<string>();
  const { data: albums } = useGetUserAlbumsQuery(user.id);

  if (!albums) {
    return (
      <ProgressSpinner></ProgressSpinner>
    )
  }

  let options = albums.map((album) => ({
    name: album.name,
    id: album.id
  }));

  async function handleCreate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await fetch(import.meta.env.VITE_BACKEND_URL.concat('/v1/albums/'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: form.get('name')
      }),
      credentials: 'include'
    });
    const body = await res.json();

    if (!res.ok){
      toast.current!.show({
        severity:'error',
        summary: 'Error',
        detail: body.message,
      });
      return;
    }

    toast.current!.show({
      severity:'success',
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

    // @ts-ignore
    const res = await fetch(import.meta.env.VITE_BACKEND_URL.concat('/v1/albums/', selectedAlbum.id), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: inputName,
      }),
      credentials: 'include'
    });

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

  async function handleDelete(){
    if (!selectedAlbum) {
      toast.current!.show({
        severity:'error',
        summary: 'Error',
        detail: 'Album not selected',
      });
      return;
    }

    // @ts-ignore
    const res = await fetch(import.meta.env.VITE_BACKEND_URL.concat('/v1/albums/', selectedAlbum.id), {
      method: 'DELETE',
      credentials: 'include'
    });
    const body = await res.json();
    if (!res.ok){
      toast.current!.show({
        severity:'error',
        summary: 'Error',
        detail: body.message,
      });
      return;
    }

    toast.current!.show({
      severity:'success',
      summary: 'Success',
      detail: 'Album deleted!',
    });
  }

  return (
    <main>
      <Toast ref={toast} />
      <form onSubmit={handleCreate}>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Album name</label>
          <InputText value={inputName} onChange={(e) => setInputName(e.currentTarget.value)} id="name" name='name' aria-describedby="username-help" required/>
        </div>
        <Button label='Add' type='submit'/>
        <Button label='Change' type='button' onClick={handleUpdate}/>
        <Button label='Delete album' type='button' onClick={handleDelete}/>
        <Dropdown value={selectedAlbum} onChange={(e) => setSelectedAlbum(e.value)} options={options} optionLabel="name" placeholder="Select an album" className="w-full" name='album'/>
      </form>
    </main>
  );
}

export default AlbumsPage;
