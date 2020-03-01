import React, { Component } from 'react';
import { Switch, Route } from "react-router";

import Home from "../components/home/home";
import Login from "../components/login/login";
import Register from "../components/register/register";
import Logs from "../components/logs/logs";
import LogInfo from "../components/logs/logInfo"
import notFound from "../components/notFound/notFound"
// import { Container } from './styles';


export default class main extends Component {

  state = {
    auth: null
  }

  componentDidMount() {

    this.setState( {
      auth: localStorage.getItem("accessToken")
    } );

  }

  handleAuthorized() {
    if(this.state.auth) {
      return(
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/logs/:logId" component={LogInfo} />
        <Route path="/logs" component={Logs} />
        <Route path="*" component={notFound} />
      </Switch>
      )
    } else {
      return(
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="*" component={notFound} />
        </Switch>
        )
    }
  }

  render() {
    return(
      this.handleAuthorized()
    )
  }
}
