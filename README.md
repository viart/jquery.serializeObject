jQuery.serializeObject
======================

Helper for the Form values to JSON extraction.

## API

```HTML
    <form>
        <input type="checkbox" name="contacts" value="fax">
        <input type="checkbox" name="contacts" value="email" checked>
        <input type="email" name="company[emails][]" values="example@example.com">
        <input type="email" name="company[emails][]" values="example2@example.com">
    </form>
```

```javascript
    $('form').serializeObject(options);
```

```
    {
        contacts: ['email'],
        company: {
            emails: ['example@example.com', 'example2@example.com']
        }
    }
```

### Possible options
* `exclude` list with names of fields to exclude
* `include` list with names of fields to include
* `includeByClass` CSS classname to include by

## TODO
* Better documentation.
* Create gh-page.
* Add unit-tests.
