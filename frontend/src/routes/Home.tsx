import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux.ts';
import { Image } from 'primereact/image';
import {FormEvent, RefObject, useRef, useState} from 'react';
import { InputText } from 'primereact/inputtext';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { Password } from 'primereact/password';

function Home() {
  const toast: RefObject<Toast> = useRef<Toast>(null);
  const navigate: NavigateFunction = useNavigate();
  const user: User = useAppSelector((state) => state.auth.user)!;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<File>();

  async function handleSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form: FormData = new FormData(e.currentTarget);

    if (selectedPhoto) {
      const buffer = await selectedPhoto.arrayBuffer();
      const blob: Blob = new Blob([buffer], {
        type: selectedPhoto.type,
      });
      form.append('image', blob, selectedPhoto.name);
    }

    const res = await fetch(
      import.meta.env.VITE_BACKEND_URL.concat('/v1/users/', user.id),
      {
        method: 'PATCH',
        body: form,
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
      detail: 'User profile updated',
    });
    return;
  }

  async function handleSignOut() {
    sessionStorage.removeItem('accessToken');

    toast.current!.show({
      severity: 'success',
      summary: 'Success',
      detail: 'Signed out!',
    });
    location.href = '/';
    return;
  }

  return (
    <main className="flex items-center">
      <Toast ref={toast} />
      <Card className="flex-1">
        <div className="flex flex-col gap-6 md:flex-row">
          <span className="flex flex-1 justify-center">
            <Image
              src={
                isEditing
                  ? selectedPhoto
                    ? URL.createObjectURL(selectedPhoto)
                    : user.image
                  : user.image
              }
              width="400px"
              height="400px"
              className="max-w-96"
              alt="Profile picture"
            />
          </span>
          {isEditing ? (
            <form onSubmit={handleSave} className="flex flex-col gap-4 flex-1">
              <span className="self-center flex">
                <FileUpload
                  mode="basic"
                  name="demo[]"
                  url="/api/upload"
                  accept="image/*"
                  customUpload
                  chooseLabel="New photo"
                  onSelect={(e) => setSelectedPhoto(e.files[0])}
                />
              </span>
              <div className="flex flex-col gap-2">
                <label htmlFor="r-username">Username</label>
                <InputText
                  id="r-username"
                  name="username"
                  aria-describedby="username-help"
                  defaultValue={user.username}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="fullName">Full Name</label>
                <InputText
                  id="fullName"
                  name="fullName"
                  aria-describedby="name-help"
                  defaultValue={user.fullName}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password">Confirm password</label>
                <Password
                  id="password"
                  name="password"
                  aria-describedby="password-help"
                  autoComplete="off"
                  required
                />
              </div>
              <Button label="Save" type="submit"/>
              <Button
                label="Cancel"
                type="button"
                severity="danger"
                onClick={() => setIsEditing(false)}
              />
            </form>
          ) : (
            <>
              <span className="flex flex-col gap-4 flex-1">
                <h2>@{user.username}</h2>
                <h2>{user.fullName}</h2>
              </span>
              <span className="flex flex-col gap-4 flex-1 md:justify-center">
                <Button
                  label="Edit profile"
                  onClick={() => setIsEditing(true)}
                />
                <Button
                  label="Sign out"
                  severity="danger"
                  onClick={handleSignOut}
                />
              </span>
            </>
          )}
        </div>
        <Divider />
        <div className="flex flex-col gap-6 md:flex-row">
          <Button
            label="See photos"
            severity="secondary"
            onClick={() => navigate('/photos')}
          />
          <Button
            label="Upload photo"
            severity="secondary"
            onClick={() => navigate('/upload')}
          />
          <Button
            label="Edit albums"
            severity="secondary"
            onClick={() => navigate('/albums')}
          />
        </div>
      </Card>
    </main>
  );
}

export default Home;
