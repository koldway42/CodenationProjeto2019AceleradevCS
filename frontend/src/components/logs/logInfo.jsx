import React, { Component } from 'react';

import Main from "../template/main"
import api from "../../services/api"

import "./logInfo.css"

export default class logs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Log: {}
        }
    }

    async handleDelete() {
        const headers = { Authorization: 'Bearer ' + localStorage.getItem("accessToken") }

        await api.delete(`/log/${this.state.Log.id}`, { headers })
            .catch(err => {
                alert(err);
            })

        let text = window.location.href.split("#")[0];

        window.location.href = text + "#/logs"
    }

    async handleArchive() {
        const headers = { Authorization: 'Bearer ' + localStorage.getItem("accessToken") }

        await api.put(`/log/${this.state.Log.id}`, this.state.Log, { headers })
            .catch(err => {
                alert(err);
            })

        let text = window.location.href.split("#")[0];
            
        window.location.href = text + "#/logs"
    }

    handleBack() {
        let text = window.location.href.split("#")[0];

        window.location.href = text + "#/logs";
    }

    async componentDidMount() {
        const { match: { params } } = this.props;
        
        const headers = { Authorization: 'Bearer ' + localStorage.getItem("accessToken") }

        const response = await api.get(`/log/${params.logId}`, { headers })
                            .catch(err => {
                                if(err.response.status === 401) {
                                    alert("Seu token de autentificação expirou...");
                                    localStorage.removeItem("accessToken");
                                    window.location.reload();
                                    return;
                                }
                            })

        this.setState( {
            Log: response.data
        } )

        console.log(this.state.Log)
      }

  render() {
    return(
        <Main>
           
            <div id="logInfo">
                <button onClick={e => this.handleBack()} type="button" class="btn btn-secondary">Back</button>
                <br></br><br></br>
                <h2 className="PageTitle">
                   Erro no {this.state.Log.origin} em {new Date(this.state.Log.createdAt).toLocaleDateString()} {new Date(this.state.Log.createdAt).toLocaleTimeString()}
                </h2>
                <aside className="logStatus">
                    {this.state.Log.level}
                </aside>
                <div className="logInfoDesc">
                    <p><strong>Title</strong></p>
                    <p>{this.state.Log.title}</p>
                    <br></br>
                    <p><strong>Detail</strong></p>
                    <p> {this.state.Log.detail}</p>
                </div>
                <br></br>
                <div className="mt-2">
                    <button onClick={e => this.handleArchive()} type="button" class="btn btn-success" style={{marginRight: "10px"}}>Archive</button>
                    <button onClick={e => this.handleDelete()} type="button" class="btn btn-danger">Remove</button>
                </div>
            </div>
        </Main>
    )
  }
}

