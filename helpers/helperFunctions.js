// it logs objects an arrays of objects
export function consolelogObject(logNumber, objToLog) {
    wrapLog(logNumber)
    function traverseObject(objToTraverse) {
        Object.keys(objToTraverse).forEach((value, index) => {
            console.log(`${value}: `, objToTraverse[value]);
        });
    }

    if (Array.isArray(objToLog)) {
        objToLog.forEach((value, index) => {
            traverseObject(value);
        });
    } else {
        if (typeof objToLog === 'object') {
            traverseObject(objToLog);
        } else {
            consoleLogNotObject(logNumber, objToLog);
        }
    }
    wrapLog(logNumber)
}

export function wrapLog(logNumber) {
    console.log(`--------------${logNumber}----------------`);

}

export function consoleLogNotObject(logNumber, value) {
    console.log(`${logNumber}: ${value}`)
}

export function formatToCurrency(number) {
    return parseFloat(number).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export function duplicateArr(arr) {
    return arr.map((item) => item)
}