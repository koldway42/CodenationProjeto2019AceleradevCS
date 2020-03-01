import React, { Component } from 'react';

import Alert from 'react-bootstrap/Alert'
import Main from "../template/main"
import api from "../../services/api"

import "./login.css"

export default class login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      Email: "",
      Password: ""
    }
  }

  handleChange(e) {
      this.setState( {[e.target.name]: e.target.value } )
  }

  handleSubmit(e) {
    e.preventDefault();
    const { Email, Password } = this.state;

    const data = {
      Email,
      Password
    }

    api.post("/login", data, {})
      .then(resp => {
        localStorage.setItem("accessToken", resp.data.accessToken);

        window.location = "#/"

        window.location.reload();
      })
      .catch(err => {
        console.log(err.response.data);
        const errors = err.response.data.errors;
        
        let message = []

        for (let key in errors) {
            message.push(errors[key]);
        }
        this.setState({
            messageTitle: err.response.data.title,
            message,
            status: "error"
        })
      })
  }

  AlertDanger(msg, variant) {
    return (
        <Alert variant={variant}>
            <h5><strong>{this.state.messageTitle}</strong><br /></h5>
            <hr/>
            {this.state.message.length !== 0 ? 
            this.state.message.map((err, index) => <p key={index}>{err}<br /></p> ) : ""}
        </Alert>
    )   
}

  render() {
    return (
        <Main>
            {
              this.state.status === "error" ? 
              this.AlertDanger(this.state.message, "danger") : 
              this.state.status === "success" ?
              this.AlertDanger(this.state.message, "success"): ""
            }
            <div id="LoginScreen">
              <h2 className="PageTitle">
                Login
              </h2>
              <form onSubmit={e => this.handleSubmit(e)}>
                    <div className="form-group">
                        <label for="EmailInputLogin">Email address</label>
                        <input onChange={e => this.handleChange(e)} name="Email" type="email" class="form-control" id="EmailInputLogin" aria-describedby="emailHelp" />
                    </div>
                    <div class="form-group">
                        <label for="PasswordInputLogin">Password</label>
                        <input onChange={e => this.handleChange(e)} name="Password" type="password" class="form-control" id="PasswordInputLogin" />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </Main>
    );
  }
}
