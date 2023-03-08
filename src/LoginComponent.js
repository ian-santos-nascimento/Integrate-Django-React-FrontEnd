import React from "react";
import UserList from "./UserList";

export default class LoginComponent extends React.Component {

    constructor(props) {
        super();

        this.state = {
            username: '',
            password: '',
            token: null,

        };

        this.handleChange = this.handleChange.bind(this); //Para poder ser chamada no render
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePassword = this.handlePassword.bind(this);

    }

    handleChange(event) {
        this.setState({username: event.target.value})
    }

    handleSubmit(event) {
        var url = 'http://127.0.0.1:8000/api-token-auth/';
        const response = fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: this.state.username, password: this.state.password})
        })
            .then(response => response.json())
            .then(data =>{
              localStorage.setItem('token', data.token);
                this.setState({token:data.token})
            } )

        event.preventDefault();
    }

    handlePassword(event) {
        this.setState({password: event.target.value})
    }

    logout(){
        localStorage.removeItem('token')
        this.setState({token:null})
    }

    render() {
        var token = localStorage.getItem('token')
        if (!token) {
            return (
                <form onSubmit={this.handleSubmit}>
                    <label>Username:<input type="text" value={this.state.username}
                                           onChange={this.handleChange}></input></label>
                    <label>Password:<input type="password" value={this.state.password}
                                           onChange={this.handlePassword}></input></label>
                    <input type="submit" value="Submit"/>
                </form>
            )
        }else{
            return (
                <div>
                    <UserList />
                    <button onClick={() => this.logout()}>LogOut</button>
                </div>

            )
        }
    }
}