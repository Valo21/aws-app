import {Card} from "primereact/card";
import { Skeleton } from "primereact/skeleton";
import {Button} from "primereact/button";
import {Divider} from "primereact/divider";
import {NavigateFunction, useNavigate} from "react-router-dom";

function Home() {

  const navigate: NavigateFunction= useNavigate();

  return (
    <main className='flex items-center'>
      <Card className='flex-1'>
        <div className='flex flex-col gap-6 md:flex-row'>
          <span className='flex flex-col gap-6 flex-1'>
            <Skeleton width="100%" height="20rem" borderRadius="10px"/>
          </span>
          <span className='flex flex-col gap-4 flex-1'>
            <Skeleton borderRadius="10px" width='9rem' height='2rem'/>
            <Skeleton borderRadius="10px" width='14rem' height='2rem'/>
            {
              (false) ?
                <>
                  <h2>
                    @Username
                  </h2>
                  <h2>
                    Valentin Faciano
                  </h2>
                </>
              : null
            }
          </span>
          <span className='flex flex-col gap-4 flex-1 md:justify-center'>
            <Button label='Edit profile' onClick={()=> navigate('/edit-profile')}></Button>
            <Button label='Sign out' severity='danger' ></Button>
          </span>
        </div>
        <Divider/>
        <div className='flex flex-col gap-6 md:flex-row'>
          <Button label='See photos' severity="secondary" onClick={()=> navigate('/photos')}></Button>
          <Button label='Upload photo' severity="secondary" onClick={()=> navigate('/upload')} ></Button>
          <Button label='Edit albums' severity="secondary" onClick={()=> navigate('/albums')}></Button>
        </div>
      </Card>
    </main>
  );
}

export default Home;
