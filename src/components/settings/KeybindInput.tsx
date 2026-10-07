import './KeybindInput.scss';

import React, { useRef, useState } from 'react';
import { MdKeyboard } from 'react-icons/md';

import { getInputDeviceKeyFromKeyboardEvent, InputDeviceKeyNames } from '../../constants/InputDeviceKey';
import Input from '../form/Input';

interface IProps {
    value: number;
    onChange: (e?: any) => void;
    placeholder?: string;
}

const KeybindInput: React.FC<IProps> = ({ value, onChange, placeholder }) => {
    const [editing, setEditing] = useState<boolean>(false);
    const [originalValue] = useState<any>(value);
    const inputRef = useRef<any>(null);

    const _onCancel = (e?: any) => {
        e?.preventDefault();

        setEditing(false);
    };

    const _onReset = (e?: any) => {
        e?.preventDefault();

        onChange(originalValue);
    };

    const _onKeyDown = (e?: any) => {
        e?.preventDefault();

        // Cancel
        if (e.key === 'Escape') {
            inputRef.current.blur();
            return;
        }

        const key = getInputDeviceKeyFromKeyboardEvent(e);
        if (!key) {
            console.warn(`${e.key}(${e.keyCode}) 不是一个受支持的输入设备按键`);
            return;
        }

        inputRef.current.blur();
        onChange(key);
    };

    return (
        <div className="keybind-input">
            <Input
                type="text"
                ref={inputRef}
                value={!editing ? InputDeviceKeyNames[value] ?? '' : ''}
                placeholder={editing ? '按任意键……' : placeholder ?? ''}
                onKeyDown={_onKeyDown}
                onClick={() => setEditing(true)}
                onFocus={() => setEditing(true)}
                onBlur={_onCancel}
                readOnly
                isFullWidth
                startIcon={<MdKeyboard style={{ marginRight: '6rem' }} />}
            />
            {editing ? (
                <button className="btn border-btn keybind-reset" onClick={_onCancel}>
                    取消
                </button>
            ) : null}
            {!editing && value !== originalValue ? (
                <button className="btn border-btn keybind-reset" onClick={_onReset}>
                    重置
                </button>
            ) : null}
        </div>
    );
};
export default KeybindInput;
