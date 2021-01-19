class InputField extends HTMLElement {

    constructor() {
        super()

        const shadowRoot = this.attachShadow({mode: "open"})

        const label = this.getAttribute("label") 
        const name = this.getAttribute("name") 
        const required = this.getAttribute("required") !== null

        shadowRoot.innerHTML = /* html */`
            <style>
                div {
                    display: flex;
                    flex-direction: column;
                }

                input {
                    border: 1px solid grey;
                    border-radius: 3px;
                    padding: 3px;
                }

                label {
                    font-size: .9rem;
                    font-weight: bold;
                    padding: 3px 0 3px ;
                }

                label:after {
                    content: ":"
                }
            </style>
            <div>
                <label for="street1">${label}</label>
                <input type="text" id="${ name }" name="${ name }" ${ required ? "required": "" }>
            </div>
        `

        const input = shadowRoot.querySelector("input")
        const self = this

        input.addEventListener("input", function(event) {
            self.dispatchEvent(new CustomEvent("change", {
                detail: {value: input.value},
                bubbles: true
            }))
        })
    }
}

customElements.define("input-field", InputField)