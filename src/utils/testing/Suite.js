export const describeFull = function( description, definition ) {
    let _queue = []
    let _only = null
    let _beforeEach = () => ( void 0 )
    let _afterEach = () => ( void 0 )

    const test = function( name, fn ) {
        _queue.push( { name, fn } )
    }

    const only = function( name, fn ) {
        _only = { name, fn }
    }

    const skip = function( name, fn ) {
        _queue.push( { name, fn, skip: true } )
    }

    const beforeEach = function( fn ) {
        _beforeEach = fn
    }

    const afterEach = function( fn ) {
        _afterEach = fn
    }

    definition( { test, only, skip, beforeEach, afterEach } )

    const tests = _only ? [ _only ] : _queue

    return { name: description.name, tests, beforeEach: _beforeEach, afterEach: _afterEach }
}

export const describe = function( name, definition, skip = false ) {
    return describeFull( { name, skip }, definition )
}
