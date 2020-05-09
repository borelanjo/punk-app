import React from 'react';

import './beer-list.css';

import BeerService from '../../../services/beer-service';

import Load from '../../../components/load';
import Header from '../../../components/header';
import { Card, CardContent } from '../../../components/cards';

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
                <Card>
                  <CardContent>
                    <ul className="beer-item">
                      <li>
                        <img src={beer.image_url} alt={beer.name} />
                      </li>
                      <li>{beer.name}</li>
                      <li>{beer.tagline}</li>
                    </ul>
                  </CardContent>
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
