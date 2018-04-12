import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout, fetchUser } from '../actions/index';
import { Redirect } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';


function handleClick() {
  alert('onClick triggered on the title component');
}

const styles = {
  
  title: {
    cursor: 'pointer',
  },
};

const style = {
    margin: 8,
    avatar:{
        'marginLeft': '80%'
    }
  };
  
  const userLinks= (
    <ul>
        <RaisedButton label="logout" primary={true} style={style} />
    </ul>
  )

class NavigationBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {open: false};
      }
    
    componentWillMount(){
        this.props.fetchUser(this.props.userData.user.userId);
        console.log('fetch User Data', this.props.user)
    }

    logout(e){
        e.preventDefault();
        console.log('inside this.logout')
        this.props.logout(()=>{this.props.history.push('/');});
        
    }


    handleToggle = () => this.setState({open: !this.state.open});
    handleClose = () => this.setState({open: false});

    render(){
        const { isAuthenticated } = this.props.userData;
        return(  
            
        <div>
            <AppBar
                title={<span style={styles.title}>DIBS SCHEDULING PLATFORM</span>}
                onTitleClick={handleClick}
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                iconStyleLeft={style}
                //iconElementLeft={ <IconButton  style={style}> <ActionHome /> </IconButton>}
                iconElementRight={isAuthenticated ? userLinks : null }
                onRightIconButtonClick={this.logout.bind(this)}
                onLeftIconButtonClick={this.handleToggle}
            />
            <Drawer
                docked={false}
                width={200}
                open={this.state.open}
                onRequestChange={(open) => this.setState({open})}
            >
           
            <div>
                <List >
                 
                    <ListItem 
                        disabled={true}
                        leftAvatar={
                            <div> 
                                <Avatar  align='center'
                                    src="https://lh5.googleusercontent.com/-mVFhOS_bgM4/AAAAAAAAAAI/AAAAAAAAAAA/AGi4gfwq7tYj6miPiJueX21S5cHfDzav8g/s96-c/photo.jpg"
                                    size={60}
                                    style={style.avatar}
                                />
                            </div>   
                        }
                    >
                    </ListItem>

                    <br />
                    <br />
                    <div>
                        <ListItem primaryText="My Bookings" leftIcon={<ContentInbox />} />
                        <ListItem primaryText="Edit Profile" leftIcon={<ActionGrade />} />
                    </div>
                </List>
            </div>
        
            </Drawer>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        user: state.user
    };
};

function mapDispatchToProps(dispatch) {
    return {

      logout: logout,    
      fetchUser: fetchUser
    }
  }

export default connect(mapStateToProps, mapDispatchToProps )(NavigationBar);
