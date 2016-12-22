/**
 * Created by wangxiaobo on 16/7/13.
 */
const util = require('util');
const RESET_PASSWORD_SRC = 'RESET_PASSWORD_SRC';
const RESET_VERIFY_CODE = 'RESET_VERIFY_CODE';
function refreshSrc(src) {
    return {
        type: RESET_PASSWORD_SRC,
        src
    }
}
function verifyCode(code) {
    return {
        type: RESET_VERIFY_CODE,
        code
    }
}
function postCode(data) {
    let url = '/scoreManagement/user/checkValidateCode';
    return util.postRequest(url, data);
}
//重置密码
function postRefreshPassword(data) {
    let url = '/scoreManagement/user/resetPassword';
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
    resetPassword: function (requestData) {
        return function (dispatch) {
            return postRefreshPassword(requestData).then(
                data => {
                    data => {
                        data.json().then(
                            json => {
                                if (json.result === '0') {
                                    console.log(1);
                                } else {
                                    console.log(2);
                                }
                            }
                        )
                    },
                        error => {
                        console.log("error");
                    }
                }
            )
        }
    },
    RESET_PASSWORD_SRC: 'RESET_PASSWORD_SRC',
    RESET_VERIFY_CODE: 'RESET_VERIFY_CODE'
}