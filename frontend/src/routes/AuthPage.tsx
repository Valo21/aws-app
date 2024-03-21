import {Button} from "primereact/button";
import {Card} from "primereact/card";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {FileUpload} from "primereact/fileupload";
import {FormEvent, useRef, useState} from "react";
import {Toast} from "primereact/toast";

function AuthPage() {
  const toast = useRef<Toast>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<File>();

  async function handleSignIn(e: FormEvent<HTMLFormElement>){
    e.preventDefault();

    const form: FormData = new FormData(e.currentTarget);

    const res = await fetch(
      import.meta.env.VITE_BACKEND_URL.concat('/v1/auth/signin'),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: form.get('username'),
          password: form.get('password')
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
      detail: 'Signed in!',
    });
    location.href = '/';
    return;
  }

  async function handleSignUp(e: FormEvent<HTMLFormElement>){
    e.preventDefault();

    const form: FormData = new FormData(e.currentTarget);

    if (form.get('password') !== form.get('rpassword')) {
      toast.current!.show({
        severity:'error',
        summary: 'Error',
        detail: 'Passwords are not the same!',
      });
      return
    }
    form.delete('rpassword');
    if (!selectedPhoto) {
      toast.current!.show({
        severity:'error',
        summary: 'Error',
        detail: 'You need to provide a photo',
      });
    }
    const buffer = await selectedPhoto!.arrayBuffer();
    const blob: Blob = new Blob([buffer], {
      type: selectedPhoto!.type
    })
    form.append('image', blob, selectedPhoto!.name);

    const res = await fetch(
      import.meta.env.VITE_BACKEND_URL.concat('/v1/auth/signup'),
      {
        method: 'POST',
        body: form
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
      detail: 'Signed up!',
    });
    return;
  }

  return (
    <main>
      <Toast ref={toast} />
      <Card title='Sign in' className='w-full'>
        <form className='flex flex-col gap-6' onSubmit={handleSignIn}>
          <div className="flex flex-col gap-2">
            <label htmlFor="l-username">Username</label>
            <InputText id="l-username" name='username' aria-describedby="username-help" placeholder='johndoe' autoComplete='off' required/>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <Password id="password" name='password' aria-describedby="password-help" placeholder='saquenmedelatam' toggleMask required/>
          </div>
          <Button type='submit' label='Sign in'/>
        </form>
      </Card>

      <Card title='Sign up' className='w-full'>
        <form className='flex flex-col gap-6' onSubmit={handleSignUp}>
          <span className='self-center'>
            <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" customUpload onSelect={(e) => setSelectedPhoto(e.files[0])}/>
          </span>
            <div className="flex flex-col gap-2">
              <label htmlFor="r-username">Username</label>
              <InputText id="r-username" name='username' aria-describedby="username-help" placeholder='johndoe' autoComplete='off' required/>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Full Name</label>
              <InputText id="name" name='fullName' aria-describedby="name-help" placeholder='John Doe' autoComplete='off' required/>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <Password id="password" name='password' aria-describedby="password-help" placeholder='saquenmedelatam' toggleMask required/>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="rpassword">Confirm password</label>
              <Password id="rpassword" name='rpassword' aria-describedby="repeat-password-help" placeholder='saquenmedelatam' toggleMask required/>
            </div>
            <Button type='submit' label='Sign up'/>
        </form>
      </Card>
    </main>
);
}

export default AuthPage;
