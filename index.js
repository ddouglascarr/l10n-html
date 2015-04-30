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
var cheerio  = require('cheerio');
var selectn  = require('selectn');

var re = /<[a-zA-Z]+ [^>]*data-l10n=/;

module.exports = function (source, bundle, opts) {
    if (opts === undefined) opts = {};
    defaults(opts, {
        returnCheerio: false,
        stripDataAttributes: true
    });

    var out = translate('', source);
    if (opts.returnCheerio) return cheerio.load(out);
    return out;


    function translate(_head, _tail) {
        var idx = _tail.search(re);
        if(idx < 0) {
            return _head.concat(_tail);
        }
        
        var head = _head.concat(_tail.slice(0, idx));
        var tail = _tail.slice(idx);
        var $ = cheerio.load(tail);

        var $tag = $('[data-l10n]').first().remove();
        var key = $tag.attr('data-l10n');
        $tag.html(selectn(key, bundle));
        if (opts.stripDataAttributes) $tag.removeAttr('data-l10n');

        return translate(head.concat(cheerio.html($tag)), $.html());
    }

};
