import axios from 'axios';
let url = 'https://www.qcloudtrtc.com/sxb_dev/?svc=account&cmd=authPrivMap';
let sdkappid = 1400037025,
    accountType = 14418, // accounttype 还是在文档中会找到
    
    userId=87546,
    roomnum = 1554,
    pwd = '132313djakFda',
    privMap = 255;
 
let config ={

    login : () => {

     
            // dataType: 'json',
          let  data= JSON.stringify({
                pwd: pwd,
                appid: sdkappid,
                roomnum: roomnum,
                privMap: privMap,
                identifier: userId,
                accounttype: accountType
            })
        
            //请使用英文半角/数字作为用户名
            axios.post(url,data).then(function (json) {
                    if (json && json.data.errorCode === 0) {
                        //一会儿进入房间要用到
                        window.localStorage.setItem('web_rtc_info', JSON.stringify(json.data))
                        userSig = json.data.userSig;
                        /*             var privateMapKey = json.data.privMapEncrypt;
                                    // 页面处理，显示视频流页面
                                    $("#video-section").show();
                                    $("#input-container").hide();

                                    initRTC({
                                        "userId": userId,
                                        "userSig": userSig,
                                        "privateMapKey": privateMapKey,
                                        "sdkappid": sdkappid,
                                        "accountType": accountType,
                                        "closeLocalMedia": closeLocalMedia,
                                        "roomid": $("#roomid").val()
                                    }); */

                    } else {
                        // console.error(json);
                    }
                })
           
          

        }

    }
    
    
export default config;
