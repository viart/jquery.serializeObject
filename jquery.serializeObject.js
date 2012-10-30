/**
 * jQuery.serializeObject v0.0.1
 *
 * Documentation: https://github.com/viart/jquery.serializeObject
 *
 * Artem Vitiuk (@avitiuk)
 */

(function ($) {

    var
        rCRLF = /\r?\n/g,
        rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        rselectTextarea = /^(?:select|textarea)/i;

    $.fn.serializeObject = function (options) {
        options || (options = {});

        var elements = [],
            values = {},
            settings = $.extend(true, {
                include: [],
                exclude: [],
                includeByClass: ''
            }, options);

        elements = this.find('input, select, textarea').map(function () {
            if(this.name && !this.disabled &&
                settings.exclude.indexOf(this.name) === -1 &&
                (!settings.include.length || settings.include.indexOf(this.name) !== -1) &&
                (this.className.indexOf(settings.includeByClass) !== -1)) {
                return this;
            }
        });

        $.each(elements, function (i, el) {
            var name = el.name;

            // checkbox
            if(el.checked && el.type === 'checkbox') {
                if(!values[name]) {
                    values[name] = [el.value];
                } else {
                    values[name].push(el.value);
                }
            } else if(rselectTextarea.test(el.nodeName) || rinput.test(el.type) || (el.checked && el.type === 'radio')) {
                values[name] = $(el).val();
            }

            if(values[name]) {
                if(Object.prototype.toString.call(values[name]) === '[object Array]') {
                    values[name] = $.map(values[name], function (val) {
                        return val.replace(rCRLF, "\r\n");
                    });
                } else {
                    values[name] = values[name].replace(rCRLF, "\r\n");
                }
            }

        });

        return values;
    };

})(jQuery);
