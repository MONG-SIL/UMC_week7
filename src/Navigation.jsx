import { Link } from "react-router-dom";
import styled , { keyframes } from "styled-components";
import { useState } from "react";

const Navbar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffffb7;
    padding: 8px 12px;
    position: relative; /* 추가: 사이드바 토글을 위한 기준 요소로 설정 */
`;


const NavTitle = styled(Link)`
    color: black;
    font-size: x-large;
    font-family: Arial, Helvetica, sans-serif;
    text-decoration: none;
    margin: 10px;

    &:hover {
        transform: scale(1.3);
    }
    &:focus {
        color: blue;
    }
    &:active {
        color: red;
    }

`;
const Navmenu = styled(Link)`
    color: black;
    font-size: x-large;
    font-family: Arial, Helvetica, sans-serif;
    text-decoration: none;
    margin: 10px;

    &:hover {
        transform: scale(1.3);
    }
    &:focus {
        color: blue;
    }
    &:active {
        color: red;
    }

    @media (max-width: 1000px) {
        display: none; /* 추가: 화면이 작아지면 메뉴 숨김 */
    }
`;

const Sidebar = styled.div`
    color: black;
    font-size: x-large;
    font-family: Arial, Helvetica, sans-serif;
    text-decoration: none;
    margin: 10px;

    &:hover {
        transform: scale(1.3);
    }
    &:focus {
        color: blue;
    }
    &:active {
        color: red;
    }

    @media (min-width: 1000px) {
        display: none; 
    }
`;
const SidebarBox = styled.div`
    position: absolute;
    top: 60px; 
    right: 0;
    width: 200px;
    height: calc(100vh - 60px); /* 화면 전체 높이에서 네비게이션 바의 높이를 뺀 값 */
    background-color: #333;
    display: ${({ isOpen }) => (isOpen ? "block" : "none")}; /* isOpen 상태에 따라 사이드바 보이기/숨기기 */
    animation: ${({ isOpen }) => (isOpen ? slideIn : slideOut)} 0.5s ease-in-out; /* isOpen 상태에 따라 애니메이션 적용 */
`;
const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

const SidebarMenu = styled(Link)`
    color: white;
    font-size: large;
    display: block;
    padding: 10px;
    text-decoration: none;

    &:hover {
        background-color: #555;
    }
`;

function Navigation() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 추가: 사이드바 열림 상태를 관리하는 state

    function toggleSidebar() {
        setIsSidebarOpen(!isSidebarOpen); // 추가: 사이드바 열림 상태 변경
    }

    function onLogout() {
        localStorage.removeItem("login-token");
        localStorage.removeItem("login-username");
        setIsSidebarOpen(false); // 로그아웃 시 사이드바 닫기
    }

    return (
        <>
            <Navbar>
                <NavTitle to="/">UMC Movie HOME</NavTitle>
                {!localStorage.getItem("signUp-token") && (
                    <Navmenu to="/signup">회원가입</Navmenu>
                )}
                {localStorage.getItem("login-token") ? (
                    <Navmenu to="/login" onClick={onLogout}>
                        로그아웃
                    </Navmenu>
                ) : (
                    <Navmenu to="/login">로그인</Navmenu>
                )}
                <Navmenu to="/popular">Popular</Navmenu>
                <Navmenu to="/nowplaying">Now Playing</Navmenu>
                <Navmenu to="/toprated">Top Rated</Navmenu>
                <Navmenu to="/upcoming">Upcoming</Navmenu>


                <Sidebar onClick={toggleSidebar}>☰</Sidebar> {/* 추가: 사이드바 토글 버튼 */}
      
            </Navbar>
            <SidebarBox isOpen={isSidebarOpen}> {/* 추가: isOpen 상태를 props로 전달하여 사이드바 보이기/숨기기 */}
                {localStorage.getItem("login-token") ? (
                    <SidebarMenu to="/login" onClick={onLogout}>
                        로그아웃
                    </SidebarMenu>
                ) : (
                    <SidebarMenu to="/login">로그인</SidebarMenu>
                )}
                <SidebarMenu to="/popular" onClick={toggleSidebar}>Popular</SidebarMenu>
                <SidebarMenu to="/nowplaying" onClick={toggleSidebar}>Now Playing</SidebarMenu>
                <SidebarMenu to="/toprated" onClick={toggleSidebar}>Top Rated</SidebarMenu>
                <SidebarMenu to="/upcoming" onClick={toggleSidebar}>Upcoming</SidebarMenu>
            </SidebarBox>
        </>
    );
}

export default Navigation;
