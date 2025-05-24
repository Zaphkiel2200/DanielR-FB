import { Task } from '../services/task-service';
import { TaskService } from '../services/task-service';
import { TareaItem } from './Task-Item';

export class TareasContainer extends HTMLElement {
    private taskService: TaskService;
    private tasks: Task[] = [];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.taskService = new TaskService();
    }

    async connectedCallback() {
        await this.loadTasks();
        this.render();
        document.addEventListener('task-added', this.handleTaskAdded.bind(this));
    }
    disconnectedCallback() {
        document.removeEventListener('task-added', this.handleTaskAdded.bind(this));
    }
    private async loadTasks() {
        this.tasks = await this.taskService.getTasks();
    }
    private async handleTaskAdded() {
        await this.loadTasks();
        this.render();
    }
    private async handleToggle(event: CustomEvent<{ index: number; completed: boolean }>) {
        const { index, completed } = event.detail;
        await this.taskService.toggleTask(index, completed);
        await this.loadTasks();
        this.render();
    }
    private async handleDelete(event: CustomEvent<{ index: number }>) {
        const { index } = event.detail;
        await this.taskService.deleteTask(index);
        await this.loadTasks();
        this.render();
    }
    render() {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `
           <style>
                :host {
                    display: block;
                    max-width: 1200px;
                    margin: 2rem auto;
                    padding: 0 2rem;
                    background: rgba(30, 30, 30, 0.8);
                    border-radius: 8px;
                    border: 1px solid #333;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
                }
                .tareas-container {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 2rem;
                    padding: 2rem 1rem;
                }
                .empty-state {
                    text-align: center;
                    color: #ff4500;
                    padding: 2rem;
                    background: rgba(40, 40, 40, 0.7);
                    border-radius: 8px;
                    font-size: 1.1rem;
                    border: 1px dashed #555;
                    grid-column: 1 / -1;
                }
                todo-item {
                    display: block;
                    height: 100%;
                    background: transparent;
                    box-shadow: none;
                    border: none;
                }
                todo-item:hover {
                    box-shadow: none;
                    border: none;
                }
            </style>
            <div class="tareas-container">
                ${this.tasks.length === 0 
                    ? '<div class="empty-state">No tienes tareas</div>'
                    : this.tasks.map((task, index) => `
                        <todo-item 
                            data-title="${task.title}"
                            data-completed="${task.completed}"
                            data-index="${index}">
                        </todo-item>
                    `).join('')}
            </div>
        `;
        const todoItems = this.shadowRoot.querySelectorAll('todo-item');
        todoItems.forEach((item) => {
            const todoItem = item as TareaItem;
            todoItem.addEventListener('toggle', (e: Event) => {
                const customEvent = e as CustomEvent<{ index: number; completed: boolean }>;
                this.handleToggle(customEvent);
            });
            todoItem.addEventListener('delete', (e: Event) => {
                const customEvent = e as CustomEvent<{ index: number }>;
                this.handleDelete(customEvent);
            });
        });
    }
}

customElements.define('tareas-container', TareasContainer); 