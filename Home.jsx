import styled from "styled-components";
import { useState , useEffect} from "react";
import Movie from "./Movie";
import { debounce } from 'throttle-debounce';

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

const Find_movie= styled.input`
    width: 600px;
    height: 50px;
    font-size: 20px;
    border: 0;
    border-radius: 15px;
    padding-left: 10px;
    background-color: rgb(233, 233, 233);
  `

const Home_h1 = styled.h1 `
    position: relative;
    margin: 0;
    font-weight: 700;
    text-decoration: none;
    color: azure;
    `
const Container = styled.div`
    height: 80%;
    width:80%;
    display: flex;
    justify-content: center;
    overflow:auto; 
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.4);
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.3);
      border-radius: 6px;
    }
  `   
const Movies = styled.div `
  display: grid;
  grid-template-columns: repeat(4, minmax(400px, 1fr));
  grid-gap: 30px;
  padding: 50px;
  width: 80%;
  padding-top: 70px;
  justify-content: center;
`
function Home () {
  const [movieName, setMovieName] = useState("");
  const [movieSearch, setMovieSearch] = useState("");
  const [loading, setLoading] = useState(false);
  

  const option1 = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWEyZjBhODgyN2IzNmE0NWJiZDQ1YjI3NDExNzg0YiIsInN1YiI6IjY2MWRkYjNkNmQ5ZmU4MDE2MzVmYzE1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BCGVvOvJf0LcX3u13h_BpX3vdUn67gmsScVeWhXCr38'
      }
    };
  async function getmovie() {
    fetch(`https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`, option1)
      .then(response => response.json())
      .then(response => setMovieSearch(response.results), setLoading(false))
      .catch(err => console.error(err));
  }
 /*
  const option2 = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3MTY3MzI5NTczNjYiLCJpYXQiOjE3MTY3MzUyMDcsImV4cCI6MTcxNjczNTM3OX0.-RbWmKc2u3N7Dkxv9m0jwxwSVyerf2tKWrgF_vDoJ50'
    }
  };
  async function getToken() {
  fetch(`http://localhost:8080/auth/me`, option2)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err.message))
  }
 */
  useEffect(()=> {
  //  getToken()
    getmovie()
  },[movieName]) 

  const debounceFunc = debounce(1000, (event) => {
    setLoading(true)
   setMovieName(event.target.value);
  });


  
  return(
      <Movie_search>
          {localStorage.getItem('login-token') ?<Home_h1> {localStorage.getItem('login-username')}님 환영합니다!!!! </Home_h1>: <Home_h1> 환영합니다!!</Home_h1>}
          <Find_movie placeholder="영화 찾기" onChange={debounceFunc}></Find_movie><div>🛩✈</div>
          <Container>
            {movieName ? <Movies>{movieSearch.map((item) => <Movie key={item.id} title={item.title} img={item.poster_path} review={item.overview} rate={item.vote_average} id={item.id}/> )}</Movies> : null }
            {loading ? <Home_h1>데이터를 받아오는 중입니다...</Home_h1> : null};
          </Container>            
      </Movie_search>

      
)
}

export default Home;




