import React, { useEffect, useRef, useState } from 'react';

import { ActionTypes } from '../../constants/ActionTypes';
import useSettingsStore from '../../stores/useSettingsStore';

const ApplySettingsPopup: React.FC = () => {
    const currentSettings = useSettingsStore((s) => s.currentSettings);
    const gameSettings = useSettingsStore((s) => s.gameSettings);

    const [timeRemaining, setTimeRemaining] = useState<number>(15);
    const timerRef = useRef<number | null>(null);

    const setSettings = (settings: any) => {
        window.DispatchAction(ActionTypes.SET_SETTINGS, {
            settings,
        });
    };

    const closePopup = () => {
        window.DispatchAction(ActionTypes.SET_POPUP, {
            popup: null,
        });
    };

    const _onKeepSettings = (e?: any) => {
        if (e) e.preventDefault();

        if (timerRef.current !== null) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }

        // Persist settings.
        setSettings(currentSettings);
        closePopup();
    };

    const _onRevertSettings = (e?: any) => {
        if (e) e.preventDefault();

        if (timerRef.current !== null) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }

        // Revert settings to their previous state.
        window.WebUI.Call('ApplySettings', gameSettings);
        setSettings(gameSettings);

        closePopup();
    };

    useEffect(() => {
        const _tickDown = () => {
            if (timeRemaining <= 1) {
                timerRef.current = null;
                _onRevertSettings();
                return;
            }

            setTimeRemaining((p) => p - 1);

            timerRef.current = setTimeout(_tickDown, 1000);
        };

        timerRef.current = setTimeout(_tickDown, 1000);

        return () => {
            if (timerRef.current !== null) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
        };
    }, []);

    let seconds = timeRemaining;
    if (seconds < 0) seconds = 0;

    let remainingTime = `${seconds} 秒`;
    return (
        <div className="center-notice">
            <div className="notice-content">
                <h1>是否保留这些设置？</h1>
                <p>您确定要保留这些设置吗？离还原到之前的设置还有{remainingTime}</p>
                <div className="action-buttons">
                    <a href="#" className="btn border-btn" onClick={_onRevertSettings}>
                        还原
                    </a>
                    <a href="#" className="btn border-btn primary" onClick={_onKeepSettings}>
                        保留设置
                    </a>
                </div>
            </div>
        </div>
    );
};
export default ApplySettingsPopup;
