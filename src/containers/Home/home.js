import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { http } from 'lib/http'
import './style.less'

class Home extends React.Component{
  constructor(props, context){
    super(props, context);
    this.state = {
      name: "liu"
    }
  }
  
  static defaultProps = {
    name: 'liu'
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'RECEIVE_BOOK',
      value: {a:5}
    })
    
    http.get("/api/homead").then(x => {
      this.setState({
        name: x[0].title
      })
    })
  }

  render(){
    return (
      <div>
        <h1>hello world</h1>
        <h1>react脚手架</h1>
        <h1>刘玄清</h1>
        <Link to="user">to user</Link>
      </div>
    );
  }
}
export default connect(
  state => {
    return {
      data: state.home.a
    }
  }
)(Home)

