import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { createContext } from "react";
export class CreateAssetDTO {
  constructor(url: string) {
    this.url = url;
  }
  url: string;
}

export class DeleteAssetDto {
  constructor(uuid: string) {
    this.uuid = uuid;
  }
  uuid: string;
}

interface AssetsContextInterface {
  deleteAsset: Function;
  create: Function;
}

const AssetsContext = createContext<AssetsContextInterface | null>(null);

export default AssetsContext;
