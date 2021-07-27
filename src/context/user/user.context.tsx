import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from "class-validator";
import { createContext } from "react";
import { Config } from "../../config";
import { Childrens, Profile, User } from "./user.reducer";
export class ReuestSesionDTO {
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  password: string;
}

export class InviteUserDTO {
  constructor({ email, typeToInvite,company,name,invitations,cost,startedAt,finishedAt }) {
    console.log({startedAt,finishedAt})
    this.email = email;
    this.typeToInvite = typeToInvite  ;
    this.company = company
    this.invitations = parseInt(invitations)
    this.name = name
    this.cost = parseFloat(cost)
    this.startedAt = startedAt
    this.finishedAt = finishedAt
  }
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(250)
  company: string;
  @MaxLength(250)
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsNumber()
  invitations: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  cost: number;

  @IsDateString()
  @IsString()
  @IsNotEmpty()
  startedAt: string;

  @IsString()
  @IsDateString()
  @IsNotEmpty()
  finishedAt: string;

  @IsNumber()
  @IsNotEmpty()
  typeToInvite: number;




}
export class ResetPassword {
  constructor(email: string) {
    this.email = email;
  }
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
export class ConfirmUserPassword {
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(8)
  email: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  password: string;
}
export class PasswordRecovery {
  constructor(password: string, token: string) {
    this.token = token;
    this.password = password;
  }

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  password: string;
  @IsString()
  @IsNotEmpty()
  token: string;
}
export class CreateAdminDTO {
  constructor(
    name: string,
    lastname: string,
    email: string,
    password: string,
  ) {
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
  }
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @MaxLength(100)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  password: string;
}

export class CreateUserDTO {
  constructor(name: string, lastname: string, email: string, password: string) {
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
  }
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;
  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  lastname: string;
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @MaxLength(100)
  email: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  password: string;
}

export class UpdateUserAdminDTO {
  constructor(
    adminUuid: string,
    name: string,
    lastname: string,
    avatar: string,
    startedAt: string,
    finishedAt: string,
    cost: number,
    business: string
  ) {
    this.adminUuid = adminUuid;
    this.name = name;
    this.lastname = lastname;
    this.avatar = avatar ? avatar : Config.DEFAULT_AVATAR;
    this.startedAt = startedAt;
    this.finishedAt = finishedAt;
    this.cost = cost;
    this.business = business;
  }
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  adminUuid: string;
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name: string | null;

  @IsOptional()
  @MaxLength(100)
  @IsString()
  lastname: string | null;

  @IsOptional()
  @MaxLength(200)
  avatar: string | null;

  @IsOptional()
  @IsDateString()
  @IsString()
  startedAt: string | null;

  @IsOptional()
  @IsString()
  @IsDateString()
  finishedAt: string | null;

  @IsOptional()
  @IsNumber()
  cost: number;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  business: string | null;
}

export class UpdateUserDTO {
  constructor(
    userUuid: string,
    name: string,
    lastname: string,
    avatar: string
  ) {
    this.userUuid = userUuid;
    this.name = name;
    this.lastname = lastname;
    this.avatar = avatar;
  }
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  userUuid: string;
  @IsString()
  @MaxLength(100)
  name: string;
  @IsString()
  @MaxLength(150)
  avatar: string;
  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  lastname: string;
}

export class DeleteAdminUserDTO {
  constructor(adminUuid: string, status: boolean) {
    this.adminUuid = adminUuid;
    this.status = status;
  }
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  adminUuid: string;

  @IsOptional()
  @IsBoolean()
  status: boolean;
}

export class DeleteUserDTO {
  constructor(userUuid: string) {
    this.userUuid = userUuid;
  }
  @IsNotEmpty()
  @IsString()
  userUuid: string;
}
interface UserContextInterface {
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
  selectUser: Function;
  getUserDetail: Function;
  getUserChildrens:Function;
  profile: Profile;
  childrens:Childrens,
  selectedUser:User;
  type: number;
}

const UserContext = createContext<UserContextInterface | null>(null);

export default UserContext;
