import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import FormEdit from '../general/FormEdit';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height:'100%',
    padding:'2rem'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    
  },
  cover: {
    width: '100%',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  large:{
    width: theme.spacing(15),
    height: theme.spacing(15),
  },editButton:{
   fontSize:10,
   padding:'2rem'
  }
}));

 interface EditSuperAdminProps {
  
}
 
const EditSuperAdmin: React.FC<EditSuperAdminProps> = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent >
           <Avatar alt="Remy Sharp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7UvZWBp0opKJJIF-BXk71yOlZEuqEEenf3g&usqp=CAU" className={classes.large} />
           <Fab size="small"  variant="extended" className={classes.editButton}>
                   Edit Avatar

      </Fab>
          <Typography variant="subtitle1" color="textSecondary">
          </Typography>
        </CardContent>
       
      </div>
     <FormEdit/>
    </Card>
  );
}
export default EditSuperAdmin