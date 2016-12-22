/**
 * Created by ping on 16/7/10.
 */

const util = require('util');

// leftNav
const LEFT_NAV_FIRST = 'LEFT_NAV_FIRST';
const LEFT_NAV_NEXT = 'LEFT_NAV_NEXT';

// chartBarAction
const WRITE_BAR_DATA = 'WRITE_BAR_DATA';
function writeBarData (data, axisLabel) {
    return {
        type: WRITE_BAR_DATA,
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
    WRITE_BAR_DATA: WRITE_BAR_DATA,

    /*客户类型分布*/
    achieveGeneralData: function (requestData) {
        let url = '/scoreManagement/queryStatistics/getQueryStatistics';
        let axisLabel = {x: 'companyType', y: 'count'};
        return function (dispatch) {
            return util.getRequest(url, requestData).then(
                data => {
                    data.json().then(
                        json => {
                            let {general} = json;
                            dispatch(writeBarData(general, axisLabel));
                        }
                    );
                },
                error => {
                    console.log("error");
                }
            );
        };
    },

    /*消耗次数*/
    achieveUsedData: function (requestData) {
        let url = '/scoreManagement/queryStatistics/getCompanyUsed';
        let axisLabel = {x: 'company', y: 'count'};
        return function (dispatch) {
            return util.getRequest(url, requestData).then(
                data => {
                    data.json().then(
                        json => {
                            let {used} = json;
                            dispatch(writeBarData(used, axisLabel));
                        }
                    );
                },
                error => {
                    console.log("error");
                }
            );
        };
    },

    /*客户使用情况*/
    achieveCompanyUsedData: function (requestData) {
        let url = '/scoreManagement/queryStatistics/getQueryStatistics';
        let axisLabel = {x: 'company', y: 'count'};
        return function (dispatch) {
            return util.getRequest(url, requestData).then(
                data => {
                    data.json().then(
                        json => {
                            let {used} = json;
                            dispatch(writeBarData(used, axisLabel));
                        }
                    );
                },
                error => {
                    console.log("error");
                }
            );
        };
    }
};