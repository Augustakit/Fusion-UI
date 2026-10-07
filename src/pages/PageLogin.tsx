import React, { type KeyboardEvent, type MouseEvent, useEffect, useRef, useState } from 'react';
import { MdOutlineReport } from 'react-icons/md';

import Checkbox from '../components/form/Checkbox';
import Input from '../components/form/Input';
import LoginPopup from '../components/popups/LoginPopup';
import { ActionTypes } from '../constants/ActionTypes';
import { LoginStatus } from '../constants/LoginStatus';
import useUserStore from '../stores/useUserStore';
import { onEnterKeyDown } from '../utils/handlers';

const PageLogin: React.FC = () => {
    const loginData = useUserStore((s) => s.loginData);
    const loginToken = useUserStore((s) => s.loginToken);

    const [isCapsLockOn, setIsCapsLockOn] = useState(false);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [remember, setRemember] = useState<boolean>(false);

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const enableBlur = () => {
        window.DispatchAction(ActionTypes.SET_BLUR, {
            blur: true,
        });
    };

    const disableMenu = () => {
        window.DispatchAction(ActionTypes.SET_MENU, {
            menu: false,
        });
    };

    const setPopup = (popup: any) => {
        window.DispatchAction(ActionTypes.SET_POPUP, {
            popup: popup,
        });
    };

    const onSetLogin = () => {
        window.DispatchAction(ActionTypes.CHANGE_LOGIN_STATUS, {
            status: LoginStatus.LOGGING_IN,
        });
    };

    const onUpdateCapsLock = (e: KeyboardEvent<HTMLInputElement>) => {
        const capsLockState = e.getModifierState('CapsLock');
        setIsCapsLockOn(capsLockState);
    };

    const onForgotPassword = (e: any) => {
        if (e) e.preventDefault();

        window.WebUI.Call('Forgot');
    };

    const onSubmit = (e: KeyboardEvent | MouseEvent) => {
        e.preventDefault();

        onSetLogin();
        setPopup(<LoginPopup />);

        window.WebUI.Call('Login', username, password, remember);
    };

    const onSignUp = (e: any) => {
        e.preventDefault();
        window.WebUI.Call('Signup');
    };

    useEffect(() => {
        enableBlur();
        disableMenu();

        usernameRef.current?.focus();

        if (loginData !== null) {
            onSetLogin();
            setPopup(<LoginPopup />);

            window.WebUI.Call('Login', loginData.username, loginData.password, false);
        } else if (loginToken !== null) {
            onSetLogin();
            setPopup(<LoginPopup />);

            window.WebUI.Call('TokenLogin', loginToken.token);
        } else {
            usernameRef.current?.focus();
        }

        return () => {
            setPopup(null);
        };
    }, []);

    return (
        <div id="login-page">
            <form>
                <img src="/assets/img/logo.svg" />

                <label htmlFor="username">用户名</label>
                <div style={{ margin: '4rem 0 16rem' }}>
                    <Input
                        type="text"
                        key="username"
                        id="username"
                        placeholder="输入用户名"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={(e) => {
                            onUpdateCapsLock(e);
                            onEnterKeyDown(e, onSubmit);

                            if (e.key === 'Tab') {
                                passwordRef.current?.focus();
                            }
                        }}
                        onKeyUp={(e) => {
                            onUpdateCapsLock(e);
                        }}
                        onMouseDown={(e) => {
                            setIsCapsLockOn(e.getModifierState('CapsLock'));
                        }}
                        ref={usernameRef}
                    />
                </div>
                <br />
                <label htmlFor="password">密码</label>
                <div style={{ margin: '4rem 0 16rem' }}>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        key="password"
                        id="password"
                        placeholder="输入密码"
                        onKeyDown={(e) => {
                            onUpdateCapsLock(e);
                            onEnterKeyDown(e, onSubmit);
                        }}
                        onKeyUp={(e) => {
                            onUpdateCapsLock(e);
                        }}
                        onMouseDown={(e) => {
                            setIsCapsLockOn(e.getModifierState('CapsLock'));
                        }}
                        ref={passwordRef}
                    />
                </div>
                {isCapsLockOn ? (
                    <div className="caps-lock-notice">
                        <MdOutlineReport color="#e8eaed" />
                        大写已打开
                    </div>
                ) : null}
                <div className="login-actions">
                    <div className="left-actions">
                        <Checkbox checked={remember} onChange={(value) => setRemember(value)} label="记住此用户名" />
                    </div>
                    <div className="right-actions">
                        <a href="#" onClick={onForgotPassword}>
                            忘记密码
                        </a>
                    </div>
                </div>
                <a href="#" className="btn border-btn primary" onClick={onSubmit}>
                    登录
                </a>
                <a href="#" className="btn border-btn" onClick={onSignUp}>
                    注册
                </a>
                <input
                    type="submit"
                    style={{
                        position: 'absolute',
                        opacity: 0.0,
                        left: '-999999999px',
                    }}
                />
            </form>
        </div>
    );
};
export default PageLogin;