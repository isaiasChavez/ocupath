import { createContext } from "react";
import {TypesNotification} from '../../types'

interface NotificationsContextInterface {
  sendAlert({msg:string,type:TypesNotification,stop:boolean}):any
}

const NotificationsContext = createContext<NotificationsContextInterface | null>(null);

export default NotificationsContext;
