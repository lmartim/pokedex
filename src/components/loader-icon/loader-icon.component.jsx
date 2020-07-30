import React from 'react';
import styled, { keyframes } from "styled-components";

// Componente que exibe um ícone de loading e mensagem de carregamento
const LoaderIcon = () => (
  <LoaderBlock>
    <Icon />
    Carregando
  </LoaderBlock>
)

// CSS-in-JS
const LoaderBlock = styled.div`
  color: #202020;
  text-align: center;
`

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Icon = styled.div`
  animation: ${rotate360} 1s linear infinite;
  width: 60px;
  height: 60px;
  background-color: #fff;
  border-radius: 50% ;
  position: relative;
  overflow: hidden;
  border: 3px solid;
  &:after {
    content: '';
    position: absolute;
    width: 60px;
    height: 30px;
    background-color: red;
    border-bottom: 4px solid;
    top: -4px
  }
  &:before {
    content: '';
    position: absolute;
    background-color: #fff;
    width: 10px;
    height:10px;
    border: 4px solid;
    border-radius: 50%;
    bottom: 18px;
    right: 18px;
    z-index: 1;
  }
`;

export default LoaderIcon;