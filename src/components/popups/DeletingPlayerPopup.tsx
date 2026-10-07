import React, { useEffect } from 'react';

import { ActionTypes } from '../../constants/ActionTypes';
import { PlayerDeleteStatus } from '../../constants/PlayerDeleteStatus';
import useUserStore from '../../stores/useUserStore';
import LoadingIndicator from '../global/LoadingIndicator';

const DeletingPlayerPopup: React.FC = () => {
    const playerDeleteStatus = useUserStore((s) => s.playerDeleteStatus);

    const closePopup = () => {
        window.DispatchAction(ActionTypes.SET_POPUP, {
            popup: null,
        });
    };

    const resetLogin = () => {
        window.DispatchAction(ActionTypes.CHANGE_PLAYER_DELETE_STATUS, {
            status: PlayerDeleteStatus.NO_STATUS,
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

    if (playerDeleteStatus === PlayerDeleteStatus.DELETION_FAILED) {
        return (
            <div className="center-notice">
                <div className="notice-content">
                    <h1>删除失败</h1>
                    <p>无法删除您的士兵,请稍后再试</p>
                    <a href="#" className="btn border-btn" onClick={onClosePopup}>
                        关闭
                    </a>
                </div>
            </div>
        );
    }

    if (playerDeleteStatus === PlayerDeleteStatus.NO_STATUS) {
        setTimeout(() => {
            closePopup();
        }, 50);
        return <div></div>;
    }

    return (
        <div className="center-notice">
            <div className="notice-content">
                <h1>删除士兵</h1>
                <p>请稍候……</p>
                <LoadingIndicator />
            </div>
        </div>
    );
};
export default DeletingPlayerPopup;
