import { createContext } from "react";
export class CreateAssetDTO {
  constructor({ url }) {
    this.url = url;
  }
  adminUuid: string;
  url: string;
}

export class DeleteAssetDto {
  constructor({ uuid }) {
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
