import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../Loading/Loading";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        const { token } = data;

        localStorage.setItem("token", token);

        navigate("/home");
      } else {
        setLoading(false);
        alert("Usuário ou senha inválidos. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setLoading(false);
      alert("Ocorreu um erro na requisição. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClick = () => {
    navigate("/signup");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      navigate("/home");
    }
  }, [navigate]);

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <PageContainer>
      <h1>Get Samurai</h1>
      <img src="/logo.png" alt="Logo" />
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          name="password"
          placeholder="Senha"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <button type="submit">ENTRAR</button>
      </form>
      <p onClick={handleRegisterClick}>Não possui uma conta? Cadastre-se</p>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 24px;
  gap: 24px;
  font-family: "Poppins";
  h1 {
    color: #000000;
  }
  p {
    font-size: 14px;
    text-decoration-line: underline;
    color: #000000;
    cursor: pointer;
  }
  img {
    height: 300px;
  }
`;
