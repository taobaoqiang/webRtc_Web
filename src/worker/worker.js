let myWorker = {};
let o =null;

if (window.Worker) {

      myWorker = new SharedWorker('./workerChild.js');
    o ={
        // 全局共享worker

      
        // 接受数据

         messageWS : function () {
               

            myWorker.port.onmessage = function (e) {
                console.log('webworke接收到的信息', e)
            }
        },
        // 发送数据

         sendWS  : function (){
            myWorker.port.postMessage([25, 10, 12, 12, 35, 89])
        },
        errWS : function () {
            myWorker.onerror = function (e) {
                console.log('There is an error with your worker!',e);
            }
        }

    }
}

export default o;