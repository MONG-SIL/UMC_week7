import { useState } from 'react'
import Movie from './Movie';
import Spinner from './assets/Spinner.gif'
import styled from 'styled-components';
import InfiniteScroll from "react-infinite-scroller";

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
` 
const Movies = styled.div `
  display: grid;
  grid-template-columns: repeat(4, minmax(400px, 1fr));
  grid-gap: 100px;
  padding: 50px;
  width: 80%;
  padding-top: 70px;
  justify-content: center;
`



function Igetmovies() {
    const [loading, setLoading] = useState(false);
    const [movies , setMovies] = useState([]); //state를 컴포넌트에 넘길 수 있음
    const [pages, setPages] = useState(1);
    const [hasMore, setHasMore] = useState(true);
  
    async function getmovie(page){
      setLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=931f0d63863a888a213f36475d977afb&language=en-US&page=${page}`
      );
  
      const data = await response.json();
      setMovies((current) => [...current , ...data.results]);
  
      if (data.page >= data.total_pages) {
        setHasMore(false);
      }
      setLoading(false);
    }
  
    const pageUp = () => {
      getmovie(pages);
      setPages((current) => current + 1);
    };
    console.log(movies);
    return (
      <>
        <InfiniteScroll  pageStart={1}  loadMore={pageUp}  hasMore={!loading && hasMore}>
        <Container>
            {loading ? <img src={Spinner} /> : <Movies>{movies.map((item) => <Movie key={item.id} title={item.title} img={item.poster_path} review={item.overview} rate={item.vote_average} id={item.id}/> )}</Movies> }
        </Container>
        </InfiniteScroll>
      </>
    );
  }
export default Igetmovies;