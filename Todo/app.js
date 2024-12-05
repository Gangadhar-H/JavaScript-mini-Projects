document.addEventListener('DOMContentLoaded', () => {
    let todoInput = document.getElementById('todo-input');
    let addTaskBtn = document.getElementById('add-task-btn');
    let todoList = document.getElementById('todo-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || []

    tasks.forEach(task => {
        renderTasks(task);
    });

    addTaskBtn.addEventListener('click', () => {
        const taskText = todoInput.value.trim();
        if (taskText === '') return;

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        }
        tasks.push(newTask);
        todoInput.value = '';
        saveTasks();
        renderTasks(newTask);
    });

    function renderTasks(task) {
        console.log(task);
        const li = document.createElement('li');
        li.setAttribute('data-id', task.id);

        if (task.completed) li.classList.add('completed');

        li.innerHTML = `<span> ${task.text} </span> <button> Delete </button>`;

        li.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') return
            // console.log(e.target.BUTTON);
            task.completed = !task.completed;
            li.classList.toggle('completed');
            saveTasks();
        });

        li.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation();
            tasks = tasks.filter((t) => {
                return t.id !== task.id
            });
            li.remove();
            saveTasks();
        })

        todoList.appendChild(li);
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

});