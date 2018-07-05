// flow
import React from 'react';
import styled from 'styled-components';

type ListProps = {
  isGrid: boolean,
  list: Array<any>,
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
        (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) &&
        this.props.list.length && !this.props.isLoading
      ) {
        this.props.onPaginatedSearch();
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  }

const withLoading = (Component: React.Node): React.StatelessComponent<*, ListProps> => (prop: ListProps) =>
  <div>
    <Component {...props} />

    <div className="interactions">
      {props.isLoading && <span>Loading...</span>}
    </div>
  </div>

const withPaginated = (Component: React.Node): React.StatelessComponent<*, ListProps> => (props) =>
  <div>
    <Component {...props} />

    <div className="interactions">
      {
        (props.page !== null && !props.isLoading) &&
        <button
          type="button"
          onClick={props.onPaginatedSearch}
        >
          More
        </button>
      }
    </div>
  </div>

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