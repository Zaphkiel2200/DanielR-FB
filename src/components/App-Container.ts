import { AuthService } from '../services/auth-service';
import { User } from 'firebase/auth';
import { ListaTareas } from './Task-List';
import { FormularioLogin } from './Login-Form';

export class AppContainer extends HTMLElement {
    private authService: AuthService;
    private currentUser: User | null = null;

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
                font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                position: relative;
                overflow-x: hidden;
            }
            :host::before {
                content: '';
                position: fixed;
                top: 20px;
                left: 20px;
                font-size: 24px;
                opacity: 0.5;
                animation: float 3s ease-in-out infinite;
            }
            :host::after {
                content: '';
                position: fixed;
                top: 20px;
                right: 20px;
                font-size: 24px;
                opacity: 0.5;
                animation: float 3s ease-in-out infinite reverse;
            }
            @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
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
            .user-info::before {
                font-size: 1.2rem;
            }
            .sign-out-btn {
                padding: 0.75rem 1.5rem;
                background: #ff4500;
                color: #FFFFFF;
                border: 2px solid #cc3700;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 600;
                font-size: 0.875rem;
                text-transform: uppercase;
                letter-spacing: 1px;
                transition: all 0.3s ease;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            .sign-out-btn::before {
                font-size: 1.1rem;
            }
            .sign-out-btn:hover {
                background: #cc3700;
                transform: scale(1.04);
                box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
            }
            .sign-out-btn:active {
                transform: scale(0.98);
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
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
            <tareas-container></tareas-container>
        ` : `
            <login-form></login-form>
            `}
        `;
        const signOutBtn = this.shadowRoot.getElementById('signOutBtn');
        if (signOutBtn) {
            signOutBtn.addEventListener('click', () => this.handleSignOut());
        }
    }
}

customElements.define('app-root', AppContainer); 