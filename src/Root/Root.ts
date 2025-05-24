import { State, store } from "../flux/Store";

class Root extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.handleRouteChange = this.handleRouteChange.bind(this);
        store.subscribe((state: State) => {this.handleRouteChange(state)});
    }

    connectedCallback() {
        this.render();
        this.handleRouteChange();
    }

    handleRouteChange(state = store.getState()) {
        if (!this.shadowRoot) return;
        const path = state.currentPath || window.location.pathname;
        window.history.replaceState({}, '', path); // Actualiza la URL sin recargar
        const content = this.shadowRoot.querySelector('#content');
        if (!content) return;
        content.innerHTML = '';
        console.log(path);
        switch (path) {
            case '/':
                content.innerHTML = `<landing-page></landing-page>`;
                break;
            case '/login':
                content.innerHTML = `<login-page></login-page>`;
                break;
            case '/register':
                content.innerHTML = `<register-page></register-page>`;
                break;
            case '/dashboard/supabase':
                content.innerHTML = `
                <dashboard-page>
                    <supabase-element></supabase-element>
                </dashboard-page>`;
                break;
            default:
                content.innerHTML = `<h1>404 - Página no encontrada</h1>`;
                break;
        }
    }

    render() {
        if (!this.shadowRoot) return;
            
        this.shadowRoot.innerHTML = `
            <style>
                #root {
                    width: 100vw;
                    height: 100vh;
                    background-color: #333; /* Gris oscuro */
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
            </style>
            <div id="root">
                <header-element></header-element>
                <div id="content">
                </div>
            </div>
        `;
    }
}

export default Root;