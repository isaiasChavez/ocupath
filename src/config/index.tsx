 type StatusImage = {
      isValid:boolean;
      errors:{
        size:boolean;
      weight:boolean;
      },
      dataImage:{
        sizeImage: string
      }
  }
export class Config {
  static TOKEN_NAME_INTERN = "ocupath_u";
  static TOKEN_NAME_HEADER = "x-auth-token";
  static MAX_IMAGE_SIZE = 1048576;
  static MB_IN_BITS =  1048576 
  static MAX_IMAGE_SIZE_MB =  1//1
  
  static MAX_VIDEO_SIZE = 6000000;
  static MAX_VIDEO_360_SIZE = 10000000;
  static MAX_LENGTH_NAME_SIZE = 30;


      static BASE_URL = "http://localhost:5000/"; 
 
     /* static BASE_URL = "https://ocupathdev.herokuapp.com/"; */
   // https://git.heroku.com/ocupathdev
  static DEFAULT_AVATAR =
    "https://d1a370nemizbjq.cloudfront.net/569e30b7-51ee-461a-861a-8a43a72473c1.glb";

 
  static isImageValid (image:File):StatusImage{
    const statusImage:StatusImage ={
      isValid:true,
      errors:{
        size:false,
      weight:false,
      },
      dataImage:{
        sizeImage:''
      }
    }
    const weight:number = image.size/Config.MB_IN_BITS
    const sizeImage = weight.toFixed(2) 
    statusImage.dataImage.sizeImage = sizeImage
    if (weight > Config.MAX_IMAGE_SIZE_MB) {
      statusImage.isValid = false
      statusImage.errors.weight = true
    }
    return statusImage
  }
  
  static isImage360Valid (image:File):StatusImage{
    const statusImage:StatusImage ={
      isValid:true,
      errors:{
        size:false,
      weight:false,
      },
      dataImage:{
        sizeImage:''
      }
    }
    const weight:number = image.size/Config.MB_IN_BITS
    const sizeImage = weight.toFixed(2) 
    statusImage.dataImage.sizeImage = sizeImage
    if (weight > Config.MAX_IMAGE_SIZE_MB) {
      statusImage.isValid = false
      statusImage.errors.weight = true
    }
    return statusImage
  }

}

export const MIN_INVITATIONS = 1
export const MAX_INVITATIONS = 4
