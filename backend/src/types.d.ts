declare namespace Express {
  export interface Request {
    user: {
      id: string;
      username: string;
      fullName: string;
      image: string;
    };
    session: {
      accessToken: string | null;
    };
  }
}
