import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { loadPokemon } from './actions';

const Container = styled.div`
  width: '100%';
  height: '100%';
  background-color: white;
  border-bottom: 2px solid #ddd;
  width: 50%;
  padding: 25px;
`;

const RowContainer = styled.div`
  display:flex;
  justify-content: flex-start,
  flex-direction: row
`;

const IMAGE_URL = 'https://img.pokemondb.net/sprites/silver/normal/#.png'

class PokemonDetail extends React.Component {
  componentDidMount(){
    this.props.loadPokemon(this.props.url);
  }

  _renderTypes = () => {
    return <ul>
      {this.props.pokemon.types.map((item, index) => <li key={index}> - {item.type.name}</li>)}
    </ul>
  }

  _renderStats = () => {
    return <ul>
      {this.props.pokemon.stats.map((item, index) =>
        <li key={index}> - {item.stat.name}: {item.base_stat}</li>
      )}
    </ul>
  }
  _renderAbilities = () => {
    return <ul>
      {this.props.pokemon.abilities.map((item, index) =>
        <li key={index}> - {item.ability.name}</li>
      )}
    </ul>
  }

  render() {
    const { pokemon } = this.props;
    return (
      <React.Fragment>
        <Link to="/" >Go Back</Link>
        {!!pokemon.name ? (
          <React.Fragment>
            <Container>
              <RowContainer>
              <img src={IMAGE_URL.replace('#', pokemon.name)} />
              <ul>
                <li><span>Name: {pokemon.name}</span></li>
                <li><span>Weight: {pokemon.weight}</span></li>
              </ul>
              </RowContainer>
            </Container>
            <Container>
              <h2> Type </h2>
              {this._renderTypes()}
            </Container>
            <Container>
              <h2> Stats </h2>
              {this._renderStats()}
            </Container>
            <Container>
              <h2> Stats </h2>
              {this._renderAbilities()}
            </Container>
          </React.Fragment>
        ) : null
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ pokemon }) => ({ pokemon: pokemon.data, url: pokemon.url })

export default connect(mapStateToProps, { loadPokemon })(PokemonDetail);