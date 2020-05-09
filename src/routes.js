import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import BeerList from './pages/beer/beer-list';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={BeerList} />
            </Switch>
        </BrowserRouter>
    )
}