// flow

import React from 'react';
import { connect } from 'react-redux';
import { compose, type HOC } from 'recompose';
import styled from 'styled-components';

import { loadPokemonList } from './actions';
import { changePokemonURL } from '../PokemonDetail/actions';
import PokemonCard from '../../components/PokemonCard';
import List, { withLoading, withInfiniteScroll, withPaginated, type ListProps } from '../../components/List';
import { type PokemonListItemType } from './types';
import { CLIENT_RENEG_WINDOW } from 'tls';

type Props = {
  loadPokemonList: () => void,
  nextURL: string,
  changePokemonURL: () => void,
  loading: boolean,
  list: Array<PokemonListItemType>,
  offseted: boolean
};

type State = {};

const Container: React.Node = styled.div`
  width: '100%';
  height: '100%';
  background-color: white;
  left: ${props => props.offseted ? '100%': '0'}
  transition: left 200ms;
  > * {
    flex: 0 0 50%;
  }
`;

class PokemonList extends React.Component<Props, State> {

  componentDidMount() {
    this.props.loadPokemonList(this.props.nextURL);
  }

  onPaginatedSearch= (): void => {
    const { loadPokemonList, nextURL, previousURL } = this.props;
    if (nextURL !== previousURL) {
      loadPokemonList(nextURL);
    }
  }

  onItemPress = (item: PokemonListItemType): void => {
    this.props.changePokemonURL(item.url);
  }

  renderItem = (item: PokemonListItemType, index: number): React.StatelessFunctionalComponent<Props> =>
    <PokemonCard key={`${item.url}${index}`} name={item.name} onPress={() => this.onItemPress(item)}/>

  render() {
    return (
      <Container offseted={this.props.offseted}>
        <ListWithLoadingWithInfinite
          list={this.props.list}
          renderItem={this.renderItem}
          isLoading={this.props.loading}
          onPaginatedSearch={this.onPaginatedSearch}
        />
      </Container>
    );
  }
}

const ListWithLoadingWithInfinite: HOC<*, ListProps>  = compose(
  withLoading,
  withInfiniteScroll
)(List);


const mapStateToProps = ({ pokemonList: { loading, list, nextURL, previousURL} }) => ({
  list, loading, nextURL, previousURL
});

export default connect(mapStateToProps, { loadPokemonList, changePokemonURL })(PokemonList);
