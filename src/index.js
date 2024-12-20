import "./styles.css";

//Array for holding all of the projects
const projects = [];
//Global variable to track the currently selected project
let selectedProjectIndex = null;

/*Creates a task object for adding to each individual project*/
class Task {
    constructor(title, description, dueDate, priority, completed = false) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = completed;
    }

    /*Creates the div which contains all of the task content and returns it to the project*/
    buildTaskDiv(taskIndex) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("contentDiv");
        const title = document.createElement("h3");
        const description = document.createElement("p");
        const dueDate = document.createElement("p");
        const priority = document.createElement("h4");

        if(this.title != ""){
            title.textContent = this.title;
        } else{
            title.textContent = "undefined";
        }
        
        if(this.description != ""){
            description.textContent = this.description;
        } else{
            description.textContent = "undefined";
        }

        if(this.dueDate != ""){
             dueDate.textContent = this.dueDate;
        } else{
            //https://www.freecodecamp.org/news/javascript-get-current-date-todays-date-in-js/
            let date = new Date().toLocaleDateString();
            dueDate.textContent = date;
        }
    
        if(this.priority != undefined){
            priority.textContent = this.priority;
        } else{
            priority.textContent = "low";
            const radioLow = document.getElementById("low");
            radioLow.checked = true;
        }
        
        newDiv.appendChild(title);
        newDiv.appendChild(description);
        newDiv.appendChild(dueDate);
        newDiv.appendChild(priority);

        const buildDiv = this.buildButtonDiv(taskIndex);
        newDiv.appendChild(buildDiv);

        return newDiv;
    }

    /*Builds the remove and edit buttons and returns them inside of a div with click events attached*/
    buildButtonDiv(taskIndex) {
        const buttonDiv = document.createElement("div");
        buttonDiv.classList.add("taskButtonDiv");
        const rmvButton = document.createElement("button");
        rmvButton.textContent = "Delete";
        rmvButton.id = "remove";
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.id = "edit";

        //Add the event listeners
        rmvButton.addEventListener("click", () => {
            //Apply logic to remove the task
            this.removeTask(taskIndex);
        });

        editButton.addEventListener("click", () => {
            //Apply logic to modify the task item
            this.editTask(taskIndex);
        });

        buttonDiv.appendChild(rmvButton);
        buttonDiv.appendChild(editButton);
        this.addCheckBox(buttonDiv);

        return buttonDiv;
    }

    addCheckBox(div) {
        const checkboxLabel = document.createElement("label");
        checkboxLabel.textContent = "Completed?";
        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.checked = this.completed; //Reflect current state

        //Update the `completed` property when the checkbox state changes
        checkBox.addEventListener("change", () => {
            this.completed = checkBox.checked;
        });

        div.appendChild(checkboxLabel);
        div.appendChild(checkBox);
    }

    /*Allows the user to edit the form and resubmit the task*/
    editTask(taskIndex) {
        //Get the current selected project so we can manipulate it's task array
        let currProject = projects[selectedProjectIndex];
       
        if(currProject){
            const task = currProject.tasksArray[taskIndex];

            //Populate form fields with current task data
            document.getElementById("taskTitle").value = task.title;
            document.getElementById("taskDescription").value = task.description;
            document.getElementById("taskDate").value = task.dueDate;
            document.querySelector(`input[name="Priority"][value="${task.priority}"]`).checked = true;
    
            //Show the form for editing
            const taskForm = document.getElementById("task");
            taskForm.style.display = "flex";
    
            //Add a temporary event listener for editing
            const submitButton = document.getElementById("submitTask");
            const handleEditSubmit = (e) => {
                e.preventDefault();
    
                //Removes unwanted duplication
                this.removeTask(taskIndex);

                //Update the task with new values
                task.title = document.getElementById("taskTitle").value;
                task.description = document.getElementById("taskDescription").value;
                task.dueDate = document.getElementById("taskDate").value;
                task.priority = document.querySelector('input[name="Priority"]:checked')?.value;
    
                //Hide the form and update the displayed tasks
                taskForm.style.display = "none";
                const taskDiv = document.getElementById("content");
                currProject.clearTaskContainer(taskDiv);
                currProject.displayTasks(taskDiv);

                saveToLocalStorage(); // Save after editing a task
    
                //Remove this listener after editing
                submitButton.removeEventListener("click", handleEditSubmit);
            };
    
            //Attach the event listener
            submitButton.addEventListener("click", handleEditSubmit);
        }
    }

    /*Allows the user to remove the task*/
    removeTask(taskIndex) {
        //Get the current selected project so we can manipulate it's task array
        let currProject = projects[selectedProjectIndex];
        
        if (currProject) {
            currProject.tasksArray.splice(taskIndex, 1); // Remove the task
            const taskDiv = document.getElementById("content");
            currProject.clearTaskContainer(taskDiv); // Clear and redisplay tasks
            currProject.displayTasks(taskDiv);

            saveToLocalStorage(); // Save after removing a task
        }
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
            const builtDiv = this.tasksArray[i].buildTaskDiv(i);
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

    saveToLocalStorage(); // Save after adding a new project
});

/*Add a button listener for when the user clicks to add a new task booting up a form for input*/
const addTaskButton = document.getElementById("addTask");
const taskForm = document.getElementById("task");
addTaskButton.addEventListener("click", () => {
    taskForm.style.display = "flex";
      //Clear form fields
      document.getElementById("taskTitle").value = "";
      document.getElementById("taskDescription").value = "";
      document.getElementById("taskDate").value = "";
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

        saveToLocalStorage(); // Save after adding a new task
    } else {
        console.error("No project selected!");
    }
});

/*
Step: Use web storage API to allow the user to save this
Note: I had absolutely no idea how to do this... This is what ChatGPT says. Curriculum didn't show how this were to be done so I will use this project to reflect on
how saving to local should be done
*/

// Function to save projects to localStorage
function saveToLocalStorage() {
    const serializedProjects = JSON.stringify(projects);
    localStorage.setItem("projects", serializedProjects);
}

// Function to load projects from localStorage
function loadFromLocalStorage() {
    const data = localStorage.getItem("projects");
    if (data) {
        const parsedProjects = JSON.parse(data);

        // Convert plain objects back to Project and Task instances
        parsedProjects.forEach(projectData => {
            const project = new Project(projectData.name);

            projectData.tasksArray.forEach(taskData => {
                const task = new Task(
                    taskData.title,
                    taskData.description,
                    taskData.dueDate,
                    taskData.priority,
                    taskData.completed
                );
                project.setTask(task);
            });

            projects.push(project);
            project.displayProject(); // Rebuild the UI for the project
        });
    }
}

// Call loadFromLocalStorage when the app is first loaded
document.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage();
});
