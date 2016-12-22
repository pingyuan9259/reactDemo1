/**
 * Created by wangxiaobo on 16/6/12.
 */
require('normalize');
require('base');
require('es6-shim');
require('user-info.scss');
const React = require('react');
const render = require('react-dom').render;
const util = require('util');

const { Message } = require('user-message');
const { LeftNav } = require('left-nav');
const { Header } = require('header');
const { Breadcrumb } = require('breadcrumb');
const { ModifyPassword } = require('modify-password');

const { leftNavFirst , leftNavNext } = require('actions');
const { userInfoList , modifySelfInfo , verifyOldPassWord , verifyCode , modifyPassWord } = require('user-info-actions');
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
        let { dispatch , userMessage , leftNav } = this.props;
        return (
            <div className="module-user-info">
                <Header />
                <LeftNav select={leftNav.select} role={leftNav.role} leftList={leftList}
                         leftNavFirst={leftNav => dispatch(leftNavFirst(leftNav))}
                         leftNavNext={leftNav => dispatch(leftNavNext(leftNav))}/>
                <div className="userDiv container">
                    <div className="breadcrumb-container">
                        <Breadcrumb breadcrumbMsg="我的设置" />
                    </div>
                    <div className="content">
                        <Message userMessage={userMessage}
                                 modifySelfInfo={data=>dispatch(modifySelfInfo(data))}/>
                        <ModifyPassword userMessage={userMessage}
                                        verifyOldPassWord={data=>dispatch(verifyOldPassWord(data))}
                                        verifyCode={data=>dispatch(verifyCode(data))}
                                        modifyPassWord={data=>dispatch(modifyPassWord(data))}/>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        let {dispatch} = this.props;
        let select = [4, 0];
        dispatch(leftNavFirst(select));
        dispatch(userInfoList());
    }
}
function select(state) {
    return {
        userMessage: state.userMessage,
        leftNav: state.leftNavActive
    }
}

let Masse = connect(select)(component);

render(
    <Provider store={store}>
        <Masse />
    </Provider>,
    document.getElementById("main")
);