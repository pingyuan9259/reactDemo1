/**
 * Created by wangxiaobo on 16/6/20.
 */
require('normalize');
require('base');
require('es6-shim');
require('business-list.scss');
const React = require('react');
const render = require('react-dom').render;
const util = require('util');

const { LeftNav } = require('left-nav');
const { Header } = require('header');
const { Table } = require('table');
const { QueryBox } = require('query-box');
const { Pages } = require('pages');
const { Breadcrumb } = require('breadcrumb')

const { leftNavNext , leftNavFirst , btnGroupSure , btnGroupModify} = require('actions');
const { getBusinessList} = require('business-list-actions');
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

//table列表
let columns = [
    {name: 'id', desc: '序号', width: 16},
    {name: 'applyDate', desc: '合作时间', width: 16},
    {name: 'company', desc: '公司名称', width: 16},
    {name: 'companyAddress', desc: '企业地址', width: 16},
    {name: 'contact', desc: '联系人', width: 16},
    {name: 'mobile', desc: '联系电话', width: 16},
    {name: 'email', desc: '联系邮箱', width: 16},
    {name: 'companyType', desc: '企业类型', width: 16},
    {name: 'operation', desc: '操作'}
];
//查询
let queryText = [
    {
        "name": "用户名称",
        "dataType": "text",
        "text": "输入您要查找的用户名",
        "maxLength": "",
        "refsName": "name",
        "id": "7"
    },
    /*{
     "dataType": "date",
     "name":"开始时间",
     "id":"timeStart"
     },*/
    {
        "dataType": "range",
        "name": "结束时间",
        "id": "timeEnd"
    }
];

class component extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { dispatch , leftNav , writeTableData, page } = this.props;
        return (
            <div className="module-business-list">
                <Header />
                <LeftNav select={leftNav.select} role={leftNav.role} leftList={leftList}
                         leftNavFirst={leftNav => dispatch(leftNavFirst(leftNav))}
                         leftNavNext={leftNav => dispatch(leftNavNext(leftNav))}/>

                <div className="business-table container">
                    <div className="breadcrumb-container">
                        <Breadcrumb breadcrumbMsg="商务客户" />
                    </div>
                    <div className="content">
                        <div className="business-queryBox">
                            <QueryBox queryText={queryText}
                                      getBusinessList={data => dispatch(getBusinessList(data))}
                                      listReturn={this.listReturn}/>
                            <a href="createCompany" className="create-company">创建</a>
                        </div>
                        <Table columns={columns}
                               page={page}
                               tableData={writeTableData.list}
                               btnGroupSure={btnMsg=>dispatch(btnGroupSure(btnMsg))}
                               btnGroupModify={btnMsg=>dispatch(btnGroupModify(btnMsg))}/>
                        <Pages pageLen={writeTableData.allPage} pageActive={writeTableData.page} setPage={(e) => this.pageClick(e)}/>
                    </div>
                </div>
            </div>
        );
    }

    pageClick(e) {
        let { dispatch } =this.props;
        let data = {'page':e.active,'count':10};
        dispatch(getBusinessList(data));
    }

    listReturn(submitList, _this) {
        submitList.map((obj) => {
            switch (obj.id) {
                case "7":
                    let data = {"page": 1, "count": 10, "company": obj.value};
                    _this.props.getBusinessList(data);
                    break;
            }
        });
    }

    componentDidMount() {
        let {dispatch} = this.props;
        let data = {"page": 1, "count": 10, "company": ""};
        let select = [0, 1];
        dispatch(leftNavFirst(select));
        dispatch(getBusinessList(data));
    }
}
function select(state) {
    return {
        leftNav: state.leftNavActive,
        writeTableData: state.writeTableData,
        page: state.setNumber
    }
}

let Masse = connect(select)(component);

render(
    <Provider store={store}>
        <Masse />
    </Provider>,
    document.getElementById("main")
);