import Dropdown from 'react-bootstrap/Dropdown';
import { Person } from 'react-bootstrap-icons';

function TopbarDropdown() {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
                <Person />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="mypage">마이 페이지</Dropdown.Item>
                <Dropdown.Item href="">멘토링 신청하기</Dropdown.Item>
                <Dropdown.Item href="account-setting">설정</Dropdown.Item>
                <Dropdown.Item href="logout">로그아웃</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default TopbarDropdown;
