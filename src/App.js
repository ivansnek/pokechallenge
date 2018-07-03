import React, { Component } from 'react';
import { Provider } from 'react-redux';
import styled from 'styled-components'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import store from './store';
import PokemonList from './pages/PokemonList';
import PokemonDetail from './pages/PokemonDetail';


const Container = styled.div`
  background-color: #fff;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: auto;
  padding: 50px;
`;
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <BrowserRouter>
          <Switch>
            <Route exact path='/' component={PokemonList}/>
            <Route path='/pokemon/:id' component={PokemonDetail}/>
          </Switch>
          </BrowserRouter>
        </Container>
      </Provider>
    );
  }
}

export default App;
