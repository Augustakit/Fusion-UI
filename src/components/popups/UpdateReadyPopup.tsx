import React, { useEffect } from 'react';

import { ActionTypes } from '../../constants/ActionTypes';

const UpdateReadyPopup: React.FC = () => {
    const onClosePopup: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
        e.preventDefault();

        window.DispatchAction(ActionTypes.SET_POPUP, { popup: null });
    };

    useEffect(() => {
        (document.activeElement as HTMLElement).blur();
    }, []);

    return (
        <div className="center-notice">
            <div className="notice-content">
                <h1>更新就绪</h1>
                <p>更新已下载，将在您下次启动VU时自动应用</p>
                <a href="#" className="btn border-btn" onClick={onClosePopup}>
                    关闭
                </a>
            </div>
        </div>
    );
};
export default UpdateReadyPopup;