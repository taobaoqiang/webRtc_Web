// onconnect = function (e) {
    port.onmessage = function (e) {
        console.log('子线程接受到的数据', e)
    port.postMessage('我给你啥你就拿着啥');

    }

// }