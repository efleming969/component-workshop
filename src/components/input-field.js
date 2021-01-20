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
                <label for="${name}">${label}</label>
                <input type="text" id="${ name }" name="${ name }" ${ required ? "required": "" }>
            </div>
        `

        const input = shadowRoot.querySelector("input")
        const self = this

        input.addEventListener("input", function(event) {
            const isValid = input.validity.valid

            const myEvent = new CustomEvent("change", {
                detail: { value: input.value, isValid, name },
                bubbles: true
            })

            console.log("dispatching input event");
            self.dispatchEvent(myEvent)
        })
    }
}

customElements.define("input-field", InputField)