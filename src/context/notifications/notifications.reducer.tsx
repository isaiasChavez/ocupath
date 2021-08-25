import { Config } from "../../config";
import { AS_A,FILES_TYPES } from "../../types";

export type NotificationStateType = {

};

type Actions =
  | { type: "SUCCESS"; payload: any }
  | { type: "ERROR"; payload: any }
  | { type: "WARNING"; payload: any };

const userReducer = (
  state: NotificationStateType,
  action: Actions
): NotificationStateType => {
  const { payload } = action;

  switch (action.type) {
   

    default:
      return state;
  }
};
export default userReducer;
