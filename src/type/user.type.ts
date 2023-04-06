export interface IUser {
  email: string;
  password: string;
  role: string;
  id: number;
}

export interface IGetUserLT {
  accessToken: string;
  user: IUser;
}
