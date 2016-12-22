/**
 * Created by ping on 16/7/10.
 */

const util = require('util');

// leftNav
const LEFT_NAV_FIRST = 'LEFT_NAV_FIRST';
const LEFT_NAV_NEXT = 'LEFT_NAV_NEXT';

//boxyAction
const BOXY_SHOW = 'BOXY_SHOW';
const BOXY_HIDE = 'BOXY_HIDE';

//maskAction
const MASK_SHOW = 'MASK_SHOW';
const MASK_HIDE = 'MASK_HIDE';

// eventLogManagement
const WRITE_EVENT_LOG_MANAGEMENT = 'WRITE_EVENT_LOG_MANAGEMENT';
function writeEventLogManagement(data) {
    return {
        type: WRITE_EVENT_LOG_MANAGEMENT,
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

    //boxyAction
    BOXY_SHOW: BOXY_SHOW,
    boxyShow: function (showMsg) {
        return {
            type: BOXY_SHOW,
            showMsg
        }
    },

    BOXY_HIDE: BOXY_HIDE,
    boxyHide: function () {
        return {
            type: BOXY_HIDE
        }
    },

    //maskAction
    MASK_SHOW: MASK_SHOW,
    maskShow: function (showMsg) {
        return {
            type: MASK_SHOW,
            showMsg
        }
    },

    MASK_HIDE: MASK_HIDE,
    maskHide: function () {
        return {
            type: MASK_HIDE
        }
    },

    // eventLogManagement
    WRITE_EVENT_LOG_MANAGEMENT: WRITE_EVENT_LOG_MANAGEMENT,
    achieveEventLogManagement: function (requestData) {
        const url = '/scoreManagement/eventlog/getEventlog';
        return function (dispatch) {
            return util.getRequest(url, requestData).then(
                data => {
                    data.json().then(
                        json => {
                            let {data} = json;
                            dispatch(writeEventLogManagement(data));
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