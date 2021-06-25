import  React, { useEffect, useState } from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TablePagination from '@material-ui/core/TablePagination';
// import image from 'path/to/image.jpg';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {FILES} from '../../../src/types'

import Grid from "@material-ui/core/Grid";

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

const AntTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'none',
      minWidth: 72,
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(4),
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:hover': {
        color: '#40a9ff',
        opacity: 1,
      },
      '&$selected': {
        color: '#1890ff',
        fontWeight: theme.typography.fontWeightMedium,
      },
      '&:focus': {
        color: '#40a9ff',
      },
    },
    selected: {},
  }),
)((props: StyledTabProps) => <Tab disableRipple {...props} />);


interface StyledTabProps {
  label: string;
}



function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

export interface TableAdminProps {
 
}
 
const TableAdmin: React.FC<TableAdminProps> = () => {
  const classes = useStyles();
 const [currentTab, setCurrentTab] = useState(0);



  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setCurrentTab(newValue);
  };

  const img_uno = 'https://images.unsplash.com/photo-1623835255306-868c63d9335e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
  const img_dos = 'https://images.unsplash.com/photo-1624548955817-e2d68f404137?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=670&q=80'
  const img_tres = 'https://images.unsplash.com/photo-1624541478061-2a3b39b3d725?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
  
  const tileData = [
    {
      img: 'https://fotografiamejorparavendermas.com/wp-content/uploads/2017/06/La-importancia-de-la-imagen.jpg',
      title: 'Image',
      author: 'author',
      cols: 2,
    },
     {
      img: 'https://fotografiamejorparavendermas.com/wp-content/uploads/2017/06/La-importancia-de-la-imagen.jpg',
      title: 'Image',
      author: 'author',
      cols: 2,
    },
  ];

 const IMG_360_DATA = [
    {
      img:img_uno,
      title: 'Image',
      author: 'author',
      cols: 2,
    },
     {
      img: img_uno,
      title: 'Image',
      author: 'author',
      cols: 2,
    },
  ];
  const VIDEO_DATA = [
    {
      img:img_dos,
      title: 'Image',
      author: 'author',
      cols: 2,
    },
     {
      img: img_dos,
      title: 'Image',
      author: 'author',
      cols: 2,
    },
  ];
  const VIDEO_360_DATA = [
    {
      img:img_tres,
      title: 'Image',
      author: 'author',
      cols: 2,
    },
     {
      img: img_tres,
      title: 'Image',
      author: 'author',
      cols: 2,
    },
  ];
  useEffect(() => {

    setCurrentImages(currentTab)

  }, [currentTab])

  const [currentData, setCurrentData] = useState([])

  const setCurrentImages = (tab:number)=>{
    if (tab === FILES.IMG) {
        setCurrentData(tileData)
      } 
      if (tab === FILES.IMG_360) {
      setCurrentData(IMG_360_DATA)
    } 
    if (tab === FILES.VIDEO) {
               setCurrentData(tileData)
    } 
    if (tab === FILES.VIDEO_360) {
              setCurrentData(IMG_360_DATA)
    } 
  }

  return (
     <div className={classes.root}>
      <div className={classes.demo1}>
        <AntTabs value={currentTab} onChange={handleChange} aria-label="ant example">
          <AntTab label="Images" />
          <AntTab label="360 Images" />
          <AntTab label="Video" />
          <AntTab label="360 Videos" />
        </AntTabs>
       {currentTab === FILES.IMG && <GridList cellHeight={100} className={classes.gridList} cols={7}>
         {tileData.map((tile) => (
            <GridListTile key={tile.img} cols={ 1}  style={{ height: 180 }}>
              <img src={tile.img} alt={tile.title} />
            </GridListTile>
          ))}
        </GridList>}
        {currentTab === FILES.IMG_360 && <GridList cellHeight={100} className={classes.gridList} cols={7}>
         {IMG_360_DATA.map((tile) => (
            <GridListTile key={tile.img} cols={ 1}  style={{ height: 180 }}>
              <img src={tile.img} alt={tile.title} />
            </GridListTile>
          ))}
        </GridList>}
         {currentTab === FILES.VIDEO && <GridList cellHeight={100} className={classes.gridList} cols={7}>
         {VIDEO_DATA.map((tile) => (
            <GridListTile key={tile.img} cols={ 1}  style={{ height: 180 }}>
              <img src={tile.img} alt={tile.title} />
            </GridListTile>
          ))}
        </GridList>}
         {currentTab === FILES.VIDEO_360 && <GridList cellHeight={100} className={classes.gridList} cols={7}>
         {VIDEO_360_DATA.map((tile) => (
            <GridListTile key={tile.img} cols={ 1}  style={{ height: 180 }}>
              <img src={tile.img} alt={tile.title} />
            </GridListTile>
          ))}
        </GridList>}
      </div>
      
     </div>
  );
}
 
export default TableAdmin;



const useStyles = makeStyles((theme: Theme) => ({
    root: {
    display: 'flex',
    height:'100%',
    padding:'2rem'
  },
  padding: {
    padding: theme.spacing(3),
  },
  demo1: {
    backgroundColor: theme.palette.background.paper,
    width:'100%',
  },
  demo2: {
    backgroundColor: '#2e1534',
  },
  gridList: {
      width: '100%',
      height:'92%',
    },
}));
