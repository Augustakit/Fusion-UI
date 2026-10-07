import React, { useEffect } from 'react';

import LoadingIndicator from '../components/global/LoadingIndicator';
import { ActionTypes } from '../constants/ActionTypes';
import { OriginLinkStatus } from '../constants/OriginLinkStatus';
import useBaseStore from '../stores/useBaseStore';
import useUserStore from '../stores/useUserStore';

const PageOriginLink: React.FC = () => {
    const productName = useBaseStore((s) => s.productName);
    const originLinkStatus = useUserStore((s) => s.originLinkStatus);

    const enableBlur = () => {
        window.DispatchAction(ActionTypes.SET_BLUR, {
            blur: true,
        });
    };

    const disableMenu = () => {
        window.DispatchAction(ActionTypes.SET_MENU, {
            menu: false,
        });
    };

    const setPopup = (popup: any) => {
        window.DispatchAction(ActionTypes.SET_POPUP, {
            popup: popup,
        });
    };

    const onRetry = (e: any) => {
        if (e) e.preventDefault();

        window.WebUI.Call('LinkOrigin');
    };

    useEffect(() => {
        enableBlur();
        disableMenu();

        window.WebUI.Call('LinkOrigin');

        return () => {
            setPopup(null);
        };
    }, []);

    let originState = '等待Origin/EA Desktop……';
    let canRetry = false;
    let spinning = false;

    switch (originLinkStatus) {
        case OriginLinkStatus.IDLE:
            originState = '等待Origin/EA Desktop……';
            spinning = true;
            break;

        case OriginLinkStatus.LINKING:
            originState = '正在链接帐户……';
            spinning = true;
            break;

        case OriginLinkStatus.LINK_SUCCESSFUL:
            originState = '已成功链接！';
            break;

        case OriginLinkStatus.CHECKING_OWNERSHIP:
            originState = '检查所有权……';
            spinning = true;
            break;

        case OriginLinkStatus.LINK_FAILED:
            originState = '链接失败，请稍后再试';
            canRetry = true;
            break;

        case OriginLinkStatus.PRODUCT_MISSING:
            originState = '您的帐户未拥有Battlefield 3';
            canRetry = true;
            break;

        case OriginLinkStatus.LINK_TAKEN:
            originState = '此EA帐户已链接到另一个帐户';
            canRetry = true;
            break;

        case OriginLinkStatus.LINK_UNAVAILABLE:
            originState = '链接服务无法使用';
            canRetry = true;
            break;

        case OriginLinkStatus.ORIGIN_ERROR:
            originState = '与Origin/EA Desktop传递时出现错误';
            canRetry = true;
            break;
    }

    return (
        <div id="origin-link-page" className="content-wrapper">
            <h1>所有权验证</h1>
            <p>
                {`为了使用${productName}，我们首先需要通过您的EA帐户验证您的游戏所有权。请在您的计算机上启动EA Desktop应用程序或Origin客户端，并使用您的帐户登录。这是一个一次性过程，将把您的EA帐户与您的${productName}帐户链接起来`}
            </p>
            <div className="status-container">
                <div className="status-container-logos">
                    <img src="/assets/img/common/ea-desktop.svg" style={{ marginRight: '40rem' }} />
                    <img src="/assets/img/common/origin.svg" />
                </div>
                <h2>
                    {spinning ? (
                        <span style={{ marginRight: '8rem' }}>
                            <LoadingIndicator />
                        </span>
                    ) : null}{' '}
                    {originState}
                </h2>
                {canRetry ? (
                    <a href="#" className="btn border-btn" onClick={onRetry}>
                        重试
                    </a>
                ) : null}
            </div>
        </div>
    );
};
export default PageOriginLink;
