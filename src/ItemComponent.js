import React from "react";

export default function ItemComponent(props){
    return(
        <li>
            { props.name } Status: { props.status ? <p>Finalizado</p> : <p>Pendente</p>}
        </li>
    )
}