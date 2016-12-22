/**
 * Created by wangxiaobo on 16/6/17.
 */
require('normalize');
require('base');
require('es6-shim');
require('apply-company.scss');
const React = require('react');
const render = require('react-dom').render;
const util = require('util');

const { LeftNav } = require('left-nav');
const { Header } = require('header');
const { Breadcrumb } = require('breadcrumb');
const { Table } = require('table');
const { Pages } = require('pages');

const { leftNavFirst , leftNavNext } = require('actions');
const { applyCompanyList } = require('apply-company-actions');
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

let columns = [
    {name: 'id', desc: '序号', width: 16},
    {name: 'applyTime', desc: '申请时间', width: 16},
    {name: 'company', desc: '公司名称', width: 16},
    {name: 'companyAddress', desc: '公司地址', width: 16},
    {name: 'name', desc: '联系人姓名', width: 16},
    {name: 'mobile', desc: '联系人手机号', width: 16},
    {name: 'email', desc: '联系人邮箱', width: 16},
    {name: 'companyType', desc: '公司类型', width: 16},
    {name: 'from', desc: '来源', width: 16},
    {name: 'businessLicence', desc: '营业执照图片'}
];

class component extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { dispatch , leftNav , writeTableData, page } = this.props;
        return (
            <div className="module-apply-company">
                <Header />
                <LeftNav select={leftNav.select} role={leftNav.role} leftList={leftList}
                         leftNavFirst={leftNav => dispatch(leftNavFirst(leftNav))}
                         leftNavNext={leftNav => dispatch(leftNavNext(leftNav))}/>
                <div className="apply-table container">
                    <div className="breadcrumb-container">
                        <Breadcrumb breadcrumbMsg="试用申请客户" />
                    </div>
                    <div className="content">
                        <div className="company-queryBox">
                            <a href="/scoreweb/company/exportList" className="btn-teem">批量倒出</a>
                        </div>
                        <Table columns={columns}
                               page={page}
                               tableData={writeTableData.list}/>
                        <Pages pageLen={writeTableData.allPage} pageActive={writeTableData.page} setPage={(e) => this.pageClick(e)}/>
                    </div>
                </div>

            </div>
        );
    }

    pageClick(e) {
        let { dispatch } =this.props;
        let data = {'page':e.active,'count':10};
        dispatch(applyCompanyList(data));
    }

    componentDidMount() {
        let {dispatch} = this.props;
        let data = {"page": 1, "count": 10};
        let select = [0, 0];
        dispatch(leftNavFirst(select));
        dispatch(applyCompanyList(data));
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