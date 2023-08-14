import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
	*{
		background-color: #f0f0f0;
		font-family: 'Poppins', sans-serif;
	}
	button {
		height: 52px;
		width: 300px;
		background: #000000;	
		border-radius: 15px;
		border-style: none;
		font-weight: 700;
		font-size: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		color: #FFFFFF;
		margin-top: 8px;
	}
	input {
    width: 272px;
    height: 52px;
    display: flex;
    align-items: center;
    background: #FFFFFF;
    font-size: 14px;
    margin-bottom: 16px;
    padding: 0 14px;
    border-radius: 20px;
    border: solid 2px #D3D3D3;
    &::placeholder{
        color: grey;
    }
}

input:focus {
    border-color: #000000;
    outline: none;
}

	h1{
		color: #FFFFFF;
		font-size: 40px;
	}
`;

export default GlobalStyle;
