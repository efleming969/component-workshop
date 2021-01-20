import { describe } from "./utils/testing/Suite.js"
import { equal } from "./utils/testing/Assertions.js"

import MyApp from "./sample1.js"

export default describe( "sample 1", function( { test } ) {

    test( "rendering of app", function() {
        const component = new MyApp()

        document.body.innerHTML = ""
        document.body.appendChild(component)

        const h1 = document.querySelector("h1")
        equal(h1.textContent, "The App")
    } )

    test("submit button enable/disabled based on valid form", function() {
        const component = new MyApp()

        document.body.innerHTML = ""
        document.body.appendChild(component)

        const button = component.querySelector("button")

        equal(button.disabled, true)

        component.sendKey("input-field[name='street1']", "1 Main")

        // const street1Input = component
        //     .querySelector("input-field[name=street1]")
        //     .shadowRoot.querySelector("input")

        // street1Input.value = "1 Main"
        // street1Input.dispatchEvent(new InputEvent("input", {
        //     bubbles: true
        // }))

        const cityInput = component
            .querySelector("input-field[name=city]")
            .shadowRoot.querySelector("input")

        cityInput.value = "Memphis"
        cityInput.dispatchEvent(new InputEvent("input", {
            bubbles: true
        }))

        equal(button.disabled, false)
    })

} )
