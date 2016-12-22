/**
 * Created by wangxiaobo on 16/6/29.
 */
require('normalize');
require('base');
require('es6-shim');
require('login.scss');
const React = require('react');
const render = require('react-dom').render;
const util = require('util');

const { ForgetPassword } = require('forget-password');

const { refreshSrc , postVerifyCode , login , sendEmail } = require('login-actions');
const { scorewebStore } = require('reducers');
const { Provider, connect } = require('react-redux');
const { createStore, applyMiddleware } = require('redux');
const thunk = require('redux-thunk').default;

let store = createStore(scorewebStore, applyMiddleware(thunk));

class component extends React.Component {
    constructor(props) {
        super(props);
        let hash = location.hash.replace("#", "");
        let page = false;
        let pag = false;
        if (hash !== "forget"&&hash !== "goEmail"){
            page = true;
        }
        this.state = {
            getShow: page,
            goEmail: pag
        }
    }

    render() {
        let { src } = this.props.login;
        let { dispatch } =this.props;
        let { getShow , goEmail} = this.state;
        return (
            <div className="main">
                <div className={"module-login" + (getShow ? ' show':'')}>
                    <p className="p"><span className="spano">账号登陆</span><span className="spant">还没有账号?<a
                        href="http://www.hbc315.com/hbc/trial.jsp" className="try">申请试用</a></span></p>
                    <div className="div"><span></span><input type="text" className="input" placeholder="请输入用户名"
                                                             ref="name"/></div>
                    <div className="div"><span></span><input type="password" className="input" placeholder="请输入密码"
                                                             ref="passWord"/></div>
                    <div className="div"><span></span><input type="text" className="input" maxLength="4"
                                                             placeholder="请输入验证码" ref="code"
                                                             onChange={(e) => this.codeChange(e)}/><img src={src}
                                                                                                        className="img"
                                                                                                        onClick={(e) => this.imgClick()}/>
                    </div>
                    <a href="javascript:;" className="submit" onClick={(e) => this.submit()}>登陆</a>
                    <p className="bottom"><a href="javascript:;"
                                                                  className="bottom-forget" onClick={(e) => this.forgetPassword()}>忘记密码?</a>
                    </p>
                </div>
                <ForgetPassword src={src}
                                getShow = {getShow}
                                goEmail = {goEmail}
                                refreshSrc={src => dispatch(refreshSrc(src))}
                                postVerifyCode={data => dispatch(postVerifyCode(data))}
                                sendEmail={data => dispatch(sendEmail(data))}/>
            </div>
        )
    }


    componentDidMount() {
        window.onhashchange = (event) => {
            console.log(1,'***')
            let newHash = util.getHash(event.newURL);
            let oldHash = util.getHash(event.oldURL);
            let page = false;
            let pag = true;
            if (newHash !== "forget"&&newHash !== "goEmail"){
                page = true;
                pag = false;
            }else if (newHash === "forget"){
                page = false;
                pag = false;
            }else if(newHash === "goEmail"){
                page = false;
                pag = true
            }
            this.setState({
                getShow : page,
                goEmail:pag
            });

        }
    }

    componentWillReceiveProps(nextProps) {

    }
    forgetPassword(){
        location.hash = "forget";
    }
    codeChange(e) {
        let value = e.target.value;
        let { dispatch } = this.props;
        if (value.length >= 4) {
            let data = {captcha: value};
            dispatch(postVerifyCode(data))
        }
    }

    imgClick() {//点击重新获取验证码
        let { dispatch } = this.props;
        dispatch(refreshSrc());
    }

    submit() {
        let name = this.refs.name.value;
        let passWord = util.base64encode(this.refs.passWord.value);
        let code = this.refs.code.value;
        let data = {
            userName: name,
            password: passWord,
            captcha: code
        };
        let { dispatch } = this.props;
        dispatch(login(data))
    }
}

function select(state) {
    return {
        login: state.login
    }
}

let Main = connect(select)(component);

render(
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById("main")
);