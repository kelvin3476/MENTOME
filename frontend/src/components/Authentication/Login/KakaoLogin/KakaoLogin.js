import { KAKAO_AUTH_URL } from './OAuth';
import kakaoImg from './kakao_login.png';

const KakaoLogin = (props) => {
    return (
        <>
            <div>
                <a href={KAKAO_AUTH_URL}>
                    <img src={kakaoImg} width="40" alt="카카오 로그인"></img>
                </a>
            </div>
        </>
    );
};

export default KakaoLogin;
