import React, { useEffect } from 'react';

import LoadingIndicator from '../components/global/LoadingIndicator';
import { ActionTypes } from '../constants/ActionTypes';
import { ConnectionStatus } from '../constants/ConnectionStatus';
import useBaseStore from '../stores/useBaseStore';

const PageConnection: React.FC = () => {
    const connectionStatus = useBaseStore((s) => s.connectionStatus);
    const error = useBaseStore((s) => s.error);

    const enableBlur = () => {
        window.DispatchAction(ActionTypes.SET_BLUR, {
            blur: true,
        });
    };

    const disableMenu = () => {
        window.DispatchAction(ActionTypes.SET_BLUR, {
            menu: false,
        });
    };

    useEffect(() => {
        enableBlur();
        disableMenu();
    }, []);

    const onReconnect = (e: any) => {
        e.preventDefault();
        window.WebUI.Call('Reconnect');
    };

    if (connectionStatus === ConnectionStatus.DISCONNECTED) {
        return (
            <div className="center-notice">
                <div className="notice-content">
                    <h1>连接故障</h1>
                    <p>您已与Zeus后端断开连接</p>
                    <a href="#" className="btn border-btn" onClick={onReconnect}>
                        重新连接
                    </a>
                </div>
            </div>
        );
    }

    if (connectionStatus === ConnectionStatus.CONNECTING || connectionStatus === ConnectionStatus.CONNECTED) {
        return (
            <div className="center-notice">
                <div className="notice-content">
                    <h1>连接中</h1>
                    <p>连接到Zeus后端，请稍候……</p>
                    <LoadingIndicator />
                </div>
            </div>
        );
    }

    let errorCode = 'Unknown';

    if (error && 'code' in error) {
        switch (error.code) {
            case 0:
                errorCode = '连接超时';
                break;

            case 4:
                errorCode = '没有可用的服务器';
                break;

            case 23:
                errorCode = '服务器繁忙，请继续重试';
                break;

            default:
                errorCode = '未知 (' + error.code + ')';
        }
    }

    return (
        <div className="center-notice">
            <div className="notice-content">
                <h1>连接失败</h1>
                <p>无法连接到Zeus后端，原因：{errorCode}</p>
                <a href="#" className="btn border-btn" onClick={onReconnect}>
                    重新连接
                </a>
            </div>
        </div>
    );
};
export default PageConnection;
