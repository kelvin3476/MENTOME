// import profile from '../../assets/images/img.png';
import styles from './PostCard.module.css';
import { Container, Row, Col } from 'react-bootstrap';

const PostCard = (props) => {
    return (
        <>
            <Container>
                <Row>
                    <div className={styles.CardSize}>
                        <Col>
                            <h1>{props.title}</h1>
                            <div className={styles.left}>
                                <h2> 운동</h2>
                                <h3> {props.value}</h3>
                            </div>
                            <div className={styles.line}></div>
                        </Col>
                        <Col>
                            <div className={styles.left}>
                                <img
                                    src={props.imgurl}
                                    alt="프로필이미지"
                                ></img>
                                <h4> {props.nickname} </h4>
                                <h5> {props.career}년차 </h5>
                            </div>
                        </Col>
                    </div>
                </Row>
            </Container>
        </>
    );
};

export default PostCard;
