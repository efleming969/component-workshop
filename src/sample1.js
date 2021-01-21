import "./components/input-field.js"
import "./components/standard-button.js"

export default class MyApp extends HTMLElement {

    constructor() {
        super()

        this.innerHTML = /* html */`
            <h1>The App</h1>
            <form>
                <input-field label="Street" name="street1" required></input-field>
                <input-field label="Street" name="street2"></input-field>
                <input-field label="City" name="city" required></input-field>
                <input-field label="State" name="state" required></input-field>
                <input-field label="Zip" name="zip" required></input-field>
                <standard-button label="Save" disabled></standard-button>
            </form>
        `

        this.formValues = {
            street1: {
                value: "", valid: false
            },
            city: {
                value: "", valid: false
            },
            state: {
                value: "", valid: false
            },
            zip: {
                value: "", valid: false
            }
        }

        this.button = this.querySelector("standard-button")

        this.addEventListener("change", function(event) {
            this.populateField(event.detail)
            this.checkValidity()
        })
    }

    populateField(field) {
        this.formValues[field.name].value = field.value
        this.formValues[field.name].valid = field.isValid
    }

    checkValidity() {
        this.button.disabled = false

        for(let value of Object.values(this.formValues)) {
            if (value.valid === false)
            {
                this.button.disabled = true
                break;
            }
        }
    }
}

customElements.define("my-app", MyApp)