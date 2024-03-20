import {FileUpload} from "primereact/fileupload";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Dropdown} from "primereact/dropdown";

function UploadPage() {
  return (
    <main>
      <span className='flex flex-col gap-6'>
        <FileUpload mode='basic'/>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Photo name</label>
          <InputText id="name" aria-describedby="username-help"/>
        </div>
        <Dropdown options={['Album 1']} optionLabel="album" placeholder="Select an album" className="w-full" />
        <Button label='Upload'/>
      </span>
    </main>
  );
}

export default UploadPage;
