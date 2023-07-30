import { Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import styles from './PostDetail.module.css';

const PostDetail = () => {
    // const [post, setPost] = useState([]); // 댓글을 저장할 배열 상태
    const [post, setPost] = useState({
        // title: '더미 제목',
        // username: '더미 유저',
        // date: '2023-07-25',
        // content: '더미 게시물 내용',
    });
    // const [comments, setComments] = useState([]); // 댓글을 저장할 배열 상태
    const [comments, setComments] = useState([
        // {
        //     _id: '64c407a19d751848e2bc8fd2',
        //     commentContent: '저요저요!',
        //     commentWriter: '런린이',
        //     commentDate: '2023.07.26',
        // },
        // {
        //     _id: '64c407a19d751848e2bc8fd3',
        //     commentContent: '저요저요!',
        //     commentWriter: '런린이',
        //     commentDate: '2023.07.26',
        // },
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
        //eslint-disable-next-line
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
                {/* 페이지 구성 div 태그 */}
                <div className={styles.head_top}>
                    {/* Navbar div 태그 생략 */}
                    {/* 페이지 구성 header 태그부터 시작 */}
                    {/* 여기 div태그는 컨테이너로 구성되어야 하지 않을까? */}
                    <div className={styles.head_margin_lr}>
                        {/* title */}
                        <h1>{post.title}</h1>
                        {/* name , data, button(edit), button(delete) */}
                        {/* button(edit, delete) */}
                        <div className={styles.head_button}>
                            <button>수정</button>
                            <button>삭제</button>
                        </div>
                        {/* Name / separate / date */}
                        <div className={styles.profile_bar}>
                            <div className={styles.profile_bar__info}>
                                <span className={styles.username}>{post.username}</span>
                                <span className={styles.separator}>·</span>
                                <span>{formattedDate}</span>
                                {/* <p>{post.sport}</p>
                                <p>{post.career}</p> */}
                            </div>
                        </div>
                        <div className={styles.line}></div>
                        {/* 내용(Content) */}
                        <div className={styles.body__head}>
                            <p>{post.content}</p>
                        </div>
                        {/* 여백 div */}
                        <div></div>
                        {/* 댓글 div */}
                        <div className={styles.comment__div_header}>
                            <h4>{comments.length}개의 댓글</h4>
                            <div>
                                <div>
                                    <textarea
                                        placeholder="댓글을 작성하세요"
                                        value={newCommentContent}
                                        className={styles.comment__textarea}
                                        onChange={(e) => setNewCommentContent(e.target.value)}
                                        style={{ height: 69.3333 }}
                                    ></textarea>
                                    {/* button-wrapper */}
                                    <div className={styles.buttons_wrapper}>
                                        <button
                                            color="teal"
                                            className={styles.comment__button}
                                            onClick={handleCommentSubmit}
                                        >
                                            댓글 작성
                                        </button>
                                    </div>
                                    {/* 댓글 남긴거 */}
                                    <div className={styles.comment__margin_top}>
                                        {/* 댓글 */}
                                        {comments.map((comments) => (
                                            <>
                                                <div className={styles.comment_top}>
                                                    <div className={styles.comment_top}>
                                                        <div className={styles.profile}>
                                                            <img
                                                                src="https://velog.velcdn.com/images/1yoouoo/profile/27630138-254c-45cd-99a6-b9adeadbffc9/image.avif"
                                                                alt="comment-user-thumbnail"
                                                            ></img>
                                                            <div className={styles.comment_Info}>
                                                                <div className={styles.comment__username}>
                                                                    <a>{comments.commentWriter}</a>
                                                                </div>
                                                                <div className={styles.date}>
                                                                    {comments.commentDate}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={styles.comment__Content_top} key={comments._id}>
                                                        <div className={styles.comment__Content_top}>
                                                            <p>{comments.commentContent}</p>
                                                        </div>
                                                    </div>
                                                    {/* True or False - True 답글 달기 - 
                                            False 숨기기 댓글 작성하기 텍스트 박스 */}
                                                    <div className={styles.comment__comment_top}>
                                                        <div className={styles.comment__comment_answer}>
                                                            {/* svg */}
                                                            <svg width="12" height="12" fill="none" viewBox="0 0 12 12">
                                                                <path
                                                                    fill="currentColor"
                                                                    d="M5.5 2.5h1v3h3v1h-3v3h-1v-3h-3v-1h3v-3z"
                                                                ></path>
                                                                <path
                                                                    fill="currentColor"
                                                                    fill-rule="evenodd"
                                                                    d="M1 0a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H1zm10 1H1v10h10V1z"
                                                                    clip-rule="evenodd"
                                                                ></path>
                                                            </svg>
                                                            <span>답글 달기</span>
                                                        </div>
                                                    </div>
                                                    {/* 댓글 작성자 정보나 시간 등을 추가하여 표시할 수 있습니다. */}
                                                </div>
                                            </>
                                        ))}
                                        {/* 댓글 남긴 사람의 프로필 */}
                                        {/* <div></div> */}
                                        {/* 남긴 댓글의 content */}
                                        {/* <div> */}
                                        {/* <p>{comments.content}</p> */}
                                        {/* </div> */}
                                        {/* 댓글 달기 버튼 */}
                                        {/* <div> */}
                                        {/* 이부분에서 조건부 설정을 해놔야함. true/false -> 답글 달기 / 숨기기 */}
                                        {/* </div> */}
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
