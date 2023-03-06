import React from "react";
import ListComponent from "./ListComponent";
import LoginComponent from "./LoginComponent";

export default class UserList extends React.Component {
    state = {
        list: []
    }

    async componentDidMount() {
        var url = 'http://127.0.0.1:8000/list/';
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        this.setState({list: data})

    }

    render() {
        var token = localStorage.getItem('token');
        if (token === '') {
            return <LoginComponent/>
        } else {
            console.log(this.state.list);
            const listApi = this.state.list;
            return (
                <div>
                    {listApi.map(list =>
                        <ListComponent key={list.id} listName={list.name} items={list.item_set}/>
                    )}
                </div>
            )
        }
    }

}