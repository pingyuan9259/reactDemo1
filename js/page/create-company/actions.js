/**
 * Created by wangxiaobo on 16/6/24.
 */
const util = require('util');
function postCreate(data) {
    let url = '/scoreManagement/company/createCompany';
    return util.postRequest(url,data);
}
//获取客户信息
const COMPANY_MESSAGE = "COMPANY_MESSAGE";
function getCompany(data) {
    let url = '/scoreManagement/company/getCompanyInfo';
    return util.getRequest(url,data);
}
function companyMessage(list) {
    return {
        type: COMPANY_MESSAGE,
        list
    }
}
module.exports = {
    creatCompany: function (requestData) {
        return function (dispath) {
            return postCreate(requestData).then(
                data => {
                    data.json().then(
                        json => {
                            console.log(json)
                        }
                    )
                },
                error => {
                    console.log("error");
                }
            )
        }
    },
    getCompanyMessage: function (requestData) {
        return function (dispatch) {
            return getCompany(requestData).then(
                data => {
                    data.json().then(
                        json => {
                            let list = json.data;
                            dispatch(companyMessage(list))
                        }
                    )
                }
            )
        }
    },
    COMPANY_MESSAGE : "COMPANY_MESSAGE"
}