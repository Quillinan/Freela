import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function UserPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleReturnClick = () => {
    navigate('/home');
  };

  const handleUpdateClick = () => {
    navigate(`/users/${user.id}/update`);
  };

  return (
    <PageContainer>
      <TopBar>
        <img
          src="/returnicon.svg"
          alt="returnicon"
          onClick={handleReturnClick}
        />
      </TopBar>
      <input placeholder={user.name} disabled />
      <input placeholder={user.cpf} disabled />
      <input placeholder={user.email} disabled />
      <button onClick={handleUpdateClick}>ATUALIZAR</button>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  p {
    font-family: 'Roboto';
    font-size: 14px;
    font-weight: 400;
    margin-top: 24px;
    text-decoration-line: underline;
    color: #ffffff;
  }
`;

const TopBar = styled.div`
  display: flex;
  width: -webkit-fill-available;
  flex-direction: row;
  margin: 20px 0 150px 20px;
  top: 0;
  img {
    width: 28px;
    height: 32px;
    transform: matrix(1, 0, 0, -1, 0, 0);
    margin-bottom: 0;
  }
`;
