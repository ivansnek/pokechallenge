import React from 'react'
import styled from 'styled-components';

import { Link } from 'react-router-dom';

const Container = styled.div`
  width: '100%';
  height: 80px;
  background-color: #fff;
  boder-width: 8px;
  border-color: #ef5350;
  cursor:pointer;
  justify-content: flex-start;
`;

const Text = styled.span`
  color: #0060B6;
  text-decoration: none;
  color:#00A0C6;
  text-decoration:none;
  cursor:pointer;
  padding: 10px;
  align-text: center;
  vertical-align: center;
`;

const IMAGE_URL = 'https://img.pokemondb.net/sprites/silver/normal/#.png'

const PokemonCard = ({ name, onPress }) => {
  return (
    <Container onClick={onPress}>
      <img key={name} src={IMAGE_URL.replace('#', name)} />
      <Link to={`/pokemon/${name}`}><Text>{name}</Text></Link>
    </Container>
  );
}

export default PokemonCard;