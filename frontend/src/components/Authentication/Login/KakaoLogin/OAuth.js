const REST_API_KEY = '2b7011a09ec21f6041192a32998e6f93';
const REDIRECT_URI = 'http://192.168.50.23:3000';
// export const client_id = '189427947604-c25ptdgtdbirfqe8a1trpdptm136qjtq.apps.googleusercontent.com';
// const client_pw = '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';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
// const parsedHash = new URLSearchParams(window.location.hash.substring(1));
// const accessToken = parsedHash.get("access_token");

// const { data } = await Api.post("oauth/google", { accessToken });

// export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;
