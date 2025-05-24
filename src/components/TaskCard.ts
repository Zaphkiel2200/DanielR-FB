// TaskCard.ts
class TaskCard extends HTMLElement {
    private isEditing = false;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    static get observedAttributes() {
        return ['title', 'description', 'completed', 'editable'];
    }

    attributeChangedCallback() {
        this.render();
    }
    

    render() {
        const title = this.getAttribute('title') || '';
        const description = this.getAttribute('description') || '';
        const completed = this.getAttribute('completed') === 'true';
        const editable = this.getAttribute('editable') !== 'false';

        this.shadowRoot!.innerHTML = `
            <style>
                :host {
                    display: block;
                    margin-bottom: 1rem;
                    border-radius: 8px;
                    background: white;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    overflow: hidden;
                    border-left: 4px solid ${completed ? '#2ecc71' : '#e74c3c'};
                    cursor: ${editable ? 'pointer' : 'default'};
                    transition: all 0.2s;
                }

                :host(:hover) {
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                }

                .task-content {
                    padding: 1rem;
                }

                .task-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.5rem;
                }

                .task-title {
                    font-weight: 600;
                    color: #2c3e50;
                    margin: 0;
                }

                .task-description {
                    color: #7f8c8d;
                    margin: 0.5rem 0 0;
                    font-size: 0.9rem;
                }

                .task-actions {
                    display: flex;
                    gap: 0.5rem;
                    margin-top: 1rem;
                }

                button {
                    padding: 0.5rem 1rem;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 0.8rem;
                    transition: all 0.2s;
                }

                .edit-input {
                    width: 100%;
                    padding: 0.5rem;
                    margin-bottom: 0.5rem;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                }

                .edit-textarea {
                    width: 100%;
                    min-height: 60px;
                    padding: 0.5rem;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    resize: vertical;
                }
            </style>
            <div class="task-content">
                ${this.isEditing ? this.renderEditMode(title, description) : this.renderViewMode(title, description, completed)}
                ${this.renderActions(completed)}
            </div>
        `;
    }

    renderViewMode(title: string, description: string, completed: boolean) {
        return `
            <div class="task-header">
                <h3 class="task-title">${title}</h3>
                <span>${completed ? '✅ Completada' : '⏳ Pendiente'}</span>
            </div>
            ${description ? `<p class="task-description">${description}</p>` : ''}
        `;
    }

    renderEditMode(title: string, description: string) {
        return `
            <input class="edit-input" id="edit-title" value="${title}" placeholder="Título">
            <textarea class="edit-textarea" id="edit-description" placeholder="Descripción">${description}</textarea>
        `;
    }

    renderActions(completed: boolean) {
        return `
            <div class="task-actions">
                <button class="complete-btn">${completed ? 'Desmarcar' : 'Completar'}</button>
                ${this.isEditing ? `
                    <button class="save-btn">Guardar</button>
                    <button class="cancel-btn">Cancelar</button>
                ` : `
                    <button class="edit-btn">Editar</button>
                    <button class="delete-btn">Eliminar</button>
                `}
            </div>
        `;
    }

    setupEventListeners() {
        this.shadowRoot!.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            
            if (target.classList.contains('edit-btn')) {
                this.isEditing = true;
                this.render();
            } else if (target.classList.contains('cancel-btn')) {
                this.isEditing = false;
                this.render();
            } else if (target.classList.contains('save-btn')) {
                this.saveChanges();
            } else if (target.classList.contains('complete-btn')) {
                this.toggleComplete();
            } else if (target.classList.contains('delete-btn')) {
                this.deleteTask();
            }
        });
    }

    saveChanges() {
        const titleInput = this.shadowRoot!.getElementById('edit-title') as HTMLInputElement;
        const descInput = this.shadowRoot!.getElementById('edit-description') as HTMLTextAreaElement;
        
        this.setAttribute('title', titleInput.value);
        this.setAttribute('description', descInput.value);
        
        this.dispatchEvent(new CustomEvent('task-update', {
            detail: {
                id: this.getAttribute('data-id'),
                title: titleInput.value,
                description: descInput.value
            },
            bubbles: true,
            composed: true
        }));
        
        this.isEditing = false;
        this.render();
    }

    toggleComplete() {
        const completed = this.getAttribute('completed') === 'true';
        this.setAttribute('completed', String(!completed));
        
        this.dispatchEvent(new CustomEvent('task-toggle', {
            detail: {
                id: this.getAttribute('data-id'),
                completed: !completed
            },
            bubbles: true,
            composed: true
        }));
    }

    deleteTask() {
        this.dispatchEvent(new CustomEvent('task-delete', {
            detail: {
                id: this.getAttribute('data-id')
            },
            bubbles: true,
            composed: true
        }));
        
        this.remove();
    }
}

customElements.define('task-card', TaskCard);