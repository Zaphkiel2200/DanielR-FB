class LoginPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot!.innerHTML = `
            <style>
                * {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }

                :host {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    padding: 20px;
                }

                form {
                    background: rgba(255, 255, 255, 0.95);
                    padding: 40px;
                    border-radius: 16px;
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
                    width: 100%;
                    max-width: 400px;
                    transform: translateY(0);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                
                form:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
                }

                h2 {
                    margin: 0 0 30px;
                    color: #2c3e50;
                    text-align: center;
                    font-size: 2rem;
                    font-weight: 600;
                    position: relative;
                    padding-bottom: 10px;
                }
                
                h2::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 50px;
                    height: 3px;
                    background: linear-gradient(90deg, #667eea, #764ba2);
                    border-radius: 3px;
                }

                .form-group {
                    margin-bottom: 20px;
                    position: relative;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 8px;
                    color: #2c3e50;
                    font-weight: 500;
                    font-size: 14px;
                }

                .form-group input {
                    width: 100%;
                    padding: 12px 15px;
                    border: 2px solid #e0e0e0;
                    border-radius: 8px;
                    font-size: 16px;
                    transition: all 0.3s ease;
                    background-color: #f9f9f9;
                }
                
                .form-group input:focus {
                    border-color: #667eea;
                    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
                    outline: none;
                    background-color: white;
                }

                .form-group input[type="checkbox"] {
                    width: auto;
                }

                .form-group .toggle-password {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 14px;
                    color: #7f8c8d;
                    margin-top: 8px;
                }

                button {
                    width: 100%;
                    padding: 14px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    margin-top: 10px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }

                button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 7px 14px rgba(0, 0, 0, 0.15);
                    background: linear-gradient(135deg, #5a6fd1 0%, #6a3a9e 100%);
                }
                
                button:active {
                    transform: translateY(0);
                }
            </style>
            <form id="login-form">
                <h2>Login</h2>
                <div class="form-group">
                    <label for="email">Correo electrónico</label>
                    <input type="email" id="email" name="email" placeholder="Ingresa tu correo electrónico" required>
                </div>
                <div class="form-group">
                    <label for="password">Contraseña</label>
                    <input type="password" id="password" name="password" placeholder="Ingresa tu contraseña" required>
                    <div class="toggle-password">
                        <input type="checkbox" id="show-password">
                        <label for="show-password">Mostrar contraseña</label>
                    </div>
                </div>
                <button type="submit">Iniciar sesión</button>
            </form>
        `;

        const form = this.shadowRoot!.querySelector<HTMLFormElement>('#login-form')!;
        const passwordInput = form.querySelector<HTMLInputElement>('#password')!;
        const showPasswordCheckbox = form.querySelector<HTMLInputElement>('#show-password')!;

        showPasswordCheckbox.addEventListener('change', () => {
            passwordInput.type = showPasswordCheckbox.checked ? 'text' : 'password';
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.email.value;
            const password = form.password.value;
            console.log('Login submitted with:', { email, password });
        });
    }
}

export default LoginPage;