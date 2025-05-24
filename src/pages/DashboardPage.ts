class DashboardPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `
            <style>
                #dashboard-page {
                    padding: 20px;
                    background-color: #f0f0f0;
                    border-radius: 8px;
                }
                h1 {
                    color: #333;
                }
            </style>
            <div id="dashboard-page">
                <slot></slot>
            </div>
        `;
    }
}

export default DashboardPage;