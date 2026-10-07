import React, { useEffect } from 'react';

import { ActionTypes } from '../../constants/ActionTypes';

const LogoutQuitConfirmationPopup: React.FC = () => {
    const onConfirmQuit = (e: any) => {
        e.preventDefault();

        onClosePopup(e);

        window.WebUI.Call('LogoutQuit');
    };

    const onClosePopup = (e: any) => {
        e.preventDefault();

        window.DispatchAction(ActionTypes.SET_POPUP, { popup: null });
    };

    useEffect(() => {
        (document.activeElement as HTMLElement).blur();
    }, []);

    return (
        <div className="center-notice">
            <div className="notice-content">
                <h1>登出 & 离开</h1>
                <p>您确定要登出并离开吗？</p>
                <div className="action-buttons">
                    <a href="#" className="btn border-btn" onClick={onClosePopup}>
                        取消
                    </a>
                    <a href="#" className="btn border-btn primary" onClick={onConfirmQuit}>
                        登出 & 离开
                    </a>
                </div>
            </div>
        </div>
    );
};
export default LogoutQuitConfirmationPopup;