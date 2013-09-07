var test = require('tape');
var l10n = require('../../');

test('Browser transform test', function (t) {
	var translated = l10n(document.querySelector('body'), {
		hello: 'Bonjour',
		nested: {
			hello: 'Hola'
		}
	});

	t.plan(3);
	t.equal(typeof translated, 'object', 'results should be an object');
	t.equal(document.querySelectorAll('p')[0].innerText, 'Bonjour', 'non-nested object should have transformed correctly');
	t.equal(document.querySelectorAll('p')[1].innerText, 'Hola', 'nested object should have transformed correctly');
	t.end();
})