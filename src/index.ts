import { app as firebaseApp } from './Firebase/firebase-config';
import { AppContainer } from './components/App-Container';
import { ListaTareas } from './components/Task-List';
import { TareaItem } from './components/Task-Item';
import { FormularioLogin } from './components/Login-Form';
import { AuthService } from './services/auth-service';
import { TareasContainer } from './components/Task-Container';

// Define
customElements.define('app-root', AppContainer);
customElements.define('todo-list', ListaTareas);
customElements.define('todo-item', TareaItem);
customElements.define('tareas-container', TareasContainer);
customElements.define('login-form', FormularioLogin);

// Iiciar
const app = new AppContainer();
document.body.appendChild(app);

// Registrar C E
customElements.define('app-root', class extends HTMLElement {
    private authService: AuthService;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.authService = new AuthService();
    }

    connectedCallback() {
        this.render();
        this.setupAuthListener();
    }

    private setupAuthListener() {
        this.authService.onAuthStateChanged((user) => {
            this.render();
        });
    }

    private async handleSignOut() {
        try {
            await this.authService.signOut();
        } catch (error) {
            console.error('Error signing out:', error);
        }
    }

    render() {
        if (!this.shadowRoot) return;

        const user = this.authService.getCurrentUser();

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    min-height: 100vh;
                    background: linear-gradient(135deg, #1a1a1a 0%, #2b2b2b 100%);
                    font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                    position: relative;
                    overflow-x: hidden;
                    color: #e0e0e0;
                }
                .header {
                    background: rgba(40, 40, 40, 0.9);
                    padding: 1rem 2rem;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    border-bottom: 3px solid #ff4500;
                    backdrop-filter: blur(5px);
                }
                .user-info {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    color: #ff4500;
                    font-weight: 600;
                    font-size: 1.1rem;
                }
                .sign-out-btn {
                    padding: 0.75rem 1.5rem;
                    background: #ff4500;
                    color: #ffffff;
                    border: 2px solid #cc3700;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 0.875rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                }
                .sign-out-btn:hover {
                    background: #cc3700;
                    transform: translateY(-2px);
                    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
                }
                .sign-out-btn:active {
                    transform: translateY(0);
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                }
            </style>
            ${user ? `
                <div class="header">
                    <div class="user-info">
                        <span>${user.displayName || 'User'}</span>
                    </div>
                    <button class="sign-out-btn" id="signOutBtn">Sign Out</button>
                </div>
                <todo-list></todo-list>
            ` : `
                <login-form></login-form>
            `}
        `;

        // Botón de cerrar sesión
        const signOutBtn = this.shadowRoot.getElementById('signOutBtn');
        if (signOutBtn) {
            signOutBtn.addEventListener('click', () => this.handleSignOut());
        }
    }
});