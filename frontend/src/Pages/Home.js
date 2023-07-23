// 메인 페이지

import React from 'react';
import Header from '../components/Header/Header';
import RegisterGuide from '../components/registerguide/registerguide';
import MentoringWrappers from '../components/MentoringWrappers.js/mentoringwrapper';
import { Container, Row } from 'react-bootstrap';
import styles from './Pages.module.css';
function Home() {
    return (
        <>
            <div>
                <Header />
                <br />
                <RegisterGuide />
                <br />
                <Container>
                    <div className={styles.home}>
                        <h1>멘토</h1>
                        <h5>멘토 더보기</h5>
                    </div>
                    <Row>
                        <MentoringWrappers />
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <div className={styles.home}>
                            <h1>멘티</h1>
                            <h5>멘티 더보기</h5>
                        </div>
                    </Row>
                    <Row>
                        <MentoringWrappers />
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default Home;
