import Runner from "./utils/testing/Runner.js"

import sample0 from "./sample0.test.js"

const runner = Runner()

const suites = [
    sample0
]

runner.runSuites( suites ).then( function( x ) {
    console.log( x )
} )
