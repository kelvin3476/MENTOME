import { useState } from 'react';
import CommentTextarea from '../../Input/CommentTextarea/CommentTextarea';
import MinusReplyButton from '../MinusReply/MinusReplyButton';
import PlusReplyButton from '../PlusReply/PlusReplyButton';
import styles from './ReplyButton.module.css';

const ReplyButton = ({ id }) => {
    const [showReplyBox, setShowReplyBox] = useState(false); // State variable for showing/hiding reply box
    const [showReplyReplyBox, setShowReplyReplyBox] = useState(false); // State variable for showing/hiding reply box

    const toggleReplyBox = () => {
        setShowReplyBox((prevShowReplyBox) => !prevShowReplyBox);
    };

    const toggleReplyReplyBox = () => {
        setShowReplyReplyBox((prevShowReplyReplyBox) => !prevShowReplyReplyBox);
    };

    return (
        <div className={styles.Reply__button_head}>
            {!showReplyBox ? (
                <PlusReplyButton name='답글 달기' onClick={toggleReplyBox} />
            ) : (
                <>
                    <MinusReplyButton onClick={toggleReplyBox} />
                    <div className={styles.Reply__comment_group}>
                        <div className={styles.Reply__comment_margin_top}></div>
                        <div>
                            <div
                                className={
                                    styles.Reply__comment_padding_top_down
                                }
                            >
                                <div
                                    className={
                                        styles.Reply__comment_profile_head
                                    }
                                >
                                    <div
                                        className={
                                            styles.Reply__comment_profile
                                        }
                                    >
                                        {/* a태그 생략 */}
                                        <img
                                            src='https://velog.velcdn.com/images/1yoouoo/profile/27630138-254c-45cd-99a6-b9adeadbffc9/image.avif'
                                            alt='comment-user-thumbnail'
                                        ></img>
                                        <div
                                            className={
                                                styles.Reply__comment_info
                                            }
                                        >
                                            <div
                                                className={
                                                    styles.Reply__comment_username
                                                }
                                            >
                                                {/* eslint-disable-next-line */}
                                                <a>UserName</a>
                                            </div>
                                            <div
                                                className={
                                                    styles.Reply__comment_date
                                                }
                                            >
                                                Date
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className={
                                            styles.Reply__comment_actions
                                        }
                                    >
                                        <span>삭제</span>
                                    </div>
                                </div>
                                <div
                                    className={
                                        styles.Reply__comment_detail_head
                                    }
                                >
                                    <div
                                        className={
                                            styles.Reply__comment_detail_body
                                        }
                                    >
                                        <p>Comment Detail</p>
                                    </div>
                                </div>
                                <div
                                    className={
                                        styles.Reply__comment_detail_line
                                    }
                                ></div>
                                {!showReplyReplyBox ? (
                                    <button
                                        onClick={toggleReplyReplyBox}
                                        className={
                                            styles.Reply__comment_Reply_button
                                        }
                                    >
                                        답글 작성하기
                                    </button>
                                ) : (
                                    <CommentTextarea
                                        id={id}
                                        onClick={toggleReplyReplyBox}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ReplyButton;
