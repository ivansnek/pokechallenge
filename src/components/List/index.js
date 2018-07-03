import React from 'react';
import styled from 'styled-components'

const withInfiniteScroll = (Component) =>
  class WithInfiniteScroll extends React.Component {
    componentDidMount() {
      window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll = () => {
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

const withLoading = (Component) => (props) =>
  <div>
    <Component {...props} />

    <div className="interactions">
      {props.isLoading && <span>Loading...</span>}
    </div>
  </div>

const withPaginated = (Component) => (props) =>
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



const ListContainer = styled.div`
  background-color: #fff,
  width: '100%';
  height: '100%'
`;

 const List = ({ list, renderItem }) =>
  <ListContainer>
    {list.map((item, index) => renderItem(item, index))}
  </ListContainer>

export { withLoading, withInfiniteScroll, withPaginated };

export default List;