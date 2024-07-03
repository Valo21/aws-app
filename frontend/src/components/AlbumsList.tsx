import {Fieldset} from "primereact/fieldset";
import {Image} from "primereact/image";
import {Skeleton} from "primereact/skeleton";

interface AlbumsListProps {
  albums?: Album[]
}

function AlbumsList({ albums }: AlbumsListProps) {
  return (
    <div>
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
    </div>
  );
}

export default AlbumsList;
