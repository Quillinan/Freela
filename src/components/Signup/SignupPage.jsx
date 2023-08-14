import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingAnimation from "../Loading/Loading";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    phone: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginClick = () => {
    navigate("/");
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== confirmPassword) {
      alert("As senhas não coincidem. Por favor, verifique.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/");
      } else {
        setLoading(false);
        alert("Ocorreu um erro no cadastro. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setLoading(false);
      alert("Ocorreu um erro na requisição. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
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
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Nome"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          name="city"
          placeholder="Cidade"
          value={formData.city}
          onChange={handleInputChange}
        />
        <input
          name="phone"
          placeholder="Telefone"
          value={formData.phone}
          onChange={handleInputChange}
        />
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
        <input
          name="confirmPassword"
          placeholder="Confirmar senha"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <button type="submit">CADASTRAR</button>
      </form>
      <p onClick={handleLoginClick}>Já possui uma conta? Entre</p>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 150px;
  p {
    font-family: "Poppins";
    font-size: 14px;
    font-weight: 400;
    margin-top: 24px;
    text-decoration-line: underline;
    color: #000000;
    cursor: pointer;
  }
`;
