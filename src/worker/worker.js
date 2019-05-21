let o = null;

if (window.Worker) {
let myWorker = {};

    myWorker = new Worker('./workerChild.js');
    o = {
        // 全局共享worker


        // 接受数据

        messageWS:  () => {
            console.dir(myWorker)


            myWorker.onmessage = function (e) {
                console.log('webworke接收到的信息', e)
            }
        },
        // 发送数据

        sendWS:  () => {
            console.log('探针测试send')

            myWorker.postMessage([25, 10, 12, 12, 35, 89])
        },

        // 报错
        errWS:  () => {
            myWorker.onerror = function (e) {
                console.log('There is an error with your worker!', e);
            }
        },

        // 结束线程
        closeFn() {
            myWorker.terminate()
        }

    }
}

export default o;