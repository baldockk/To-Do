import "./styles.css";

/*Creates a task object for adding to each individual project*/
class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

/*Creates the project with a given name*/
class Project {
    constructor(name) {
        this.name = name;
        //An array for storing all of the tasks related to the project
        this.tasksArray = [];
    }

    setTask(task) {
        this.tasksArray.push(task);
    }

    getTaskArray() {
        return this.tasksArray;
    }
}

export default Task;

/*Add button listener for when the user clicks to add a new project and appends the name of the project in the DOM as a new DIV*/
const addButton = document.getElementById("add");
const form = document.getElementById("project");
const formSubmit = document.getElementById("submit");
addButton.addEventListener("click", () => {
    form.style.display = "flex";
    formSubmit.addEventListener("click", e => {
        e.preventDefault();
        form.style.display = "none";
    })
});