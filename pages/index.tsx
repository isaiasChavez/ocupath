import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles,Box } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Link from "next/link";

export interface NavigationProps {
  isPanel: boolean | null;
}

 const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    center: {
      flexGrow: 1,
    },
    link: {
      color: "white",
    },
    title: {
      flexGrow: 1,
      display: "flex",
      justifyContent: 'flex-end',
      paddingRight:'3rem'
    },
  }));


export default function Home() {
    const classes = useStyles();


  return (
    <div style={{ 
      backgroundColor:'green',
      height:'100vh'
    }}>
    <AppBar position="fixed">
      <Toolbar>
        <div className={classes.title}>
        <Typography variant="h6" >
          <Button color="primary">
            <Link href="/">
              <span className={classes.link}>Ocupath</span>
            </Link>
          </Button>
        </Typography>

        </div>
        <div className={classes.center}>
          <Button size="large" color="primary">
            <Link href="/">
              <span className={classes.link}>About Us</span>
            </Link>
          </Button>
        
   
          <Button color="primary" >
            <Link href="/panel/archives">
              <span className={classes.link}>Our Plans</span>
            </Link>
          </Button>
          <Button color="primary">
            <Link href="/">
              <span className={classes.link}>Download</span>
            </Link>
          </Button>
          <Button color="primary">
            {/* <Link href="/" onClick={preventDefault}> */}
            <Link href="/login">
              <span className={classes.link}>Login</span>
            </Link>
          </Button>
        </div>
      </Toolbar>
    </AppBar>

    <Box  height="100%" pt={10} bgcolor="primary.secondary" color="primary.main" display="flex">
          <Box>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque asperiores amet officiis ullam esse, dolore architecto hic deserunt dolorum quia.
          </Box>
          <Box>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque asperiores amet officiis ullam esse, dolore architecto hic deserunt dolorum quia.
          </Box>
          <Box>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque asperiores amet officiis ullam esse, dolore architecto hic deserunt dolorum quia.
          </Box>
    </Box>
     
    </div>
  );
}

Home.getInitialProps = async (ctx) => {
  const res = await fetch("https://api.github.com/repos/vercel/next.js");
  const json = await res.json();
  return { stars: json.stargazers_count };
};
