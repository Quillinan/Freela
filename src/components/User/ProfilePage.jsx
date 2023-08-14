import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const token = localStorage.getItem("token");

  const handleBackClick = () => {
    navigate("/home");
  };

  const handleAddClick = () => {
    navigate("/service");
  };

  const handleServiceClick = (serviceId) => {
    navigate(`/service/${serviceId}`);
  };

  const handleLogoutClick = async () => {
    const confirmLogout = window.confirm("Deseja realmente fazer logout?");

    if (confirmLogout) {
      const token = localStorage.getItem("token");
      localStorage.removeItem("token");

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          navigate("/");
        } else {
          console.error("Erro ao fazer logout.");
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    }
  };

  const handleDeleteClick = async (serviceId) => {
    const confirmDelete = window.confirm("Deseja realmente deletar o serviço?");

    if (confirmDelete) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/services/${serviceId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          console.error("Erro ao deletar o serviço.");
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    }
    updateUserServices();
  };

  const handleActiveClick = async (serviceId) => {
    const service = services.find((service) => service.id === serviceId);
    const newActiveState = !service.active;

    const confirmChange = window.confirm(
      `Deseja realmente ${newActiveState ? "ativar" : "desativar"} o serviço?`
    );

    if (confirmChange) {
      const endpoint = newActiveState
        ? `activate/${serviceId}`
        : `deactivate/${serviceId}`;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/services/${endpoint}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          console.error("Erro ao mudar o status do serviço.");
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    }
    updateUserServices();
  };

  const updateUserServices = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/services/user`,
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
        console.error("Erro ao buscar serviços do usuário.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      updateUserServices();
    }
  }, [token, navigate]);

  return (
    <PageContainer>
      <Topbar>
        <img src="/backIcon.svg" alt="Back" onClick={handleBackClick} />

        <img src="/logoutIcon.svg" alt="Logout" onClick={handleLogoutClick} />
      </Topbar>

      <UserBar>
        <p>Seus serviços:</p>
        <img src="/addIcon.svg" alt="AddIcon" onClick={handleAddClick} />
      </UserBar>

      {services.map((service) => (
        <ServiceCard key={service.id}>
          <Title className="title">
            <div>
              <img src="/samuraiIcon.svg" alt="Icone" />
              <p onClick={() => handleServiceClick(service.id)}>
                {service.name}
              </p>
            </div>

            <img
              className="katanaImg"
              src="/katanaIcon.svg"
              alt="deleteIcon"
              onClick={() => handleDeleteClick(service.id)}
            />
          </Title>
          <Description>
            <p>{service.description}</p>
          </Description>
          <Active>
            <p>Status: </p>

            <p>{service.active ? "Ativo" : "Inativo"}</p>
            <img
              src={service.active ? "/dateOnIcon.svg" : "/dateOffIcon.svg"}
              alt="activeIcon"
              onClick={() => handleActiveClick(service.id)}
            />
          </Active>
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
  font-family: "Poppins", sans-serif;
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
  min-height: 140px;
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
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  gap: 10px;
  div {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    gap: 10px;
  }
  img {
    &:hover {
      cursor: pointer;
    }
  }
`;

const Topbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  img {
    width: 30px;
    height: 30px;
    &:hover {
      cursor: pointer;
    }
  }
`;

const Description = styled.div`
  height: 48%;
  overflow-y: auto;
`;

const Active = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: 10px;
`;
