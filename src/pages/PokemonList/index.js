import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { loadPokemonList } from './actions';
import { changePokemonURL } from '../PokemonDetail/actions';
import PokemonCard from '../../components/PokemonCard';
import List, { withLoading, withInfiniteScroll, withPaginated } from '../../components/List';
class PokemonList extends React.Component {

  componentDidMount() {
    this.props.loadPokemonList(this.props.nextURL);
  }

  onPaginatedSearch= () => {
    const { loadPokemonList, nextURL } = this.props;
    loadPokemonList(nextURL);
  }

  onItemPress = item => {
    this.props.changePokemonURL(item.url);
  }

  renderItem = (item, index) =>
    <PokemonCard key={`${item.url}${index}`} name={item.name} onPress={() => this.onItemPress(item)}/>

  render() {
    return (
      <React.Fragment>
        <h1> Pokemon List</h1>
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

const ListWithLoadingWithInfinite  = compose(
  withLoading,
  withInfiniteScroll
)(List);


const mapStateToProps = ({ pokemonList: { loading, list, nextURL} }) => ({ list, loading, nextURL });

export default connect(mapStateToProps, { loadPokemonList, changePokemonURL })(PokemonList);
