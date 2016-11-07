# mithril-awesomplete
Autocomplete in a shiny armor...

This is a small [mithril](http://mithril.js.org/index.html) component implementing [Awesomplete](https://leaverou.github.io/awesomplete/).

## Example how to use:
```javascript
m( autocomplete, {
	// input attributes
	'value':  'initial value',
	'id'   : 'input_id',
	'name' : 'input_name',

	// autocomplete attributes
	'getValue': ( item ) => item.nested.value, // property getter
	'minChars': 2, 
	'suggestions': ( value, done ) => {
		proxy.getSuggestions(value )
		.then( response => { // response is an array
			done( response);
		} );
	}
}
```

## Options
### getValue
A property getter to specify which value of an item we would like to get.
```javascript
// if this is our object...
var o = { some: { nested: value }};
// ...then this is how we would get the data from it
var getValue = (item) => item.some.nested.value;
```

### minChars
Specify the minimum amount of characters to be inputted before autocompletion kicks in.

### suggestions
Callback function that is called every time the input changes. The 'done' parameter should eventually receive the list of suggestions.
```javascript
(value, done) => {
	proxy.getSuggestion(value)
		.then(response => { // response is an array
			done(response);
		});
}
```