export type LoginDTO = {
  email: string;
  password: string;
};

//Nueva invitación
export type NewUserDTO = {
  company: string;
  name:string,
  email: string;
  invitations: number;
  cost: number;
  startedAt: string|Date;
  finishedAt: string|Date;
  typeToInvite: number;
};
export type NewUserErrors = {
  company: string|null;
  name:string|null,
  email: string|null;
  invitations: string|null;
  cost: string|null;
  startedAt: string|null;
  finishedAt: string|null;
};

export const USER_ACTIVE = true
export const USER_INACTIVE = false


