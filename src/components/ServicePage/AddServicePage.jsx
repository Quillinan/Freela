import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import LoadingAnimation from "../Loading/Loading";

export default function AddServicePage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleBackClick = () => {
    navigate(-1);
  };

  const [formData, setFormData] = useState({
    name: "",
    photo: "",
    description: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/services`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/home");
      } else {
        alert("Erro ao adicionar o serviço. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Ocorreu um erro na requisição. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <PageContainer>
      <Header>
        <img
          src="/backIcon.svg"
          alt="Back"
          className="backImg"
          onClick={handleBackClick}
        />
      </Header>
      <Container>
        <Title>Adicione um novo serviço:</Title>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Nome"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            name="photo"
            type="url"
            placeholder="Foto"
            value={formData.photo}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            className="description"
            placeholder="Descrição"
            value={formData.description}
            onChange={handleInputChange}
          />

          <button type="submit">Adicionar</button>
        </form>
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
    width: 60px;
    height: 60px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 10px;
  textarea.description {
    width: calc(100% - 32px);
    min-height: 100px;
    max-height: 200px;
    resize: vertical;
    background-color: #ffffff;
    font-size: 14px;
    padding: 14px;
    border-radius: 20px;
    border: solid 2px #d3d3d3;
    &::placeholder {
      color: grey;
    }
  }
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
