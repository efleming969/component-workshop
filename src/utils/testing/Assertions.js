const arrayIndex = ( index ) => `[${ index }]`
const objectProperty = ( prop ) => `.${ prop }`
const isObject = ( value ) => typeof value === "object" && value !== null && !Array.isArray(
    value )

const diffArrays = function( before, after, context ) {
    return [
        ...before
            .slice( 0, Math.min( before.length, after.length ) )
            .reduce(
                ( diffs, nextBefore, i ) =>
                    diffs.concat(
                        diff( nextBefore, after[ i ], context.concat( arrayIndex( i ) ) ) ),
                []
            ),
        ...before.slice( after.length ).map( ( removed, i ) => ( {
            removed,
            context: context.concat( arrayIndex( after.length + i ) )
        } ) ),
        ...after.slice( before.length ).map( ( added, i ) => ( {
            added,
            context: context.concat( arrayIndex( before.length + i ) )
        } ) )
    ]
}

const diffObjects = function( before, after, context ) {
    const beforeProps = Object.keys( before )
    const afterProps = Object.keys( after )
    return [
        ...beforeProps
            .slice( 0, Math.min( beforeProps.length, afterProps.length ) )
            .reduce(
                ( diffs, prop ) =>
                    diffs.concat(
                        diff(
                            before[ prop ],
                            after[ prop ],
                            context.concat( context.length ? objectProperty( prop ) : prop )
                        )
                    ),
                []
            ),
        ...beforeProps.slice( afterProps.length ).map( ( prop, i ) => ( {
            removed: before[ prop ],
            context: context.concat( context.length ? objectProperty( prop ) : prop )
        } ) ),
        ...afterProps.slice( beforeProps.length ).map( ( prop, i ) => ( {
            added: after[ prop ],
            context: context.concat( context.length ? objectProperty( prop ) : prop )
        } ) )
    ]
}

const moveDecimalForCompare = ( value ) =>
    value < Number.EPSILON
        ? value
        : value / Math.pow( 10, Math.ceil( Math.log10( value ) ) )

const diff = function( before, after, context = [] ) {
    if ( after === before ) {
        return []
    }
    if (
        typeof before === "number" &&
        typeof after === "number" &&
        Math.abs( moveDecimalForCompare( before ) - moveDecimalForCompare( after ) ) <
        Number.EPSILON
    ) {
        return []
    }
    if ( Array.isArray( before ) && Array.isArray( after ) ) {
        return diffArrays( before, after, context )
    }
    if ( isObject( before ) && isObject( after ) ) {
        return diffObjects( before, after, context )
    }
    return [ { before, after, context } ]
}

export const that = function( bool ) {
    if ( bool !== true )
        throw { message: "expected true" }
    else
        return null
}

export const equal = function( actual, expected ) {
    const diffResult = diff( actual, expected )

    if ( diffResult.length > 0 )
        throw { message: "not equal", actual, expected }

    return null
}

export const same = function( actual, expected ) {
    if ( actual !== expected )
        throw { message: "not the same", actual, expected }
}

export const match = function( actual, expected ) {
    const matches = actual.match( expected )

    if ( matches === null )
        throw { message: "match not found", actual, expected }
}

export const notNull = function( actual ) {
    if ( actual === null )
        throw { message: "was null", action: actual }
}
