import React, { useEffect } from 'react';

import { ActionTypes } from '../../constants/ActionTypes';
import { PlayerLoginStatus } from '../../constants/PlayerLoginStatus';
import useBaseStore from '../../stores/useBaseStore';
import useUserStore from '../../stores/useUserStore';
import LoadingIndicator from '../global/LoadingIndicator';

const LoggingPlayerPopup: React.FC = () => {
    const playerLoginStatus = useUserStore((s) => s.playerLoginStatus);
    const error = useBaseStore((s) => s.error);

    const closePopup = () => {
        window.DispatchAction(ActionTypes.SET_POPUP, {
            popup: null,
        });
    };

    const resetLogin = () => {
        window.DispatchAction(ActionTypes.CHANGE_PLAYER_LOGIN_STATUS, {
            status: PlayerLoginStatus.LOGGED_OUT,
        });
    };

    const onClosePopup = (e?: any) => {
        if (e) e.preventDefault();

        closePopup();
        resetLogin();
    };

    useEffect(() => {
        (document.activeElement as HTMLElement).blur();
    }, []);

    if (playerLoginStatus === PlayerLoginStatus.LOGIN_FAILED) {
        let errorMessage = '尝试使用您的士兵登录时发生错误，请稍后再试';

        if (error && 'code' in error) {
            switch (error.code) {
                case 24: // PlayerDisabled
                    errorMessage = '此士兵已被禁用';
                    break;

                case 29: // MissingLink
                    errorMessage =
                        '您必须将您的Origin（EA App）帐户链接到您的VU帐户才能游玩，重新启动VU客户端以链接您的帐户';
                    break;

                case 30: // LinkUnauthorized
                    errorMessage =
                        '您的Origin（EA App）帐户中必须有BF3而且要与您的VU账户相链接才能游玩，重启VU客户端以重新链接您的账户';
                    break;

                case 31: // LinkNeedsRefresh
                    errorMessage =
                        '您的Origin（EA App）帐户链接已过期,因为您是通过EA Play拥有BF3的。在游玩之前，您必须刷新链接。重新启动VU客户端以刷新链接';
                    break;
            }
        }

        return (
            <div className="center-notice">
                <div className="notice-content">
                    <h1>登录失败</h1>
                    <p>{errorMessage}</p>
                    <a href="#" className="btn border-btn" onClick={onClosePopup}>
                        关闭
                    </a>
                </div>
            </div>
        );
    }

    if (playerLoginStatus !== PlayerLoginStatus.LOGGING_IN) {
        setTimeout(() => {
            closePopup();
        }, 50);
        return <div></div>;
    }

    return (
        <div className="center-notice">
            <div className="notice-content">
                <h1>登录中</h1>
                <p>我们正在使用您的士兵登录,请稍候……</p>
                <LoadingIndicator />
            </div>
        </div>
    );
};
export default LoggingPlayerPopup;