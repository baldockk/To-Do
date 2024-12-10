import "./styles.css";

//Array for holding all of the projects
const projects = [];
//Global variable to track the currently selected project
let selectedProjectIndex = null;


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
    constructor(name) {
        this.name = name;
        //An array for storing all of the tasks related to the project
        this.tasksArray = [];
        Project.projectIndex++;
    }

    /*Write a task to a specific project*/
    setTask(task) {
        this.tasksArray.push(task);
    }

    /*Get the array of tasks for the selected project*/
    getTaskArray() {
        return this.tasksArray;
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
            //Set the global variable to the index of this project
            selectedProjectIndex = projects.indexOf(this);
            
             //Make the add task button visible
            const addTaskHeader = document.getElementsByClassName("addTask")[0];
            const addTaskButton = document.getElementsByClassName("addTask")[1];
            addTaskHeader.style.display = "block";
            addTaskButton.style.display = "block";

            //clears the div and displays the title
            this.clearTaskContainer(taskDiv);
            this.displayTasks(taskDiv);
        });

        nav.appendChild(projectButton);
    }

    displayTitle(taskDiv) {
        //Add the name of the project to the top of the tasks for clarity
        const projectTitle = document.createElement("h2");
        projectTitle.classList.add("projectTitle");
        projectTitle.textContent = this.name;
        taskDiv.appendChild(projectTitle);
    }

    /*Clear the project task bar html for displaying this array of tasks*/
    clearTaskContainer(div) {
        div.innerHTML = "";
        this.displayTitle(div);
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
    projects.push(project);
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
    let title = document.getElementById("taskTitle").value;
    let description = document.getElementById("taskDescription").value;
    let date = document.getElementById("taskDate").value;
    let priority = document.querySelector('input[name="Priority"]:checked')?.value;

    let task = new Task(title, description, date, priority);
    
    //Add the task to the currently selected project
    if (selectedProjectIndex !== null) {
        const selectedProject = projects[selectedProjectIndex];
        selectedProject.setTask(task);

        //Update the tasks displayed in the DOM
        const taskDiv = document.getElementById("content");
        selectedProject.clearTaskContainer(taskDiv);
        selectedProject.displayTasks(taskDiv);
    } else {
        console.error("No project selected!");
    }
});

/* 
Functionality still to implement:

1. Remove tasks from the project using button on div
2. Remove an entire project? Not sure if I will inplement this yet.
3. Edit to-do details using button on the div
4. Change color of divs to match the priority: RED = High; YELLOW = Medium; GREEN = low;
4. Use web storage API to allow the user to save this
*/
