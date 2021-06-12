import axios from "../axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import requests from "../requests";
import { apiKey } from "../requests";
import YouTube from "react-youtube";
const posterBaseUrl = "https://image.tmdb.org/t/p/original";

function Banner() {
  const [movie, setMovie] = useState({});
  const [show, setShow] = useState(false);
  const [current, setCurrent] = useState(false);
  const [trailerId, setTrailerId] = useState("");
  useEffect(() => {
    async function fetchData() {
      const req = await axios.get(requests.fetchTrending);
      setMovie(
        req.data.results[
          Math.floor(Math.random() * req.data.results.length - 1)
        ]
      );
      return req;
    }
    fetchData();
  }, []);

  function handleClick(id) {
    setShow(true);
    setCurrent(true);
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
    <>
      <Container>
        <BgImage>
          <img src={`${posterBaseUrl}${movie?.backdrop_path}`} alt="" />
        </BgImage>
        <Contents>
          <h1>{movie?.title}</h1>
          <BtnContainer>
            {current ? (
              <>
                <button
                  onClick={() => {
                    setShow(false);
                    setCurrent(false);
                  }}
                >
                  Close
                </button>
              </>
            ) : (
              <>
                <button onClick={() => handleClick(movie.id)}>Play</button>
              </>
            )}
            <button>List </button>
          </BtnContainer>
          <p>{movie?.overview}</p>
        </Contents>
      </Container>
      {show && <YouTube videoId={trailerId} opts={opts} />}
    </>
  );
}

export default Banner;

const Container = styled.div`
  height: 60vh;
  position: relative;
`;
const BgImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;
const Contents = styled.div`
  position: absolute;
  bottom: 70px;
  left: 2%;
  * {
    margin-bottom: 10px;
  }
  p {
    max-width: 700px;
  }
`;
const BtnContainer = styled.div`
  display: flex;
  button {
    padding: 8px 15px;
    margin-right: 10px;
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
    border: none;
    cursor: pointer;
  }
`;
