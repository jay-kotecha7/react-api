import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout } from '../actions/index';
import { Redirect } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton';

function handleClick() {
  alert('onClick triggered on the title component');
}

const styles = {
  title: {
    cursor: 'pointer',
  },
};

const style = {
    margin: 12,
  };
  
  const userLinks= (
    <ul>
        <RaisedButton label="logout" primary={true} style={style} />
    </ul>
  )

class NavigationBar extends React.Component{
   
    logout(e){
        e.preventDefault();
        this.props.logout();
        this.props.history.push('/');
    }



    render(){
        const { isAuthenticated } = this.props.userData;
        return(  
            <AppBar
                title={<span style={styles.title}>DIBS SCHEDULING PLATFORM</span>}
                onTitleClick={handleClick}
                iconElementLeft={ <IconButton> <ActionHome /> </IconButton>}
                iconElementRight={isAuthenticated ? userLinks : null }
                onRightIconButtonClick={this.logout.bind(this)}
            />
        );
    }
}

const mapStateToProps = (state) => {
    //console.log('in homepage , redux state',state);
    return {
        userData: state.userData
    };
};

export default connect(mapStateToProps, { logout })(NavigationBar);
