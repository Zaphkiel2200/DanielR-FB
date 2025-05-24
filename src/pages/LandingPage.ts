class LandingPage extends HTMLElement {
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
                :host {
                    display: block;
                    min-height: 100vh;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    padding: 2rem;
                }

                .landing-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 2rem 0;
                }

                .hero {
                    text-align: center;
                    margin-bottom: 3rem;
                }

                .hero h1 {
                    font-size: 3rem;
                    margin-bottom: 1rem;
                    font-weight: 700;
                }

                .hero p {
                    font-size: 1.2rem;
                    max-width: 600px;
                    margin: 0 auto 2rem;
                    opacity: 0.9;
                }

                .cta-buttons {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    margin-bottom: 3rem;
                }

                .cta-button {
                    padding: 0.75rem 1.5rem;
                    border-radius: 50px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: none;
                    font-size: 1rem;
                }

                .primary {
                    background: white;
                    color: #764ba2;
                }

                .secondary {
                    background: transparent;
                    color: white;
                    border: 2px solid rgba(255, 255, 255, 0.5);
                }

                .cta-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                }

                .primary:hover {
                    background: #f8f9fa;
                }

                .secondary:hover {
                    border-color: white;
                    background: rgba(255, 255, 255, 0.1);
                }

                .features {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                    margin-top: 4rem;
                }

                .feature-card {
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    border-radius: 12px;
                    padding: 2rem;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    transition: all 0.3s ease;
                }

                .feature-card:hover {
                    transform: translateY(-5px);
                    background: rgba(255, 255, 255, 0.15);
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
                }

                .feature-card h3 {
                    font-size: 1.5rem;
                    margin-bottom: 1rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .feature-icon {
                    font-size: 1.8rem;
                }

                .demo-section {
                    margin-top: 5rem;
                    text-align: center;
                }

                .demo-title {
                    font-size: 2rem;
                    margin-bottom: 2rem;
                }

                .demo-cards {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 1.5rem;
                    margin-top: 2rem;
                }

                @media (max-width: 768px) {
                    .hero h1 {
                        font-size: 2.2rem;
                    }
                    
                    .cta-buttons {
                        flex-direction: column;
                        align-items: center;
                    }
                }
            </style>

            <div class="landing-container">
                <section class="hero">
                    <h1>Gestiona tus tareas de forma sencilla</h1>
                    <p>Organiza tu trabajo, tus proyectos y tu vida. Finalmente deja atrás el desorden con nuestro gestor de tareas intuitivo.</p>
                    
                </section>
                <section class="features">
                    <div class="feature-card">
                        <h3><span class="feature-icon">📝</span>Creación fácil</h3>
                        <p>Añade nuevas tareas en segundos con nuestro sistema intuitivo. Prioriza y organiza como prefieras.</p>
                    </div>
                    <div class="feature-card">
                        <h3><span class="feature-icon">✅</span>Seguimiento</h3>
                        <p>Marca tareas como completadas y lleva un registro de tu productividad día a día.</p>
                    </div>
                    
                    <div class="feature-card">
                        <h3><span class="feature-icon">🔄</span>Sincronización</h3>
                        <p>Tus tareas están disponibles en todos tus dispositivos gracias a Firebase.</p>
                    </div>
                </section>

                <section class="demo-section">
                    <h2 class="demo-title">Cómo funciona</h2>
                    <p>Interactúa con estas tarjetas de demostración</p>
                    
                    <div class="demo-cards">
                        <task-card 
                            title="Tarea de ejemplo" 
                            description="Haz clic para editar esta tarjeta" 
                            completed="false"
                            editable="true"
                            data-id="demo1"
                        ></task-card>
                        
                        <task-card 
                            title="Reunión con equipo" 
                            description="Discutir los nuevos requerimientos del proyecto" 
                            completed="true"
                            editable="true"
                            data-id="demo2"
                        ></task-card>
                        
                        <task-card 
                            title="Comprar suministros" 
                            description="Material de oficina y café" 
                            completed="false"
                            editable="true"
                            data-id="demo3"
                        ></task-card>
                    </div>
                </section>
            </div>
        `;

        // Agregar event listeners para los botones
        this.shadowRoot!.getElementById('register-btn')?.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('navigate', {
                detail: { page: 'register' },
                bubbles: true,
                composed: true
            }));
        });

        this.shadowRoot!.getElementById('login-btn')?.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('navigate', {
                detail: { page: 'login' },
                bubbles: true,
                composed: true
            }));
        });
    }
}

customElements.define('landing-page', LandingPage);

export default LandingPage;