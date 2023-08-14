import MoonLoader from "react-spinners/MoonLoader";
import styled from "styled-components";

export default function LoadingAnimation() {
  return (
    <Position>
      <p>Carregando...</p>
      <MoonLoader color={"#000000"} size={100} speedMultiplier={0.5} />
    </Position>
  );
}

const Position = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 999;
  p {
    font-family: "Poppins";
    font-size: 32px;
    font-weight: 400;
    color: #000000;
    margin-bottom: 30px;
  }
`;
