import React, { useEffect } from 'react';

import { ActionTypes } from '../../constants/ActionTypes';
import { PlayerDeleteStatus } from '../../constants/PlayerDeleteStatus';
import DeletingPlayerPopup from './DeletingPlayerPopup';

interface IProps {
    name: string;
    guid: string;
}

const PlayerDeleteConfirmationPopup: React.FC<IProps> = ({ name, guid }) => {
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

    const resetLogin = () => {
        window.DispatchAction(ActionTypes.CHANGE_PLAYER_DELETE_STATUS, {
            status: PlayerDeleteStatus.NO_STATUS,
        });
    };

    const onConfirmDeletion = (e?: any) => {
        if (e) e.preventDefault();

        setPopup(<DeletingPlayerPopup />);
        window.WebUI.Call('DeletePlayer', guid);
    };

    const onClosePopup = (e?: any) => {
        if (e) e.preventDefault();

        closePopup();
        resetLogin();
    };

    useEffect(() => {
        (document.activeElement as HTMLElement).blur();
    }, []);

    return (
        <div className="center-notice">
            <div className="notice-content">
                <h1>删除士兵</h1>
                <p>您确定要删除您的士兵「{name}」吗？此操作不可逆转</p>
                <div className="action-buttons">
                    <a href="#" className="btn border-btn" onClick={onClosePopup}>
                        取消
                    </a>
                    <a href="#" className="btn border-btn primary" onClick={onConfirmDeletion}>
                        确认
                    </a>
                </div>
            </div>
        </div>
    );
};
export default PlayerDeleteConfirmationPopup;