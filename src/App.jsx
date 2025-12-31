import React from "react";
import logo from './checklist.png';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem : "",
      list : []
    }
  }

  addItem (todoValue) {
    if (todoValue !== "") {
      const newItem = {
        id : Date.now(),
        value : todoValue,
        isDone : false
      }

      const list = [...this.state.list];
      list.push(newItem);

      this.setState({
        list,
        newItem : ""
      });
    }
  }

  deleteItem (id) {
    const list = [...this.state.list];
    const updatedList = list.filter(item => item.id !== id);
    this.setState({list : updatedList});
  }

  updateInput (input) {
    this.setState({newItem : input});
  }

  toggleItem (id) {
    const list = this.state.list.map(item => {
      if (item.id === id) return {...item, isDone: !item.isDone};
      return item;
    });
    this.setState({ list });
  }

  render() {
    return (<div>
      <img src={logo} width="100" height="100" className="logo"/>
      <h1 className="app-title"> To-Do Planner</h1>

      <div className="container">
        <div className="form">
          <label className="form-label">MY TASKS</label>
          <div className="form-row">
            <input
              type='text'
              className="input-text"
              placeholder="Enter new task"
              required
              value={this.state.newItem}
              onChange={item => this.updateInput(item.target.value)}
              />
            <button
            className="add-btn"
            onClick={() => this.addItem(this.state.newItem)}
            disabled={!this.state.newItem.length}
            >Add Task</button>
          </div>
          <div className="list">
            <ul>
              {this.state.list.map(item => (
                <li key={item.id} className="task">
                  <input
                    type="checkbox"
                    checked={item.isDone}
                    onChange={() => this.toggleItem(item.id)} />
                  <span className={item.isDone ? 'done' : ''}>{item.value}</span>
                  <button
                    className="btn"
                    onClick={() => this.deleteItem(item.id)}
                  >Delete</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      </div>
    );
  }
}

export default App;
