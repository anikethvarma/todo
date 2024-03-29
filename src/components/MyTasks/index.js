import {Component} from 'react'
import {v4} from 'uuid'
import TaskItem from '../TaskItem'
import './index.css'

class MyTasks extends Component {
  state = {newTask: '', todoList: []}

  componentDidMount() {
    this.fetchTodos()
  }

  fetchTodos = async () => {
    if (localStorage.getItem('todos') === null) {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos')
      const data = await response.json()
      localStorage.setItem('todos', JSON.stringify(data))
    }
    const data = localStorage.getItem('todos')
    this.setState({todoList: JSON.parse(data)})
  }

  toggleStatus = id => {
    const {todoList} = this.state

    const updatedList = todoList.map(eachElement => {
      if (eachElement.id === id) {
        const item = {
          id: eachElement.id,
          userId: eachElement.userId,
          completed: !eachElement.completed,
          title: eachElement.title,
        }
        return item
      }
      return eachElement
    })
    localStorage.setItem('todos', JSON.stringify(updatedList))
    this.setState({todoList: updatedList})
  }

  deleteTodo = id => {
    const {todoList} = this.state

    const updatedList = todoList.filter(eachElement => eachElement.id !== id)
    localStorage.setItem('todos', JSON.stringify(updatedList))
    this.setState({todoList: updatedList})
  }

  onChangeNewTask = event => {
    this.setState({newTask: event.target.value})
  }

  onAddTodo = () => {
    const {newTask, todoList} = this.state
    const newTodo = {id: v4(), userId: v4(), completed: false, title: newTask}
    localStorage.setItem('todos', JSON.stringify([newTodo, ...todoList]))
    this.setState(prevState => ({
      todoList: [newTodo, ...prevState.todoList],
      newTask: '',
    }))
  }

  render() {
    const {todoList} = this.state
    return (
      <div className="bg">
        <div className="header">
          <h1 className="main-heading">Todos</h1>
          <input
            type="text"
            placeholder="Add New task"
            className="new-task"
            onChange={this.onChangeNewTask}
          />
          <button type="button" onClick={this.onAddTodo} className="add-button">
            Add
          </button>
        </div>
        <ul className="ul">
          {todoList.map(eachElement => (
            <TaskItem
              taskData={eachElement}
              key={eachElement.id}
              toggleStatus={this.toggleStatus}
              deleteTodo={this.deleteTodo}
            />
          ))}
        </ul>
      </div>
    )
  }
}
export default MyTasks
