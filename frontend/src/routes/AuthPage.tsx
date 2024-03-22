import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { FileUpload } from 'primereact/fileupload';
import { FormEvent, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { motion } from 'framer-motion';
import { Image } from 'primereact/image';

const MotionCard = motion(Card);

function AuthPage() {
  const toast = useRef<Toast>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<File>();
  const [isRegisterVisible, setIsRegisterVisible] = useState<boolean>(false);

  const variants = {
    visible: {
      opacity: 1,
      visibility: 'visible',
      transform: 'translateX(0px)',
    },
    hidden: {
      opacity: 0,
      visibility: 'hidden',
      transform: 'translateX(200px)',
    },
  };
  async function handleSignIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form: FormData = new FormData(e.currentTarget);

    const res = await fetch(
      import.meta.env.VITE_BACKEND_URL.concat('/v1/auth/signin'),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken') ?? ''
        },
        body: JSON.stringify({
          username: form.get('username'),
          password: form.get('password'),
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

    sessionStorage.setItem('accessToken', body.accessToken);

    toast.current!.show({
      severity: 'success',
      summary: 'Success',
      detail: 'Signed in!',
    });
    location.href = '/';
    return;
  }

  async function handleSignUp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form: FormData = new FormData(e.currentTarget);

    if (form.get('password') !== form.get('rpassword')) {
      toast.current!.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Passwords are not the same!',
      });
      return;
    }
    form.delete('rpassword');
    if (!selectedPhoto) {
      toast.current!.show({
        severity: 'error',
        summary: 'Error',
        detail: 'You need to provide a photo',
      });
    }
    const buffer = await selectedPhoto!.arrayBuffer();
    const blob: Blob = new Blob([buffer], {
      type: selectedPhoto!.type,
    });
    form.append('image', blob, selectedPhoto!.name);

    const res = await fetch(
      import.meta.env.VITE_BACKEND_URL.concat('/v1/auth/signup'),
      {
        method: 'POST',
        body: form,
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
      detail: 'Signed up!',
    });
    return;
  }

  return (
    <main className="max-w-md flex flex-col justify-center items-center relative">
      <Toast ref={toast} />
      <MotionCard
        title="Sign in"
        className="absolute w-full"
        pt={{
          title: {
            className: 'text-center',
          },
        }}
        initial="hidden"
        animate={!isRegisterVisible ? 'visible' : 'hidden'}
        // TODO: FIX THIS
        // @ts-expect-error it works anyways
        variants={variants}
      >
        <form className="flex flex-col gap-2" onSubmit={handleSignIn}>
          <span className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="l-username">Username</label>
              <InputText
                id="l-username"
                name="username"
                aria-describedby="username-help"
                placeholder="johndoe"
                autoComplete="off"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <Password
                feedback={false}
                id="password"
                name="password"
                aria-describedby="password-help"
                placeholder="saquenmedelatam"
                toggleMask
                required
              />
            </div>
          </span>
          <p>
            Dont have an account?{' '}
            <strong
              className="cursor-pointer"
              onClick={() => setIsRegisterVisible(true)}
            >
              Sign up
            </strong>
          </p>
          <Button type="submit" label="Sign in" />
        </form>
      </MotionCard>
      <MotionCard
        title="Sign up"
        className="absolute w-full"
        pt={{
          title: {
            className: 'text-center',
          },
        }}
        initial="hidden"
        animate={isRegisterVisible ? 'visible' : 'hidden'}
        // TODO: FIX THIS
        // @ts-expect-error it works anyways
        variants={variants}
      >
        <form className="flex flex-col gap-6" onSubmit={handleSignUp}>
          <span className="self-center flex flex-col items-center">
            <Image
              src={
                selectedPhoto
                  ? URL.createObjectURL(selectedPhoto)
                  : '/default-profile-photo.jpg'
              }
              width="200px"
              height="200px"
              className="max-w-96"
              alt="Profile picture"
            />
            <FileUpload
              mode="basic"
              chooseLabel="Profile photo"
              url="/api/upload"
              accept="image/*"
              onSelect={(e) => setSelectedPhoto(e.files[0])}
            />
          </span>
          <div className="flex flex-col gap-2">
            <label htmlFor="r-username">Username</label>
            <InputText
              id="r-username"
              name="username"
              aria-describedby="username-help"
              placeholder="johndoe"
              autoComplete="off"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Full Name</label>
            <InputText
              id="name"
              name="fullName"
              aria-describedby="name-help"
              placeholder="John Doe"
              autoComplete="off"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <Password
              feedback={false}
              id="password"
              name="password"
              aria-describedby="password-help"
              placeholder="saquenmedelatam"
              toggleMask
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="rpassword">Confirm password</label>
            <Password
              feedback={false}
              id="rpassword"
              name="rpassword"
              aria-describedby="repeat-password-help"
              placeholder="saquenmedelatam"
              toggleMask
              required
            />
          </div>
          <p>
            Already have an account?
            <strong
              className="cursor-pointer"
              onClick={() => setIsRegisterVisible(false)}
            >
              Sign in
            </strong>
          </p>
          <Button type="submit" label="Sign up" />
        </form>
      </MotionCard>
    </main>
  );
}

export default AuthPage;
