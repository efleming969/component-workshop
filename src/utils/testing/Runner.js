import Logger from "./Logger.js"
import * as Assert from "./Assertions.js"

const isPromise = ( obj ) => !!obj && ( typeof obj === "object" || typeof obj === "function" ) && typeof obj.then === "function"

export default function() {
    const logger = Logger()

    const generateReport = function( suiteResults ) {
        suiteResults.forEach( function logSuite( suite ) {
            const failures = suite.results.filter( ( test ) => test.result !== null )

            logger.group( suite.name )

            suite.results.forEach( function logTest( test ) {

                if ( test.result !== null ) {
                    logger.groupRed( test.name )
                    logger.log( test.result.actual, test.result.expected )
                    logger.groupEnd()
                } else if ( test.skip ) {
                    logger.logSkip( test.name )
                } else {
                    logger.logGreen( test.name )
                }
            } )

            logger.groupEnd()
        } )
    }

    const runSuite = function( { name, tests, beforeEach, afterEach } ) {
        return Promise.all( tests.map( function( test ) {
            if ( test.skip ) {
                return Promise.resolve( { name: test.name, result: null, skip: true } )
            }

            try {
                beforeEach()

                const resultOrPromise = test.fn( Assert )

                if ( isPromise( resultOrPromise ) ) {
                    return resultOrPromise
                        .then( () => ( { name: test.name, result: null } ) )
                        .catch( ( error ) => ( { name: test.name, result: error } ) )
                }

                return Promise.resolve( { name: test.name, result: null } )
            } catch ( error ) {
                return Promise.resolve( { name: test.name, result: error } )
            } finally {
                afterEach()
            }


        } ) ).then( ( results ) => ( { name, results } ) )
    }

    const runSuites = function( suites ) {
        return Promise.all( suites.map( runSuite ) )
            .then( generateReport )
            .catch( function() {
                console.error( "error happened" )
            } )
    }

    return { runSuites }
}
