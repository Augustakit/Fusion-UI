import React, { useEffect } from 'react';

import { ActionTypes } from '../../constants/ActionTypes';
import { LoginStatus } from '../../constants/LoginStatus';
import useBaseStore from '../../stores/useBaseStore';
import useUserStore from '../../stores/useUserStore';
import LoadingIndicator from '../global/LoadingIndicator';

const LoginPopup: React.FC = () => {
    const loginStatus = useUserStore((s) => s.loginStatus);
    const error = useBaseStore((s) => s.error);

    const closePopup = () => {
        window.DispatchAction(ActionTypes.SET_POPUP, {
            popup: null,
        });
    };

    const resetLogin = () => {
        window.DispatchAction(ActionTypes.CHANGE_LOGIN_STATUS, {
            status: LoginStatus.LOGGED_OUT,
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

    if (loginStatus === LoginStatus.LOGIN_FAILED) {
        let errorMessage =
            '无法验证您的凭据。请确保输入正确，然后重试';

        if (error && 'code' in error) {
            switch (error.code) {
                case 29: // AlreadyLoggedIn
                    errorMessage = '此帐户在另一地点使用';
                    break;

                case 24: // PendingVerification
                    errorMessage = '登录前必须验证您的账户';
                    break;

                case 31: // ExpiredToken
                    errorMessage = '您的会话已过期，请使用您的凭据重新登录';
                    break;

                case 27: // AccountDisabled
                    errorMessage = '您的帐户已被管理员封禁';
                    break;

                case 28: // AccountBanned
                    errorMessage = '您的账户已被封禁';
                    break;

                case 5: // Unauthorized
                    errorMessage = '您的帐户无权访问该分支';
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

    return (
        <div className="center-notice">
            <div className="notice-content">
                <h1>登录中</h1>
                <p>请稍候</p>
                <LoadingIndicator />
            </div>
        </div>
    );
};
export default LoginPopup;