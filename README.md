# mithril-awesomplete
Autocomplete in a shiny armor...

This is a small [mithril](http://mithril.js.org/index.html) component implementing [Awesomplete](https://leaverou.github.io/awesomplete/).

## Example how to use:
```javascript
m( autocomplete, {
	// input attributes
	value:  'initial value',
	id   : 'input_id',
	name : 'input_name',

	// autocomplete attributes
	getValue: ( item ) => item.nested.value, // property getter.
	minChars: 2, // min characters before starting suggestions callback.
	suggestions: ( value, done ) => {
		proxy.getSuggestions(value )
		.then( response => { // response should be an array
			done( response); // place suggestions in result list.
		} );
	},
	delay: 1000 // delays the call to suggestions callback by 1 second
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
Callback function that is called when the input changes. The 'done' parameter should eventually receive the list of suggestions.
```javascript
(value, done) => {
	proxy.getSuggestion(value)
		.then(response => { // response is an array
			done(response); // this places the suggestions in the result list.
		});
}
```

### delay
The suggestions callback is debounced, meaning that the search isn't performed on every keystroke. Should you get your search results from a server (see example above), this delay prevents the application from spamming that server.

Default delay is set to 500 milliseconds.

## Notes
* This implementation doesn't deal with the complete API as described on the [Awesomplete page](https://leaverou.github.io/awesomplete/). If extra functionality is desired, it will have to be added to this wrapper component. Examples of functionality that didn't make it (yet):
  * Provide an element (such as a textArea).
  * handing it a static list of suggestions.
  * setting a maximum of items
  * filter
  * sort
  * ...
* This was written using ES6 capabilities. You'll have to use a preprocessor (like Babel) before you can use this.