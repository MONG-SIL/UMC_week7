import styled from "styled-components";
import { useState , useRef } from "react";
import { useNavigate } from "react-router-dom"

const LoginContainer = styled.div`
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

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
`;

const Input = styled.input`
    border: 1px solid #ccc;
    border-radius: 3px;
    line-height: 35px;
    font-size: 14px;
    padding: 0 10px;
    margin-bottom: 10px;
    width: 100%;
    box-sizing: border-box;
    @media (max-width: 1200px) {
        width:80%
    }
`;

const ErrorMessage = styled.div`
    color: #ff6b6b;
    font-size: 12px;
    margin-bottom: 10px;
`;

const Title = styled.h1`
    margin-bottom: 20px;
    font-weight: 700;
    color: azure;
`;

const Button = styled.button`
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
`;
  

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
        <LoginContainer>
            <Form onSubmit={isLogin}>
            <Title>로그인 하세요</Title>
            <Input name="id" value={id} type="text" placeholder="Id입력" onChange={handleId} required></Input>
            <ErrorMessage ref={idError}  className="error"></ErrorMessage>
            <Input name="password" type="password" placeholder="비밀번호 입력" minLength="4" maxLength="12" onChange={handlePwd}  required></Input>
            <ErrorMessage ref={passwordError1} className="error"></ErrorMessage>
            <Button>로그인</Button>
            </Form>
        </LoginContainer>
)
}

export default Login;