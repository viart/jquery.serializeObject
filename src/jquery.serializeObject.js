/**
 * jQuery.serializeObject v0.0.2
 *
 * Documentation: https://github.com/viart/jquery.serializeObject
 *
 * Artem Vitiuk (@avitiuk)
 */

(function () {

    var root = this,
        $ = root.jQuery || root.Zepto || root.ender,
        inputTypes = 'color,date,datetime,datetime-local,email,hidden,month,number,password,range,search,tel,text,time,url,week'.split(','),
        inputNodes = 'select,textarea'.split(','),
        rName = /\[([^\]]*)\]/g;

    function storeValue(container, parsedName, value) {

        var part = parsedName[0];

        if (parsedName.length > 1) {
            if (!container[part]) {
                // If the next part is eq to '' it means we are processing complex name (i.e. `some[]`)
                // for this case we need to use Array instead of an Object for the index increment purpose
                container[part] = parsedName[1] ? {} : [];
            }
            storeValue(container[part], parsedName.slice(1), value);
        } else {

            // Increment Array index for `some[]` case
            if (!part) {
                part = container.length;
            }

            container[part] = value;
        }
    }

    $.fn.serializeObject = function (options) {
        options || (options = {});

        var values = {},
            settings = $.extend(true, {
                include: [],
                exclude: [],
                includeByClass: ''
            }, options);

        this.find(':input').each(function () {

            var parsedName;

            // Apply simple checks and filters
            if (!this.name || this.disabled ||
                settings.exclude.indexOf(this.name) !== -1 ||
                (settings.include.length && settings.include.indexOf(this.name) === -1) ||
                this.className.indexOf(settings.includeByClass) === -1) {
                return;
            }

            // Parse complex names
            // JS RegExp doesn't support "positive look behind" :( that's why so weird parsing is used
            parsedName = this.name.replace(rName, '[$1').split('[');
            if (!parsedName[0]) {
                return;
            }

            if (this.checked ||
                inputTypes.indexOf(this.type) !== -1 ||
                inputNodes.indexOf(this.nodeName.toLowerCase()) !== -1) {

                // Simulate control with a complex name (i.e. `some[]`)
                // as it handled in the same way as Checkboxes should
                if (this.type === 'checkbox') {
                    parsedName.push('');
                }

                // jQuery.val() is used to simplify of getting values
                // from the custom controls (which follow jQuery .val() API) and Multiple Select
                storeValue(values, parsedName, $(this).val());
            }
        });

        return values;
    };

}).call(this);
