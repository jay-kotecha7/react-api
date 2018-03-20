import React from 'react';


export default class Dummy extends React.Component{

    componentWillMount(){
        if(!localStorage.jwtToken){
            this.props.history.push('/');
        }
        else{
            return null
        }
    }

    render(){
        return (
            <div>
             Inside Dummy       
            </div>
        )
    }
}
// const mapStateToProps = (state) => {
//     console.log('in Dummy , redux state',state);
//       return {
//           userData: state.userData
//       };
//   };

//   export default connect (mapStateToProps,null)(Dummy);