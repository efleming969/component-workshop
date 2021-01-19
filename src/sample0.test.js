import { describe } from "./utils/testing/Suite.js"
import { equal } from "./utils/testing/Assertions.js"

export default describe( "sample 0", function( { test } ) {

    test( "that things are working", function() {
        equal( "foo", "foo" )
    } )

    test("default greeting builder", function() {
        // arrange / setup / given
        const greetingBuilder = new GreetingBuilder()

        // action / when
        const message = greetingBuilder.build()

        // assert / then
        equal(message.text, "hello, world!")
    })

    test("building a custom greeting", function() {
        const greetingBuilder = new GreetingBuilder()

        const message = greetingBuilder.build("joe")

        equal(message.text, "hello, joe!")
    })
} )


class GreetingBuilder {
    build(name = "world") {
        return { text: `hello, ${name}!`}
    }
}