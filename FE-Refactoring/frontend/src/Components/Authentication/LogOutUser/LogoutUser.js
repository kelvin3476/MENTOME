import { useCookies } from 'react-cookie';

export const useLogoutUser = () => {
    const [, , removeCookie] = useCookies(['id']);

    const logoutUser = () => {
        removeCookie('logInUser', { path: '/' });
        // 로그아웃 후 추가로 수행할 작업을 원한다면 여기에 추가합니다.
    };

    return logoutUser;
};
