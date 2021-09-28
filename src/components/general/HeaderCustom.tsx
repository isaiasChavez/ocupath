import { Link, makeStyles } from '@material-ui/core';
import React from 'react'
import { COLORS,ROUTES } from '../../types';


export interface HeaderCustomProps {
 
}
 
const HeaderCustom: React.FC<HeaderCustomProps> = () => {
     const classes = useStyles();

 return (
    <div className={classes.bodyHeader}>
        <h2>Multivrsity</h2>
      <div className={classes.headerRight}>

        <button className={ classes.headerItem }>
            DOWNLOAD
          </button>
          <button className={classes.headerItem}>PRICING</button>
          <button className={classes.headerItem}>ABOUT US</button>
          
          <button className={classes.headerItem}>
          <Link href={ROUTES.login}>
              <span >LOGIN</span>
            </Link>
            </button>
        </div>
    </div>
  );
}
 
const useStyles = makeStyles((theme) => ({
   
    bodyHeader: {
      position: 'absolute',
      color:'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      top: 0,
      left: 0,
      right: 0,
      height: '4.1rem',
      backgroundColor:COLORS.gray_header
    },
     headerRight: {
      display: 'flex',
      
    },
    headerItem: {
      color:'white',
      border: 0,
      backgroundColor: 'transparent',
      minWidth: '10rem',
      justifyContent: 'center',
      alignItems: 'center',
      textalign: 'center'
    }
  }));
export default HeaderCustom;

 