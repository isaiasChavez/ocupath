import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import FormEdit from './FormEdit';
import { COLORS } from '../../types';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    padding: '2rem',
    borderTop: '2rem solid',
    borderTopColor: COLORS.GRAY_MEDIUM,
    borderBottom: '2rem solid',
    borderBottomColor: COLORS.GRAY_MEDIUM
  },
  buttonEdit: {
    borderColor: 'black',
    border: 'solid 1px',
    textalign: 'center',
    width: '100%',
    background: 'transparent',
    borderRadius: '19pt',
    paddingTop: '0.12rem',
    cursor: 'pointer',
    paddingBottom: '0.12rem',
    '&:hover': {
      background: '#eeee',
    },
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginBottom: '0.5rem',
    marginTop: '3rem'
  }
}));

interface EditUserProps {
  type: number
}

const EditUser: React.FC<EditUserProps> = ({ type }) => {
  const classes = useStyles();

  return (
    <Card className={ classes.root }>
        <CardContent >
          <Avatar alt="Remy Sharp" className={ classes.large } />
          <button className={ classes.buttonEdit }>
            Edit Avatar
          </button>
        </CardContent>

      <FormEdit type={ type } />
    </Card>
  );
}
export default EditUser