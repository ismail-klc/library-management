import Signin from "../pages/auth/signin";

const withAuth = Component => {
    const Auth = (props) => {
        if (props.user) {
            return <Component />;
        }

        return <Signin />
    };

    if (Component.getInitialProps) {
        Auth.getInitialProps = Component.getInitialProps;
    }

    return Auth;
};

export default withAuth;