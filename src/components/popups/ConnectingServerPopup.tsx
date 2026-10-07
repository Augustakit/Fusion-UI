import React from 'react';

import { ActionTypes } from '../../constants/ActionTypes';
import { ServerConnectStatus } from '../../constants/ServerConnectStatus';
import useBaseStore from '../../stores/useBaseStore';
import useServerStore from '../../stores/useServerStore';
import LoadingIndicator from '../global/LoadingIndicator';

const ConnectingServerPopup: React.FC = () => {
    const connectStatus = useServerStore((s) => s.connectStatus);
    const downloadProgress = useServerStore((s) => s.downloadProgress);
    const error = useBaseStore((s) => s.error);

    const closePopup = () => {
        window.DispatchAction(ActionTypes.SET_ERROR, {
            error: null,
        });
        window.DispatchAction(ActionTypes.SET_POPUP, {
            popup: null,
        });
    };

    const resetLogin = () => {
        window.DispatchAction(ActionTypes.CHANGE_SERVER_CONNECT_STATUS, {
            status: ServerConnectStatus.IDLE,
        });
    };

    const onClosePopup = (e?: any) => {
        if (e) e.preventDefault();

        closePopup();
        resetLogin();
    };

    if (connectStatus === ServerConnectStatus.CONNECTION_FAILED) {
        let text = '连接服务器时发生错误,请稍后再试';

        if (error && 'code' in error) {
            switch (error.code) {
                case 2:
                    text = '您尝试连接的服务器已无法使用';
                    break;

                case 4:
                    text = '您的账户已连接到另一台服务器';
                    break;

                case 6:
                    text = '您输入的服务器密码无效';
                    break;

                case 7:
                    if ('reason' in error && error.reason.length > 0) text = error.reason;
                    else text = '您无法连接该服务器';

                    break;

                case 8:
                    text = '连接此服务器失败';
                    break;
            }
        }

        return (
            <div className="center-notice">
                <div className="notice-content">
                    <h1>连接失败</h1>
                    <p>{text}</p>
                    <a href="#" className="btn border-btn" onClick={onClosePopup}>
                        关闭
                    </a>
                </div>
            </div>
        );
    }

    if (connectStatus === ServerConnectStatus.DISCONNECTED) {
        let title = '断开连接';
        let text = '您已从所在的服务器断开连接';

        if (error && 'code' in error) {
            switch (error.code) {
                case 1:
                case 2:
                    text = '您尝试加入的服务器与您的客户端不兼容';
                    break;

                case 3:
                    text = '服务器已满员';
                    break;

                case 4:
                    if ('reason' in error && error.reason.length > 0)
                        text = '您被踢出该服务器,原因是：' + error.reason;
                    else text = '您被踢出了该服务器';

                    break;

                case 5:
                    if ('reason' in error && error.reason.length > 0) text = error.reason;
                    else text = '您被禁止进入该服务器';

                    break;

                case 12:
                    text = '您缺少加入此服务器所需的某些内容';
                    break;

                case 14:
                    text = '与服务器的连接超时';
                    break;

                case 15:
                    title = '连接失败';
                    text = '连接此服务器失败';
                    break;

                case 16:
                    text = '一段时间未收到此服务器的回复';
                    break;

                case 18:
                    text = '您的本地内容（如level data）与服务器上的内容不一致';
                    break;

                case 19:
                    text = '您因在服务器不活跃而被踢出';
                    break;

                case 21:
                    text = '您因为击杀友军次数过多而被踢出此服务器';
                    break;

                case 22:
                    if ('reason' in error && error.reason.length > 0)
                        text = '您被踢出该服务器,原因是：' + error.reason;
                    else text = '您被踢出了该服务器';

                    break;

                case 24:
                    title = '连接失败';
                    text = '服务器已满员';
                    break;

                case 34:
                    title = '连接失败';
                    text = '禁止您观战此服务器';
                    break;

                case 35:
                    title = '连接失败';
                    text = '目前没有观众席位';
                    break;
            }
        }

        return (
            <div className="center-notice">
                <div className="notice-content">
                    <h1>{title}</h1>
                    <p>{text}</p>
                    <a href="#" className="btn border-btn" onClick={onClosePopup}>
                        关闭
                    </a>
                </div>
            </div>
        );
    }

    if (connectStatus === ServerConnectStatus.DOWNLOAD_FAILED) {
        const title = '连接失败';
        const text = '无法下载加入此服务器所需的文件';

        return (
            <div className="center-notice">
                <div className="notice-content">
                    <h1>{title}</h1>
                    <p>{text}</p>
                    <a href="#" className="btn border-btn" onClick={onClosePopup}>
                        关闭
                    </a>
                </div>
            </div>
        );
    }

    // TODO: This isn't right.
    if (connectStatus === ServerConnectStatus.CONNECTED) {
        return (
            <div className="center-notice">
                <div className="notice-content">
                    <h1>连接中</h1>
                    <p>正在为您连接至游戏服务器，请稍候……</p>
                    <LoadingIndicator />
                </div>
            </div>
        );
    }

    if (connectStatus === ServerConnectStatus.DOWNLOADING) {
        if (downloadProgress.totalFiles === 0) {
            return (
                <div className="center-notice">
                    <div className="notice-content">
                        <h1>连接中</h1>
                        <p>正在获取要下载的文件列表……</p>
                        <LoadingIndicator />
                    </div>
                </div>
            );
        }

        const currFile = downloadProgress.currentFileIndex + 1;
        const totalFiles = downloadProgress.totalFiles;
        const progress = Math.round((downloadProgress.downloaded / downloadProgress.setSize) * 100);

        return (
            <div className="center-notice">
                <div className="notice-content">
                    <h1>下载中</h1>
                    <p>{`正在下载第 ${currFile} 个文件，共 ${totalFiles} ${totalFiles}。进度：${progress}%`}</p>
                    <LoadingIndicator />
                </div>
            </div>
        );
    }

    if (connectStatus !== ServerConnectStatus.CONNECTING) {
        setTimeout(() => {
            closePopup();
        }, 50);
        return <div></div>;
    }

    return (
        <div className="center-notice">
            <div className="notice-content">
                <h1>连接中</h1>
                <p>正在为您连接至游戏服务器，请稍候……</p>
                <LoadingIndicator />
            </div>
        </div>
    );
};
export default ConnectingServerPopup;
