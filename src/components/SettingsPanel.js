import React, { useState } from 'react';
import '../styles/SettingsPanel.css';

const SettingsPanel = (props) => {
	const {
		parseSettings,
		settingsAreDirty,
		saveSettings,
	} = UseSettingsPanelState(props);

	return (
		<div className='settings-panel panel'>
			<h1>Settings</h1>
			{parseSettings()}
			<button
				className='button'
				id='save_settings'
				onClick={saveSettings}
				disabled={settingsAreDirty ? false : true}
			>
				Save Changes
			</button>
		</div>
	);
};

const UseSettingsPanelState = (props) => {
	const [tempSettings, setTempSettings] = useState(
		JSON.parse(JSON.stringify(props.settings))
	);
	const [settingsAreDirty, setSettingsAreDirty] = useState(false);

	const changeSetting = (event, settingKey, settingInfo) => {
		let newValue;
		if (settingInfo.type === 'number') {
			newValue = event.target.value;
			if (newValue < settingInfo.min) {
				newValue = settingInfo.min;
			} else if (newValue > settingInfo.max) {
				newValue = settingInfo.max;
			}
		} else if (settingInfo.type === 'checkbox') {
			newValue = event.target.checked;
		}

		if (newValue !== settingInfo.value) {
			const newSettings = JSON.parse(JSON.stringify(tempSettings));
			newSettings[settingKey].value = newValue;
			setTempSettings(newSettings);
		}
		setSettingsAreDirty(true);
	};

	const parseSettings = () => {
		const settingsList = [];
		for (const setting in tempSettings) {
			settingsList.push({
				settingKey: setting,
				settingInfo: tempSettings[setting],
			});
		}

		return settingsList.map(({ settingKey, settingInfo }) => {
			if (
				settingInfo.type === 'number' ||
				settingInfo.type === 'checkbox'
			) {
				const type = settingInfo.type;
				return (
					<div className='setting' key={settingKey}>
						<label>{settingInfo.displayName}</label>
						<div id='divider'></div>
						<input
							placeholder={
								type === 'number' ? settingInfo.value : ''
							}
							onChange={(event) =>
								changeSetting(event, settingKey, settingInfo)
							}
							type={type}
							min={settingInfo.min}
							max={settingInfo.max}
							checked={settingInfo.value === true}
						></input>
					</div>
				);
			} else {
				return <></>;
			}
		});
	};

	const saveSettings = () => {
		props.updateSettings(tempSettings);
		setSettingsAreDirty(false);
	};

	return { parseSettings, settingsAreDirty, saveSettings };
};

export default SettingsPanel;
