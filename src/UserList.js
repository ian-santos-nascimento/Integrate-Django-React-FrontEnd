import React from "react";
import ListComponent from "./ListComponent";

export default class UserList extends React.Component {
    state = {
        list: [],
        token:null,
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