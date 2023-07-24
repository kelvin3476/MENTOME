import { useEffect, useState } from 'react';

import { Container, Col, Row } from 'react-bootstrap';
import PostCard from '../../UI/Card/PostCard';

const MentoringWrappers = () => {
    const [data, setData] = useState([]);

    // 더미 데이터 배열 정의
    const dummyData = [
        {
            id: 1,
            title: '더미 제목1',
            value: '더미 종목1',
            career: 2,
            nickname: '더미 닉네임1',
            imgurl: 'https://i.ytimg.com/vi/oKUEbsJDvuo/maxresdefault.jpg'
        },
        {
            id: 2,
            title: '더미 제목2',
            value: '더미 종목2',
            career: 3,
            nickname: '더미 닉네임2',
            imgurl: 'https://i.ytimg.com/vi/oKUEbsJDvuo/maxresdefault.jpg'
        },
        {
            id: 3,
            title: '더미 제목3',
            value: '더미 종목3',
            career: 3,
            nickname: '더미 닉네임3',
            imgurl: 'https://i.ytimg.com/vi/oKUEbsJDvuo/maxresdefault.jpg'
        },
        {
            id: 4,
            title: '더미 제목4',
            value: '더미 종목4',
            career: 4,
            nickname: '더미 닉네임4',
            imgurl: 'https://i.ytimg.com/vi/oKUEbsJDvuo/maxresdefault.jpg'
        },
        {
            id: 5,
            title: '더미 제목5',
            value: '더미 종목5',
            career: 5,
            nickname: '더미 닉네임5',
            imgurl: 'https://i.ytimg.com/vi/oKUEbsJDvuo/maxresdefault.jpg'
        },
        {
            id: 6,
            title: '더미 제목6',
            value: '더미 종목6',
            career: 6,
            nickname: '더미 닉네임6',
            imgurl: 'https://i.ytimg.com/vi/oKUEbsJDvuo/maxresdefault.jpg'
        }

        // 더미 데이터 추가...
    ];

    useEffect(() => {
        // 서버로부터 데이터를 가져오는 API 요청
        // 실제 서버로 연결할 때는 fetch 요청 대신 더미 데이터를 사용하려면 아래 코드 주석 처리 후에 위의 dummyData를 사용하세요.
        // fetch('/api/data')
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setData(data);
        //     })
        //     .catch((error) => {
        //         console.error('Error fetching data:', error);
        //     });

        // 더미 데이터로 설정
        setData(dummyData.slice(0, 5));
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Container>
                <Row xs={1} md={3} lg={5} className="g-3">
                    {data.map((item) => (
                        <Col>
                            <PostCard
                                key={item.id}
                                title={item.title}
                                value={item.value}
                                career={item.career}
                                nickname={item.nickname}
                                imgurl={item.imgurl}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default MentoringWrappers;
