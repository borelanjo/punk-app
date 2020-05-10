import React, { Component } from 'react';
import BeerService from '../../../services/beer-service';

import Load from '../../../components/load';
import Header from '../../../components/header';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default class BeerDetail extends Component {
  service = new BeerService();

  constructor(props) {
    super(props);
    this.state = {
      beer: {},
      isLoaded: false,
    };
  }

  componentDidMount() {
    this.getBeerData();
  }

  async getBeerData() {
    try {
      const { id } = this.props.match.params;
      const res = await this.service.findById(id);
      this.setState({ beer: res.data[0] });
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({
        ...this.state,
        isLoad: true,
      });
    }
  }

  render() {
    const {
      beer: {
        id,
        name,
        image_url,
        tagline,
        first_brewed,
        description,
        ingredients,
      },
      isLoad,
    } = this.state;
    return (
      <>
        {!isLoad ? (
          <Load />
        ) : (
          <>
            <Header title="Punk App"></Header>
            <Card key={id} style={{ display: 'flex' }}>
              <CardActionArea>
              <Grid container spacing={3}>
              <Grid item xs={6}>
                <CardContent>
                  <Typography component="h5" variant="h5">
                    {name}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {tagline}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {first_brewed}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Ingredients:
                    <ul>
                      <li>
                        Malt:
                        {ingredients.malt.map((m, i) => (
                          <div key={i}>
                            {m.name} - {m.amount.value} {m.amount.unit}
                          </div>
                        ))}
                      </li>
                      <li>
                        Hops:
                        {ingredients.hops.map((h, i) => (
                          <div key={i}>
                            {h.name} - {h.amount.value} {h.amount.unit}
                          </div>
                        ))}
                      </li>
                    </ul>
                  </Typography>
                </CardContent>
                </Grid>
                <Grid item xs={6}>
                <img src={image_url} alt={name} />
                </Grid>
                </Grid>
              </CardActionArea>
              <CardActions>
                <Link to={'/'}>
                  <ArrowBackIcon></ArrowBackIcon>
                </Link>
              </CardActions>
            </Card>
          </>
        )}
      </>
    );
  }
}
