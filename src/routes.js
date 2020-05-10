import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import BeerList from './pages/beer/beer-list';
import BeerDetail from './pages/beer/beer-detail';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={BeerList} />
                <Route path="/:id" exact component={BeerDetail} />
            </Switch>
        </BrowserRouter>
    )
}