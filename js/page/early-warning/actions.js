/**
 * Created by ping on 16/7/10.
 */

const util = require('util');

// leftNav
const LEFT_NAV_FIRST = 'LEFT_NAV_FIRST';
const LEFT_NAV_NEXT = 'LEFT_NAV_NEXT';

// progressBarAction
const WRITE_PROGRESS_BAR= 'WRITE_PROGRESS_BAR';
function writeProgressBar(barData, allPage, page) {
    let data = {
        barData,
        allPage,
        page
    };
    return {
        type: WRITE_PROGRESS_BAR,
        data
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

    // progressBarAction
    WRITE_PROGRESS_BAR: WRITE_PROGRESS_BAR,
    achieveProgressBarData: function (requestData) {
        let url = '/scoreManagement/queryStatistics/getThresholdValues';
        return function (dispatch) {
            return util.getRequest(url, requestData).then(
                data => {
                    data.json().then(
                        json => {
                            let {list, allPage, page} = json.data;
                            dispatch(writeProgressBar(list, allPage, page));
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