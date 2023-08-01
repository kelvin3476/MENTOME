import ArrowModal from '../../../Assets/Icon/ArrowModal';
import ExitButton from '../../../Assets/Icon/ExitButton';
import styles from './AlarmModal.module.css';
import { Button } from 'react-bootstrap';
import { Bell } from 'react-bootstrap-icons';
import { useState } from 'react';
const AlarmModal = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    // 모달 열기 이벤트 핸들러
    const handleOpenModal = () => {
        setModalOpen(true);
    };

    // 모달 닫기 이벤트 핸들러
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div className={styles.header_member__block}>
            <button
                variant='light'
                onClick={isModalOpen ? handleCloseModal : handleOpenModal}
            >
                <Bell />
            </button>
            {isModalOpen && (
                <div
                    data-layer='newsfeed'
                    className={styles.layer_header_member}
                >
                    <div className={styles.newfeed_container}>
                        <div className={styles.newsfeed_header}>
                            <p className={styles.newsfeed_header_notice}>
                                입장 후 접속이 끊기면 알림창을 통해서 재입장이
                                가능합니다.
                                <br />
                                알림이 오지 않을 시 새로고침을 해 보세요!
                            </p>
                            <button
                                type='button'
                                className={styles.newsfeed_close_button}
                                onClick={handleCloseModal}
                            >
                                <ExitButton />
                            </button>
                        </div>
                        {/*  */}
                        <div className={styles.newsfeed_list_container}>
                            <ul>
                                <li className={styles.newsfeed_item}>
                                    {/* a태그 생략 */}
                                    <div
                                        className={styles.newsfeed_item_read}
                                        style={{ display: 'none' }}
                                    ></div>
                                    <div
                                        className={
                                            styles.newsfeed_item_container
                                        }
                                    >
                                        <div
                                            className={
                                                styles.newsfeed_item_infobox
                                            }
                                        >
                                            <p
                                                className={
                                                    styles.newsfeed_item_infobox__date
                                                }
                                            >
                                                초대정보 · 1분 전
                                            </p>
                                            <h3
                                                className={
                                                    styles.newsfeed_item_infobox__title
                                                }
                                            >
                                                Id님으로 부터 멘토링 신청이
                                                도착했어요!
                                            </h3>
                                            <p
                                                className={
                                                    styles.newsfeed_item_infobox__message
                                                }
                                            >
                                                클릭시 수락이 되어, 미팅방으로
                                                입장됩니다. 💻
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.layer_header_member__arrow}>
                        <ArrowModal />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AlarmModal;
