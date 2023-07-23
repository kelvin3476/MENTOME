import { useEffect } from 'react';
import axios from 'axios';
import OAuth from './OAuth';

const KakaoCallback = () => {
    useEffect(() => {
        const params = new URL(document.location.toString()).searchParams;
        const code = params.get('code');
        const grantType = 'authorization_code';
        const REST_API_KEY = '2b7011a09ec21f6041192a32998e6f93';
        const REDIRECT_URI = `${process.env.REACT_APP_REDIRECT_URL}`;
    });
    return <></>;
};

export default KakaoCallback;
