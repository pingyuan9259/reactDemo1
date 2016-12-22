/**
 * Created by ping on 16/6/25.
 */

require('normalize');
require('base');
require('query-statistics.scss');
require('es6-shim');
const util = require('util');
const React = require('react');
const render = require('react-dom').render;

const {Header} = require('header');
const {Breadcrumb} = require('breadcrumb');
const {LeftNav} = require('left-nav');
const {QueryBox} = require('query-box');
const {ChartBar} = require('chart-bar');

const {leftNavFirst, leftNavNext, achieveGeneralData, achieveUsedData } = require('query-statistics-actions');
const { scorewebStore } = require('reducers');
const { Provider, connect } = require('react-redux');
const { createStore, applyMiddleware } = require('redux');
const thunk = require('redux-thunk').default;

let store = createStore(scorewebStore, applyMiddleware(thunk));

const leftList = [
    {
        "name": "客户管理",
        "iconclass": "icon-kehuguanli",
        "children":[
            {
                "name":"试用申请客户",
                "role":[0],
                "href":'applyCompany'
            },
            {
                "name":"商务客户",
                "role":[0],
                "href":'companyList'
            }
        ]
    },
    {
        "name": "数据统计",
        "iconclass": "icon-shujutongji",
        "children": [
            {
                "name": "查询次数统计",
                "role": [0],
                "href":'queryStatistics'
            },
            {
                "name":"预警",
                "role":[0],
                "href":'earlyWarning'
            }
        ]
    },
    {
        "name": "模型管理",
        "iconclass": "icon-moxingguanli",
        "children": [
            {
                "name": "模型管理",
                "role": [0],
                "href":'modManage'
            }
        ]
    },
    {
        "name": "操作日志",
        "iconclass": "icon-caozuorizhi",
        "children": [
            {
                "name": "日志列表",
                "role": [0],
                "href":'userLogs'
            }
        ]
    },
    {
        "name": "我的设置",
        "iconclass": "icon-wodeshezhi",
        "children": [
            {
                "name": "我的设置",
                "role": [0],
                "href":'userInfo'
            }
        ]
    }
];

let queryText = [{
    "dataType": "select",
    "dropdownList": [{
        desc: '客户类型分布', 
        id: 1
    },{
        desc: '消耗次数', 
        id: 2
    },{
        desc: '客户使用情况', 
        id: 3
    }],
    defaultSelect:'客户消耗图'
}, {
    "dataType": "radio",
    "text": "近7天",
    "pickOn": true,
    "id":"7"
}, {
    "dataType": "radio",
    "text": "近14天",
    "pickOn": false,
    "id":"14"
}, {
    "dataType": "radio",
    "text": "近30天",
    "pickOn": false,
    "id":"30"
}, {
    "dataType": "radio",
    "text": "自定义",
    "pickOn": false,
    "id":"0"
}, {
    "dataType": "range",
    "name":"结束时间",
    "id":"timeEnd"
}];

class component extends React.Component {
    constructor (props) {
        super (props);
    }

    render () {
        const {dispatch, leftNav, barData} = this.props;
        return (
            <div onClick={(e) => util.events.emit('bodyClick', e)} onKeyDown={(e) => util.events.emit('bodyKeyDown', e)} >
                <Header />
                <LeftNav
                    role={leftNav.role} select={leftNav.select} leftList={leftList}
                    leftNavFirst={leftNav => dispatch(leftNavFirst(leftNav))}
                    leftNavNext={leftNav => dispatch(leftNavNext(leftNav))} />
                <div className="container">
                    <div className="breadcrumb-container">
                        <Breadcrumb breadcrumbMsg="查询次数统计" />
                    </div>
                    <div className="content">
                        <div className="query-box">
                            <QueryBox queryText={queryText}
                                listReturn={submitList => this.listReturn(submitList)} />
                        </div>
                        <div className="chart">
                            <ChartBar
                                barData={barData}
                                chartBarReturn={() => this.chartBarReturn()} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount () {
        let {dispatch} = this.props;
        dispatch(achieveGeneralData());

        const select = [1, 0];
        dispatch(leftNavFirst(select));
    }

    listReturn (submitList) {
        let {dispatch} = this.props;
        switch (submitList[0].name) {
            case '客户类型分布':
                dispatch(achieveGeneralData());
            case '消耗次数':
                dispatch(achieveUsedData());
            case '客户使用情况':
                dispatch(achieveUsedData());
        }
    }

    chartBarReturn () {
        window.location.href = '/statisticDetails';
    }

}


function select(state) {
    return{
        tabsData: state.tabsSwitch,
        leftNav: state.leftNavActive,
        barData: state.writeChartData 
    }
}

let Main = connect(select)(component);

render (
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById("main")
);