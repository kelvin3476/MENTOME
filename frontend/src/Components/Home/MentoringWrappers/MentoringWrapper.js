import { useEffect, useState } from 'react';

import { Container, Col, Row } from 'react-bootstrap';
import PostCard from '../../UI/Card/PostCard';
import axios from 'axios';
import styles from './MentoringWrapper.module.css';

const MentoringWrappers = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get('/api/content/getallcontents')
            .then((response) => {
                console.log(response.data);
                setData(response.data.slice(response.data.length - 4, response.data.length));
                // setData(response.data);
            })
            .catch((error) => {
                console.error('Error data:', error);
            });
    }, []);

    return (
        <>
            <Container>
                {/* <Row xs={1} md={3} lg={5} className="g-3"> */}
                <div className={styles.cards}>
                    {data.map((item) => (
                        // <Col>
                        <PostCard
                            key={item._id}
                            id={item._id}
                            title={item.title}
                            value={item.sport}
                            career={item.career}
                            nickname={item.writer}
                            imgurl={item.imgurl}
                        />
                        // </Col>
                    ))}
                </div>
                {/* </Row> */}
            </Container>
        </>
    );
};

export default MentoringWrappers;
