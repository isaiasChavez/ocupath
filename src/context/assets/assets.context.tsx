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
  images: [{
    typeAsset: { id: number,name: string }
    url: string,
    thumbnail:string
  }],
  images360: [{
    typeAsset: { id: number,name: string }
    url: string,
    thumbnail:string
  }],
  videos: [{
    typeAsset: { id: number,name: string }
    url: string,
    thumbnail:string
  }],
  videos360: [{
    typeAsset: { id: number,name: string }
    url: string,
    thumbnail:string
  }]
}

export type Asset =  {
  typeAsset:{ 
    id: number,
    name: string
  },
  url:string
}


interface AssetsContextInterface {
  deleteAsset: Function;
  create: Function;
  getAssetsUser: Function;
  assets:AssetsResponse
}

const AssetsContext = createContext<AssetsContextInterface | null>(null);

export default AssetsContext;
