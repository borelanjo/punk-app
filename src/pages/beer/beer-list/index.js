import React from 'react';

import BeerService from '../../../services/beer-service';

export default class BeerList extends React.Component {
  service = new BeerService();
  state = {
    beers: []
  }

  componentDidMount() {
    this.service.findAll()
      .then(res => {
        const beers = res.data;
        this.setState({ beers });
      })
  }

  render() {
    return (
      <ul>
        { this.state.beers.map(beer => <li>{beer.name}</li>)}
      </ul>
    )
  }
}