import { that } from "./Assertions.js"

export const isVisible = function( element ) {
    that( element.getAttribute( "visible" ) )
}
