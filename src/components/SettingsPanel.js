import React from 'react';
import '../styles/SettingsPanel.css';

const SettingsPanel = (props) => {
	const settingsList = [];
	for (const setting in props.settings) {
		settingsList.push({
			settingKey: setting,
			settingInfo: props.settings[setting],
		});
	}

	const changeSetting = (settingKey, value) => {
		const newSettings = JSON.parse(JSON.stringify(props.settings));
		newSettings[settingKey].value = value;
		props.updateSettings(newSettings);
	};

	return (
		<div className='settings-panel panel'>
			{settingsList.map(({ settingKey, settingInfo }) => {
				if ((settingInfo.type = 'input')) {
					return (
						<div className='setting'>
							<label>{settingInfo.displayName}:</label>
							<input
								placeholder={settingInfo.value}
								onKeyUp={(e) =>
									e.key === 'Enter'
										? changeSetting(
												settingKey,
												e.target.value
										  )
										: ''
								}
								type={settingInfo.type}
								min={settingInfo.min}
								max={settingInfo.max}
							></input>
						</div>
					);
				} else {
					return <></>;
				}
			})}
		</div>
	);
};

export default SettingsPanel;
