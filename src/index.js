import "./styles.css";
import createHome from './home.js';

createHome;

class Plan {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

export default Plan;
