import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import HomePage from './components/home/homepage'
import SelectRole from './components/Select_Role/index'
import Dummy from './containers/Dummy'
import BookAppointmentComponent from './components/customer/Customer_BookApp/index'
import registerServiceWorker from './registerServiceWorker';
import SetupBusinessFormComponent from './components/provider/Setup_Business/index';
import { createStore } from 'redux';
import { applyMiddleware } from 'redux';
import rootReducer from './reducers/index'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import setAuthorizationToken from './actions/Set_Authorization';
import { setCurrentUser } from './actions/index';
import jwt_decode from 'jwt-decode';
import CustomerHomepageComponent from './components/customer/Customer_DashBoard/index';



export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

if(localStorage.jwtToken){
    setAuthorizationToken(localStorage.jwtToken);
    store.dispatch(setCurrentUser(jwt_decode(localStorage.jwtToken)));
}

// function ensure(){
//     console.log('inside Ensure')
//     if(!localStorage.jwtToken){
//         <Redirect to="/" />
//     }
//     else{
//         return null
//     }
// }

ReactDOM.render(
<Provider store={store}>
    <MuiThemeProvider>
        <BrowserRouter >
            <div>
                {/* <NavigationBar /> */}
                    <Switch>
                        <Route path="/home/select_role" component={SelectRole} />
                        <Route path="/home/Dummy" component={Dummy} refresh="true"/>
                        <Route path="/provider/Business_Setup/set_business" component={SetupBusinessFormComponent} />
                        <Route path="/customer/book_app" component={BookAppointmentComponent} />
                        <Route path="/customer/customer_dashboard/customer_homepage" component={CustomerHomepageComponent} />
                        {/* <Route path="/customer/book" component={App} /> */}
                        <Route exact path='/' component={HomePage}/>
                    </Switch>
            </div>
        </BrowserRouter>       
    </MuiThemeProvider>
</Provider>
,document.getElementById('root'));
registerServiceWorker();

