import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ClientId from './ClientId';

const GoogleLoginButton = () => {
    const clientId = ClientId;
    return (
        <>
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                    onSuccess={(res) => {
                        console.log(res);
                        console.log(res.credential);
                    }}
                    onFailure={(err) => {
                        console.log(err);
                    }}
                    type="icon"
                    theme="outline"
                    size="large"
                    shape="square"
                />
            </GoogleOAuthProvider>
        </>
    );
};

export default GoogleLoginButton;
