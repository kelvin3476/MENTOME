import ArrowModal from '../../../Assets/Icon/ArrowModal';
import ExitButton from '../../../Assets/Icon/ExitButton';
import styles from './AlarmModal.module.css';
// import { Button } from 'react-bootstrap';
import { Bell } from 'react-bootstrap-icons';
import { useState, useEffect, useRef } from 'react';


const AlarmModal = ({ id }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const outside = useRef();

    // 모달 열기 이벤트 핸들러
    const handleOpenModal = () => {
        setModalOpen(true);
    };

    // 모달 닫기 이벤트 핸들러
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleClickOutside = ({ target }) => {
        if (isModalOpen && !outside.current.contains(target))
            setModalOpen(false);
    };

    useEffect(() => {
        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.header_member__block}>
            <button
                variant='light'
                onClick={isModalOpen ? handleCloseModal : handleOpenModal}
            >
                <Bell />
            </button>
            {isModalOpen && (
                <>
                    <div
                        className={styles.modal_overlay}
                        onClick={handleCloseModal}
                    ></div>
                    <div
                        data-layer='newsfeed'
                        className={styles.layer_header_member}
                        ref={outside}
                        onClick={(e) => {
                            if (e.target === outside.current)
                                setModalOpen(false);
                        }}
                    >
                        <div className={styles.newfeed_container}>
                            <div className={styles.newsfeed_header}>
                                <p className={styles.newsfeed_header_notice}>
                                    입장 후 접속이 끊기면 알림창을 통해서
                                    재입장이 가능합니다.
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
                                            className={
                                                styles.newsfeed_item_read
                                            }
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
                                                    {id}님으로 부터 멘토링 신청이
                                                    도착했어요!
                                                </h3>
                                                <p
                                                    className={
                                                        styles.newsfeed_item_infobox__message
                                                    }
                                                >
                                                    클릭시 수락이 되어,
                                                    미팅방으로 입장됩니다. 💻
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
                </>
            )}
        </div>
    );
};

export default AlarmModal;
