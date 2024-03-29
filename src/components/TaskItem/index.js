import './index.css'

const TaskItem = props => {
  const {taskData, toggleStatus, deleteTodo} = props
  const {completed, id, title} = taskData

  const onChangeStatus = () => {
    toggleStatus(id)
  }

  const onClickDelete = () => {
    deleteTodo(id)
  }

  return (
    <div className="li">
      <div className="item-main">
        <input
          type="checkbox"
          id={id}
          fontSize={50}
          onChange={onChangeStatus}
          checked={completed}
        />
        {completed ? (
          <label htmlFor={id} className="checkbox-label-crossed">
            {title}
          </label>
        ) : (
          <label htmlFor={id} className="checkbox-label">
            {title}
          </label>
        )}
      </div>
      <button type="button" onClick={onClickDelete}>
        Delete
      </button>
    </div>
  )
}

export default TaskItem
