import "./components/input-field.js"

class MyApp extends HTMLElement {

    constructor() {
        super()

        this.innerHTML = `
            <h1>My App</h1>
            <form>
                <input-field label="Street" name="street1" required></input-field>
                <input-field label="City" name="city"></input-field>
                <input-field label="State" name="state"></input-field>
                <input-field label="Zip" name="zip"></input-field>
                <button disabled>Submit</button>
            </form>
        `


        const street1 = this.querySelector("input-field[name='street1']")

        this.addEventListener("change", function(event) {
            console.log(event);
        })
    }
}

customElements.define("my-app", MyApp)