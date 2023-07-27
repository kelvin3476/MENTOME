import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/Home';
import Posting from './Pages/Posting';
import Mypage from './Pages/MyPage';
import Mentor from './Pages/Mentor';
import Mentee from './Pages/Mentee';
import Actset from './Pages/Actset';
import Post from './Pages/Post';
import RootLayout from './Pages/Root';
import PostDetail from './Components/Post/PostDetail';

import Signup from './Pages/Signup';

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
