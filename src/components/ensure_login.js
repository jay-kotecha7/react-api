import React,{ Component } from 'react'
// import {browserHistory, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'

class EnsureLoggedInContainer extends Component {
    componentDidMount() {
      const { dispatch, currentURL } = this.props
  
      if (this.props.isAuthenticated==false) {
        // set the current url/path for future redirection (we use a Redux action)
        // then redirect (we use a React Router method)
       // dispatch(setRedirectUrl(currentURL))
       console.log('Redirecting to home');
        this.props.history.push("/")
      }
    }
  
    render() {

      if (this.props.isAuthenticated) {
        return this.props.children
      } else {
        return null
      }
    }
  }
  
  // Grab a reference to the current URL. If this is a web app and you are
  // using React Router, you can use `ownProps` to find the URL. Other
  // platforms (Native) or routing libraries have similar ways to find
  // the current position in the app.
  function mapStateToProps(state, ownProps) {
    console.log('Ensure Data',state.userData);
    return {
        userData: state.userData,
      currentURL: ownProps.location.pathname
    }
  }
  
  export default connect(mapStateToProps)(EnsureLoggedInContainer)