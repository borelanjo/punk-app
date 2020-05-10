import React, { Component } from 'react';
import BeerService from '../../../services/beer-service';

import Load from '../../../components/load';
import Header from '../../../components/header';
import Button from '../../../components/button';
import { Card, CardContent, CardAction } from '../../../components/cards';
import { Link } from 'react-router-dom';

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
      console.log(id);
      const res = await this.service.findById(id);
      console.log(res);
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
            <Header title={name}></Header>
            <Card key={id}>
              <CardContent>
                <ul className="beer-item">
                  <li>
                    <img src={image_url} alt={name} />
                  </li>
                  <li>Name: {name}</li>
                  <li>Tagline: {tagline}</li>
                  <li>First Brewed: {first_brewed}</li>
                  <li>Description: {description}</li>
                  <li>
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
                  </li>
                </ul>
              </CardContent>
              <CardAction>
                <Link to={'/'}>
                  <Button size="small"> Voltar</Button>
                </Link>
              </CardAction>
            </Card>
          </>
        )}
      </>
    );
  }
}
