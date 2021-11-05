import { createContext } from "react";
import {TypesNotification} from '../../types'

interface NotificationsContextInterface {
  sendAlert({msg:string,type:TypesNotification}):any
}

const NotificationsContext = createContext<NotificationsContextInterface | null>(null);

export default NotificationsContext;
