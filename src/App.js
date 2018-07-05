// flow

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import store from './store';
import PokemonList from './pages/PokemonList';
import PokemonDetail from './pages/PokemonDetail';

type Props = {
  classes: {}
};

type State = {};

const styles = {
  root: {
    flexGrow: 1,
    height: 80
  },
  appBar: {
    height: 65
  },
  title: {
    padding: 20
  }
};

const Container = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  margin: auto;
`;

class App extends React.Component<Props, State> {
  render() {
    const { classes } = this.props;
    return (
      <Provider store={store}>
        <Container>
          <AppBar position="static" color="secondary" className={classes.appBar}>
            <Typography variant="title" color="inherit" className={classes.title}>
                Pokemon List
            </Typography>
          </AppBar>
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

export default withStyles(styles)(App);

