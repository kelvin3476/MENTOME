import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ajax from '../../utils/ajax';
import moment from 'moment';
// import Editor from '../EditorComponent';

import 'react-quill/dist/quill.snow.css';

const NoticeDetailComponent = (props) => {
    const {
        location: {
            state: { _id }
        }
    } = props;

    const [post, setPost] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [isWriter, setIsWriter] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            let res = await ajax('/api/notice/noticeDetail', { _id });

            if (res.data && res.data.length == 0) {
                alert('조회된 결과가 없습니다');
            } else {
                setPost(res.data.result);
                setFileList(res.data.result.fileList);
                setIsWriter(res.data.result.isWriter);
                await ajax('/api/notice/saveNoticeView', { _id });
            }
        };

        fetchPost();
    }, []);

    function onClickDeleteNotice() {
        if (confirm('삭제 하시겠습니까?')) {
            ajax('/api/notice/deleteNotice', { _id: _id }, (res) => {
                if (res.data && res.data.ok === 1) {
                    alert('삭제 완료');
                    window.location.href = '/';
                }
            });
        }
    }

    return (
        <div className="container" style={{ overflow: 'auto' }}>
            <div className="lf-menu-nav">
                <span>공지사항</span>
            </div>
            <div className="lf-contents pd12">
                {/* align-right */}
                <div className="top-controls">
                    <a href="/">
                        <button className="lf-button primary float-right">
                            목록으로
                        </button>
                    </a>
                </div>
                <div style={{ padding: '12px' }}>
                    <table className="notice-table">
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
                                <th>작성자</th>
                                <td>{post.userName}</td>
                                <th>작성일시</th>
                                <td>
                                    {moment(post.date).format('YYYY-MM-DD')}
                                </td>
                            </tr>
                            <tr>
                                <th>첨부파일</th>
                                <td colSpan="3">
                                    {fileList.map((name, index) => (
                                        <span key={index}>
                                            {' '}
                                            <a
                                                href={'/uploads/' + name}
                                                target="_blank"
                                            >
                                                {name}
                                            </a>{' '}
                                            |
                                        </span>
                                    ))}
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td
                                    className="notice-contents"
                                    colSpan="4"
                                    dangerouslySetInnerHTML={{
                                        __html: post.desc
                                    }}
                                ></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {isWriter && (
                    <div className="text-center mb8">
                        <button
                            className="lf-button dark-gray"
                            onClick={onClickDeleteNotice}
                        >
                            삭제
                        </button>
                        <Link
                            to={{
                                pathname: '/noticeModify',
                                state: { _id: post._id }
                            }}
                        >
                            <button className="lf-button primary ml8">
                                수정
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NoticeDetailComponent;
