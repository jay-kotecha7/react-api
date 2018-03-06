import React,{ Component } from 'react'
import videoPlay from './bg-video.mp4'
import '../../css/homepage.css'
import {Link} from 'react-router-dom'
import { withRouter, HashRouter } from 'react-router-dom'
import {connect} from 'react-redux'
//import {googleLogin} from '../actions/google'
import { reduxForm } from 'redux-form';
//import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login'
//import {signup} from '../actions/signup'
import { createUser } from '../../actions';
//import axios from 'axios';
//import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'


class HomePage extends Component {
    
    constructor(props) {
        super(props);
         this.state= {            
            redirect: false
        }
    }

    render() {

        const responseGoogle = (response) => { // 
            console.log(response)
            let data = {
                name: response.profileObj.name,
                provider: response.Zi.idpId,
                email: response.profileObj.email,
                uId: response.profileObj.googleId,
                token: response.Zi.access_token,
                //provider: response.Zi.idpId
            }
            this.props.createUser(data);
            this.props.history.push("/home/select_role");
            // sessionStorage.setItem("data", JSON.stringify(response));
            // this.setState({redirect: true});
        }
        // if (this.state.redirect || sessionStorage.getItem('userData')) {
        //     <Link to="/provider/provider_dashboard/index"></Link>
        // }

        var TxtType = function (el, toRotate, period) {
            this.toRotate = toRotate;
            this.el = el;
            this.loopNum = 0;
            this.period = parseInt(period, 10) || 2000;
            this.txt = '';
            this.tick();
            this.isDeleting = false;
        };
        TxtType.prototype.tick = function () {
            var i = this.loopNum % this.toRotate.length;
            var fullTxt = this.toRotate[i];

            if (this.isDeleting) {
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }

            this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

            var that = this;
            var delta = 200 - Math.random() * 100;

            if (this.isDeleting) { delta /= 2; }

            if (!this.isDeleting && this.txt === fullTxt) {
                delta = this.period;
                this.isDeleting = true;
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                this.loopNum++;
                delta = 500;
            }

            setTimeout(function () {
                that.tick();
            }, delta);
        };

        window.onload = function () {
            var elements = document.getElementsByClassName('typewrite');
            for (var i = 0; i < elements.length; i++) {
                var toRotate = elements[i].getAttribute('data-type');
                var period = elements[i].getAttribute('data-period');
                if (toRotate) {
                    new TxtType(elements[i], JSON.parse(toRotate), period);
                }
            }
        };
        const {handleSubmit} =this.props;

        return(
            <div className="nBar">
                <nav className="navbar navbar-inverse">
                <p className="navbar-text">DIBS SCHEDULING PLATFORM</p>
                <ul className="nav navbar-nav">
                  <li><a href="#">Link</a></li>
                  <li><a href="#">Link</a></li>
                </ul>
                
              </nav>
            <div className="video-container">   
           
                <video className="bgvideo" autoPlay="true" loop>  
                <div className="overlay-video"></div>                  
                    <source src={videoPlay} type="video/mp4" />
                </video>

                <div className="overlay-desc" align = "center">
                     <h1>
                        <span className="typewrite" data-period="2000" data-type='["Appointments","Scheduling","Connect","Your Business", "DIBS" ]'>
                            <span className="wrap">Business</span>
                        </span>
                        <br />Anywhere
                    </h1>
                    {/* <div class="g-signin2" ></div> */}
                </div>

                <div className="overlay">
                    <div className="signIn" align="center">
                        <GoogleLogin
                            clientId="444898618193-thmlidkh4vjnpf9napj857c0tqeb6atk.apps.googleusercontent.com"
                            buttonText="Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                        />          
                    </div>
                </div>
            </div>
      </div>  
      );
       
    }
}

function mapStateToProps(state) {
    return {
        userData: state.userData
    }
}

function mapDispatchToProps(dispatch){
    return {
        createUser: function (dispatch) {
            createUser(dispatch);
        }
    }
    // return bindActionCreators({
    //     createUser:createUser
    // }, dispatch)
}

export default reduxForm({      
   
form:'googleSign'
})(
connect (mapStateToProps,mapDispatchToProps)(HomePage)
);
