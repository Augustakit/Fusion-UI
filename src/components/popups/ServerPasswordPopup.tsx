import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineReport } from 'react-icons/md';

import { ActionTypes } from '../../constants/ActionTypes';
import { onEnterKeyDown } from '../../utils/handlers';
import Input from '../form/Input';

interface IProps {
    server: any;
    onJoin: (guid: any, password: string) => void;
}

const ServerPasswordPopup: React.FC<IProps> = ({ server, onJoin }) => {
    const [password, setPassword] = useState<string>('');
    const [isCapsLockOn, setIsCapsLockOn] = useState<boolean>(false);
    const passwordRef = useRef<HTMLInputElement>(null);

    const closePopup = () => {
        window.DispatchAction(ActionTypes.SET_POPUP, {
            popup: null,
        });
    };

    const onUpdateCapsLock = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSubmit();
        }

        setIsCapsLockOn(e.getModifierState('CapsLock'));
    };

    const onClosePopup = (e?: any) => {
        if (e) e.preventDefault();

        closePopup();
    };

    const onSubmit = (e?: any) => {
        if (e) e.preventDefault();

        closePopup();

        if (onJoin) onJoin(server.guid, password);
    };

    useEffect(() => {
        (document.activeElement as HTMLElement).blur();

        setTimeout(() => {
            passwordRef.current?.focus();
        }, 50);
    }, []);

    return (
        <div className="center-notice">
            <div className="notice-content">
                <h1>输入服务器密码</h1>
                <form onKeyDown={(e) => onEnterKeyDown(e, onSubmit)}>
                    <div className="label-wrapper">
                        <label htmlFor="password">服务器密码</label>
                        <br />
                        {isCapsLockOn ? (
                            <div className="caps-lock-notice">
                                <MdOutlineReport color="#e8eaed" />
                                大写锁定已开启
                            </div>
                        ) : null}
                    </div>

                    <div style={{ margin: '4rem 0 16rem' }}>
                        <Input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            placeholder="输入服务器密码"
                            onKeyDown={onUpdateCapsLock}
                            onKeyUp={onUpdateCapsLock}
                            onMouseDown={(e) => {
                                setIsCapsLockOn(e.getModifierState('CapsLock'));
                            }}
                            ref={passwordRef}
                            autoFocus
                        />
                    </div>

                    <div className="form-actions">
                        <a href="#" className="btn border-btn" onClick={onClosePopup}>
                            关闭
                        </a>
                        <a href="#" className="btn border-btn primary" onClick={onSubmit}>
                            连接
                        </a>
                    </div>
                    <input type="submit" style={{ position: 'absolute', opacity: 0.0 }} />
                </form>
            </div>
        </div>
    );
};
export default ServerPasswordPopup;