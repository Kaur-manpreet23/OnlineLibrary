import React, { Component } from "react";
import axios from 'axios'
import {Link,  Navigate} from 'react-router-dom';
import DataContext from "../DataContext";
import { Button } from "bootstrap";
class Login extends Component {
    static contextType = DataContext;
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            registrationErrors: "",
            isloggedin: false,
            token: ""
        }   
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        const { data, updateData } = this.context;
        axios.post("http://localhost:3001/login", {
            user: {
                email: this.state.email,
                password: this.state.password,
            }
        },
            { withCredentials: true }
        ).then(response => {
            console.log("Login res", response);
            console.log(`Bearer ${response.data.token}`);
            //this.setState({
              //  token: response.data.token 
            //})
            //console.log(this.state.token);
            if (response['data']['logged_in'] == true){
                alert("Logged in successfully");
                this.setState({
                    isloggedin: true,
                });
                updateData({token: response.data.token });
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('uid',response.data.user.id);
                console.log('uid',response.data.user.id)
            } else if (response['data']['status']==401){
                alert("Incorrect credentials");
            }
        }).catch(error => {
            console.log("Login err", error);
        });
        console.log("form submitted");
        event.preventDefault();
    }
    render() {
        return ( 
            <div> 
                 <h3 className="text-center">LOG IN PAGE</h3>
                {this.state.isloggedin && (<Navigate to="/dashboard" replace={true} token={this.state.token} /> )}
                <form onSubmit={this.handleSubmit}>
                    <div className="container">
                    <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">@</span>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        className="form-control"
                        required />
                        </div>
                        <div className="input-group mb-3"> 
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        className="form-control"
                        required />
                    </div>
                    <Link to="/" onClick={this.handleSubmit} className="button">Log in</Link>
                    </div>
                    {/*<button type="submit">Login</button>*/}
                </form>
                <br />
                <div className="container">
                New User ? <a href="/register">Signup</a>
                </div>
            </div>
        )
    }
}

export default Login