import { Task } from '../services/task-service';
import { TaskService } from '../services/task-service';

export class TareaItem extends HTMLElement {
    private task!: Task;
    private index!: number;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const title = this.getAttribute('data-title');
        const completed = this.getAttribute('data-completed') === 'true';
        const index = parseInt(this.getAttribute('data-index') || '0');

        this.task = {
            title: title || '',
            completed
        };
        this.index = index;

        this.render();
    }

    render() {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                display: block;
                height: 100%;
            }
            .todo-item {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: stretch;
                height: 100%;
                padding: 1.5rem 1.2rem 1.2rem 1.2rem;
                background: #2b2b2b;
                border-radius: 18px;
                border: 1.5px solid #ff4500;
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
                transition: box-shadow 0.2s, border-color 0.2s, background 0.2s;
            }
            .todo-item:hover {
                box-shadow: 0 8px 24px rgba(255, 69, 0, 0.3);
                border-color: #ff6a00;
                background: #333333;
            }
            .checkbox {
                width: 22px;
                height: 22px;
                cursor: pointer;
                accent-color: #ff4500;
                border-radius: 6px;
                border: 1.5px solid #ff6a00;
                margin-bottom: 0.5rem;
                align-self: flex-start;
            }
            .todo-text {
                flex-grow: 1;
                margin: 0.5rem 0 1.5rem 0;
                font-size: 1.1rem;
                color: #ff6a00;
                text-decoration: ${this.task.completed ? 'line-through' : 'none'};
                opacity: ${this.task.completed ? '0.5' : '1'};
                font-weight: 600;
                text-align: center;
                word-break: break-word;
                letter-spacing: 0.5px;
            }
            .todo-text::before {
                content: '🔥';
                margin-right: 0.5rem;
                opacity: 0.7;
            }
            .delete-btn {
                padding: 0.4rem;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                background: transparent;
                color: #ff4500;
                transition: background 0.2s, color 0.2s, transform 0.2s;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 28px;
                height: 28px;
                align-self: flex-end;
            }
            .delete-btn:hover {
                background: #3a3a3a;
                color: #ff6a00;
                transform: scale(1.1);
            }
            .delete-icon {
                width: 18px;
                height: 18px;
                stroke: currentColor;
                stroke-width: 2;
                fill: none;
                transition: all 0.2s;
            }
        </style>
        <div class="todo-item" part="todo-item">
            <input type="checkbox" 
                   class="checkbox"
                   part="checkbox"
                   ${this.task.completed ? 'checked' : ''}>
            <span class="todo-text" part="todo-text">${this.task.title}</span>
            <button class="delete-btn" part="delete-btn" title="Delete task">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>
            </button>
        </div>
        `;
        const checkbox = this.shadowRoot.querySelector('.checkbox');
        const deleteButton = this.shadowRoot.querySelector('.delete-btn');
        checkbox?.addEventListener('change', this.handleToggle.bind(this));
        deleteButton?.addEventListener('click', this.handleDelete.bind(this));
    }
    private handleToggle(event: Event) {
        const checkbox = event.target as HTMLInputElement;
        this.dispatchEvent(new CustomEvent('toggle', {
            detail: { index: this.index, completed: checkbox.checked }
        }));
    }
    private handleDelete() {
        this.dispatchEvent(new CustomEvent('delete', {
            detail: { index: this.index }
        }));
    }
}

customElements.define('todo-item', TareaItem); 