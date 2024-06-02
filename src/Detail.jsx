import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { useState , useEffect} from "react";
import Credits from "./Credits"

const Container = styled.div`
    padding: 20px;
`;

const MovieContainer = styled.div`
    display: flex;
    margin-bottom: 40px;
`;

const MovieImg = styled.img`
    width: 500px; 
    height: auto;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    margin-right: 20px;
    @media (max-width: 1200px) {
        width: 300px;
    }
`;

const MovieDetail = styled.div`
    flex: 1;
`;

const DetailTitle = styled.h1`
    margin: 0;
    font-weight: 700;
    color: azure;
    margin-bottom: 10px;
`;

const Rating = styled.div`
    margin-bottom: 10px;
    font-size: 1.2em;
    color: rgb(236, 236, 157);
`;

const Review = styled.p`
    margin-bottom: 20px;
    color: #fff;
`;

const CreditContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(150px, 1fr));
    grid-gap: 20px;

    @media (max-width: 2000px) {
        grid-template-columns: repeat(3, minmax(150px, 1fr));
    }
      @media (max-width: 1500px) {
      grid-template-columns: repeat(2, minmax(150px, 1fr));
    }
      @media (max-width: 1000px) {
      grid-template-columns: repeat(1, minmax(150px, 1fr));
    }
`;
function Detail () {
    const {state} = useLocation();
    const [credit, setCredit] = useState("");
 
    const x = useParams(); //id값 받아오기
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWEyZjBhODgyN2IzNmE0NWJiZDQ1YjI3NDExNzg0YiIsInN1YiI6IjY2MWRkYjNkNmQ5ZmU4MDE2MzVmYzE1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BCGVvOvJf0LcX3u13h_BpX3vdUn67gmsScVeWhXCr38'
        }
      };
      
      
    async function getmovie() {//받아온 id 값으로 fetch credit
        fetch(`https://api.themoviedb.org/3/movie/${x.title}/credits?language=en-US`, options)
        .then(response => response.json())
        .then(response => setCredit(response.cast))
        .catch(err => console.error(err));
  }
  useEffect(()=> {
    getmovie()
  },[]) 
  //setCredit(24);
  

    return(
    
        <Container>
            <MovieContainer>
                <MovieImg className="movie__img" src={`https://image.tmdb.org/t/p/w500${state.img}`} />
                <MovieDetail>
                    <DetailTitle>{state.title}</DetailTitle>
                    <Rating>{state.rate ? "⭐".repeat(state.rate):" 이 영화에 대한 평점이 없습니다!"}</Rating>
                    {state.review ? <Review>{state.review}</Review> : <Review> 해당 영화에 대한 리뷰가 없습니다! </Review> }
                </MovieDetail>
            </MovieContainer>
            {credit ? <CreditContainer>{credit.map((item) =>  <Credits key={item.name} name={item.name} profile={item.profile_path} /> )} </CreditContainer>: null } 
        </Container>
        
    )
}//(item) => <div> name={item.name} profile={item.profile_path} </div>

export default Detail; //