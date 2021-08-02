import Signin from "../pages/auth/signin";

const withAuth = Component => {
    
    const Auth = (props) => {
        if (props.user) {
            return <Component {...props}/>;
        }

        return <Signin />
    };

    return Auth;
};

export default withAuth;