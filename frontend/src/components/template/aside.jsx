import React, {Component} from "react";

import BurgerMenu from "react-burger-menu"
import "./aside.css"

export default class aside extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            auth: null
        }
      }


    componentDidMount() {
        this.setState( {
            auth: localStorage.getItem("accessToken")
        } );
    }

    handleLogout() {
        localStorage.removeItem("accessToken");

        window.location.reload();
    }

    handleAuthorized() {
        const Menu = BurgerMenu["push"]
        if(this.state.auth) {
          return(
            <Menu id="push" pageWrapId={"Page-Wrapper"} outerContainerId={"App"}>
                <div>
                    <h2>
                        MENU
                    </h2>
                </div>
                <a href="#/" className="menu-item">
                    <i className={`fa fa-home mr-2`}></i> Home
                </a>
                <a href="#/logs" className="menu-item">
                    <i className={`fa fa-clipboard mr-2`}></i> Logs
                </a>
                <a href="/" onClick={e => this.handleLogout()} className="menu-item">
                    <i className={`fa fa-sign-out mr-2`}></i> Logout
                </a>
            </Menu>
          )
        } else {
          return(
            <Menu id="push" pageWrapId={"Page-Wrapper"} outerContainerId={"App"}>
                <div>
                    <h2>
                        MENU
                    </h2>
                </div>
                <a href="#/" className="menu-item">
                    <i className={`fa fa-home mr-2`}></i> Home
                </a>
                <a href="#/login" className="menu-item">
                    <i className={`fa fa-book mr-2`}></i> Login
                </a>
                <a href="#/register" className="menu-item">
                    <i className={`fa fa-clipboard mr-2`}></i> Register
                </a>
            </Menu>
            )
        }
      }

    render() {
        return (
            this.handleAuthorized()
        );
    }
}
