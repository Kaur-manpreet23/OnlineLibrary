import React, { Component } from "react";
import axios from 'axios';
import { Navigate, Link} from "react-router-dom";
class Main extends Component {
    constructor() {
        super();
    
        this.state = {
          logInStatus: "NOT_LOGGED_IN",
          user: {},
          isUpdated: false 
        };
    
      //  this.handleLogin = this.handleLogin.bind(this);
        //this.handleLogout = this.handleLogout.bind(this);
      }
    
     /* componentDidMount() {
        this.checkLoginStatus();
      }
    
      checkLoginStatus() {
        axios
          .get("http://localhost:3001/login", {headers: { 
           'Content-Type': 'application/json' 
          },withCredentials: true })
          .then(response => {
            if (
              response.data.logged_in &&
              this.state.logInStatus === "NOT_LOGGED_IN"
            ) {
              this.setState({
                logInStatus: "LOGGED_IN",
                user: response.data.user
              });
            } else if (
              !response.data.logged_in &
              (this.state.logInStatus === "LOGGED_IN")
            ) {
              this.setState({
                logInStatus: "NOT_LOGGED_IN",
                user: {}
              });
            }
          })
          .catch(error => {
            console.log("check login error", error);
          });
      }*/
    render(){ 
        return(
            <div className="text-center">
            {this.state.logInStatus === 'NOT_LOGGED_IN' ? (
              <div className="container d-flex justify-content-center align-items-center vh-50">
                <div className="row col text-center">
                <a href="/register" className="h4">Signup</a>
                <a href="/login" className="h4">Login</a>
               </div>
               
              </div>
            ) : (
              <div>
                <Navigate to='/dashboard'/>
              </div>
            )}
          </div>
        )
    }
}

export default Main