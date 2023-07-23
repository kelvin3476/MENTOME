import React from 'react';
import styles from './naverButton.module.css';

const NaverButton = ({ onClick }) => (
    <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={onClick}>
            <svg
                width="50"
                height="50"
                viewBox="0 0 512 512"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill="#FFFFFF"
                    d="M9 32V480H181.366V255.862L331.358 480H504V32H331.358V255.862L181.366 32H9Z"
                ></path>
            </svg>
        </button>
        <p className={styles.loginDescription}>Naver 로그인</p>
    </div>
);

export default NaverButton;
