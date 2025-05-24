import Navigate from "../../utils/Navigate";

class Header extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot!.innerHTML = `
            <style>
                #header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background-color: #f0f0f0;
                    color: #333;
                    padding: 10px 20px;
                    font-family: Arial, sans-serif;
                    margin-X: 10px;
                    border: 1px solid #ccc;
                }
                h1 {
                    margin: 0;
                    cursor: pointer;
                    text-decoration: underline;
                }
                .buttons {
                    display: flex;
                    gap: 10px;
                }
                button {
                    background-color: #555;
                    color: #f0f0f0;
                    border: none;
                    padding: 8px 15px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 14px;
                }
                button:hover {
                    background-color: #777;
                    color: #fff;
                }
            </style>
            <div id="header">
                <h1 id="landing">Landing</h1>
                <div class="buttons">
                    <button id="login" navigate-to="/login">Iniciar sesión</button>
                    <button id="register" navigate-to="/register">Registrarse</button>
                </div>
            </div>
        `;

        this.shadowRoot!.querySelectorAll('button').forEach((button) => {
            button.addEventListener('click', () => {
                const path = button.getAttribute('navigate-to');
                if (path) {
                    Navigate(path);
                }
            });
        });

        const landing = this.shadowRoot!.querySelector('#landing');
        landing?.addEventListener('click', () => {
            Navigate('/');
        });
    }
}

export default Header;