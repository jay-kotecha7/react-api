import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import App from './components/App';
import BookAppointment from './components/book_appointment'
import HomePage from './components/homepage'
import ProviderHome from './components/provider_home'
import registerServiceWorker from './registerServiceWorker';
import { createStore,applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise'
import reducers from './reducers'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore)

ReactDOM.render(
<Provider store={createStoreWithMiddleware(reducers)}>
<MuiThemeProvider>
    <BrowserRouter>
    <div>
    <Switch>
        <Route path="/provider/home" component={ProviderHome} />
        <Route path="/customer/book" component={App} />
        <Route path='/' component={HomePage} />
    </Switch>
    </div>
    </BrowserRouter>
</MuiThemeProvider>
</Provider>
,document.getElementById('root'));
registerServiceWorker();
