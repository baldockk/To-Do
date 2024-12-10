import "./styles.css";

/*Creates a task object for adding to each individual project*/
class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    /*Creates the div which contains all of the task content and returns it to the project*/
    buildTaskDiv() {
        const newDiv = document.createElement("div");
        newDiv.classList.add("contentDiv");
        const title = document.createElement("h3");
        const description = document.createElement("p");
        const dueDate = document.createElement("p");
        const priority = document.createElement("h4");

        title.textContent = this.title;
        description.textContent = this.description;
        dueDate.textContent = this.dueDate;
        priority.textContent = this.priority;

        newDiv.appendChild(title);
        newDiv.appendChild(description);
        newDiv.appendChild(dueDate);
        newDiv.appendChild(priority);

        return newDiv;
    }
}

/*Creates the project with a given name*/
class Project {
    static projectCount = 0;
    constructor(name) {
        this.name = name;
        //An array for storing all of the tasks related to the project
        this.tasksArray = [];
        Project.projectCount++;
        this.projectCount = Project.projectCount;
    }

    /*Write a task to a specific project*/
    setTask(task) {
        this.tasksArray.push(task);
    }

    /*Get the array of tasks for the selected project*/
    getTaskArray() {
        return this.tasksArray;
    }

    /*Gets the project number. Important to track the projects for deletion*/
    getProjectNum() {
        return this.projectCount;
    }

    /*Manipulates the DOM to show the particular project*/
    displayProject() {
        //Get the navigational panel so we can add a button for accessing the project
        const nav = document.getElementById("nav-panel");
        const projectButton = document.createElement("button");
        projectButton.classList.add("nav-button");
        projectButton.textContent = this.name;

        const taskDiv = document.getElementById("content");

        projectButton.addEventListener("click", () => {     
             //Make the add task button visible
            const addTaskHeader = document.getElementsByClassName("addTask")[0];
            const addTaskButton = document.getElementsByClassName("addTask")[1];
            addTaskHeader.style.display = "block";
            addTaskButton.style.display = "block";
            this.clearTaskContainer(taskDiv);
            //Add the name of the project to the top of the tasks for clarity
            const projectTitle = document.createElement("h2");
            projectTitle.classList.add("projectTitle");
            projectTitle.textContent = this.name;
            taskDiv.appendChild(projectTitle);
            this.displayTasks(taskDiv);
        });

        nav.appendChild(projectButton);
    }

    /*Clear the project task bar html for displaying this array of tasks*/
    clearTaskContainer(div) {
        div.innerHTML = "";
    }

    /*Displays the tasks to the content div by first building the task DOM element*/
    displayTasks(div) {
        for(let i = 0; i < this.tasksArray.length; i++){
            const builtDiv = this.tasksArray[i].buildTaskDiv();
            div.appendChild(builtDiv);
        }        
    }
}

export {Task, Project};

/*Add button listener for when the user clicks to add a new project and appends the name of the project in the DOM as a new DIV*/
const addProjectButton = document.getElementById("add");
const projectForm = document.getElementById("project");
const projectFormSubmit = document.getElementById("submit");

addProjectButton.addEventListener("click", () => {
    projectForm.style.display = "flex";
});

projectFormSubmit.addEventListener("click", e => {
    e.preventDefault();
    projectForm.style.display = "none";

    //Get the text content from the form
    let projectName = document.getElementById("projectName").value;
    let project = new Project(projectName);
    project.displayProject();
});

/*Add a button listener for when the user clicks to add a new task booting up a form for input*/
const addTaskButton = document.getElementById("addTask");
const taskForm = document.getElementById("task");
addTaskButton.addEventListener("click", () => {
    taskForm.style.display = "flex";
});

const addTaskSubmit = document.getElementById("submitTask");
addTaskSubmit.addEventListener("click", e => {
    e.preventDefault();
    taskForm.style.display = "none";

    //Get the form inputs to create a new task object

})

