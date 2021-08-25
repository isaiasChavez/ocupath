import { IsNotEmpty,IsString,IsUUID } from "class-validator";
import { createContext } from "react";



interface NotificationsContextInterface {
  sendAlert:Function
}

const NotificationsContext = createContext<NotificationsContextInterface | null>(null);

export default NotificationsContext;
