import moment from 'moment'

export function UUID() {
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        // eslint-disable-next-line
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

export function arrayToObject(propertyName, array) {
    var rv = {};
    for (var i = 0; i < array.length; ++i)
        rv[array[i][propertyName]] = array[i];
    return rv;
}

export function formatDate(timestamp) {
    return moment(timestamp).format('DD/MM/YYYY HH:mm')
}