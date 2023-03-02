const https = require('https');
const { resolve } = require('path');

const url = "https://api.appworks-school-campus3.online/api/v1/clock/delay";

function requestCallback(url, callback) {
    const before = performance.now();
    https.get(url, (_)=>{
        const after = performance.now();
        callback(after-before);
    });
    return;
}


function requestPromise(url) {
    return new Promise((resolve, reject)=>{
        const before = performance.now()
        https.get(url, (_)=>{
            resolve(before);
        });
    });
}

async function requestAsyncAwait(url) {
    const before = performance.now();
    const getData = () => {
        return new Promise((resolve, reject)=>{
            https.get(url, (_)=>{
                resolve(before);
            });
        })
    };
    const res = await getData();
    const after = performance.now();
    console.log(after-before);
    return;
}


requestCallback(url, console.log);

requestPromise(url)
    .then((before)=>{
        const after = performance.now();
        console.log(after-before);
    })
    .catch((fail)=>{
        console.log(fail);
    })

requestAsyncAwait(url);
