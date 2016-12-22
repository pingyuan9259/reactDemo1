/**
 * Created by ping on 16/7/10.
 */

const util = require('util');

// leftNav
const LEFT_NAV_FIRST = 'LEFT_NAV_FIRST';
const LEFT_NAV_NEXT = 'LEFT_NAV_NEXT';

// selfModules
const WRITE_SELF_MODULES = 'WRITE_SELF_MODULES';
function writeSelfModules(data) {
    return {
        type: WRITE_SELF_MODULES,
        data
    }
}

// combineModules
const WRITE_COMBINE_MODULES = 'WRITE_COMBINE_MODULES';
function writeCombineModules(data) {
    return {
        type: WRITE_COMBINE_MODULES,
        data
    }
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

    // selfModules
    WRITE_SELF_MODULES: WRITE_SELF_MODULES,
    achieveSelfModules: function (requestData) {
        const url = '/scoreManagement/module/getSelfModules';
        return function (dispatch) {
            return util.getRequest(url, requestData).then(
                data => {
                    data.json().then(
                        json => {
                            let {data} = json;
                            dispatch(writeSelfModules(data));
                        }
                    );
                },
                error => {
                    console.log("error");
                }
            );
        };
    },

    // combineModules
    WRITE_COMBINE_MODULES: WRITE_COMBINE_MODULES,
    achieveCombineModules: function (requestData) {
        const url = '/scoreManagement/module/getCombineModules';
        return function (dispatch) {
            return util.getRequest(url, requestData).then(
                data => {
                    data.json().then(
                        json => {
                            let {data} = json;
                            dispatch(writeCombineModules(data));
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