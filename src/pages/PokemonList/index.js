// flow

import React from 'react';
import { connect } from 'react-redux';
import { compose, type HOC } from 'recompose';

import { loadPokemonList } from './actions';
import { changePokemonURL } from '../PokemonDetail/actions';
import PokemonCard from '../../components/PokemonCard';
import List, { withLoading, withInfiniteScroll, withPaginated, type ListProps } from '../../components/List';
import { type PokemonListItemType } from './types';

type Props = {
  loadPokemonList: () => void
  nextURL: string,
  changePokemonURL: () => void,
  loading: boolean,
  list: Array<PokemonListItemType>
};

type State = {};
class PokemonList extends React.Component<Props, State> {

  componentDidMount() {
    this.props.loadPokemonList(this.props.nextURL);
  }

  onPaginatedSearch= (): void => {
    const { loadPokemonList, nextURL } = this.props;
    loadPokemonList(nextURL);
  }

  onItemPress = (item: PokemonListItemType): void => {
    this.props.changePokemonURL(item.url);
  }

  renderItem = (item: PokemonListItemType, index: number): React.StatelessFunctionalComponent<Props> =>
    <PokemonCard key={`${item.url}${index}`} name={item.name} onPress={() => this.onItemPress(item)}/>

  render() {
    return (
      <React.Fragment>
        <ListWithLoadingWithInfinite
          list={this.props.list}
          renderItem={this.renderItem}
          isLoading={this.props.isLoading}
          onPaginatedSearch={this.onPaginatedSearch}
        />
      </React.Fragment>
    );
  }
}

const ListWithLoadingWithInfinite: HOC<*, ListProps>  = compose(
  withLoading,
  withInfiniteScroll
)(List);


const mapStateToProps = ({ pokemonList: { loading, list, nextURL} }) => ({ list, loading, nextURL });

export default connect(mapStateToProps, { loadPokemonList, changePokemonURL })(PokemonList);
