import { createContext } from "react";

export class ReuestSesionLogOutDTO  {
  constructor() {


    this.isFromCMS = true;
    
  }
  readonly email: string;
  readonly isFromCMS: boolean;
}
interface SesionContextInterface {
  logout: Function;
  loadingSesion:boolean
}

const SesionContext = createContext<SesionContextInterface | null>(null);

export default SesionContext;
