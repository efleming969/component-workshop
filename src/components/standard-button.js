class StandardButton extends HTMLElement {
    
    get disabled(){
        console.log("getter");
    }

    set disabled(value){
        console.log("setter", value)
    }

    static get observedAttributes() {
        return ["disabled"]
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(name, oldValue, newValue)
    }

    constructor() {
        super()

        this.attachShadow({mode: "open"})
        const label = this.getAttribute("label")
        const disabled = this.getAttribute("disabled") !== null

        this.shadowRoot.innerHTML = /*html*/`
            <style>
                button {
                    background-color: green;
                    padding: 2px;
                    color: white;
                }
            </style>

            <button>${ label }</button>
        `

        const button = this.shadowRoot.querySelector("button")
        button.disabled = disabled
    }
}

customElements.define("standard-button", StandardButton)