import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LoginButton from './LoginButton/LoginButton';
import { Link } from 'react-router-dom';
import styles from './MainNavigation.module.css';
// import TopbarAlarm from './TopbarAlarm/TopbarAlarm';
// import TopbarDropdown from './Dropdowns/TopbarDropdowns';

const MainNavigation = () => {
    return (
        <div id="top-navbar">
            <Navbar bg="light" data-bs-theme="light">
                <Container>
                    <Navbar.Brand>
                        <Link to="/" className={styles.cancel}>
                            멘토미
                        </Link>
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link>
                            <Link to="mentor" className={styles.cancel}>
                                멘토
                            </Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to="mentee" className={styles.cancel}>
                                멘티
                            </Link>
                        </Nav.Link>
                    </Nav>
                    <Nav className="d-auto">
                        <Nav.Link>
                            <Link to="posting" className={styles.cancel}>
                                새 글 쓰기
                            </Link>
                        </Nav.Link>
                        {/* 로그아웃의 경우 */}
                        <LoginButton />
                        {/* 로그인의 경우 */}
                        {/* <TopbarAlarm /> */}
                        {/* <TopbarDropdown /> */}
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
};

export default MainNavigation;
