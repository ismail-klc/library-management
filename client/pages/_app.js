import '../styles/globals.css';
import '../styles/adminlte.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import buildClient from '../helpers/build-client';
import Head from 'next/head';
import Navbar from '../components/navbar';
import MainSidebar from '../components/main-sidebar';
import Footer from '../components/footer';

function MyApp({ Component, pageProps, user }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {
        user ?
          <>
            <Navbar />
            <MainSidebar />
            <div className="wrapper">
              <div className="content-wrapper">
                <Component user={user} {...pageProps} />
              </div>
            </div>
            <Footer />
          </>
          :
          <Component user={user} {...pageProps} />
      }
    </>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  let user;

  try {
    const { data } = await client.get('/api/auth/me');
    user = data;
  } catch (error) { }

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
    );
  }

  return {
    pageProps,
    user
  };
}

export default MyApp