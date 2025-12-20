import "./item-status-filter.css"
import {Component} from "react";

export default class ItemStatusFilter extends Component {
    render() {
        const {onActiveButton} = this.props;
        const {onDoneButton} = this.props;
        const {onAllButton} = this.props;
        return (
            <div className="btn-group">
                <button className={"btn btn-info"} type={"button"} onClick={onAllButton}>All</button>
                <button className={"btn btn-outline-secondary"} type={"button"} onClick={onActiveButton}>Active</button>
                <button className={"btn btn-outline-secondary"} type={"button"} onClick={onDoneButton}>Done</button>
            </div>
        )
    }
}