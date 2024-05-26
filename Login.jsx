import styled from "styled-components";
import { useState , useRef } from "react";
import { useNavigate } from "react-router-dom"

const Movie_search = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 100;
    left: 0;
    background: 20254f;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Errordiv = styled.div`
    padding-top: 3px;
    padding-bottom: 8px;
    color:white;
`
const Signinput = styled.input`
    border: 1px solid black;
    border-radius: 3px;
    line-height: 35px;
    font-size: 12px;
    padding-left: 10px;
    padding-right: 10px;
    border-color: rgb(246, 249, 249);
    background-color:white;
`

const Home_h1 = styled.h1 `
    position: relative;
    margin: 0;
    font-weight: 700;
    text-decoration: none;
    color: azure;
    `
  

function Login () {
    const [id, setId] = useState("");
    const [pwd, setPwd] = useState("");

    const idError = useRef(null);
    const passwordError1 = useRef(null);

    let allow = true; 

    const handleId = (event) => {
        const data = event.target.value 
        setId(data);
        if(data === ""){
            idError.current.innerHTML="id를 입력해 주세요";
            allow = false
        }
        else{
            idError.current.innerHTML="멋진 id네요!";
        }
    };

    const handlePwd = (event) => {
        const data = event.target.value 
        setPwd(data);
        const REGPASSSWORD = /(?=.*\d{1,50})(?=.*[~`!@#$%^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{4,12}$/;
        
        if(data===""){
            passwordError1.current.innerHTML="비밀번호를 입력해주세요."
            allow = false
        }
        else if(REGPASSSWORD.test(data)){// 비밀번호 형식을 통과하면
            passwordError1.current.innerHTML="올바른 형식의 비밀번호입니다!"
        }
        else{
            passwordError1.current.innerHTML="비밀번호는 4자 이상 12자 이하, 영문, 숫자, 특수문자의 조합이여야 합니다."
            allow=false
        }
    };

    const navigate = useNavigate();

    function isLogin(event){ // 로그인 확인 이벤트
        event.preventDefault();
        if(allow){
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData);
            console.log(data); // 로그인 데이터, id pwd
            if(data == null){ // 데이터가 없으면 종료
                return null;
            }
            fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ // 요청 JSON 형태로 보내기 
                'username': data.id,
                'password': data.password,

            })
            })
            .then(response => response.json())
            .then(response => {
            {localStorage.setItem('login-token', response.token), localStorage.setItem('login-username', response.username)} 
            })
            if(localStorage.getItem("login-token") !== null ){
                navigate(`/`);
            }
        }
    }


    return(
        <Movie_search>
            <form onSubmit={isLogin}>
            <Home_h1>로그인 하세요</Home_h1>
            <Signinput name="id" value={id} type="text" placeholder="Id입력" onChange={handleId} required></Signinput>
            <Errordiv ref={idError}  className="error"></Errordiv>
            <Signinput name="password" type="password" placeholder="비밀번호 입력" minLength="4" maxLength="12" onChange={handlePwd}  required></Signinput>
            <Errordiv ref={passwordError1} className="error"></Errordiv>
            <button>로그인</button>
            </form>
        </Movie_search>
)
}

export default Login;