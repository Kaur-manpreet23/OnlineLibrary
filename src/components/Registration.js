import React, { Component } from "react";
import axios from 'axios'
import { Navigate } from "react-router-dom";
class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            password_confirmation: "",
            registrationErrors: "",
            isRegisterSuccess: false
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
        axios.post("http://localhost:3001/signup", {
            user: {
                email: this.state.email,
                password: this.state.password,
                password_confirmation: this.state.password_confirmation
            }
        },
            { withCredentials: true }
        ).then(response => {
            console.log("registration res", response);
                alert("Register Success! Please login to proceed");
                this.setState({
                    isRegisterSuccess: true
                })
        }).catch(error => {
            console.log("registration error", error);
            alert("Email already taken!!")
        });
        console.log("form submitted");
        event.preventDefault();
    }
    render() {
        return (
            <div>
                <h3 className="text-center">SIGN UP PAGE</h3>
                {this.state.isRegisterSuccess && (<Navigate to="/login" replace={true} /> )}
                <form onSubmit={this.handleSubmit} className="container">
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
<div className="input-group mb-3">
                    <input
                        type="password"
                        name="password_confirmation"
                        placeholder="Password Confirmation"
                        value={this.state.password_confirmation}
                        onChange={this.handleChange}
                        className="form-control"
                        required />
</div>
<div className="input-group mb-3">
                    <button type="submit" className="btn btn-primary">Register</button>
                    </div>
                </form>
                <div className="container">
                Already registered ? <a href="/login">Signin</a>
                </div>
            </div>
        )
    }
}

export default Registration