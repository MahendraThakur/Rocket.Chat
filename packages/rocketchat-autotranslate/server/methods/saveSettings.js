Meteor.methods({
	'autoTranslate.saveSettings': function(rid, field, value) {
		if (!Meteor.userId()) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', { method: 'saveAutoTranslateSettings' });
		}

		check(rid, String);
		check(field, String);
		check(value, String);

		if (['autoTranslate', 'autoTranslateLanguage', 'autoTranslateDisplay'].indexOf(field) === -1) {
			throw new Meteor.Error('error-invalid-settings', 'Invalid settings field', { method: 'saveAutoTranslateSettings' });
		}

		const subscription = RocketChat.models.Subscriptions.findOneByRoomIdAndUserId(rid, Meteor.userId());
		if (!subscription) {
			throw new Meteor.Error('error-invalid-subscription', 'Invalid subscription', { method: 'saveAutoTranslateSettings' });
		}

		switch (field) {
			case 'autoTranslate':
				RocketChat.models.Subscriptions.updateAutoTranslateById(subscription._id, value === '1' ? true : false);
				break;
			case 'autoTranslateDisplay':
				RocketChat.models.Subscriptions.updateAutoTranslateDisplayById(subscription._id, value === '1' ? true : false);
				break;
			case 'autoTranslateLanguage':
				RocketChat.models.Subscriptions.updateAutoTranslateLanguageById(subscription._id, value);
				break;
		}

		return true;
	}
});