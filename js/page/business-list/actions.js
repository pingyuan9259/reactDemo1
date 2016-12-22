/**
 * Created by jin on 16/6/22.
 */
var util = require('util');
const BUSINESS_LIST = 'BUSINESS_LIST';

function fetchBusinessList(data) {
    let url = '/scoreManagement/company/getCooperationCompanyList';
    return util.getRequest(url,data);
}
function businessList(tableData) {
    return {
        type: BUSINESS_LIST,
        tableData
    }
}
module.exports = {
    getBusinessList: function (requestData) {
        return function (dispatch) {
            return fetchBusinessList(requestData).then(
                data => {
                    data.json().then(
                        json => {
                            let tableData = json.data;
                            dispatch(businessList(tableData));
                        }
                    )
                }
            )
        }
    },
    BUSINESS_LIST: BUSINESS_LIST
};