const API = "https://69b57418be587338e715e786.mockapi.io/api/v1/Todos";

const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const todoContainer = document.querySelector("#todoContainer");

addBtn.addEventListener("click", postData);

async function fetchData() {

    const res = await fetch(API);
    const data = await res.json();

    todoContainer.innerHTML = "";

    data.forEach(task => renderData(task));

}

function renderData(task) {

    const div = document.createElement("div");
    div.className = "todo";

    div.innerHTML = `
<p class="todoText">${task.text}</p>

<input class="editInput" value="${task.text}">

<div class="actions">

<button class="delete">Delete</button>
<button class="edit">Edit</button>
<button class="save">Save</button>

</div>
`;

    const deleteBtn = div.querySelector(".delete");
    const editBtn = div.querySelector(".edit");
    const saveBtn = div.querySelector(".save");

    const text = div.querySelector(".todoText");
    const input = div.querySelector(".editInput");

    deleteBtn.onclick = () => deleteData(task.id);

    editBtn.onclick = () => {

        text.style.display = "none";
        input.style.display = "block";

        editBtn.style.display = "none";
        saveBtn.style.display = "block";

    }

    saveBtn.onclick = async () => {

        await updateData(task.id, input.value);

        fetchData();

    }

    todoContainer.appendChild(div);

}

async function postData() {

    const value = taskInput.value.trim();

    if (!value) {
        alert("Enter a task!!");
        return;
    }

    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: value })
    });

    taskInput.value = "";
    fetchData();

}

async function updateData(id, text) {

    await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
    });

}

async function deleteData(id) {

    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    fetchData();

}

fetchData();
