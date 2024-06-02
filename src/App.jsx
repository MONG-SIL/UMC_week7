import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Getmovies from "./Getmovies";
import Pgetmovies from "./Pgetmovies";
import Igetmovies from "./Igetmovies";
import Navigation from "./Navigation";
import Detail from "./Detail";
import Notfound from "./Notfound";
import Signup from "./Signup";
import Login from "./Login";
import styled from "styled-components";

const Content = styled.div`
    padding-top: 60px; /* 네비게이션 바 높이 */
`;

function App() {
  return (
    <Router>
      <Navigation />
      <Content>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/popular" element={<Pgetmovies />} />
          <Route path="/nowplaying" element={<Igetmovies />} />
          <Route
            path="/toprated"
            element={<Getmovies url="https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1" />}
          />
          <Route
            path="/upcoming"
            element={<Getmovies url="https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1" />}
          />
          <Route path="/movie/:title" element={<Detail />} />
          <Route path="/*" element={<Notfound />} />
        </Routes>
      </Content>
    </Router>
  );
}

export default App;
