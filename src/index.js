import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
//import thunk from 'redux-thunk'
// import {reduxThunk,thunk,thunkMiddleware} from 'redux-thunk'
import thunk from 'redux-thunk';
//import { createLogger } from 'redux-logger'
import HomePage from './components/home/homepage'
//import EnsureLoggedInContainer from './components/ensure_login'
import SelectRole from './components/home/select_role'
import NavigationBar from './components/home/NavBar'
import Dummy from './components/home/Dummy'
import BookAppointment from './components/customer/customer_bookApp/book_appointment'
import registerServiceWorker from './registerServiceWorker';
import SetupBusinessForm from './components/provider/Business_Setup/set_business';
import { createStore } from 'redux';
import { applyMiddleware } from 'redux';
import rootReducer from './reducers/index'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {browserHistory} from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import setAuthorizationToken from './actions/Set_Authorization';
import { setCurrentUser, createUser } from './actions/index';
import jwt_decode from 'jwt-decode';
import routerMiddleware from 'react-router-redux'

// const customMiddleWare = store => createUser => setCurrentUser => {
//     console.log("Middleware triggered:", setCurrentUser);
//     createUser(setCurrentUser);
//   }

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

if(localStorage.jwtToken)
{
    setAuthorizationToken(localStorage.jwtToken);
    store.dispatch(setCurrentUser(jwt_decode(localStorage.jwtToken)));
}


ReactDOM.render(
<Provider store={store}>
    <MuiThemeProvider>
        <BrowserRouter >
            <div>
                <NavigationBar />
                    <Switch>
                        <Route path="/home/Dummy" component={Dummy} />
                        <Route path="/home/select_role" component={SelectRole} refresh='true'/>
                        <Route path="/provider/Business_Setup/set_business" component={SetupBusinessForm} />
                        <Route path="/customer/book_app" component={BookAppointment} />
                        {/* <Route path="/provider/home" component={ProviderHome} /
                        <Route path="/customer/book" component={App} /> */}
                        <Route path='/' component={HomePage}/>
                    </Switch>
            </div>
        </BrowserRouter>       
    </MuiThemeProvider>
</Provider>
,document.getElementById('root'));
registerServiceWorker();

