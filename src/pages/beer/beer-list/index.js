import React from 'react';

import './beer-list.css';

import BeerService from '../../../services/beer-service';

import Load from '../../../components/load';
import Header from '../../../components/header';
import Button from '../../../components/button';
import { Card, CardContent, CardAction } from '../../../components/cards';
import { Link } from 'react-router-dom';

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
    this.service.findById(id).then((res) => {
      console.log(res);
    });
  }

  render() {
    return (
      <>
        {!this.state.isLoad ? (
          <Load />
        ) : (
          <>
            <Header></Header>
            <div>
              {this.state.beers.map((beer) => (
                <Card key={beer.id}>
                  <CardContent>
                    <ul className="beer-item">
                      <li>
                        <img src={beer.image_url} alt={beer.name} />
                      </li>
                      <li>{beer.name}</li>
                      <li>{beer.tagline}</li>
                    </ul>
                  </CardContent>
                  <CardAction>
                    <Link to={`/${beer.id}`}>
                      <Button size="small"> Detalhes</Button>
                    </Link>
                  </CardAction>
                </Card>
              ))}
            </div>

            <ul></ul>
          </>
        )}
      </>
    );
  }
}
