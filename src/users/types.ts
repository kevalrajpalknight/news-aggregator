export enum UserRoles {
  normal = 0,
  admin = 1,
}

export type UserInterface = {
  fullName: string;
  email: string;
  role: UserRoles;
  password: string;
  created: string;
};
