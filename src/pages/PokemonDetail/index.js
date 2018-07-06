// flow
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
import CircularProgress from '@material-ui/core/CircularProgress';

import { loadPokemon } from './actions';
import { PokemonType } from './types';
import CONFIG from '../../utils/config';

type DetailContainerProps = {
  style: object,
  title: string,
  children: React.Node
}

type Props = {
  url: string,
  pokemon: PokemonType,
  loadPokemon: () => void,
  location: object,
  classes: object
};

type State = {};

const Container: React.Node = styled.div`
  width: '100%';
  height: '100%';
  background-color: white;
  padding: 25px;
`;

const EmptyContainer: React.Node = styled(Container)`
  &&& {
    margin: auto;
    align-items: center;
  }`;

const RowContainer: React.Node = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const IMAGE_URL = 'https://img.pokemondb.net/sprites/silver/normal/#.png';

const styles = {
  avatar : { width:200, height: 200, borderWidth: 2, borderColor: '#ddd' },
  text: { margin: 10},
  cardContainer: { width: '50%', minHeight: 100, margin: 10 }
};

const DetailContainer =
  ({style, title, children}: DetailContainerProps): React.StatelessComponent<DetailContainerProps> => (
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
class PokemonDetail extends React.Component<Props, State> {
  componentDidMount(){
    const { url, loadPokemon, location } = this.props;
    const pokemon = location.pathname;
    const loadURL = url ? url : `${CONFIG.API_URL}${pokemon}`
    loadPokemon(loadURL);
  }

  _renderTypes = (): React.StatelessComponent<*, DetailContainerProps> => (
    <DetailContainer
      title="Type"
      style={this.props.classes.cardContainer}
    >
     {this.props.pokemon.types.map((item, index) => 
      <ListItem key={index} button={false}>
        <ListItemText inset primary={item.type.name} />
      </ListItem>
      )}
    </DetailContainer>
  );

  _renderStats = (): React.StatelessComponent<*, DetailContainerProps> => (
    <DetailContainer
      title="Stats"
      style={this.props.classes.cardContainer}
    >
       {this.props.pokemon.stats.map((item, index) =>
        <ListItem key={index} button={false}>
          <ListItemText inset primary={`${item.stat.name}: ${item.base_stat}`} />
        </ListItem>
      )}
    </DetailContainer>
  );

  _renderAbilities = (): React.StatelessComponent<*, DetailContainerProps> => (
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
    const { pokemon, classes, loading } = this.props;
    return (
      <Container>
        <Link to="/" >
          <Button variant="contained" color="primary" >
          Go Back
          </Button>
        </Link>
            {loading  && (
              <EmptyContainer>
                <CircularProgress />
                <Typography gutterBottom variant="headline" component="h3">
                  Loading...
                </Typography>
              </EmptyContainer>
            )}
            {!!pokemon.name && (
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
            )}
    </Container>
        
    );
  }
}

const mapStateToProps = ({ pokemon }) => ({ pokemon: pokemon.data, url: pokemon.url, loading: pokemon.loading });

const PokemonDetailMaterial = withStyles(styles)(PokemonDetail);

export default connect(mapStateToProps, { loadPokemon })(PokemonDetailMaterial);