/**
 * Created by jin on 16/6/15.
 */
/**
 * Created by jin on 16/4/29.
 */
require('normalize');
require('base');
require('es6-shim');
require('create-company.scss');
const React = require('react');
const render = require('react-dom').render;
const util = require('util');

const {CompanyForm} = require('company-form');
const {LeftNav} = require('left-nav');
const {Header} = require('header');

const { leftNavFirst , leftNavNext } = require('actions');
const { creatCompany,getCompanyMessage } = require('create-company-actions');
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

let createModifier = false;
class component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let { dispatch , leftNav , companyList } = this.props;
        return (
            <div className="module-create-company">
                <Header />
                <LeftNav select={leftNav.select} role={0} leftList={leftList}
                         leftNavFirst={leftNav => dispatch(leftNavFirst(leftNav))}
                         leftNavNext={leftNav => dispatch(leftNavNext(leftNav))}/>
                <div className="create-company container">
                    <div className="breadcrumb-container">
                        <Breadcrumb breadcrumbMsg="创建商务客户" />
                    </div>
                    <div className="content">
                        <CompanyForm creatCompany={data => dispatch(creatCompany(data))}
                                     createModifier={createModifier}
                                     companyList={companyList}/>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        let {dispatch} = this.props;
        let select = [0, 1];
        if (createModifier) {
            dispatch(getCompanyMessage({id: 0}));
        }
        dispatch(leftNavFirst(select));
    }

    componentWillReceiveProps(nextProps) {


    }
}

function select(state) {
    return {
        companyList: state.showCompany.companyList,
        leftNav: state.leftNavActive,
        page: state.setNumber,
        date: state.setDatepicker
    }
}

let Main = connect(select)(component);

render(
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById("main")
);
