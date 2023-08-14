import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import LoadingAnimation from "../Loading/Loading";

export default function ServicePage() {
  const navigate = useNavigate();
  const { idService } = useParams();
  const [serviceData, setServiceData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch(`${import.meta.env.VITE_API_URL}/services/${idService}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setServiceData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching service data:", error);
          setLoading(false);
        });
    }
  }, [idService]);

  const handleBackClick = () => {
    navigate("/home");
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <PageContainer>
      <Header>
        <img
          src="/backIcon.svg"
          alt="Back"
          className="backImg"
          onClick={handleBackClick}
        />
        <BorderImg>
          <img
            src={serviceData.photo}
            alt="Service Image"
            className="serviceImg"
          />
        </BorderImg>

        <p>{serviceData.name}</p>
      </Header>
      <Container>
        <Title>
          <p>Nome: {serviceData.ownerName}</p>
          <p>Email: {serviceData.ownerEmail}</p>
          <p>Telefone: {serviceData.ownerPhone}</p>
          <p>Cidade: {serviceData.ownerCity}</p>
        </Title>
        <p>Descrição:</p>
        <p>{serviceData.description}</p>
      </Container>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #000000;
  gap: 20px;
  padding: 20px;
  width: calc(100vw - 42px);
  height: calc(100vh - 42px);
  font-family: "Poppins", sans-serif;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  font-size: 24px;
  font-style: bold;
  gap: 15px;
  .backImg {
    width: 30px;
    height: 30px;
    &:hover {
      cursor: pointer;
    }
  }
  .serviceImg {
    width: 70px;
    height: 70px;
  }
`;

const BorderImg = styled.div`
  width: 100px;
  height: 100px;
  background-color: grey;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  gap: 10px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  gap: 10px;
  font-size: 18px;
  margin-bottom: 10px;
`;
