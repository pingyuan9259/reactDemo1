/**
 * Created by jin on 16/6/22.
 */
let util = require('util');

const TABLE_LIST = 'TABLE_LIST';
function applyCompany(data) {
    let url = '/scoreManagement/company/getApplyList';
    return util.getRequest(url,data);
}
function tableList(tableData) {
    return {
        type: TABLE_LIST,
        tableData
    }
}
module.exports = {
    applyCompanyList: function (requestData) {
        return function (dispath) {
            return applyCompany(requestData).then(
                data => {
                    data.json().then(
                        json => {
                            let tableData = json.data;
                            dispath(tableList(tableData))
                        }
                    )
                },
                error => {
                    console.log("error");
                }
            )
        }
    },
    //applyCompany 申请试用客户列表
    TABLE_LIST: TABLE_LIST
};