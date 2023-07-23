// 새글쓰기
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import EditorBox from '../components/UI/Editor/Editor';
import axios from 'axios';
function Posting() {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        // career: '',
        sport: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleEditorChange = (content) => {
        setFormData((prevData) => ({ ...prevData, content }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('/api/content/uploadpost', formData)
            .then((response) => {
                // 요청이 성공적으로 처리된 경우의 작업
                console.log('요청이 성공적으로 처리되었습니다.', response);
            })
            .catch((error) => {
                // 요청이 실패한 경우의 작업
                console.error('요청이 실패하였습니다.', error);
            });
    };

    return (
        <>
            <Container>
                <form onSubmit={handleSubmit}>
                    <textarea
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="제목을 입력하세요"
                        style={{ height: '66px' }}
                    ></textarea>
                    <input
                        type="text"
                        name="sport"
                        value={formData.sport}
                        onChange={handleChange}
                        placeholder="운동 종목을 입력하세요"
                    ></input>
                    <EditorBox
                        name="content"
                        value={formData.content}
                        onChange={(e) => handleEditorChange(e.target.value)}
                    />

                    <button>나가기</button>
                    <button type="submit">저장하기</button>
                </form>
            </Container>
        </>
    );
}

export default Posting;
