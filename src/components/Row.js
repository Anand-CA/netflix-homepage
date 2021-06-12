import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "../axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { apiKey } from "../requests";
import YouTube from "react-youtube";

const posterBaseUrl = "https://image.tmdb.org/t/p/original";
function Row({ big, title, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [show, setShow] = useState(false);
  const [trailerId, setTrailerId] = useState("");
  useEffect(() => {
    axios.get(fetchUrl).then((res) => {
      setMovies(res.data.results);
    });
  }, [fetchUrl]);

  function handleClick(id) {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
    axios.get(`/movie/${id}/videos?api_key=${apiKey}`).then((res) => {
      if (res.data.results.length !== 0) {
        setTrailerId(res.data.results[0].key);
      } else {
        setShow(false);
      }
    });
  }

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  return (
    <Container>
      <h1>{title}</h1>
      <FLexBox>
        {movies?.map((movie) => (
          <LazyLoadImg
            style={{ maxHeight: `${big && "280px"}` }}
            onClick={() => handleClick(movie.id)}
            key={movie.id}
            alt="poster"
            src={`${posterBaseUrl}${movie?.poster_path}`}
          />
        ))}
      </FLexBox>
      {show && <YouTube videoId={trailerId} opts={opts} />}
    </Container>
  );
}

export default Row;

const Container = styled.div`
  h1 {
    margin: 20px 0;
  }
`;
const FLexBox = styled.div`
  display: flex;
  overflow-y: hidden;
  padding: 10px;
  overflow-x: scroll;
  & {
    scrollbar-width: none;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;
const LazyLoadImg = styled(LazyLoadImage)`
  max-height: 170px;
  object-fit: contain;
  margin-right: 10px;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.04);
  }
`;
