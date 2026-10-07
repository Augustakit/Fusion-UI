import React, { useEffect, useRef, useState } from 'react';

import { ActionTypes } from '../../constants/ActionTypes';
import { PlayerCreateStatus } from '../../constants/PlayerCreateStatus';
import useBaseStore from '../../stores/useBaseStore';
import useUserStore from '../../stores/useUserStore';
import { onEnterKeyDown } from '../../utils/handlers';
import Input from '../form/Input';
import LoadingIndicator from '../global/LoadingIndicator';

const CreatePlayerPopup: React.FC = () => {
    const playerCreateStatus = useUserStore((s) => s.playerCreateStatus);
    const error = useBaseStore((s) => s.error);

    const inputRef = useRef<any>(null);
    const [inputValue, setInputValue] = useState<string>('');

    const closePopup = () => {
        window.DispatchAction(ActionTypes.SET_POPUP, {
            popup: null,
        });
    };

    const resetLogin = () => {
        window.DispatchAction(ActionTypes.CHANGE_PLAYER_CREATE_STATUS, {
            status: PlayerCreateStatus.NO_STATUS,
        });
    };

    const setCreating = () => {
        window.DispatchAction(ActionTypes.CHANGE_PLAYER_CREATE_STATUS, {
            status: PlayerCreateStatus.CREATING,
        });
    };

    const resetPopup = () => {
        window.DispatchAction(ActionTypes.CHANGE_PLAYER_CREATE_STATUS, {
            status: PlayerCreateStatus.CREATION_INIT,
        });
    };

    const onResetPopup = (e?: any) => {
        if (e) e.preventDefault();

        resetPopup();
    };

    const onClosePopup = (e?: any) => {
        if (e) e.preventDefault();

        closePopup();
        resetLogin();
    };

    const onSubmit = (e?: any) => {
        if (e) e.preventDefault();

        setCreating();

        window.WebUI.Call('CreatePlayer', inputValue);
    };

    useEffect(() => {
        (document.activeElement as HTMLElement).blur();

        inputRef.current?.focus();
    }, []);

    if (playerCreateStatus === PlayerCreateStatus.CREATION_FAILED) {
        let errorMessage = '无法创建士兵,请稍后再试';

        if (error && 'code' in error) {
            switch (error.code) {
                case 16: // InvalidPlayerName
                    errorMessage =
                        '您输入的士兵名称无效。名称必须介于3到16个字符之间，可以包含拉丁字母、数字、空格和以下字符：._"\'$:-|[]<>!?*@;/\\(){}~^';
                    break;

                case 20: // PlayerAlreadyExists
                    errorMessage = '您输入的士兵名称已被使用';
                    break;

                case 21: // MaximumPlayersReached
                    errorMessage = '您已达到创建的士兵数量的限制';
                    break;

                case 29: // MissingLink
                    errorMessage =
                        '在创建士兵之前，您必须将Origin（EA App）账户与您的VU账户相链接。重新启动VU客户端以链接您的账户';
                    break;

                case 30: // LinkUnauthorized
                    errorMessage =
                        '在创建士兵之前，您的Origin（EA App）帐户中必须有BF3而且要与您的VU账户相链接，重启VU客户端以重新链接您的账户';
                    break;

                case 31: // LinkNeedsRefresh
                    errorMessage =
                        '您的Origin（EA App）帐户链接已过期，因为您是通过EA Play拥有BF3的。在创建士兵之前，您必须刷新链接。重新启动VU客户端以刷新链接';
                    break;
            }
        }

        return (
            <div className="center-notice">
                <div className="notice-content">
                    <h1>创建失败</h1>
                    <p>{errorMessage}</p>
                    <a href="#" className="btn border-btn" onClick={onResetPopup}>
                        关闭
                    </a>
                </div>
            </div>
        );
    }

    if (playerCreateStatus === PlayerCreateStatus.CREATING) {
        return (
            <div className="center-notice">
                <div className="notice-content">
                    <h1>创建士兵</h1>
                    <p>正在创建新士兵，请稍候……</p>
                    <LoadingIndicator />
                </div>
            </div>
        );
    }

    if (playerCreateStatus !== PlayerCreateStatus.CREATION_INIT) {
        setTimeout(() => {
            closePopup();
        }, 50);
        return <div></div>;
    }

    return (
        <div className="center-notice">
            <div className="notice-content">
                <h1>创建新的士兵</h1>
                <form onKeyDown={(e) => onEnterKeyDown(e, onSubmit)}>
                    <label htmlFor="name">士兵名称</label>
                    <div style={{ margin: '4rem 0 16rem' }}>
                        <Input
                            type="text"
                            name="name"
                            placeholder="为你的士兵输入一个名字"
                            ref={inputRef}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    onSubmit();
                                }
                            }}
                            value={inputValue}
                            id="name"
                            autoFocus
                        />
                    </div>
                    <div className="form-actions">
                        <a href="#" className="btn border-btn" onClick={onClosePopup}>
                            关闭
                        </a>
                        <a href="#" className="btn border-btn primary" onClick={onSubmit}>
                            创建
                        </a>
                    </div>
                    <input type="submit" style={{ position: 'absolute', opacity: 0.0 }} />
                </form>
            </div>
        </div>
    );
};
export default CreatePlayerPopup;
