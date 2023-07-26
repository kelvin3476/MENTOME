import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/Home';
import Posting from './Pages/posting';
import Mypage from './Pages/myPage';
import Mentor from './Pages/mentor';
import Mentee from './Pages/mentee';
import Actset from './Pages/actset';
import Post from './Pages/post';
import RootLayout from './Pages/Root';
import PostDetail from '../src/components/Post/PostDetail';

import Signup from './Pages/signup';

// const router = createBrowserRouter([
//     {
//         path: '/',
//         element: <RootLayout />,
//         children: [
//             { path: '/', element: <HomePage /> },
//             {
//                 path: 'mentor',
//                 element: <Mentor />,
//                 children: [
//                     { index: true, element: <Mentor /> },
//                     { path: ':postId', element: <Post /> }
//                 ]
//             },
//             {
//                 path: 'mentee',
//                 element: <Mentee />,
//                 children: [
//                     { index: true, element: <Mentee /> }

//                     // { path: ':postId', element: <Post /> }
//                 ]
//             },
//             { path: 'post', element: <Post /> },
//             { path: 'posting', element: <Posting /> },
//             { path: 'signup', element: <Signup /> },
//             { path: 'mypage', element: <Mypage /> },
//             { path: 'account-setting', element: <Actset /> }
//         ]
//     }
// 멘토링 신청 하기 application or registration
// 미팅룸 meeting-room
// ]);

// comment: 멘토링 신청하기와 미팅 페이지의 route가 완성되지 않았음.
// 추가적으로 mentor/mentee 게시판의 post를 부모 url만 다르게 하고 자식을 동일하게 함.
// 이게 가능한지에 대한 의구심.

function App() {
    return (
        <Router>
            <Routes>
                {/* RootLayout을 기준으로 경로에 따라 컴포넌트를 렌더링 */}
                <Route path="/" element={<RootLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="mentor" element={<Mentor />}>
                        <Route index element={<Mentor />} />
                        <Route path=":postId" element={<Post />} />
                    </Route>
                    {/* Mentee 관련 라우트 */}
                    <Route path="mentee" element={<Mentee />}>
                        <Route index element={<Mentee />} />
                        <Route path=":postId" element={<Post />} />
                    </Route>
                    <Route path="post" element={<Post />} />
                    <Route path="posting" element={<Posting />} />
                    <Route path="/PostDetail/:id" element={<PostDetail />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="mypage" element={<Mypage />} />
                    <Route path="account-setting" element={<Actset />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
