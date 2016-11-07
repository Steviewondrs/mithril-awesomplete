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

## Note
* This implementation doesn't deal with the complete API as described on the [Awesomplete page](https://leaverou.github.io/awesomplete/). If extra functionality is desired, it will have to be added to this wrapper component. Examples of functionality that didn't make it (yet):
  * Provide an element (such as a textArea).
  * handing it a static list of suggestions.
  * setting a maximum of items
  * filter
  * sort
  * ...
* I made use of a lot ES6 functionality. Most browsers nowadays have a lot of ES6 implemented, but nevertheless it can be useful to run the code under a preprocessor such as Babel.