class LandingPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot!.innerHTML = `
            <style>
                h1 {
                    color: white;
                    text-align: center;
                    margin-top: 50vh;
                    transform: translateY(-50%);
                    font-family: Arial, sans-serif;
                }
            </style>
        `;

    }
}

export default LandingPage;