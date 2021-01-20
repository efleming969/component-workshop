import "./components/input-field.js"

export default class MyApp extends HTMLElement {

    constructor() {
        super()

        this.innerHTML = /* html */`
            <h1>The App</h1>
            <form>
                <input-field label="Street" name="street1" required></input-field>
                <input-field label="City" name="city" required></input-field>
                <input-field label="State" name="state"></input-field>
                <input-field label="Zip" name="zip"></input-field>
                <button disabled>Submit</button>
            </form>
        `

        this.formValues = {
            street1: {
                value: "", valid: false
            },
            city: {
                value: "", valid: false
            }
        }

        this.button = this.querySelector("button")

        const self = this
        self.addEventListener("change", function(event) {
            self.populateField(event.detail)
            self.checkValidity()
        })

        // const street1 = this.querySelector("input-field[name='street1']")

        // street1.addEventListener("change", function(event) {
        //     self.populateField("street1", event.detail)
        //     self.checkValidity()
        // })

        // const city = this.querySelector("input-field[name='city']")

        // city.addEventListener("change", function(event) {
        //     self.populateField("city", event.detail)
        //     self.checkValidity()
        // })
    }

    populateField(field) {
        this.formValues[field.name].value = field.value
        this.formValues[field.name].valid = field.isValid
    }

    checkValidity() {
        this.button.disabled = !this.formValues.street1.valid || !this.formValues.city.valid
    }
}

customElements.define("my-app", MyApp)