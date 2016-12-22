/**
 * Created by ping on 16/7/10.
 */

const util = require('util');

// leftNav
const LEFT_NAV_FIRST = 'LEFT_NAV_FIRST';
const LEFT_NAV_NEXT = 'LEFT_NAV_NEXT';

// chartBarAction
const WRITE_BARGROUP_DATA = 'WRITE_BARGROUP_DATA';
function writeBargroupData (data, axisLabel) {
    return {
        type: WRITE_BARGROUP_DATA,
        data,
        axisLabel
    };
}

module.exports = {
    // leftNav
    LEFT_NAV_FIRST: LEFT_NAV_FIRST,
    leftNavNext: function (selectNext) {
        return {
            type: LEFT_NAV_NEXT,
            selectNext
        }
    },

    LEFT_NAV_NEXT: LEFT_NAV_NEXT,
    leftNavFirst: function (selectFirst) {
        return {
            type: LEFT_NAV_FIRST,
            selectFirst
        }
    },


    // chartBarAction
    /*客户模型使用情况*/
    WRITE_BARGROUP_DATA: WRITE_BARGROUP_DATA,
    achieveModuleUsedData: function (requestData) {
        let url = '/scoreManagement/queryStatistics/getModuleUsed';
        let axisLabel = {x: 'date', y: 'used'};
        let data = {
            page: 1,
            allPage: 2,
            list: {
                companyName: '信用宝',
                dateData: [1465885710, 1465885710, 1465885710, 1465885710, 1465885710, 1465885710, 1465885710],
                moduleData: [{
                    moduleName: 'module1',
                    data: [10, 6, 32, 17, 10, 12, 10]
                }, {
                    moduleName: 'module2',
                    data: [20, 10, 5, 24, 20, 20, 20]
                }, {
                    moduleName: 'module3',
                    data: [30, 35, 16, 20, 22, 34, 32]
                }]
            }
        };
        // return function (dispatch) {
        //     return util.getRequest(url, requestData).then(
        //         data => {
        //             data.json().then(
        //                 json => {
        //                     let {used} = json;
        //                     dispatch(writeBarData(used, axisLabel));
        //                 }
        //             );
        //         },
        //         error => {
        //             console.log("error");
        //         }
        //     );
        // };
        return function (dispatch) {
            dispatch(writeBargroupData(data, axisLabel));
        }
    }
};