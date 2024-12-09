import "./styles.css";

class Plan {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

export default Plan;

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