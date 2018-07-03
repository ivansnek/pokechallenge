import React from 'react'
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: '100%';
  height: 80px;
  background-color: #fff;
  boder-width: 8px;
  border-color: #ef5350;
  cursor:pointer;
  justify-content: flex-start;
`;

const Text = styled.span`
  color: #0060B6;
  text-decoration: none;
  color:#00A0C6;
  text-decoration:none;
  cursor:pointer;
  padding: 10px;
  align-text: center;
  vertical-align: center;
  margin-bottom:10px;
`;

const IMAGE_URL = 'https://img.pokemondb.net/sprites/silver/normal/#.png'

const styles = {
  card: {
    maxWidth: 200,
    margin: 20,
    flexBasis: 200,
    backgroundColor: '#F9FBE7'
  },
  media: {
    height: 80,
    margin: 'auto',
    width:80,
  },
content: {
  margin: 'auto',
  textAlign: 'center'
}
};
const PokemonCard = ({ name, onPress, classes }) => {
  return (
    <Card className={classes.card} onClick={onPress}>
      <CardMedia
        className={classes.media}
        image={IMAGE_URL.replace('#', name)}
        title={name.toUpperCase()}
      />
      <CardContent className={classes.content}>
        <Link to={`/pokemon/${name}`}>
          <Typography gutterBottom variant="headline" component="h2">
            {name}
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(PokemonCard);