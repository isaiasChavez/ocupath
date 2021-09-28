// HOC/withAuth.jsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Config } from "../config";
import { verifyToken } from "../config/utils";
import {USERS_TYPES} from '../types/'
const withAuth = (WrappedComponent) => {
  return (props) => {

    const Router = useRouter();
    const [verified, setVerified] = useState(false);
    const freeRoutes=["/","/login","/login/forgot"]
    const routesBloquedWhenIsLogged=["/"]
    
    const isAFreeRoute = freeRoutes.includes(Router.pathname)
    useEffect(() => {
      const accessToken = localStorage.getItem(Config.TOKEN_NAME_INTERN);
      // if no accessToken was found,then we redirect to "/" page.
      if (!accessToken) {
        if (!isAFreeRoute) {
          Router.replace("/");
        }

      } else {
        // we call the api that verifies the token.
        const isValid =  verifyToken(accessToken);
        // if token was verified we set the state.

        const routesAdmin =["/panel/admin"]
        const routesSuperAdmin =["/superadmin"]
        const routesGuest =["/panel/user"]
        

        if (isValid.status) {
          setVerified(isValid.status);
          const userType = isValid.jwtDecoded.usuario.type
          let isAdmin = userType ===USERS_TYPES.ADMIN
          let isSuperAdmin = userType ===USERS_TYPES.SUPER_ADMIN
          let isGuest = userType ===USERS_TYPES.GUEST

          if (isValid.status) {
              if (isAdmin) {
                if (!routesAdmin.includes(Router.pathname)) {
                  Router.replace("/panel/admin");
                }
              }
              if (isSuperAdmin) {
                if (!routesSuperAdmin.includes(Router.pathname)) {
                  Router.replace("/superadmin");
                }
              }

              if (isGuest) {
                if (!routesGuest.includes(Router.pathname)) {
                  Router.replace("/panel/user");
                }
              }
            
          }
        } else {
          // If the token was fraud we first remove it from localStorage and then redirect to "/"
          localStorage.removeItem(Config.TOKEN_NAME_INTERN);
          Router.replace("/");
        }
      }
    }, []);

    if (verified||isAFreeRoute) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
};

export default withAuth;