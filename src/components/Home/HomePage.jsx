import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const token = localStorage.getItem("token");

  const handleAddClick = () => {
    navigate("/service");
  };

  const handleServiceClick = (serviceId) => {
    navigate(`/service/${serviceId}`);
  };

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/services/all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setServices(data);
        } else {
          console.error("Erro ao buscar serviços.");
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    }

    fetchServices();
  }, [token]);

  return (
    <PageContainer>
      <UserBar>
        <p>Olá</p>
        <img src="/addIcon.svg" alt="AddIcon" onClick={handleAddClick} />
      </UserBar>

      {services.map((service) => (
        <ServiceCard
          key={service.id}
          onClick={() => handleServiceClick(service.id)}
        >
          <Title className="title">
            <img src="/samuraiIcon.svg" alt="Icone" />
            <p>{service.name}</p>
          </Title>
          <Description>
            <p>{service.description}</p>
          </Description>
        </ServiceCard>
      ))}
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
  overflow-y: auto;
`;

const UserBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 20px;
  img {
    width: 40px;
    height: 40px;
    &:hover {
      cursor: pointer;
    }
  }
`;

const ServiceCard = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 22px);
  min-height: 100px;
  font-size: 16px;
  font-family: "Poppins";
  border: 1px solid #000000;
  border-radius: 10px;
  gap: 15px;
  padding: 10px;
  background: #ffffff;
  div {
    background-color: #ffffff;
  }
  p {
    background-color: #ffffff;
  }

  img {
    width: 30px;
    height: 30px;
    border-radius: 100%;
  }

  &:hover {
    cursor: pointer;
    border: 1px solid grey;
    background-color: grey;
    color: #ffffff;

    div {
      background-color: grey;
      color: #ffffff;
    }
    p {
      background-color: grey;
      color: #ffffff;
    }
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  font-size: 20px;
  gap: 10px;
`;

const Description = styled.div`
  height: 48%;
  overflow-y: auto;
`;
