import { IsNotEmpty,IsString,IsUUID } from "class-validator";
import { createContext } from "react";


  export class CreateAssetDTO {
  constructor (url: string) {
    this.url = url;
  }
  url: string;
}

export class DeleteAssetDto {
  constructor (uuid: string) {
    this.uuid = uuid;
  }
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
  url:string
}


interface AssetsContextInterface {
  deleteAsset: Function;
  successCreate: Function;
  getAssetsUser: Function;
  assets:AssetsResponse
}


const AssetsContext = createContext<AssetsContextInterface | null>(null);

export default AssetsContext;
