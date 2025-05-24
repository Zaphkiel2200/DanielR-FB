class TaskList extends HTMLElement {
    private tasks: any[] = [];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.loadTasks();
    }

    async loadTasks() {
        // Aquí iría la conexión con Firebase para cargar las tareas
        // datos jemplo
        this.tasks = [
            { id: '1', title: 'Primera tarea', description: 'Descripción de ejemplo', completed: false },
            { id: '2', title: 'Segunda tarea', description: 'Otra descripción', completed: true }
        ];
        this.renderTasks();
    }

    render() {
        this.shadowRoot!.innerHTML = `
            <style>
                :host {
                    display: block;
                    max-width: 800px;
                    margin: 2rem auto;
                    padding: 0 1rem;
                }

                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;
                }

                h2 {
                    color: #2c3e50;
                    margin: 0;
                }

                .add-task-btn {
                    background: #3498db;
                    color: white;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 4px;
                    cursor: pointer;
                }

                .add-task-btn:hover {
                    background: #2980b9;
                }

                .tasks-container {
                    display: grid;
                    gap: 1rem;
                }

                .task-form {
                    display: none;
                    background: white;
                    padding: 1.5rem;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    margin-bottom: 1.5rem;
                }

                .task-form.active {
                    display: block;
                }

                .form-group {
                    margin-bottom: 1rem;
                }

                label {
                    display: block;
                    margin-bottom: 0.5rem;
                    color: #34495e;
                    font-weight: 500;
                }

                input, textarea {
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-family: inherit;
                }

                textarea {
                    min-height: 100px;
                    resize: vertical;
                }

                .form-actions {
                    display: flex;
                    justify-content: flex-end;
                    gap: 0.5rem;
                    margin-top: 1rem;
                }

                .form-actions button {
                    padding: 0.5rem 1rem;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }

                .save-btn {
                    background: #2ecc71;
                    color: white;
                }

                .cancel-btn {
                    background: #e74c3c;
                    color: white;
                }
            </style>
            <div class="header">
                <h2>Mis Tareas</h2>
                <button class="add-task-btn" id="add-task-btn">+ Nueva Tarea</button>
            </div>
            
            <div class="task-form" id="task-form">
                <div class="form-group">
                    <label for="task-title">Título</label>
                    <input type="text" id="task-title" required>
                </div>
                <div class="form-group">
                    <label for="task-description">Descripción (opcional)</label>
                    <textarea id="task-description"></textarea>
                </div>
                <div class="form-actions">
                    <button class="cancel-btn" id="cancel-btn">Cancelar</button>
                    <button class="save-btn" id="save-btn">Guardar</button>
                </div>
            </div>
            
            <div class="tasks-container" id="tasks-container"></div>
        `;

        const addTaskBtn = this.shadowRoot!.getElementById('add-task-btn')!;
        const cancelBtn = this.shadowRoot!.getElementById('cancel-btn')!;
        const saveBtn = this.shadowRoot!.getElementById('save-btn')!;
        const taskForm = this.shadowRoot!.getElementById('task-form')!;

        addTaskBtn.addEventListener('click', () => {
            taskForm.classList.add('active');
        });

        cancelBtn.addEventListener('click', () => {
            taskForm.classList.remove('active');
        });

        saveBtn.addEventListener('click', () => {
            const title = this.shadowRoot!.getElementById('task-title') as HTMLInputElement;
            const description = this.shadowRoot!.getElementById('task-description') as HTMLTextAreaElement;
            
            if (title.value.trim()) {
                this.dispatchEvent(new CustomEvent('task-add', {
                    detail: {
                        title: title.value.trim(),
                        description: description.value.trim()
                    },
                    bubbles: true,
                    composed: true
                }));
                
                title.value = '';
                description.value = '';
                taskForm.classList.remove('active');
            }
        });
    }

    renderTasks() {
        const container = this.shadowRoot!.getElementById('tasks-container')!;
        container.innerHTML = '';

        this.tasks.forEach(task => {
            const taskCard = document.createElement('task-card') as HTMLElement;
            taskCard.setAttribute('title', task.title);
            taskCard.setAttribute('description', task.description);
            taskCard.setAttribute('completed', String(task.completed));
            taskCard.setAttribute('data-id', task.id);
            container.appendChild(taskCard);
        });
    }
}

customElements.define('task-list', TaskList);

export default TaskList;