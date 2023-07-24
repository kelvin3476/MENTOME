// 회원가입 페이지
import axios from 'axios';
import { json } from 'react-router-dom';
import styles from './signup.module.css';
import { useState } from 'react';

import { Link } from 'react-router-dom';
// import { RegisterUser } from '../components/Authentication/RegisterUser/RegisterUser';
import Input from '../components/UI/Input/Input';
import SignupButton from '../components/UI/Button/SignupButton';

function Signup(props) {
    // 초기값 세팅 - 아이디 , 닉네임 , 비밀번호
    const [Id, setId] = useState('');
    const [Name, setName] = useState('');
    const [Password, setPassword] = useState('');
    // 오류메시지 상태 저장
    const [idMessage, setIdMessage] = useState('');
    const [nameMessage, setNameMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');

    // 유효성 검사
    // eslint-disable-next-line
    const [isId, setIsId] = useState(false);
    // eslint-disable-next-line
    const [isName, setIsName] = useState(false);
    // eslint-disable-next-line
    const [isPassword, setIsPassword] = useState(false);

    // id
    const onChangeId = (e) => {
        const currentId = e.target.value;
        setId(currentId);
        const idRegExp = /^[a-zA-z0-9]{4,12}$/;

        if (!idRegExp.test(currentId)) {
            setIdMessage('4-12사이 대소문자 또는 숫자만 입력해 주세요!');
            setIsId(false);
        } else {
            setIdMessage('사용가능한 아이디 입니다.');
            setIsId(true);
        }
    };

    // name
    const onChangeName = (e) => {
        const currentName = e.target.value;
        setName(currentName);

        if (currentName.length < 2 || currentName.length > 5) {
            setNameMessage('닉네임은 2글자 이상 5글자 이하로 입력해주세요!');
            setIsName(false);
        } else {
            setNameMessage('사용가능한 닉네임 입니다.');
            setIsName(true);
        }
    };

    // pwd
    const onChangePassword = (e) => {
        const currentPassword = e.target.value;
        setPassword(currentPassword);
        const passwordRegExp =
            /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        if (!passwordRegExp.test(currentPassword)) {
            setPasswordMessage(
                '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!'
            );
            setIsPassword(false);
        } else {
            setPasswordMessage('안전한 비밀번호 입니다.');
            setIsPassword(true);
        }
    };

    const isFormValid = isId && isName && isPassword;
    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const formData = new FormData();
    //     formData.append('userId', Id);
    //     formData.append('password', Password);
    //     formData.append('nickname', Name);

    //     try {
    //         const response = await fetch(
    //             'http://localhost:5000/api/account/signup',
    //             {
    //                 method: 'POST',
    //                 body: formData
    //             }
    //         );

    //         if (response.ok) {
    //             console.log('회원가입 성공!');
    //             // 성공적으로 회원가입 완료 후 리다이렉트 또는 다른 처리 수행
    //         } else {
    //             console.log('회원가입 실패:', response.statusText);
    //             // 기타 상태 코드에 따른 처리
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //         // 에러 처리
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isFormValid) {
            try {
                const response = await axios.post('/api/account/signup', {
                    userId: Id,
                    password: Password,
                    nickname: Name
                });
                console.log(response.status);
                if (response.status === 200) {
                    // 성공적으로 회원가입 완료
                    console.log('회원가입 성공!');
                    console.log(response.status);
                    window.location.href = '/';
                    // console.log(response.status)
                } else if (response.status === 422 || response.status === 401) {
                    return response;
                } else {
                    // 기타 상태 코드에 따른 처리
                    console.log('회원가입 실패:', response.statusText);
                }
                if (!response.ok) {
                    throw json(
                        { message: 'Could not authenticate user.' },
                        { status: 500 }
                    );
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    // if (response.status === 422 || response.status === 401) {
    //     return response;
    // }

    return (
        <>
            <div className={styles.basicset}></div>
            <div className={styles.header}>
                <h1>환영합니다!</h1>
                <div className={styles.description}>
                    기본 회원 정보를 등록해주세요.
                </div>
                <div className={styles.contents}>
                    <div className={styles.contentschild}>
                        <form onSubmit={handleSubmit}>
                            <Input
                                label="아이디"
                                placeholder="아이디를 입력하세요"
                                name="userId"
                                size="20"
                                warning={idMessage}
                                onChange={onChangeId}
                            />
                            <Input
                                label="비밀번호"
                                placeholder="비밀번호를 입력하세요"
                                type="password"
                                name="password"
                                size="25"
                                warning={passwordMessage}
                                onChange={onChangePassword}
                            />
                            <Input
                                label="닉네임"
                                placeholder="닉네임을 입력하세요"
                                name="nickname"
                                size="17"
                                warning={nameMessage}
                                onChange={onChangeName}
                            />
                            <div className={styles.formBottom}>
                                <div className={styles.error}>
                                    {idMessage} <br />
                                    {passwordMessage} <br />
                                    {nameMessage}
                                </div>
                                <div className={styles.buttons}>
                                    <Link to="/">
                                        <SignupButton
                                            color="lightGray"
                                            type="button"
                                            styles={styles.buttonGray}
                                            name="취소"
                                        ></SignupButton>
                                    </Link>
                                    <SignupButton
                                        color="teal"
                                        type="submit"
                                        styles={styles.buttonTeal}
                                        name="다음"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;
