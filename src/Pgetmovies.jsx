import { useState, useEffect } from 'react'
import Movie from './Movie';
import Spinner from './assets/Spinner.gif'
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
` 
const Movies = styled.div `
  display: grid;
  grid-template-columns: repeat(4, minmax(200px, 1fr)); 
  grid-gap: 20px;
  padding: 50px;
  width: 80%;
  padding-top: 70px;
  justify-content: center;

  @media (max-width: 2000px) {
    grid-template-columns: repeat(3, minmax(200px, 1fr));
}
  @media (max-width: 1500px) {
  grid-template-columns: repeat(2, minmax(200px, 1fr));
}
  @media (max-width: 1000px) {
  grid-template-columns: repeat(1, minmax(200px, 1fr));
}
`

function Pgetmovies() {
  const [loading, setLoading] = useState(true);
  const [movies , setMovies] = useState([]); 
  const [pages, setPages] = useState(1);
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWEyZjBhODgyN2IzNmE0NWJiZDQ1YjI3NDExNzg0YiIsInN1YiI6IjY2MWRkYjNkNmQ5ZmU4MDE2MzVmYzE1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BCGVvOvJf0LcX3u13h_BpX3vdUn67gmsScVeWhXCr38'
    }
  };
  
  async function getmovie() {
    fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pages}`, options)
    .then(response => response.json())
    .then(response => setMovies(response.results), setLoading(false))
    .catch(err => console.error(err))    
  }

  function pageUp() {
    setPages((current) => current + 1);
  }

  function pageDown(){
    setPages((current) => current - 1);
  }

  useEffect(()=> {
    getmovie()
  }, [pages]) 

  return (
    <>
      <Container>
        {loading ? <img src={Spinner} /> : <Movies>{movies.map((item) => <Movie key={item.id} title={item.title} img={item.poster_path} review={item.overview} rate={item.vote_average} id={item.id}/> )}</Movies> }
      </Container>
      <button onClick={pageDown}>{pages === 1 ?  "" : "◀" }</button>
      <div>{pages}</div>
      <button onClick={pageUp}>▶</button>
    </>
  )
}

export default Pgetmovies;
