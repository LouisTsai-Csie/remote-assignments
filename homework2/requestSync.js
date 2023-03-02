const url = "https://api.appworks-school-campus3.online/api/v1/clock/delay";

function requestSync(url) {
    const before = performance.now();
    var request = require('sync-request');
    var res = request('GET', url, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const after  = performance.now();
    console.log(after-before);
}

requestSync(url);
requestSync(url);
requestSync(url);