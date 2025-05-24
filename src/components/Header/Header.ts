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
                    background: linear-gradient(135deg, #6e8efb, #a777e3);
                    color: white;
                    padding: 15px 30px;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    position: relative;
                    z-index: 100;
                }
                h1 {
                    margin: 0;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 1.8rem;
                    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
                    transition: all 0.3s ease;
                    position: relative;
                }
                h1::after {
                    content: '';
                    position: absolute;
                    bottom: -5px;
                    left: 0;
                    width: 0;
                    height: 3px;
                    background-color: white;
                    transition: width 0.3s ease;
                }
                h1:hover {
                    transform: translateY(-2px);
                    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
                }
                h1:hover::after {
                    width: 100%;
                }
                .buttons {
                    display: flex;
                    gap: 15px;
                }
                button {
                    background-color: rgba(255, 255, 255, 0.2);
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 30px;
                    cursor: pointer;
                    font-size: 16px;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(5px);
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }
                button:hover {
                    background-color: rgba(255, 255, 255, 0.3);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                }
                button:active {
                    transform: translateY(0);
                }
            </style>
            <div id="header">
                <h1 id="landing">Tareas</h1>
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