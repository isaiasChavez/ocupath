import { createContext } from "react";
import { Profile } from "./user.reducer";
export class InviteUserDTO {
  constructor({ email, type }) {
    this.email = email;
    this.type = type;
  }
  email: string;
  type: number;
}
export class ResetPassword {
  constructor({ email }) {
    this.email = email;
  }
  email: string;
}
export class ConfirmUserPassword {
  constructor({ email, password }) {
    this.email = email;
    this.password = password;
  }
  email: string;
  password: string;
}
export class PasswordRecovery {
  constructor({ email, password }) {
    this.email = email;
    this.password = password;
  }
  email: string;
  password: string;
}
export class CreateAdminDTO {
  constructor({
    name,
    lastname,
    email,
    password,
    startedAt,
    finishedAt,
    business,
    cost,
  }) {
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.startedAt = startedAt;
    this.finishedAt = finishedAt;
    this.business = business;
    this.cost = cost;
  }
  name: string;
  lastname: string;
  email: string;
  password: string;
  startedAt: string;
  finishedAt: string;
  cost: number;
  business: string;
}

export class CreateUserDTO {
  constructor({ adminUuid, name, lastname, email, password }) {
    this.adminUuid = adminUuid;
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
  }
  adminUuid: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
}

export class UpdateUserAdminDTO {
  constructor({
    adminUuid,
    name,
    lastname,
    avatar,
    startedAt,
    finishedAt,
    cost,
    business,
  }) {
    this.adminUuid = adminUuid;
    this.name = name;
    this.lastname = lastname;
    this.avatar = avatar;
    this.startedAt = startedAt;
    this.finishedAt = finishedAt;
    this.cost = cost;
    this.business = business;
  }
  adminUuid: string;
  name: string | null;
  lastname: string | null;
  avatar: string | null;
  startedAt: string | null;
  finishedAt: string | null;
  cost: number;
  business: string | null;
}

export class UpdateUserDTO {
  constructor({ userUuid, name, lastname, avatar }) {
    this.userUuid = userUuid;
    this.name = name;
    this.lastname = lastname;
    this.avatar = avatar;
  }
  userUuid: number;
  name: string;
  avatar: string;
  lastname: string;
}

export class DeleteAdminUserDTO {
  constructor({ adminUuid, status }) {
    this.adminUuid = adminUuid;
    this.status = status;
  }
  adminUuid: number;
  status: boolean;
}

export class DeleteUserDTO {
  constructor({ userUuid }) {
    this.userUuid = userUuid;
  }
  userUuid: number;
}
interface AppContextInterface {
  resetPass: Function;
  logUser: Function;
  confirmPass: Function;
  passRecover: Function;
  inviteUser: Function;
  addUserAdm: Function;
  deleteUserAdm: Function;
  updateUserAdm: Function;
  suspendUserAdm: Function;
  pauseUser: Function;
  addUser: Function;
  deleteUser: Function;
  updateUser: Function;
  profile: Profile;
  type: number;
}

const UserContext = createContext<AppContextInterface | null>(null);

export default UserContext;
