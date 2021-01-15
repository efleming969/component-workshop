import { describe } from "./utils/testing/Suite.js"
import { equal } from "./utils/testing/Assertions.js"

export default describe( "sample 0", function( { test } ) {

    test( "that things are working", function() {
        equal( "foo", "foo" )
    } )
} )
