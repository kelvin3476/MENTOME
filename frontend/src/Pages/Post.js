// 페이지
// import NoticeDetailComponent from '../components/Post/NoticeDetailComponent';
import { useParams } from 'react-router-dom';
import PostDetail from '../Components/Post/PostDetail';

function Post() {
    const { postId } = useParams();

    return <PostDetail />;
}

export default Post;
