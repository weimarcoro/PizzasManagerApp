import React from 'react';
import {Router, Switch, Route, Redirect} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import NotFound from '../components/NotFound';
import PublicRoute from './PublicRouter';
import PrivateRoute from './PrivateRouter';
import PizzaList from '../components/PizzaList';
import PizzaEdit from '../components/PizzaEdit';
import Ingredients from '../components/IngredientsList';

export const history = createBrowserHistory();

const AppRouter = () => (
    <Router history={history} >
        <Switch>
            <PublicRoute path="/" component={PizzaList} exact={true} history={history} />
            <PublicRoute path="/Ingredients" component={Ingredients} history={history} />
            <PublicRoute path="/Edit/:id" component={PizzaEdit} history={history} />
            <Route component={NotFound} />
        </Switch>
    </Router>
);

export default AppRouter;