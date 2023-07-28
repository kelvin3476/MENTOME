import { useState } from 'react';
import { Button } from 'react-bootstrap';
import LoginModal from '../../../Authentication/LoginModal/LoginModal';
import { redirect } from 'react-router-dom';
import { json } from 'react-router-dom';

const LoginButton = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <>
            <Button variant="light" onClick={() => setModalIsOpen(true)}>
                로그인
            </Button>
            <LoginModal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} />
        </>
    );
};

export default LoginButton;

export async function action() {
    const data = await requestAnimationFrame.formData();
    const authData = {
        email: data.get('email'),
        password: data.get('password'),
    };

    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(authData),
    });

    if (response.status === 422 || response.status === 401) {
        return response;
    }

    if (!response.ok) {
        throw json({ message: 'Could not authenticate user' }, { status: 500 });
    }

    // soon: manage that token
    return redirect('/');
}
