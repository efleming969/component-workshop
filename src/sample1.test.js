import { describe } from "./utils/testing/Suite.js"
import { equal } from "./utils/testing/Assertions.js"

import MyApp from "./sample1.js"
import { RenderContext } from "./RenderContext.js";

export default describe( "sample 1", function( { test } ) {

    test( "rendering of app", function() {
        const context = RenderContext.render(MyApp)

        const h1 = context.$("h1")
        equal(h1.textContent, "The App")
    } )

    test("submit button enable/disabled based on valid form", function() {
        const context = RenderContext.render(MyApp)
        const button = context.$("standard-button")

        equal(button.disabled, true)

        context.sendKey("input-field[name='street1']", "1 Main")
        equal(button.disabled, true)

        context.sendKey("input-field[name='city']", "Memphis")
        equal(button.disabled, true)

        context.sendKey("input-field[name='state']", "TN")
        equal(button.disabled, true)

        context.sendKey("input-field[name='zip']", "36701")
        equal(button.disabled, false)
    })

} )
