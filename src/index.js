import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
// import App from './components/App';
// import BookAppointment from './components/book_appointment'
import HomePage from './components/home/homepage'
//import ProviderHome from './components/provider/provider_dashboard/index'
import SelectRole from './components/home/select_role'
import registerServiceWorker from './registerServiceWorker';
import SetupBusinessForm from './components/provider/Business_Setup/set_business';
import { createStore,applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise'
import rootReducer from './reducers'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore)

ReactDOM.render(
<Provider store={createStoreWithMiddleware(rootReducer)}>
<MuiThemeProvider>
    <BrowserRouter>
    <div>
    <Switch>
        <Route path="/home/select_role" component={SelectRole} />
        <Route path="/provider/Business_Setup/set_business" component={SetupBusinessForm} />
        {/* <Route path="/provider/home" component={ProviderHome} /> */}
        {/* <Route path="/customer/book" component={App} /> */}
        <Route path='/' component={HomePage} />
    </Switch>
    </div>
    </BrowserRouter>
</MuiThemeProvider>
</Provider>
,document.getElementById('root'));
registerServiceWorker();
