import styled from 'styled-components';

// 스타일드 컴포넌트를 함수 외부로 이동
const MovieWrapper = styled.div `
    background-color: rgb(71, 88, 113);
    margin-bottom: 70px;
    font-weight: 300;
    padding: 10px;
    border-radius: 5px;
    color: #adaeb9;
    display: grid;
    grid-gap: 10px;
    text-decoration: none;
    color: inherit;
    width: 400px;
`

const WrapImg = styled.div`
    position: relative;
`

const ProfileImg = styled.img`
    position: relative;
    top: -50px;
    width: 100%;
    box-shadow: 0 30px 60px -12px rgba(50, 50, 93, 0.25),
    0 18px 36px -18px rgba(0, 0, 0, 0.3), 0 -12px 36px -8px rgba(0, 0, 0, 0.025);
`

const MovieTitle = styled.h1 `
    position: relative;
    margin: 0;
    font-weight: 700;
    text-decoration: none;
`

const Rating = styled.div` 
    text-align: right;
    color: rgb(236, 236, 157);
`

const MovieReview = styled.div` 
    position: absolute;
    margin: 0;
    font-weight: 700;
    text-decoration: none;
    font-size: x-large;
    color: azure;
    top:0;
`

const WrapTitle = styled.div`
    position: relative;
    display: flex;
`

function Credits ({name,profile}) {
      
    return(
        <MovieWrapper>
            <WrapImg>
                {profile ? <ProfileImg  src={`https://image.tmdb.org/t/p/w500${profile}`} ></ProfileImg> : <ProfileImg src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7ztleRwzXhFdiwBYqZ8cib9RvEsukVVUS3niN1YQ&s"></ProfileImg>}
            </WrapImg>
            <WrapTitle>
                <MovieTitle> {name} </MovieTitle> 
            </WrapTitle>
        </MovieWrapper>
    )
}

export default Credits;
