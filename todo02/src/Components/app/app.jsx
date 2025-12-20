import React, {Component} from "react";
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import "./app.css"
import ItemAddForm from "../item-add-forms";

export default class App extends Component {

    state = {
        todos:[
            {label: "Выйти на перемену", important: false, id:1, done: false},
            {label: "Курение вредно", important: true, id:2, done: true},
            {label: "А муха тоже вертолет.", important: false, id:3, done: true},
            {label: "Но без корбки передач.", important: false, id:4, done: false},
        ]
    }
    onActiveButton = (props) =>{
        this.setState(({todos})=>{
            const newTodos = todos.filter(item=> item.done===false);
            return { todos: newTodos, }
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

    onDeleted = (id) => {
       this.setState(({todos})=>{
           const index = todos.findIndex(item=>item.id === id);
           const newTodos = [
               ...todos.slice(0,index),
               ...todos.slice(index+1)
           ];
           return {
               todos: newTodos
           }
       })
    }
    onAddItem = () => {
        this.setState(({todos})=>{
            const newItem = {label: "HelloWorld", important: false, id:todos.length+1};
            const newTodos =[
                ...todos,
                newItem
            ]
            return {
                todos: newTodos
            }
        })
    }


    render(){
        return (
            <div className="App">
                <AppHeader todo={1} done={3}/>
                <div className="top-panel d-flex">
                    <SearchPanel/>
                    <ItemStatusFilter
                        todos={this.state.todos}
                        onActiveButton = {this.onActiveButton}
                    />
                </div>

                <TodoList
                    todos={this.state.todos}
                    onDeleted={this.onDeleted}/>
                <ItemAddForm
                    onAddItem={this.onAddItem}
                />
            </div>
        )
    }

}

