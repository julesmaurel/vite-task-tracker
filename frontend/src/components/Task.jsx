import { FaTimes } from "react-icons/fa";
import { useState } from "react";

const Task = ({ task, onDelete, onToggle }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div
      className={`task ${task.reminder ? "reminder" : ""}`}
      onDoubleClick={() => onToggle(task._id)}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      data-testid="task"
    >
      <h3>
        {task.text}
        {isHovering && (
          <FaTimes
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => onDelete(task._id)}
            data-testid="deleteIcon"
          />
        )}
      </h3>
      <p>{task.day}</p>
    </div>
  );
};

export default Task;
