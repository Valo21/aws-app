import { Skeleton } from 'primereact/skeleton';
import { Button } from 'primereact/button';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Fieldset } from 'primereact/fieldset';
import { Image } from 'primereact/image';
import { useAppSelector } from '../hooks/redux.ts';
import {
  useGetUserAlbumsQuery,
  useGetUserProfilePhotosQuery,
} from '../store/api/photosApi.ts';

function Photos() {
  const navigate: NavigateFunction = useNavigate();
  const user = useAppSelector((state) => state.auth.user)!;
  const { data: albums } = useGetUserAlbumsQuery(user.id);
  const { data: profilePhotos } = useGetUserProfilePhotosQuery(user.id);

  return (
    <main className="flex flex-col xl:flex-row gap-6">
      <span className="flex flex-col gap-6 min-w-72 items-center">
        <Image
          src={user.image}
          width="100%"
          height="100%"
          className="max-w-96"
          alt="Profile picture"
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
      </span>
      <span className="flex-1 flex flex-col gap-4">
        <Fieldset legend="Profile photos">
          <span className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {profilePhotos
              ? profilePhotos.map((img: ProfilePhoto) => (
                  <Image
                    key={img.id}
                    src={img.url}
                    imageClassName="shadow-md border-2 rounded-md"
                    width="100%"
                    height="100%"
                    className="max-w-96"
                    alt="Profile picture"
                  />
                ))
              : Array.from({ length: 3 }, (_, i) => (
                  <Skeleton key={i} width="100%" height="18rem" borderRadius="10px" />
                ))}
          </span>
        </Fieldset>
        {albums
          ? albums.map((album) => (
              <Fieldset key={album.id} legend={album.name}>
                <span className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {album.images.map((img) => (
                    <Image
                      key={img.id}
                      src={img.url}
                      imageClassName="shadow-md border-2 rounded-md"
                      width="100%"
                      height="100%"
                      className="max-w-96"
                      alt="Profile picture"
                    />
                  ))}
                </span>
              </Fieldset>
            ))
          : Array.from({ length: 2 }, (_, i) => (
              <Fieldset key={i}
                legend={
                  <Skeleton width="6rem" height="1rem" borderRadius="10px" />
                }
              >
                <span className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {Array.from({ length: 3 }, (_, i) => (
                    <Skeleton key={i} width="100%" height="15rem" borderRadius="10px" />
                  ))}
                </span>
              </Fieldset>
            ))}
      </span>
    </main>
  );
}

export default Photos;
