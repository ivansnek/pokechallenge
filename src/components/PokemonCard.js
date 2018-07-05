// flow
import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const IMAGE_URL = 'https://img.pokemondb.net/sprites/silver/normal/#.png';

export type PokemonCardProps = {
  name: string
  onPress: () => void,
  classes: object
};

const styles = {
  card: {
    minWidth: 200,
    margin: 20,
    flexBasis: 200,
    backgroundColor: '#F9FBE7',
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
const PokemonCard = ({ name, onPress, classes }: PokemonCardProps): React.StatelessComponent<PokemonCardProps> => {
  return (
    <Link to={`/pokemon/${name}`}>
      <Card className={classes.card} onClick={onPress}>
        <CardMedia
          className={classes.media}
          image={IMAGE_URL.replace('#', name)}
          title={name.toUpperCase()}
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="headline" component="h3">
            {name}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

export default withStyles(styles)(PokemonCard);