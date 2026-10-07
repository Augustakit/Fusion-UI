import React, { memo } from 'react';
import { NavLink } from 'react-router';

const TopMenu: React.FC = () => {
    return (
        <div className="top-menu">
            <ul className="left-items">
                <li>
                    <NavLink to="/main-menu" className={({ isActive }) => (isActive ? 'active' : '')}>
                        主页
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/server-browser" className={({ isActive }) => (isActive ? 'active' : '')}>
                        服务器
                    </NavLink>
                </li>
            </ul>
            <div className="menu-logo"></div>
            <ul className="right-items">
                <li>
                    <NavLink to="/settings" className={({ isActive }) => (isActive ? 'active' : '')}>
                        设置
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/credits" className={({ isActive }) => (isActive ? 'active' : '')}>
                        制作人员名单
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};
export default memo(TopMenu);
