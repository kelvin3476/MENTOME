// 멘토 게시판
import { Container, Row } from 'react-bootstrap';
import Header from '../Components/Home/Header/Header';
import MentoringWrappers from '../Components/Home/MentoringWrappers/Mentor/MentoringWrapper';
import styles from './Mentor.module.css';
function Mentor() {
    return (
        <>
            <Header />
            <Container>
                <Row>
                    <div className={styles.margin}>
                        <h1 className={styles.font__mentee}>멘토게시판</h1>
                        <MentoringWrappers />
                    </div>
                </Row>
            </Container>
        </>
    );
}

export default Mentor;
