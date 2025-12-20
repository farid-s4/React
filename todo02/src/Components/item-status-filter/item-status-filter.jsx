import "./item-status-filter.css"
import React, {Component} from "react";
/*
const ItemStatusFilter = (props) => {

    return (
        <div className="btn-group">
            <button className={"btn btn-info"} type={"button"}>All</button>
            <button className={"btn btn-outline-secondary"}  type={"button"} onClick={onActiveButton}>Active</button>
            <button className={"btn btn-outline-secondary"} type={"button"}>Done</button>
        </div>
    )
}

export default ItemStatusFilter;*/
export default class ItemStatusFilter extends Component {
    render() {
        const {onActiveButton} = this.props;
        return (
            <div className="btn-group">
                <button className={"btn btn-info"} type={"button"}>All</button>
                <button className={"btn btn-outline-secondary"}  type={"button"} onClick={onActiveButton}>Active</button>
                <button className={"btn btn-outline-secondary"} type={"button"}>Done</button>
            </div>
        )
    }
}