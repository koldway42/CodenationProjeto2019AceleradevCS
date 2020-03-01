import React, { Component } from 'react';

import Alert from 'react-bootstrap/Alert'
import Main from "../template/main"
import api from "../../services/api"

import "./register.css"

export default class register extends Component {
    defaultState = {
        Fullname: "",
        Email: "",
        Password: "",
        ConfirmPassword: "",
    }

    state = this.defaultState;

    async handleSubmit(e) {
        e.preventDefault();
        const {
            Fullname,
            Email,
            Password,
            ConfirmPassword
        } = this.state;

        const data = {
            Fullname,
            Email,
            Password
        }

        if(Password !== ConfirmPassword)  {
            this.setState({
                message: "The password doesn't match",
                status: "error"
            })
            return;
        }

        console.log(data);

        await api.post("/User",data, {})
            .then(resp => {
                console.log(resp);
                if(resp.status >= 200 && resp.status < 300) {
                    let message = [];
                    message.push("User successfully registered")
                    this.setState({
                        messageTitle: "Success!",
                        message,
                        status: "success",
                        ...this.defaultState
                    })
                }
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
            });
    }

    handleChange(e) {
        this.setState( {[e.target.name]: e.target.value } )
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
        return(
            <Main>
                {
                    this.state.status === "error" ? 
                    this.AlertDanger(this.state.message, "danger") : 
                    this.state.status === "success" ?
                    this.AlertDanger(this.state.message, "success"): ""
                }
                <div id="RegisterScreen">
                    <h2 className="PageTitle">
                        Register
                    </h2>
                    <form method="post" onSubmit={e => this.handleSubmit(e)}>
                        <div className="form-group">
                            <label for="FullNameInput">Full Name</label>
                            <input 
                            onChange={e => this.handleChange(e)} 
                            name="Fullname" 
                            type="text" 
                            class="form-control" 
                            id="FullNameInput" 
                            aria-describedby="emailHelp" 
                            value={this.state.Fullname}/>
                        </div>
                        <div class="form-group">
                            <label for="EmailInput">Email address</label>
                            <input 
                            onChange={e => this.handleChange(e)} 
                            name="Email" 
                            type="email" 
                            class="form-control" 
                            id="EmailInput" 
                            aria-describedby="emailHelp" 
                            value={this.state.Email}/>
                        </div>
                        <div class="form-group">
                            <label for="InputPasswordRegister">Password</label>
                            <input 
                            onChange={e => this.handleChange(e)} 
                            name="Password" 
                            type="password" 
                            class="form-control" 
                            id="InputPasswordRegister" 
                            value={this.state.Password}/>
                        </div>
                        <div class="form-group">
                            <label for="InputConfirmPasswordRegister">Confirm Password</label>
                            <input 
                            onChange={e => this.handleChange(e)} 
                            name="ConfirmPassword"
                            type="password" 
                            class="form-control" 
                            id="InputConfirmPasswordRegister" 
                            value={this.state.ConfirmPassword}/>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </Main>
        );
    }
}
