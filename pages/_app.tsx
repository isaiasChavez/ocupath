import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import '../styles/globals.css'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import UserState from "../src/context/user/user.state";
import AssetsState from "../src/context/assets/assets.state";
import SesionState from "../src/context/sesion/sesion.state";
import NotificationState from "../src/context/notifications/notifications.state";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from "../src/components/ErrorBondary";
export default function MyApp(props) {
  const { Component,pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  },[]);

  return (
    <>
    <ErrorBoundary>

      <NotificationState>
        <SesionState>
          <UserState>
            <AssetsState>
              <ThemeProvider theme={ theme }>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */ }
                <CssBaseline />
                <Component { ...pageProps } />
                <ToastContainer
                  position="bottom-center"
                  autoClose={ 5000 }
                  hideProgressBar={ false }
                  newestOnTop={ false }
                  closeOnClick
                  rtl={ false }
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  />

              </ThemeProvider>
            </AssetsState>
          </UserState>
        </SesionState>
      </NotificationState>
                  </ErrorBoundary>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
