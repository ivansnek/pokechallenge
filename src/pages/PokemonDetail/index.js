import React from 'react';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import Card from '@material-ui/core/Card';

import { loadPokemon } from './actions';
import CONFIG from '../../utils/config';

const Container = styled.div`
  width: '100%';
  height: '100%';
  background-color: white;
  padding: 25px;
`;

const EmptyContainer = styled(Container)`
  &&& {
    margin: auto;
    align-items: center;
  }`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const IMAGE_URL = 'https://img.pokemondb.net/sprites/silver/normal/#.png'

const styles = {
  avatar : { width:200, height: 200, borderWidth: 2, borderColor: '#ddd' },
  text: { margin: 10},
  cardContainer: { width: '50%', minHeight: 100, margin: 10 }
};

const DetailContainer = ({style, title, children}) => (
  <Card className={style}>
    <List>
      <ListItem key={"pokemon-title"+title} button={false}>
        <ListItemIcon>
          <Icon>star</Icon>
        </ListItemIcon>
        <ListItemText inset primary={title} />
      </ListItem>
      {children}
    </List>
  </Card>
);
class PokemonDetail extends React.Component {
  componentDidMount(){
    const { url, loadPokemon, location } = this.props;
    const pokemon = location.pathname;
    const loadURL = url ? url : `${CONFIG.API_URL}${pokemon}`
    loadPokemon(loadURL);
  }

  _renderTypes = () => (
    <DetailContainer
      title="Abilities"
      style={this.props.classes.cardContainer}
    >
     {this.props.pokemon.types.map((item, index) => 
      <ListItem key={index} button={false}>
        <ListItemText inset primary={item.type.name} />
      </ListItem>
      )}
    </DetailContainer>
  );

  _renderStats = () => (
    <DetailContainer
      title="Abilities"
      style={this.props.classes.cardContainer}
    >
       {this.props.pokemon.stats.map((item, index) =>
        <ListItem key={index} button={false}>
          <ListItemText inset primary={`${item.stat.name}: ${item.base_stat}`} />
        </ListItem>
      )}
    </DetailContainer>
  );

  _renderAbilities = () => (
    <DetailContainer
      title="Abilities"
      style={this.props.classes.cardContainer}
    >
      {this.props.pokemon.abilities.map((item, index) =>
        <ListItem key={index} button={false}>
          <ListItemText inset primary={item.ability.name} />
        </ListItem>
      )}
    </DetailContainer>
  );

  render() {
    const { pokemon, classes } = this.props;
    return (
      <Container>
        <Link to="/" >
          <Button variant="contained" color="primary" >
          Go Back
          </Button>
        </Link>
        {!!pokemon.name ? (
          <React.Fragment>
            <RowContainer>
              <Avatar alt={pokemon.name} src={IMAGE_URL.replace('#', pokemon.name)} className={classes.avatar} />              
              <Typography gutterBottom variant="headline" component="h1" className={classes.text}>
                Name: {pokemon.name}
              </Typography>
              <Typography gutterBottom variant="headline" component="h2" className={classes.text}>
                Weight: {pokemon.weight}
              </Typography>
            </RowContainer>
            <RowContainer>
              {this._renderAbilities()}
              {this._renderStats()}
            </RowContainer>
            {this._renderTypes()}
          </React.Fragment>
        ) : (
        <EmptyContainer>
          <Typography gutterBottom variant="headline" component="h3">
            Loading...
          </Typography>
        </EmptyContainer>
      )}
    </Container>
        
    );
  }
}

const mapStateToProps = ({ pokemon }) => ({ pokemon: pokemon.data, url: pokemon.url });

const PokemonDetailMaterial = withStyles(styles)(PokemonDetail);

export default connect(mapStateToProps, { loadPokemon })(PokemonDetailMaterial);