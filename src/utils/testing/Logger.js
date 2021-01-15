const BrowserLogger = function() {
    return {
        group: function( text ) {
            console.group( text )
        },
        groupRed: function( text ) {
            console.group( "%c%s", "color:salmon", text )
        },
        groupGreen: function( text ) {
            console.group( "%c%s", "color:lightgreen", text )
        },
        groupEnd: function() {
            console.groupEnd()
        },
        log: function( ...args ) {
            console.log( ...args )
        },
        logGreen: function( text, ...args ) {
            console.log( "%c%s", "color:lightgreen", text, ...args )
        },
        logRed: function( text, ...args ) {
            console.log( "%c%s", "color:salmon", text, ...args )
        },
        logSkip: function( text, ...args ) {
            console.log( "%c%s", "color:gold", text, ...args )
        }
    }
}

const detectIfBrowser = new Function( "try {return this===window;}catch(e){ return false;}" )

export default function() {
    return BrowserLogger()
}

