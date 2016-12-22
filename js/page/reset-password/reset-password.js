/**
 * Created by wangxiaobo on 16/7/13.
 */
require('normalize');
require('base');
require('es6-shim');
require('reset-password.scss');
const React = require('react');
const render = require('react-dom').render;
const util = require('util');

let { refreshSrc , postVerifyCode , resetPassword } = require('reset-password-actions');

const { scorewebStore } = require('reducers');
const { Provider, connect } = require('react-redux');
const { createStore, applyMiddleware } = require('redux');
const thunk = require('redux-thunk').default;

let store = createStore(scorewebStore, applyMiddleware(thunk));

class component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorNewPassWord:'',
            errorPassWordAgain:'',
            newPassWord:'',
            passWordAgain:'',
            codeValue:'1111'
        }
    }
    render() {
        let { src , code } = this.props.resetPassword;
        let { errorNewPassWord , errorPassWordAgain , codeValue } = this.state;
        return (
            <div className="main">
                <div className="module-rest-password">
                    <div className="div"><span></span><input type="password" className="newPassWord" placeholder="请输入您的新密码"
                                                             ref="newPassWord" onBlur={(e) => this.onBlur(e)}/>
                    </div>
                    <p className="p">{errorNewPassWord}</p>
                    <div className="div"><span></span><input type="password" className="passWordAgain" placeholder="请重新输入您的新密码"
                                                             ref="passWordAgain" onBlur={(e) => this.onBlur(e)}/>
                    </div>
                    <p className="p">{errorPassWordAgain}</p>
                    <div className="div"><span></span><input type="text" className="input" maxLength="4"
                                                             placeholder="请输入验证码" ref="code"
                                                             onChange={(e) => this.codeChange(e)}/><img src={src}
                                                                                                        className="img"
                                                                                                        onClick={(e) => this.imgClick()}/>
                    </div>
                    <p className="p">{codeValue?code?'':'请输入正确的验证码':'验证码不能为空'}</p>
                    <a href="javascript:;" className="submit" onClick={(e) => this.submit()}>立即重置</a>
                </div>
            </div>
        )
    }

    imgClick() {//点击重新获取验证码
        let { dispatch } = this.props;
        dispatch(refreshSrc());
    }

    onBlur(e){
        let name = e.target.className;
        let value = e.target.value;
        switch (name) {
            case 'newPassWord':
                if(!value){
                    this.setState({
                        errorNewPassWord:'新密码不能为空'
                    })
                }else {
                    if(value.length<6||value.length>20){
                        this.setState({
                            errorNewPassWord:'密码格式不对'
                        })
                    }else {
                        this.setState({
                            errorNewPassWord:'',
                            newPassWord:value
                        })
                    }
                }
                break;
            case 'passWordAgain':
                if(!value){
                    this.setState({
                        errorPassWordAgain:'新密码不能为空'
                    })
                }else {
                    let { newPassWord } =this.state;
                    if(value!== newPassWord){
                        this.setState({
                            errorPassWordAgain:'两次输入的密码不一致'
                        })
                    }else {
                        this.setState({
                            errorPassWordAgain:'',
                            passWordAgain:value
                        })
                    }
                }
                break;
        }
    }
    codeChange(e) {
        let value = e.target.value;
        let { dispatch } = this.props;
        if (value.length >= 4) {
            let data = {captcha: value};
            dispatch(postVerifyCode(data));
            let { code } = this.props.resetPassword;
            if(code){
                this.setState({
                    code:value
                })
            }
        }
    }
    submit(){
        console.log(1,'*');
        let {code,newPassWord,passWordAgain} = this.state;
        let { dispatch } = this.props;
        if( code && newPassWord && passWordAgain && passWordAgain===newPassWord ){
            let data = {
                nPassword:util.base64encode(newPassWord),
                confirmPassword:util.base64encode(passWordAgain)
            }
            console.log(data);
            dispatch(resetPassword(data));
        }
    }
}

function select(state) {
    return {
        resetPassword: state.resetPassword
    }
}

let Main = connect(select)(component);

render(
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById("main")
);