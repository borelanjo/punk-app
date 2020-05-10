import React from 'react';
import './beer-list.css';

import BeerService from '../../../services/beer-service';

import Load from '../../../components/load';
import Header from '../../../components/header';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import InfoIcon from '@material-ui/icons/Info';
import Grid from '@material-ui/core/Grid';

export default class BeerList extends React.Component {
  service = new BeerService();
  state = {
    beers: [],
    isLoad: false,
  };

  componentDidMount() {
    this.service.findAll().then((res) => {
      const beers = res.data;
      this.setState({ ...this.state, beers, isLoad: true });
    });
  }

  handleClickDetail(id) {
    this.service.findById(id).then((res) => {});
  }

  render() {
    return (
      <>
        {!this.state.isLoad ? (
          <Load />
        ) : (
          <>
            <Header></Header>
            <Container maxWidth="xs">
              {this.state.beers.map((beer) => (
                <>
                  <Paper elevation={3}>
                    <Card key={beer.id} style={{ display: 'flex' }}>
                      <CardActionArea>
                        <Grid container spacing={5}>
                          <Grid item xs={8}>
                            <CardContent>
                              <Typography component="h5" variant="h5">
                                {beer.name}
                              </Typography>
                              <Typography
                                variant="subtitle1"
                                color="textSecondary"
                              >
                                {beer.tagline}
                              </Typography>
                            </CardContent>
                          </Grid>
                          <Grid item xs={2}>
                            <div className="card-image">
                              <img src={beer.image_url} alt={beer.name} />
                            </div>
                          </Grid>
                        </Grid>
                      </CardActionArea>
                      <CardActions>
                        <Link to={`/${beer.id}`}>
                          <InfoIcon></InfoIcon>
                        </Link>
                      </CardActions>
                    </Card>
                  </Paper>
                </>
              ))}
            </Container>

            <ul></ul>
          </>
        )}
      </>
    );
  }
}
