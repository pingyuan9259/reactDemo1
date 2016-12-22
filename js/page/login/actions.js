/**
 * Created by wangxiaobo on 16/6/29.
 */
const util = require('util');
const REFRESH_SRC = 'REFRESH_SRC';
const VERIFY_CODE = 'VERIFY_CODE';
function refreshSrc(src) {
    return {
        type: REFRESH_SRC,
        src
    }
}
function postLogin(data) {
    let url = '/scoreManagement/user/login';
    return util.postRequest(url, data);
}
function verifyCode(code) {
    return {
        type: VERIFY_CODE,
        code
    }
}
function postCode(data) {
    let url = '/scoreManagement/user/checkValidateCode';
    return util.postRequest(url, data);
}
//发送邮箱
function postEmail(data){
    let url = '/scoreManagement/user/sendEmail';
    return util.postRequest(url, data);
}
module.exports = {
    refreshSrc: refreshSrc,
    postVerifyCode: function (requestData) {
        return function (dispatch) {
            return postCode(requestData).then(
                data => {
                    data.json().then(
                        json => {
                            if (json.result === '0') {
                                dispatch(verifyCode(true));
                            } else {
                                dispatch(verifyCode(false));
                                dispatch(refreshSrc());
                            }
                        }
                    )
                },
                error => {
                    console.log("error");
                }
            )
        }
    },
    login: function (requestData) {
        return function (dispatch) {
            return postLogin(requestData).then(
                data => {
                    data.json().then(
                        json => {
                            if (json.result === '0') {
                                console.log(1)
                            } else {
                                console.log(2)
                            }
                        }
                    )
                },
                error => {
                    console.log("error");
                }
            )
        }
    },
    //发送邮箱
    sendEmail:function(requestData){
        return function (dispatch) {
            return postEmail(requestData).then(
                data => {
                    data.json().then(
                        json => {
                            if (json.result === '0') {
                                console.log(1)
                            } else {
                                console.log(json.result)
                            }
                        }
                    )
                },
                error => {
                    console.log("error");
                }
            )
        }
    },
    REFRESH_SRC: 'REFRESH_SRC',
    VERIFY_CODE: 'VERIFY_CODE'
}