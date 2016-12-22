/**
 * Created by ping on 16/6/21.
 */

require('normalize');
require('base');
require('user-logs.scss');
const util = require('util');
const React = require('react');
const render = require('react-dom').render;

const {Header} = require('header');
const {LeftNav} = require('left-nav');
const {Breadcrumb} = require('breadcrumb');
const {QueryBox} = require('query-box');
const {Table} = require('table');
const {Pages} = require('pages');
const {Boxy} = require('boxy');
const {Mask} = require('mask');

const {leftNavFirst, leftNavNext, boxyHide, maskHide, boxyShow, maskShow, achieveEventLogManagement} = require('user-logs-actions');
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
    name: '用户名称',
    dataType: 'text',
    text: '输入您要查找的用户名',
    maxLength: 200,
    refsName: 'queryInputDom',
    id: 0
}, {
    dataType: "range",
    name: "结束时间",
    id: "timeEnd"
}];

let boxyMsg = {
    show: true,
    type: 'tip', 
    content: '请输入所要查询的用户名',
    tipTime: 2000,
}

let maskMsg = {
    show: true,
    transparent: false
}

class component extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {dispatch, tableData, columns, allPage, leftNav, page, boxyMsg, maskMsg} = this.props;
        return(
            <div>
                <Header />
                <LeftNav
                  role={leftNav.role} select={leftNav.select} leftList={leftList}
                  leftNavFirst={leftNav => dispatch(leftNavFirst(leftNav))}
                  leftNavNext={leftNav => dispatch(leftNavNext(leftNav))} />
                <Boxy
                    boxyMsg={boxyMsg}
                    boxyHide={() => dispatch(boxyHide())}
                    maskHide={() => dispatch(maskHide())} />
                <Mask
                    maskMsg={maskMsg} />
                <div className="container">
                    <div className="breadcrumb-container">
                        <Breadcrumb breadcrumbMsg="日志列表" />
                    </div>
                    <div className="content">
                        <div className="querybox-container">
                            <QueryBox
                                queryText={queryText}
                                listReturn={submitList => this.listReturn(submitList)} />
                        </div>
                    <Table
                        columns={columns}
                        tableData={tableData}
                        timestamp="createTime" />
                        <Pages pageLen={allPage} pageActive={page} setPage={(e)=>this.setPage(e)}/>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(achieveEventLogManagement({"page": 1, "count": 10}));

        const select = [3, 0];
        dispatch(leftNavFirst(select));
    }

    setPage(active) {
        let {dispatch} = this.props;
        dispatch(achieveEventLogManagement({page: active.active, count: 10}));
    }

    listReturn(submitList) {
        console.log(submitList[0].value)
        let {dispatch} = this.props;
        let username = submitList[0].value;
        if (!username) {
            dispatch(boxyShow(boxyMsg));
            dispatch(maskShow(maskMsg));
            return;
        }
        dispatch(achieveEventLogManagement({page: 1, count: 10, username: username}));
    }
}

function select(state) {
    return {
        columns: state.writeTableData.columns,
        allPage: state.writeTableData.allPage,
        page: state.writeTableData.page,
        tableData: state.writeTableData.list,
        leftNav: state.leftNavActive,
        boxyMsg: state.boxyAction,
        maskMsg: state.maskAction
    }
}

let Main = connect(select)(component);

render (
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById("main")
);