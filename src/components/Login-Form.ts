import { AuthService } from '../services/auth-service';

export class FormularioLogin extends HTMLElement {
    private authService: AuthService;
    private isLogin = true;
    private failedAttempts = 0;
    private lastAttemptTime = 0;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.authService = new AuthService();
    }

    connectedCallback() {
        this.render();
    }

    private async handleSubmit(event: Event) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const emailInput = form.querySelector('#email') as HTMLInputElement;
        const passwordInput = form.querySelector('#password') as HTMLInputElement;
        const usernameInput = form.querySelector('#username') as HTMLInputElement;
        const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
        const errorElement = form.querySelector('.error-message') as HTMLDivElement;
        const now = Date.now();

        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const username = usernameInput?.value.trim();

        // Límite
        if (this.failedAttempts >= 3 && now - this.lastAttemptTime < 30000) {
            const timeLeft = Math.ceil((30000 - (now - this.lastAttemptTime)) / 1000);
            if (errorElement) {
                errorElement.textContent = `Too many attempts. Please try again in ${timeLeft} seconds.`;
                errorElement.style.display = 'block';
            }
            return;
        }

        try {
            submitButton.disabled = true;
            submitButton.innerHTML = `
                <svg class="spinner" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="3"/>
                </svg>
                ${this.isLogin ? 'Signing in...' : 'Creating account...'}
            `;

            if (this.isLogin) {
                await this.authService.signIn(email, password);
                this.failedAttempts = 0;
            } else {
                if (!username) {
                    throw new Error('Username is required');
                }
                await this.authService.signUp(email, password, username);
            }
            this.dispatchEvent(new CustomEvent('auth-success'));
        } catch (error: any) {
            this.lastAttemptTime = now;
            this.failedAttempts++;

            if (errorElement) {
                let errorMessage = error.message;
                
                if (error.message.includes('user-not-found')) {
                    errorMessage = 'No account found with this email. Would you like to create one?';
                    emailInput.classList.add('error');
                    emailInput.focus();
                } else if (error.message.includes('wrong-password')) {
                    errorMessage = `Incorrect password. ${3 - this.failedAttempts} attempts remaining.`;
                    passwordInput.classList.add('error');
                    passwordInput.focus();
                    passwordInput.value = '';
                } else if (error.message.includes('email-already-in-use')) {
                    errorMessage = 'This email is already registered. Please sign in instead.';
                    emailInput.classList.add('error');
                    emailInput.focus();
                } else if (error.message.includes('invalid-email')) {
                    errorMessage = 'Please enter a valid email address (e.g., user@example.com)';
                    emailInput.classList.add('error');
                    emailInput.focus();
                } else if (error.message.includes('weak-password')) {
                    errorMessage = 'Password must be at least 6 characters and include both letters and numbers';
                    passwordInput.classList.add('error');
                    passwordInput.focus();
                } else if (error.message.includes('Username is required')) {
                    errorMessage = 'Please enter a username';
                    usernameInput?.classList.add('error');
                    usernameInput?.focus();
                }

                errorElement.textContent = errorMessage;
                errorElement.style.display = 'block';
                errorElement.classList.add('shake');
                setTimeout(() => {
                    errorElement.classList.remove('shake');
                }, 500);
            }
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = this.isLogin ? 'Sign In' : 'Sign Up';
        }
    }

    private toggleMode() {
        this.isLogin = !this.isLogin;
        this.render();
    }

    render() {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `
                 <style>
            :host {
                display: block;
                max-width: 420px;
                margin: 0 auto;
                padding: 1.5rem;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .auth-container {
                background: #2b2b2b;
                padding: 2.5rem;
                border-radius: 20px;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
                width: 100%;
                transition: all 0.3s ease;
                border: 3px solid #ff4500;
            }
            .auth-container:hover {
                background: #333333;
                transform: translateY(-2px);
            }
            h2 {
                text-align: center;
                color: #ff4500;
                margin: 0 0 0.75rem;
                font-size: 1.75rem;
                font-weight: 700;
                letter-spacing: -0.025em;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            }
            .form-group {
                margin-bottom: 1.5rem;
            }
            label {
                display: block;
                margin-bottom: 0.5rem;
                color: #ff6a00;
                font-size: 0.875rem;
                font-weight: 600;
            }
            input {
                width: 100%;
                padding: 0.75rem 1rem;
                border: 2px solid #ff4500;
                border-radius: 25px;
                font-size: 0.9375rem;
                transition: all 0.3s ease;
                background: #1a1a1a;
                color: #ff6a00;
                box-sizing: border-box;
            }
            input::placeholder {
                color: #ff6a00;
                opacity: 0.7;
            }
            input:focus {
                outline: none;
                background: #1a1a1a;
                box-shadow: 0 0 0 3px rgba(255, 69, 0, 0.3);
                border-color: #ff6a00;
            }
            button[type="submit"] {
                width: 100%;
                padding: 0.875rem 1.5rem;
                background: #ff4500;
                color: #FFFFFF;
                border: 2px solid #cc3700;
                border-radius: 25px;
                cursor: pointer;
                font-size: 0.875rem;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 1px;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                margin-top: 0.5rem;
                box-sizing: border-box;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            }
            button[type="submit"]:hover:not(:disabled) {
                background: #cc3700;
                transform: scale(1.04);
                box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
            }
            button[type="submit"]:active:not(:disabled) {
                transform: scale(0.98);
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            }
            button[type="submit"]:disabled {
                opacity: 0.7;
                cursor: not-allowed;
                transform: none;
            }
            .toggle-btn {
                width: 100%;
                padding: 0.875rem 1.5rem;
                background: transparent;
                color: #ff6a00;
                border: 2px solid #ff4500;
                border-radius: 25px;
                cursor: pointer;
                font-size: 0.875rem;
                font-weight: 500;
                transition: all 0.3s ease;
                margin-top: 1rem;
                box-sizing: border-box;
            }
            .toggle-btn:hover {
                background: #ff4500;
                border-color: #ff6a00;
                color: #FFFFFF;
                transform: scale(1.04);
            }
            .error-message {
                color: #FFFFFF;
                text-align: center;
                margin-top: 1rem;
                padding: 0.75rem;
                background: #ff4500;
                border-radius: 25px;
                font-size: 0.875rem;
                font-weight: 500;
                display: none;
                animation: fadeIn 0.3s ease;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .spinner {
                width: 18px;
                height: 18px;
                animation: spin 1s linear infinite;
                border: 2px solid #FFFFFF;
                border-top-color: transparent;
                border-radius: 50%;
            }
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            .welcome-text {
                text-align: center;
                color: #ff6a00;
                margin: 0 0 2rem;
                font-size: 0.9375rem;
                line-height: 1.5;
            }
            .divider {
                display: flex;
                align-items: center;
                text-align: center;
                margin: 1.5rem 0;
                color: #ff6a00;
                font-size: 0.875rem;
            }
            .divider::before,
            .divider::after {
                content: '';
                flex: 1;
                border-bottom: 2px solid #ff4500;
            }
            .divider::before {
                margin-right: 1rem;
            }
            .divider::after {
                margin-left: 1rem;
            }
            form {
                margin: 0;
                padding: 0;
            }
            @media (max-width: 480px) {
                :host {
                    padding: 1rem;
                }
                .auth-container {
                    padding: 1.5rem;
                }
            }
            input.error {
                border: 2px solid #ff4500;
                background: #333333;
                animation: shake 0.5s ease;
            }
            input.error:focus {
                box-shadow: 0 0 0 3px rgba(255, 69, 0, 0.3);
            }
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
            .shake {
                animation: shake 0.5s ease;
            }
        </style>
        <div class="auth-container">
            <h2>${this.isLogin ? 'START' : 'First of All'}</h2>
            <p class="welcome-text">
                ${this.isLogin 
                    ? 'WELCOME'
                    : 'WELCOME'}
            </p>
            <form @submit=${this.handleSubmit.bind(this)}>
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="Enter your email"
                        required
                        autocomplete="email">
                </div>
                ${!this.isLogin ? `
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            placeholder="Choose a username"
                            required
                            autocomplete="username">
                    </div>
                ` : ''}
                <div class="form-group">
                    <label for="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Enter your password"
                        required
                        autocomplete="current-password">
                </div>
                <button type="submit">${this.isLogin ? 'Sign In' : 'Sign Up'}</button>
                <div class="error-message"></div>
            </form>
            <div class="divider">or</div>
            <button class="toggle-btn" @click=${this.toggleMode.bind(this)}>
                ${this.isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
            </button>
        </div>
        `;
        const form = this.shadowRoot.querySelector('form');
        const toggleBtn = this.shadowRoot.querySelector('.toggle-btn');

        form?.addEventListener('submit', this.handleSubmit.bind(this));
        toggleBtn?.addEventListener('click', this.toggleMode.bind(this));
    }
}

customElements.define('login-form', FormularioLogin); 