import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

// 스타일드 컴포넌트를 함수 외부로 이동
const MovieWrapper = styled.div`
    background-color: rgb(71, 88, 113);
    margin-bottom: 70px;
    font-weight: 300;
    padding: 20px;
    border-radius: 10px;
    color: #fff;
    display: grid;
    grid-gap: 15px;
    text-decoration: none;
    color: inherit;
    width: 300px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const WrapImg = styled.div`
    position: relative;
    overflow: hidden;
    border-radius: 10px;
`;

const MovieImg = styled.img`
    width: 100%;
    transition: transform 0.3s ease, filter 0.3s ease; 
    &:hover {
        transform: scale(1.05); 
        filter: blur(2px);
    }
`;

const MovieTitle = styled.h1`
    margin: 0;
    font-weight: 700;
    font-size: 1.5em;
    color: #fff;
`;

const Rating = styled.div`
    text-align: right;
    color: rgb(236, 236, 157);
    font-size: 1.2em;
    font-weight: bold;
`;

const MovieReview = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1em;
    color: #fff;
    background: rgba(0, 0, 0, 0.7);
    padding: 10px;
    border-radius: 10px;
    opacity: 0;
    transition: opacity 0.3s ease;
`;

const WrapTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StyledWrapImg = styled(WrapImg)`
    &:hover ${MovieReview} {
        opacity: 1;
    }
`;

function Movie({ title, img, review, rate, id }) {
    const navigate = useNavigate();

    const detailPage = () => {
        navigate(`/movie/${id}`, { state: { title, img, review, rate } });
    };

    return (
        <MovieWrapper>
            <StyledWrapImg>
                <MovieImg
                    className="movie__img"
                    src={`https://image.tmdb.org/t/p/w500${img}`}
                />
                <MovieReview onClick={detailPage} >{review}</MovieReview>
            </StyledWrapImg>
            <WrapTitle>
                <MovieTitle>{title}</MovieTitle>
                <Rating>{rate}</Rating>
            </WrapTitle>
        </MovieWrapper>
    );
}

export default Movie;
