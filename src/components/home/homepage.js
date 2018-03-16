import React,{ Component } from 'react'
import videoPlay from './bg-video.mp4'
import '../../css/homepage.css'
import {connect} from 'react-redux'
import GoogleLogin from 'react-google-login'
import { createUser} from '../../actions/index';
import { bindActionCreators } from "redux";


class HomePage extends Component {

    render() {

        const responseGoogle = (response) => { 
            console.log('Response Data : ',response)
            let data = {
                name: response.profileObj.name,
                provider: response.Zi.idpId,
                email: response.profileObj.email,
                uId: response.profileObj.googleId,
                token: response.Zi.access_token,
            }
                console.log('in response google');
                this.props.createUser(data);
                this.props.history.push("/home/select_role");
            }
            
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


        return(
            <div className="nBar">
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


function mapDispatchToProps(){
    console.log('Mapping createUser action to component HomePage')
    return {
        createUser: createUser,
    }
}

export default connect(
    null,
    mapDispatchToProps
  )(HomePage);