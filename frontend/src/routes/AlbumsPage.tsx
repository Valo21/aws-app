import {FileUpload} from "primereact/fileupload";
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";

function AlbumsPage() {
  return (
    <main>
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Album name</label>
        <InputText id="name" aria-describedby="username-help"/>
      </div>
      <Button label='Add'/>
      <Button label='Change'/>
      <Button label='Delete album'/>
      <Dropdown options={['Album 1']} optionLabel="album" placeholder="Select an album" className="w-full" />
    </main>
  );
}

export default AlbumsPage;
