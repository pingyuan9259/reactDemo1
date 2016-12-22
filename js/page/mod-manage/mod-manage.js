/**
 * Created by ping on 16/3/24.
 * mod-manage.js
 */

require('normalize');
require('base');
require('mod-manage.scss');
require('es6-shim');
const React = require('react');
const render = require('react-dom').render;
const util = require('util');

const { Header } = require('header');
const { LeftNav } = require('left-nav');
const { Breadcrumb } = require('breadcrumb');
const { Tabs } = require('tabs');
const { Table } = require('table');
const { Pages } = require('pages');

const {leftNavFirst, leftNavNext, achieveSelfModules, achieveCombineModules} = require('mod-manage-actions');
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

let initTabsData = [{
    name: 'selfModules',
    desc: '汇百川自有模型',
    selected: true,
    requestData: {"page": 1, "count": 10}
}, {
    name: 'combineModules',
    desc: '联合建模模型',
    requestData: {"page": 1, "count": 10}
}];

class component extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { dispatch, tableData, columns, allPage, leftNav, page } = this.props;
        return(
            <div>
                <Header />
                <LeftNav
                  role={leftNav.role} select={leftNav.select} leftList={leftList}
                  leftNavFirst={leftNav => dispatch(leftNavFirst(leftNav))}
                  leftNavNext={leftNav => dispatch(leftNavNext(leftNav))} />
                <div className="container">
                    <div className="breadcrumb-container">
                        <Breadcrumb breadcrumbMsg="模型管理" />
                    </div>
                    <div className="content">
                        <div className="tabs-container">
                            <Tabs
                                achieveSelfModules={requestData => dispatch(achieveSelfModules(requestData))}
                                achieveCombineModules={requestData => dispatch(achieveCombineModules(requestData))}
                                dispatch={dispatch}
                                tabsData={initTabsData} />
                        </div>
                        <Table
                            columns={columns}
                            tableData={tableData}
                            timestamp="publishTime" />
                        <Pages pageLen={allPage} pageActive={page} setPage={(e) => this.setPage(e)}/>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(achieveSelfModules({"page": 1, "count": 10}));

        const select = [2, 0];
        dispatch(leftNavFirst(select));
    }

    setPage(active) {
        const {dispatch, tabsData} = this.props;
        let currentTableName = '';
        for (let i = 0, len = tabsData; i < len; i++) {
            if (tabsData[i].selected) {
                currentTableName = tabsData.name;
                return;
            }
        }
        if (!tabsData.length) {
            currentTableName = 'selfModules';
        }
        switch(currentTableName) {
            case 'selfModules':
                return dispatch(achieveSelfModules({"page": active.active, "count": 10}));
            case 'combineModules':
                return dispatch(achieveCombineModules({"page": active.active, "count": 10}));
        }
    }
}

function select(state) {
    return {
        columns: state.writeTableData.columns,
        allPage: state.writeTableData.allPage,
        page: state.writeTableData.page,
        tableData: state.writeTableData.list,
        tabsData: state.tabsSwitch,
        leftNav: state.leftNavActive
    }
}

let Main = connect(select)(component);

render (
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById("main")
);