interface User {
  id: string;
  username: string;
  fullName: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ProfilePhoto {
  id: string;
  name: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Image extends ProfilePhoto {
  name: string;
}

interface Album {
  id: string;
  name: string;
  images: Image[];
  createdAt: Date;
  updatedAt: Date;
}
