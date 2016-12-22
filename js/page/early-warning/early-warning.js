/**
 * Created by ping on 16/6/24.
 */

require('normalize');
require('base');
require('early-warning.scss');
require('es6-shim');
const util = require('util');
const React = require('react');
const render = require('react-dom').render;

const {Header} = require('header');
const {Breadcrumb} = require('breadcrumb');
const {LeftNav} = require('left-nav');
const {ProgressBar} = require('progress-bar');
const {Pages} = require('pages');

const {leftNavFirst, leftNavNext, achieveProgressBarData} = require('early-warning-actions');
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

class component extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {dispatch, leftNav, progressBarData, allPage, page} = this.props;
        return(
            <div>
                <Header />
                <LeftNav
                  role={leftNav.role} select={leftNav.select} leftList={leftList}
                  leftNavFirst={leftNav => dispatch(leftNavFirst(leftNav))}
                  leftNavNext={leftNav => dispatch(leftNavNext(leftNav))} />
                <div className="container">
                    <div className="breadcrumb-container">
                        <Breadcrumb breadcrumbMsg="预警" />
                    </div>
                    <div className="content">
                        <ProgressBar progressBarData={progressBarData}/>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        let {dispatch} = this.props;
        dispatch(achieveProgressBarData({page: 1, count: 5}));

        const select = [1, 1];
        dispatch(leftNavFirst(select));
    }

    setPage(active) {
        const {dispatch} = this.props;
        dispatch(achieveProgressBarData({"page": active.active, "count": 5}));
    }
}

function select(state) {
    return {
        leftNav: state.leftNavActive,
        progressBarData: state.writeChartData.barData,
        allPage: state.writeChartData.allPage,
        page: state.writeChartData.page
    }
}

let Main = connect(select)(component);

render(
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById("main")
);