import Head from 'next/head'

 
const HeadCustom = ({children}) => {
 return (  
  <Head>
        <link rel="icon" href="https://ocupath.fra1.digitaloceanspaces.com/app/multi.png" />
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
        {children}
      </Head>
 );
}
 
export default HeadCustom;