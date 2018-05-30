let app = getApp();
//替换成开发者后台设置的安全域名
let url = "http://xxx.xxx.xxx.xxx:8787";

Page({
    data:{
        corpId: '',
        authCode:'',
        userId:''
    },
    onLoad(){

        let _this = this;

        this.setData({
            corpId: app.globalData.corpId
        })

        if(dd.getAuthCode){
            dd.alert({
                content:'dd.getAuthCode'
            })
            dd.getAuthCode({
                success:(res)=>{
                    _this.setData({
                        authCode:res.authCode
                    })
                    
                    dd.httpRequest({
                        url: url+'/login',
                        method: 'POST',
                        data: {
                            authCode: res.authCode,
                            corpId:app.globalData.corpId,
                        },
                        dataType: 'json',
                        success: function(res) {
                            let userId = res.data.userId;
                            _this.setData({
                                userId:userId
                            })
                        },
                        fail: function(res) {
                            dd.alert({content: 'fail'});
                        },
                        complete: function(res) {
                            dd.hideLoading();
                            //my.alert({content: 'complete'});
                        }
                        
                    });
                },
                fail: (err)=>{
                    dd.alert({
                        content: JSON.stringify(err)
                    })
                }
            })
        }
    }
})