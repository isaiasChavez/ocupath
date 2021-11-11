import {  IsNotEmpty,IsNumber,IsOptional,IsString,IsUrl,IsUUID } from "class-validator";
import { createContext } from "react";
import {FILES_TYPES} from '../../types'

  export class CreateAssetDTO {
  constructor (url: string) {
    this.url = url;
  }
  url: string;
}
export class CreateNewAssetDTO {
    constructor({url,typeAsset,thumbnail,nameAsset }) {
        this.url = url
        this.typeAsset = typeAsset
        this.thumbnail=thumbnail
        this.nameAsset = nameAsset

    }
   
    @IsNotEmpty()
    @IsString()
    @IsUrl()
    url: string;
    @IsString()
    @IsUrl()
    thumbnail: string;
    @IsNotEmpty()
    @IsNumber()
    typeAsset: FILES_TYPES;
    @IsNotEmpty()
    @IsString()
    nameAsset: string;
  
}



export class DeleteAssetDto {
  constructor (uuid: string) {
    this.uuid = uuid;
  }
  @IsNotEmpty()
  @IsUUID()
  uuid: string;
}
export type AssetsResponse = {
  images: Asset[],
  images360: Asset[],
  videos: Asset[],
  videos360: Asset[]
}

export type Asset =  {
  thumbnail: string;
  typeAsset:{ 
    id: number,
    name: string
  },
  url:string,
  uuid:string,
  name:string
}

export type UploadFile = {
    formDataFile: FormData
    formDataThumbnail: FormData
    file: File
  }

interface AssetsContextInterface {
  uploadImage(data:UploadFile):Promise<boolean>,
  uploadImage360(data:UploadFile):Promise<boolean>,
  uploadVideo(data:UploadFile):Promise<boolean>,
  uploadVideo360(data:UploadFile):Promise<boolean>,
  
  deleteAsset: Function;
  successCreate: Function;
  getAssetsUser: Function;
  openPreviewer(currentAsset: Asset, currentAssets: Asset[]):any;
  closePreviewer:Function;
  selectAsset(currentAsset: Asset):any;
  prevPreview:Function,
  nextPreview:Function,

  assets:AssetsResponse,
  currentAsset:Asset,
  previewIsImage:boolean,
  isPreviewerOpened:boolean,
  currentAssets:Asset[],
  loading:boolean

}


const AssetsContext = createContext<AssetsContextInterface | null>(null);

export default AssetsContext;
