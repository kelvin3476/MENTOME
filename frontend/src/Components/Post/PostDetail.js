import { Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const PostDetail = () => {
    // const [post, setPost] = useState([]); // 댓글을 저장할 배열 상태
    const [post, setPost] = useState({
        // title: '더미 제목',
        // username: '더미 유저',
        // date: '2023-07-25',
        // content: '더미 게시물 내용'
    });
    // const [comments, setComments] = useState([]); // 댓글을 저장할 배열 상태
    const [comments, setComments] = useState([
        { content: '더미 댓글 1' },
        { content: '더미 댓글 2' },
        { content: '더미 댓글 3' },
    ]);
    const [newCommentContent, setNewCommentContent] = useState('');

    // 게시물 디테일 경로를 가져오기
    const location = useLocation();
    const { pathname } = location;

    useEffect(() => {
        // 게시물 데이터를 가져올 API 엔드포인트의 URL
        const postApiUrl = `/api/content/getcontentdetail/${pathname.split('/')[2]}`; // 실제 API URL로 교체해주세요

        // 댓글 데이터를 가져올 API 엔드포인트의 URL
        const commentsApiUrl = `/api/content/getcontentcomments/${pathname.split('/')[2]}`; // 실제 API URL로 교체해주세요

        // Promise.all을 사용하여 게시물 데이터와 댓글 데이터를 한번에 가져옵니다
        Promise.all([axios.get(postApiUrl), axios.get(commentsApiUrl)])
            .then(([postResponse, commentsResponse]) => {
                setPost(postResponse.data); // 게시물 데이터를 설정합니다
                setComments(commentsResponse.data); // 댓글 데이터를 설정합니다
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleCommentSubmit = (event) => {
        event.preventDefault();
        const newCommentContent = event.target.elements.commentContent.value;

        // 서버에 댓글을 생성하는 API 엔드포인트의 URL (실제 서버에 맞게 변경해야 함)
        const createCommentApiUrl = 'api/content/uploadcomment';

        axios
            .post(createCommentApiUrl, { content: newCommentContent })
            .then((response) => {
                // 댓글 생성 성공 시 서버에서 저장된 댓글 데이터를 받아와서 배열에 추가
                const newComment = response.data;
                setComments([...comments, newComment]);
            })
            .catch((error) => {
                console.error('Error creating comment:', error);
            });

        event.target.reset(); // 폼 초기화
    };

    const formattedDate = new Date(post.date).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    return (
        <Container>
            <div>
                {/* 단일 div 태그 */}
                <div></div>
                {/* 페이지 구성 div 태그 */}
                <div>
                    {/* Navbar div 태그 생략 */}
                    {/* 페이지 구성 header 태그부터 시작 */}
                    {/* 여기 div태그는 컨테이너로 구성되어야 하지 않을까? */}
                    <div>
                        {/* title */}
                        <h1>{post.title}</h1>
                        {/* name , data, button(edit), button(delete) */}
                        {/* button(edit, delete) */}
                        <div>
                            <button>수정</button>
                            <button>삭제</button>
                        </div>
                        {/* Name / separate / date */}
                        <div>
                            <span>{post.writer}</span>
                            <p>·</p>
                            <span>{formattedDate}</span>
                            <p>{post.sport}</p>
                            <p>{post.career}</p>
                        </div>
                        {/* 2개의 여백 class="sc-kHOZwM gbIuGG" */}
                        <div></div>
                        <div></div>
                        {/* 내용(Content) */}
                        <div>
                            <p>{post.content}</p>
                        </div>
                        {/* 여백 div */}
                        <div></div>
                        {/* 댓글 div */}
                        <div>
                            <h4>{comments.length}개의 댓글</h4>
                            {/* 댓글 */}
                            {comments.map((comment, index) => (
                                <div key={index}>
                                    <p>{comment.commentContent}</p>
                                    {/* True or False - True 답글 달기 - 
                                    False 숨기기 댓글 작성하기 텍스트 박스 */}
                                    <div>
                                        {/* svg */}
                                        <span>답글 달기</span>
                                    </div>
                                    {/* 댓글 작성자 정보나 시간 등을 추가하여 표시할 수 있습니다. */}
                                </div>
                            ))}
                            <div>
                                <textarea
                                    placeholder="댓글을 작성하세요"
                                    value={newCommentContent}
                                    onChange={(e) => setNewCommentContent(e.target.value)}
                                ></textarea>
                                {/* button-wrapper */}
                                <div>
                                    <button onClick={handleCommentSubmit}> 댓글 작성 </button>
                                </div>
                                {/* 댓글 남긴거 */}
                                <div>
                                    <div>
                                        {/* 댓글 남긴 사람의 프로필 */}
                                        <div></div>
                                        {/* 남긴 댓글의 content */}
                                        <div>
                                            <p>{comments.content}</p>
                                        </div>
                                        {/* 댓글 달기 버튼 */}
                                        <div>
                                            {/* 이부분에서 조건부 설정을 해놔야함. true/false -> 답글 달기 / 숨기기 */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default PostDetail;
