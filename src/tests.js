import Runner from "./utils/testing/Runner.js"

import sample0 from "./sample0.test.js"
import sample1 from "./sample1.test.js"

const runner = Runner()

const suites = [
    sample0, sample1
]

runner.runSuites( suites ).then( function( x ) {
    console.log( x )
} )
