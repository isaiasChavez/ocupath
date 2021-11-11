export type StatusFile = {
  code: string,
  message:string
}




interface ConstantsValues {
  MB: number
}


export class Config {
  constructor () {
    Config.constants = {
      MB: 1e+6
    }
  }

  static constants: ConstantsValues

  static TOKEN_NAME_INTERN = "ocupath_u";
  static TOKEN_NAME_HEADER = "x-auth-token";
  static JWT_SIGN = "ocupath";
  static MAX_IMAGE_SIZE: number = 1e+6 * 2;
  static MAX_IMAGE360_SIZE: number = 1e+6 *5;
  static MB_IN_BITS = 1048576
  static WIDTH_THUMBNAIL = 210
  static HEIGTH_THUMBNAIL = 118
  static MAX_IMAGE_SIZE_MB = 4.5//1

  static MAX_LENGTH_NAME_SIZE = 30;
  //BYTES

  //static BASE_URL = "http://localhost:5000/";
 
  static BASE_URL = "https://ocupathdev.herokuapp.com/";  
  static DEFAULT_AVATAR =
    "https://d1a370nemizbjq.cloudfront.net/569e30b7-51ee-461a-861a-8a43a72473c1.glb";

}

export const MIN_INVITATIONS = 1
export const MAX_INVITATIONS = 999999999999999
