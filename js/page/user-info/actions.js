/**
 * Created by jin on 16/6/22.
 */
let util = require('util');

function getSelfInfo() {
    let url = '/scoreManagement/user/getSelfInfo';
    return util.getRequest(url, {credentials: 'include'})
}

function postSelfInfo(data) {
    let url = '/scoreManagement/user/updateSelfInfo';
    return util.postRequest(url, data);
}

//验证原始密码
function postOldPassWord(data) {
    let url = '/scoreManagement/user/checkPassword';
    return util.postRequest(url, data);
}

//验证码
function postVerify(data) {
    let url = '/scoreManagement/user/checkValidateCode';
    return util.postRequest(url, data);
}

//修改密码
function postPassWord(data) {
    let url = '/scoreManagement/user/updatePassword';
    return util.postRequest(url, data);
}
const USER_MESSAGE = 'USER_MESSAGE';
function userMessage(messageList) {
    return {
        type: USER_MESSAGE,
        messageList
    }
}
module.exports = {
    userInfoList: function () {//获取用户基本信息
        return function (dispatch) {
            return getSelfInfo().then(
                function (res) {
                    res.json().then(function (json) {
                        if (json.result === "0") {
                            dispatch(userMessage(json.data))
                        }
                    })
                }
            )
        }
    },
    modifySelfInfo: function (data) {
        let info = data;
        return function (dispatch) {
            return postSelfInfo(info).then(
                function (res) {
                    res.json().then(function (json) {

                    })
                }
            )
        }
    },
    verifyOldPassWord: function (data) {
        let info = data;
        return function (dispatch) {
            return postOldPassWord(info).then(
                function (res) {
                    res.json().then(function (json) {
                        dispatch(modifyReturn(json.result))
                    })
                }
            )
        }
    },
    verifyCode: function (data) {
        let info = data;
        return function (dispatch) {
            return postVerify(info).then(
                function (res) {
                    res.json().then(function (json) {
                        if (json.result !== "0") {
                            let newSrc = "/scoreManagement/user/createCaptcha?" + new Date().getTime();
                            dispatch(tryCode(newSrc));
                        } else {
                            dispatch(inputCode(info))
                        }
                    })
                }
            )
        }
    },
    modifyPassWord: function (data) {
        let info = data;
        return function (dispatch) {
            return postPassWord(info).then(
                function (res) {
                    res.json().then(function (json) {
                        console.log(json)
                    })
                }
            )
        }
    },
    USER_MESSAGE:USER_MESSAGE
};