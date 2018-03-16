import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout } from '../../actions/index';
import { Redirect } from 'react-router-dom'

class NavigationBar extends React.Component {
    logout(e){
        e.preventDefault();
        this.props.logout();
    }
    render() {
        const { isAuthenticated } = this.props.userData;

        const userLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li> <Link to="/" onClick={this.logout.bind(this)}>LOGOUT</Link> </li>
            </ul>
        );
             

        const guestLinks = (
            <ul className="nav navbar-nav navbar-right">
                {/* <li> <Link to="/">LOGIN</Link></li>
                <li> <Link to="">LOGOUT</Link></li> */}
            </ul>
        );
        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header"> {
                        isAuthenticated ? <Link to='/provider/dashboard' className="navbar-brand"> DIBS SCHEDULING PLATFORM</Link> : <Link to='/' className="navbar-brand"> DIBS SCHEDULING PLATFORM</Link>
                    }
                        {/* <Link to='/' className="navbar-brand"> DIBS SCHEDULING PLATFORM</Link> */}
                    </div>
                    <div className="collapse navbar-collapse">
                        {isAuthenticated ? userLinks :  <Redirect to='/' />}
                    </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    //console.log('in homepage , redux state',state);
    return {
        userData: state.userData
    };
};

export default connect(mapStateToProps, { logout })(NavigationBar);