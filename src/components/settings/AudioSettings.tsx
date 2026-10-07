import React, { memo, useMemo } from 'react';

import { ActionTypes } from '../../constants/ActionTypes';
import useSettingsStore from '../../stores/useSettingsStore';
import useVoipStore from '../../stores/useVoipStore';
import { Select } from '../form/Select';
import NumberInput from './NumberInput';
import VoipSlider from './VoipSlider';

const AudioSettings: React.FC = () => {
    const devices = useVoipStore((s) => s.devices);
    const selectedDevice = useVoipStore((s) => s.selectedDevice);
    const volumeMultiplier = useVoipStore((s) => s.volumeMultiplier);
    const cutoffVolume = useVoipStore((s) => s.cutoffVolume);
    const volume = useVoipStore((s) => s.volume);
    const currentSettings = useSettingsStore((s) => s.currentSettings);

    const setMasterVolume = (volume: number | number[]) => {
        window.DispatchAction(ActionTypes.SET_CURRENT_SETTINGS, { settings: { masterVolume: volume } });
    };

    const setMusicVolume = (volume: number | number[]) => {
        window.DispatchAction(ActionTypes.SET_CURRENT_SETTINGS, { settings: { musicVolume: volume } });
    };

    const setDialogueVolume = (volume: number | number[]) => {
        window.DispatchAction(ActionTypes.SET_CURRENT_SETTINGS, { settings: { dialogueVolume: volume } });
    };

    const setVoipVolumeMultiplier = (volume: number | number[]) => {
        window.DispatchAction(ActionTypes.SET_VOIP_DATA, { data: { volumeMultiplier: volume } });
    };

    const onVoipDeviceChange = (value: number) => {
        window.WebUI.Call('VoipSelectDevice', value);
    };

    const onVoipCutoffVolumeChange = (volume: number | number[]) => {
        window.WebUI.Call('VoipCutoffVolume', volume);
    };

    const onVoipVolumeMultiplierChange = (volume: number | number[]) => {
        window.WebUI.Call('VoipVolumeMultiplier', volume);
        setVoipVolumeMultiplier(volume);
    };

    const voipDevicesMemo: Array<{ value: number; label: string }> = useMemo(() => {
        if (devices.length === 0) {
            return [{ value: -1, label: '未检测到麦克风' }];
        }
        return devices.map((device) => ({ value: device.id, label: device.name }));
    }, [devices]);

    const selectedDeviceIndexMemo: number = useMemo(() => {
        if (devices.length === 0) return -1; // I don't think we need this one
        return selectedDevice;
    }, [devices, selectedDevice]);

    return (
        <>
            <h2>音频设置</h2>
            <div className="settings-row">
                <h3>主音量</h3>
                <NumberInput onChange={setMasterVolume} value={currentSettings.masterVolume} />
            </div>
            <div className="settings-row">
                <h3>音乐音量</h3>
                <NumberInput onChange={setMusicVolume} value={currentSettings.musicVolume} />
            </div>
            <div className="settings-row">
                <h3>语音音量（角色语音）</h3>
                <NumberInput onChange={setDialogueVolume} value={currentSettings.dialogueVolume} />
            </div>

            <hr />

            <h2>VOIP设置</h2>
            <div className="settings-row">
                <h3>麦克风设备</h3>
                <Select
                    options={voipDevicesMemo}
                    value={selectedDeviceIndexMemo}
                    onChange={(value: any) => onVoipDeviceChange(value)}
                />
            </div>
            <div className="settings-row">
                <h3>语音激活阈值</h3>
                <VoipSlider onChange={onVoipCutoffVolumeChange} volume={volume} value={cutoffVolume} />
            </div>
            <div className="settings-row">
                <h3>音量</h3>
                <NumberInput value={volumeMultiplier} onChange={onVoipVolumeMultiplierChange} min={0.0} max={5.0} />
            </div>
        </>
    );
};
export default memo(AudioSettings);
