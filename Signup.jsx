import styled from "styled-components";
import { useState , useRef } from "react";
import { useNavigate } from "react-router-dom"
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
const Submitbtn = styled.button`   
    cursor: pointer;
    height: 40px;
    width: 100%;
    color:white;
    background-color: gray;
`

const Wrapper =styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background: 20254f;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Container = styled.div`
    height: 60%;
    width:40%;
    display: flex;
    justify-content: center; 
    background: black; 
`
const Sh1 = styled.h1` 
    color: white; 
`
const Sdiv = styled.div` 
    color: white; 
`


function Signup () {
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [pwd, setPwd] = useState("");
    const [pwdCh, setPwdCh] = useState("");


    const nameError = useRef(null);
    const idError = useRef(null);
    const emailError = useRef(null);
    const ageError =useRef(null);
    const passwordError1 = useRef(null);
    const passwordError2 = useRef(null);

    let allow = true; 
    
    const handleName = (event) => {
        const data = event.target.value 
        setName(data);
        if(data === ""){
            nameError.current.innerHTML="이름을 입력해 주세요";
            allow = false
        }
        else{
            nameError.current.innerHTML="멋진 이름이네요!";
        }
        validCheck();
    };
    const handleId = (event) => {
        const data = event.target.value 
        setId(data);
        if(data === ""){
            idError.current.innerHTML="id를 입력해 주세요";
            allow = false
        }
        else{
            idError.current.innerHTML="좋은 id네요!";
        }
        validCheck();
    };
    const handleEmail = (event) => {
        const data = event.target.value 
        setEmail(data);
        if(data === ""){
            emailError.current.innerHTML="이메일을 입력해 주세요.";
        }
        else if(data.includes("@")){
            let emailId = data.split('@')[0] //@의 앞부분
            let emailServer = data.split('@')[1] //@의 뒷부분
            if(emailId ==="" || emailServer === ""){
                emailError.current.innerHTML="이메일이 올바르지 않습니다."
                allow = false;
            }
            else{
                emailError.current.innerHTML="올바른 이메일 형식입니다."
            }
        }
        else{
            emailError.current.innerHTML="이메일은 @를 포함하는 형식이어야 합니다."
            allow = false;
        }
        validCheck();
    };
    const handleAge = (event) => {
        const data = event.target.value 
        setAge(data);
        if(data === ""){
            ageError.current.innerHTML="나이를 입력해주세요."
            allow = false;
        }
        else if(data <= 0){  //string 이랑 0이랑 크기 비교가 되네
            ageError.current.innerHTML="나이는 양의 정수여야 합니다."
            allow = false;
            
        }
        else if (data < 19){
            ageError.current.innerHTML="나이가 너무 어립니다."
            allow = false;
        }
        else if(isNaN(data)){
            ageError.current.innerHTML="나이를 숫자로 입력해주세요."
            allow = false;
        }
        else if(Number.isInteger(Number(data)) === false){
            ageError.current.innerHTML="나이를 정수로 입력해주세요."
            allow = false;
        }
        else{
            ageError.current.innerHTML="올바른 나이 형식입니다."
        }
        validCheck();
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
            if(data === pwdCh){ //일치하면
                passwordError1.current.innerHTML="올바른 형식의 비밀번호입니다!"
                passwordError2.current.innerHTML="올바른 형식의 비밀번호입니다!"
            }
            else{ //불일치
                passwordError1.current.innerHTML="비밀번호가 동일하지 않습니다."
                passwordError2.current.innerHTML="비밀번호가 동일하지 않습니다."
                allow = false
            }
    
        }
        else{
            passwordError1.current.innerHTML="비밀번호는 4자 이상 12자 이하, 영문, 숫자, 특수문자의 조합이여야 합니다."
            allow=false
        }
        if(pwd ===""){
            passwordError2.innerHTML="비밀번호가 동일하지 않습니다."
            allow = false
        }
        validCheck();
    };
    const handlePwdCh = (event) => {
        const data = event.target.value 
        setPwdCh(data);
        if(data === pwd){ //일치하면
            passwordError1.current.innerHTML=""
            passwordError2.current.innerHTML=""
        }
        else{ //불일치
            passwordError1.current.innerHTML="비밀번호가 동일하지 않습니다."
            passwordError2.current.innerHTML="비밀번호가 동일하지 않습니다."
            allow = false
        }
        validCheck();
    };

    function validCheck(){
    
        if(allow){
            nameError.innerHTML=""
            emailError.innerHTML=""
            ageError.innerHTML=""
            passwordError1.innerHTML=""
            passwordError2.innerHTML=""
            //opens();
        }   
    }
    const navigate = useNavigate();

    function register(event){
        event.preventDefault();
        if(allow){
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData);
            console.log('data', data);
            alert("회원가입 성공");
            fetch('http://localhost:8080/auth/signup', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ // 요청 JSON 형태로 보내기 
                'name':data.name,
                'username': data.id,
                'email':data.email,
                'age':data.age,
                'password': data.password,
                'passwordCheck':data.password
            })
            })
            .then(response => response.json()) // json 
            .then(response => {
            if (response.token) {localStorage.setItem('signUp-token', response.token);}}
        
        )

            navigate(`/login`);
        }
    }

    
    const goLogin = () => {
        navigate(`/login`);
    }

    

    return(
        <Wrapper>
            <Container>
        <form onSubmit={register}>
        <Sh1>회원가입</Sh1> 

        <Signinput name="name" value={name} type="text" placeholder="홍길동" onChange={handleName} required></Signinput>
        <Errordiv ref={nameError}  className="error"></Errordiv>

        <Signinput name="id" value={id} type="text" placeholder="id 입력" onChange={handleId} required></Signinput>
        <Errordiv ref={idError}  className="error"></Errordiv>
        

        <Signinput name="email" value={email} type="text" placeholder="이메일 입력" onChange={handleEmail} required></Signinput>
        <Errordiv ref={emailError}  className="error"></Errordiv>
   

        <Signinput name="age" value={age} type="text" placeholder="나이 입력" onChange={handleAge} required></Signinput>
        <Errordiv ref={ageError} className="error"></Errordiv>
   

        <Signinput name="password" type="password" placeholder="비밀번호 입력" minLength="4" maxLength="12" onChange={handlePwd}  required></Signinput>
        <Errordiv ref={passwordError1} className="error"></Errordiv>
   

        <Signinput name="passwordCheck" type="password" placeholder="비밀번호 한번 더 입력" onChange={handlePwdCh} required></Signinput>
        <Errordiv ref={passwordError2} className="error"></Errordiv>
        
        <Submitbtn> 가입하기 </Submitbtn>
        <Sdiv> 아이디가 있으신가요 ? </Sdiv>
        <Submitbtn onClick={goLogin}>로그인 창으로 이동하기</Submitbtn>

        </form>
        
        </Container>
        </Wrapper>
    )
}


export default Signup;