import {Skeleton} from "primereact/skeleton";
import {Button} from "primereact/button";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {Fieldset} from "primereact/fieldset";

function Photos() {
  const navigate: NavigateFunction = useNavigate();
  return (
    <main className='flex md:flex-row gap-6'>
      <span className='flex flex-col gap-6 min-w-72'>
        <Skeleton width="100%" height="20rem" borderRadius="10px"/>
        <Button label='Upload photo' severity="secondary" onClick={()=> navigate('/upload')} ></Button>
        <Button label='Edit albums' severity="secondary" onClick={()=> navigate('/albums')}></Button>
      </span>
      <span className='flex-1 flex flex-col gap-4'>
        <Fieldset legend="Profile photos">
          <span className='grid grid-cols-4 gap-3'>
            {
              Array.from({length: 4}, () => <Skeleton width="100%" height="15rem" borderRadius="10px"/>)
            }
          </span>
        </Fieldset>
        {
          Array.from({length: 2}, () =>
            <Fieldset legend={
              <Skeleton width="6rem" height="1rem" borderRadius="10px"/>
            }>
              <span className='grid grid-cols-4 gap-3'>
                {
                  Array.from({length: 4}, () =>
                    <Skeleton width="100%" height="15rem" borderRadius="10px"/>
                  )
                }
              </span>
            </Fieldset>
          )
        }
      </span>
    </main>
  );
}

export default Photos;
