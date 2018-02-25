$(document).ready(function () {

	$('input[data-validate-email]').each(function () {
		console.log($(this));
	});

	inputValidator = function () {

		$('input[data-validate]').each(function () {

			console.log($(this).data('validate-msg'));

			setFloatingLabel($(this));

			switch ($(this).data('validate')) {
				case 'email':
					validateEmail($(this));
					break;
				case 'text':
					validateLength($(this));
					break;
				case 'password':
					validateLength($(this));
					break;
			}

		});

		function setFloatingLabel(el) {
			el.on('keydown keyup focusout', function () {
				var self = $(this);

				if(self.val().length < 1) {
					self.attr('data-initial-value', false);
				} else {
					self.attr('data-initial-value', true);
				}
			});
		}

		function printErrAndExit(el, msg, condition) {
			var msg = msg || 'Attribute data-validate-msg NOT SET!';

			if (el.val().length > 0 && condition) {
				el.siblings('.group__err-msg').text(msg);
				el.addClass('group__input--err');
			} else {
				el.siblings('.group__err-msg').text('');
				el.removeClass('group__input--err');
			}
		}

		function validateEmail(el) {
			el.on('focusout', function () {
				var self = $(this);

				var pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
				var condition = pattern.test(self.val());

				printErrAndExit(self, self.data('validate-msg') , !condition);

			});
		}

		function validateLength(el) {
			el.on('focusout', function () {
				var self = $(this);
				var minVal = self.data('validate-min');
				var maxVal = self.data('validate-max');
				var msg = self.data('validate-msg');

				if (msg.indexOf('{min}') > -1 && msg.indexOf('{max}') > -1)  {
					var pattern = /(.*){min}(.*)?{max}(.*)/;
					msg = pattern.exec(msg);

					if (minVal && maxVal) {
						msg = msg[1] + ' ' + minVal + ' ' + msg[2] + ' ' + maxVal + ' ' + msg[3] ;
					} else {
						if (!minVal && !maxVal) {
							msg = 'Attributes data-validate-min or/and data-validate-max NOT SET!';
						} else if (!minVal) {
							msg = 'Attribute data-validate-min NOT SET!'
						} else msg = 'Attribute data-validate-max NOT SET!';

						self.siblings('.group__err-msg').text(msg);
						return;
					}
					printErrAndExit(self, msg, self.val().length < minVal || self.val().length > maxVal);
				}

				if (msg.indexOf('{min}') > -1) {
					if (minVal) {
						msg = msg.replace('{min}', minVal);
					} else {
						msg = 'Attribute data-validate-min NOT SET!';
						self.siblings('.group__err-msg').text(msg);
						return;
					}
					printErrAndExit(self, msg, self.val().length < minVal);
				}

				if (msg.indexOf('{max}') > -1) {
					if (maxVal) {
						msg = msg.replace('{max}', maxVal);
					} else {
						msg = 'Attribute data-validate-max NOT SET!';
						self.siblings('.group__err-msg').text(msg);
						return;
					}
					printErrAndExit(self, msg, self.val().length >= maxVal);
				}
			});
		}
	}

	inputValidator();



});

