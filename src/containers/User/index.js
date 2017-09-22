import React from 'react';
import {connect} from 'react-redux';

export default  class User extends React.Component{
  constructor(props, context){
    super(props, context);
    this.state = {}
  }
  
  componentDidMount() {
   
  }

  render(){
    return (
      <div>
        user
      </div>
    );
  }
}
