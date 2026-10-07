import React from 'react';

import { ActionTypes } from '../../constants/ActionTypes';
import ServerPasswordPopup from './ServerPasswordPopup';

interface IProps {
    server: any;
    onJoin: (guid: any) => void;
}

const ServerPerformancePopup: React.FC<IProps> = ({ server, onJoin }) => {
    const closePopup = () => {
        window.DispatchAction(ActionTypes.SET_POPUP, {
            popup: null,
        });
    };

    const setPopup = (popup: any) => {
        window.DispatchAction(ActionTypes.SET_POPUP, {
            popup: popup,
        });
    };

    const onClosePopup = (e?: any) => {
        if (e) e.preventDefault();

        closePopup();
    };

    const _onJoin = (e?: any) => {
        if (e) e.preventDefault();

        closePopup();

        if (server.passworded) {
            setPopup(<ServerPasswordPopup server={server} onJoin={onJoin} />);
            return;
        }

        if (onJoin) onJoin(server.guid);
    };

    return (
        <div className="center-notice">
            <div className="notice-content">
                <h1>服务器性能警告</h1>
                <p>您尝试加入的服务器遇到性能问题</p>
                <p>这意味着您可能会遇到延迟、不一致的命中率、玩家突然跳回之前的位置等问题</p>

                <div className="action-buttons">
                    <a href="#" className="btn border-btn" onClick={onClosePopup}>
                        取消
                    </a>
                    <a href="#" className="btn border-btn primary" onClick={_onJoin}>
                        坚持加入
                    </a>
                </div>
            </div>
        </div>
    );
};
export default ServerPerformancePopup;