import React, {Component} from "react";
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import "./app.css"
import ItemAddForm from "../item-add-forms";

export default class App extends Component {
    maxId = 100
    state = {
        todos:[
            {label: "Выйти на перемену", important: false, id:1, done: true},
            {label: "Курение вредно", important: true, id:2, done: false},
            {label: "А муха тоже вертолет.", important: false, id:3, done: true},
            {label: "Но без корбки передач.", important: false, id:4, done: false},
        ],
        filter: 'all',
        search:''
    }
    onActiveButton = () =>{
        this.setState({ filter: "active" });
    }
    onDoneButton = () => {
        this.setState({ filter: "done" });
    };

    onAllButton = () => {
        this.setState({ filter: "all" });
    };

    onDeleted = (id) => {
       this.setState(({todos})=>{
           const index = todos.findIndex(item=>item.id === id);
           const newTodos = [
               ...todos.slice(0,index),
               ...todos.splice(index+1)
           ];
           return {
               todos: newTodos
           }
       })
    }

    onItemAdded = (text) => {
        this.setState(({todos})=>{
            const newItem = {
                label:text,
                important:false,
                id: this.maxId++,
            }
            const newTodos = [
                ...todos,
                newItem
            ];
            return {
                todos: newTodos
            }
        })
    }


    toggleProperty =(arr, id, propName)=>{
        const idx = arr.findIndex(item=>item.id === id);
        const oldItem = arr[idx];
        const value = !oldItem[propName];
        const item = {...arr[idx], [propName]: value};
        console.log(item);
        return [
            ...arr.slice(0, idx),
            item,
            ...arr.slice(idx+1)
        ]
    }

    onToggleDone = (id) => {
        this.setState(({state})=>{
            const items = this.toggleProperty(this.state.todos, id, 'done');
            return {todos:items}
        })
    }

    onToggleImportant = (id) => {
        this.setState(({state})=>{
            const items = this.toggleProperty(this.state.todos, id, 'important');
            return {todos:items}
        })
    }

    onSearchChange = (search) => {
        console.log(search);
        this.setState({search:search})
    }
    searchItems(items, search){
        if(search.length === 0){ return items}
        return items.filter((item)=>{
            return item.label.toLowerCase().indexOf(search.toLowerCase()) > -1
        })
    }
    filterItems(filter, todos) {
        switch(filter){
            case "all":{
                return todos;
            }
            case "active":{
               return todos.filter(item => item.done === false);
            }
            case "done":{
                return todos.filter(item => item.done === true);
            }
        }
    }

    render(){
        const {todos, filter,search} = this.state;
        const doneCount = todos.filter((item)=> item.done).length;
        const todoCount = todos.length - doneCount;

        const visibleItems = this.searchItems(todos, search);
        const visibleFilter = this.filterItems(filter, visibleItems);
        return (
            <div className="App">
                <AppHeader todo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel
                    onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter
                        onActiveButton = {this.onActiveButton}
                        onDoneButton = {this.onDoneButton}
                        onAllButton = {this.onAllButton}
                    />
                </div>
                <TodoList
                    todos = {visibleFilter }
                    onToggleDone = {this.onToggleDone}
                    onToggleImportant = {this.onToggleImportant}
                    onDeleted={this.onDeleted}/>
                <ItemAddForm onItemAdded={this.onItemAdded}/>
            </div>
        )
    }

}

