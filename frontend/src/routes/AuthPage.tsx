import {Button} from "primereact/button";
import {Card} from "primereact/card";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {FileUpload} from "primereact/fileupload";

function AuthPage() {
  return (
    <main>
      <Card title='Sign in' className='w-full' pt={{
        content: {className: 'flex flex-col gap-6'}
      }}>
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Username</label>
          <InputText id="username" aria-describedby="username-help" placeholder='johndoe@gmail.com' autoComplete='off'/>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <Password id="password" aria-describedby="username-help" placeholder='saquenmedelatam' toggleMask/>
        </div>
        <Button type='submit' label='Sign in'/>
      </Card>

      <Card title='Sign up' className='w-full' pt={{
        content: {className: 'flex flex-col gap-6'}
      }}>
        <span className='self-center'>
          <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" customUpload/>
        </span>
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Username</label>
          <InputText id="username" aria-describedby="username-help" placeholder='johndoe@gmail.com' autoComplete='off' required/>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Full Name</label>
          <InputText id="username" aria-describedby="username-help" placeholder='John Doe' autoComplete='off' required/>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <Password id="password" aria-describedby="username-help" placeholder='saquenmedelatam' toggleMask required/>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="rpassword">Confirm password</label>
          <Password id="rpassword" aria-describedby="username-help" placeholder='saquenmedelatam' toggleMask required/>
        </div>
        <Button type='submit' label='Sign up'/>
      </Card>
    </main>
  );
}

export default AuthPage;
