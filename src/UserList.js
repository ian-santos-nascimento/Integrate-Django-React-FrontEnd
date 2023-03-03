import React from "react";
import ListComponent from "./ListComponent";

export default class UserList extends React.Component {
    state = {
        list:[]
    }
    async componentDidMount(){
        var url = 'http://127.0.0.1:8000/list/';
        const response = await fetch(url,{
            method : 'GET',
            headers :{
                'Authorization':'Token '+ '4767e79ccf640b431db2d44df75d81d8df8f6013',
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        this.setState( {list:data} )
    }
    render() {
        const listApi = this.state.list;
        return (
            <div>
                { listApi.map(list =>
                    <ListComponent key={ list.id } listName={ list.name }/>
                )}
            </div>
        )
    }
}