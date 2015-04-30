/**
 * l10n-html - A nicer solution to localization.
 *
 * Copyright (c) 2013 Zach Bruggeman
 *
 * l10n-html is licensed under the MIT License.
 *
 * @package l10n-html
 * @author Zach Bruggeman <talkto@zachbruggeman.me>
 */

var defaults = require('lodash.defaults');
var $  = require('cheerio');
var selectn  = require('selectn');

var re = /<[a-zA-Z]+[^>]+data-l10n=[^>]*>[^<]*<\/[^>]+>/;

module.exports = function (source, bundle, opts) {
    if (opts === undefined) opts = {};
    defaults(opts, {
        returnCheerio: false,
        stripDataAttributes: true
    });

    var out = translate('', source);
    if (opts.returnCheerio) return $.load(out);
    return out;


    function translate(_head, _tail) {
        console.log('_head: ' + _head);
        console.log('_tail: ' + _tail);
        var result = re.exec(_tail)
        console.log(result);
        if(result === null) {
            return _head.concat(_tail);
        }
        
        var start = result.index;
        var len = result[0].length;
        var end = start + len;

        var head = _head.concat(_tail.slice(0, start));
        var tail = _tail.slice(end);
        var $tag = $(_tail.slice(start, end));

        var key = $tag.attr('data-l10n');
        $tag.html(selectn(key, bundle));
        if (opts.stripDataAttributes) $tag.removeAttr('data-l10n');

        return translate(head.concat($.html($tag)), tail);
    }

};
