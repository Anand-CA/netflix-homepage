import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { auth, provider } from "../firebase";

function Login() {
  const dispatch = useDispatch();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        var user = result.user;
        dispatch({
          name: user.displayName,
          email: user.email,
          profileUrl: user.photoURL,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <Container>
      <Contents>
        <NetflixLogo
          src="https://cdn.worldvectorlogo.com/logos/netflix-3.svg"
          alt="netflix"
        />
        <button onClick={signIn}>
          Sign in with Google
          <img
            src="https://cdn.icon-icons.com/icons2/2108/PNG/512/google_icon_130924.png"
            alt=""
          />
        </button>
      </Contents>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  &::before {
    content: "";
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    filter: opacity(50%);
    background: url("https://assets.nflxext.com/ffe/siteui/vlv3/b8e09d9c-d1e7-4800-afd9-810e41ace684/8880c9e7-62d3-4cb3-9da1-8f020fd4fa37/IN-en-20210607-popsignuptwoweeks-perspective_alpha_website_large.jpg")
      no-repeat center center / cover;
  }
`;
const NetflixLogo = styled.img`
  height: 40px;
`;
const Contents = styled.div`
  height: 440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  max-width: 500px;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  button {
    padding: 10px 16px;
    display: flex;
    align-items: center;
    border-radius: 99px;
    border: none;
    font-size: 17px;
    cursor: pointer;
    font-weight: 600;
    background-color: white;
    img {
      height: 40px;
      border-radius: 99px;
      margin-left: 13px;
    }
  }
`;
