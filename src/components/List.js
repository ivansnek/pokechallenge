// flow
import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import _ from 'lodash';

import { PokemonCardProps } from './PokemonCard';
import { CLIENT_RENEG_WINDOW } from 'tls';

const LoaderContainer: React.Node = styled.div`
  display:block;
  margin: auto;
  padding: 50px;
`;

type ListProps = {
  isGrid: boolean,
  list: Array<PokemonCardProps>,
  isLoading: boolean,
  renderItem: (item: React.Node, index: number) => React.Node
}

const withInfiniteScroll = (Component: React.Node): React.Component<*, ListProps> =>
  class WithInfiniteScroll extends React.Component {
    componentDidMount() {
      window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll = (): void => {
      if (
        (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 100) &&
        this.props.list.length && !this.props.isLoading
      ) {
        this.props.onPaginatedSearch();
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  }

const withLoading = (Component: React.Node): React.StatelessComponent<*, ListProps> => (props: ListProps) =>
  <React.Fragment>
    <Component {...props} />
    <LoaderContainer>
      {props.isLoading && <CircularProgress />}
    </LoaderContainer>
  </React.Fragment>

const withPaginated = (Component: React.Node): React.StatelessComponent<*, ListProps> => (props) =>
  <React.Fragment>
    <Component {...props} />
    {
      (props.page !== null && !props.isLoading) &&
      <Button variant="contained" color="primary" >
        More
      </Button>
    }
  </React.Fragment>

const ListContainer: React.Node = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #fff,
  width: '100%';
  height: '100%'
`;

 const List = ({ list, renderItem, isGrid }: ListProps): React.StatelessComponent<ListProps> =>
  <ListContainer isGrid={isGrid}>
    {list.map((item, index) => renderItem(item, index))}
  </ListContainer>

export { withLoading, withInfiniteScroll, withPaginated, ListProps };

export default List;