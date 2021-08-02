import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/header'
import buildClient from '../helpers/build-client';

function MyApp({ Component, pageProps, user }) {
  return (
    <>
      <Header user={user} />
      <div className="container">
        <Component user={user} {...pageProps} />
      </div>
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