// 메인 페이지

import React from 'react';
import Header from '../Components/Home/Header/Header';
import RegisterGuide from '../Components/Home/RegisterGuide/RegisterGuide';
import MentoringWrappers from '../Components/Home/MentoringWrappers/MentoringWrapper';
import { Container, Row } from 'react-bootstrap';

import IntroTitle from '../Components/UI/IntroTitle/IntroTitle';

function Home() {
    return (
        <>
            <div>
                <Header />

                <RegisterGuide />
                <Container>
                    <IntroTitle name="멘토" url="mentor" />
                    <Row>
                        {/* <PostCard /> */}
                        <MentoringWrappers />
                    </Row>
                </Container>
                <Container>
                    <IntroTitle name="멘티" url="mentee" />
                    <Row>
                        <MentoringWrappers />
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default Home;
