import styles from './registerguide.module.css';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const RegisterGuide = () => {
    return (
        <>
            <Container className={styles.margin}>
                <Row>
                    <Col className={styles.colWithBorderRight}>
                        <h3 className={styles.h3}>
                            멘티님! 멘토미에서
                            <br />
                            멘토링을 받아보세요
                        </h3>

                        <div className={styles.button}>
                            <Link to="mentor">멘토님 찾아보기</Link>
                        </div>
                    </Col>
                    <Col>
                        <h3 className={styles.h3}>
                            솜씨를 뽐내주실 멘토님,
                            <br />
                            여기 계시네요!
                        </h3>

                        <div className={styles.button}>
                            <Link to="mentee">멘티님 찾아보기</Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default RegisterGuide;
