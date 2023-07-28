import { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';

const PostDe = (props) => {
    const {
        location: {
            state: { _id },
        },
    } = props;

    const [post, setPost] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [isWriter, setIsWriter] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                let res = await axios.post('/api/notice/noticeDetail', { _id });

                if (res.data && res.data.length === 0) {
                    alert('조회된 결과가 없습니다');
                } else {
                    setPost(res.data.result);
                    setFileList(res.data.result.fileList);
                    setIsWriter(res.data.result.isWriter);
                    await axios.post('/api/notice/saveNoticeView', { _id });
                }
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPost();
        // eslint-disable-next-line
    }, []);
    // eslint-disable-next-line
    async function onClickDeleteNotice() {
        if (window.confirm('삭제 하시겠습니까?')) {
            try {
                const response = await axios.post('/api/notice/deleteNotice', {
                    _id: _id,
                });
                if (response.data && response.data.ok === 1) {
                    alert('삭제 완료');
                    window.location.href = '/';
                }
            } catch (error) {
                // 에러 처리
                console.error('삭제 요청에 실패했습니다:', error);
            }
        }
    }

    return (
        <>
            <h1>gd</h1>
            <div>
                <div>
                    <span>게시판</span>
                </div>
                <div>
                    <div>
                        <a href="/">
                            <button>목록으로</button>
                        </a>
                    </div>
                    <div>
                        <table>
                            <colgroup>
                                <col width="10%" />
                                <col width="40%" />
                                <col width="10%" />
                                <col width="40%" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>구분</th>
                                    <td colSpan="3">{post.type}</td>
                                </tr>
                                <tr>
                                    <th>제목</th>
                                    <td colSpan="3">{post.title}</td>
                                </tr>
                                <tr>
                                    <th>작성</th>
                                    <td>{post.userName}</td>
                                    <th>작성일시</th>
                                    <td>{moment(post.date).format('YYYY-MM-DD')}</td>
                                </tr>
                                <tr>
                                    <th>첨부파일</th>
                                    <td colSpan="3">
                                        {fileList.map((name, index) => (
                                            <span key={index}>
                                                <a href={'/uploads/' + name} target="_blank">
                                                    {name}
                                                </a>
                                            </span>
                                        ))}
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {isWriter && (
                        <div>
                            <button>삭제</button>

                            <button>수정</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default PostDe;
