// User Inputs
let userInput = document.querySelector("#task-name");
let addButton = document.querySelector("#add-task");
let tasksDiv = document.querySelector(".tasks");

// Focus On Input
window.onload = () => {
	userInput.focus();
};

// Tasks Array
let tasksArr = [];

// Check if there are tasks in the localsotrage
if (localStorage.getItem("tasks")) {
	tasksArr = JSON.parse(localStorage.getItem("tasks"));
	createTaskElemnt(tasksArr);
}

addButton.addEventListener("click", () => {
	// Validate User Input
	if (userInput.value.trim() !== "") {
		// Use Add Tasks Function
		addTaskToTasks(userInput.value.trim());
		// Clear Input
		userInput.value = "";
		// Focus On Input
		userInput.focus();
	} else {
		userInput.focus();
	}
});

function addTaskToTasks(userTask) {
	// Create Task Object
	const task = {
		taskId: Date.now(),
		taskName: userTask,
		completed: false,
	};
	// Add Task Object To Array
	tasksArr.push(task);
	// Add Task To Document
	createTaskElemnt(tasksArr);
	// Add Tasks To Local Storage
	addTasksToLS(tasksArr);
}

function createTaskElemnt(tasksArr) {
	// Clear Tasks div
	tasksDiv.innerHTML = "";
	tasksArr.forEach((e, index) => {
		if (e.completed === false) {
			// Create Task Div
			let taskDiv = document.createElement("div");
			tasksDiv.append(taskDiv);
			taskDiv.classList.add("task");
			taskDiv.setAttribute("data-id", e.taskId);
			// Create Task p
			let taskName = document.createElement("p");
			taskDiv.append(taskName);
			taskName.textContent = e.taskName;
			// Create Task Delete button
			let delButton = document.createElement("button");
			taskDiv.append(delButton);
			delButton.textContent = "Delete";
			// Make Tasks div display flex when not Empty
			if (tasksDiv.children.length !== 0) {
				tasksDiv.style.display = "flex";
			}
		}
	});
}

// Delete Button function
document.addEventListener("click", (e) => {
	if (e.target.textContent === "Delete") {
		tasksArr.forEach((task, index) => {
			if (task.taskId === +e.target.parentElement.getAttribute("data-id")) {
				// make task completed when pressed
				task.completed = true;
			}
			if (task.completed) {
				//remove taks from array
				tasksArr.splice(index, 1);
			}
		});
		// readd tasks to document
		createTaskElemnt(tasksArr);
		// readd tasks to localstorage
		addTasksToLS(tasksArr);
		// Make Tasks div display none when empty
		if (tasksDiv.children.length === 0) {
			tasksDiv.style.display = "none";
		}
	}
});


// add tasks to localsotrage
function addTasksToLS(tasksArr) {
	window.localStorage.setItem("tasks", JSON.stringify(tasksArr));
}

// Get Tasks form localstorage
function getTasksFromLS() {
	let LStasks = window.localStorage.getItem("tasks");
	if (LStasks) {
		let tasks = JSON.parse(LStasks);
	}
}