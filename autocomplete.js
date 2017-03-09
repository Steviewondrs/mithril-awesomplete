import m from 'mithril';
import _ from 'lodash';

import Awesomplete from 'awesomplete';

/**
 * Config of this component.
 * 
 * The suggestions is a callback function that eventually provides the list to be used for 
 * autocompletion.
 * @example: (value, done) => proxy.getSuggestions(value).then(resp => done(resp));
 * 
 * @param {Object}   attrs
 * @param {String}   attrs.value    - initial value of the input
 * @param {Number}   attrs.minChars - minimum of characters before autocompleting
 * @param {Function} attrs.getValue - property getter
 * @param {Number}	 attrs.delay - debounce the suggestions callback by this amount ( in milliseconds )
 * @param {Function} attrs.suggestions - callback function to provide suggestions. 
 */
function config( { getValue, suggestions, minChars = 2, value = '', delay = 500 } ) {
	return ( el, isInit, ctx ) => {

		// Hook up awesomplete to the context.
		if( !isInit ) {
			el.value     = value; // circumventing setting the value in the view.
			ctx.prevTerm = value; // prevent autocompletion on initial render
			ctx.awesomplete = new Awesomplete( el );
			ctx.callSuggestions = _.debounce( suggestions , delay );

			// Control how the user selection replaces the user's input.
			// We fire of a 'change' event. This is because mithril apps rely heavily on
			// 'hardcore' html events...
			ctx.awesomplete.replace = ( suggestion ) => {
				ctx.prevTerm = suggestion.label;
				el.value 	 = suggestion.label;
				el.dispatchEvent( new Event( 'input',  { bubbles: true } ) );
				el.dispatchEvent( new Event( 'change', { bubbles: true } ) );
			}
		}

		let word = el.value;
		if( word.length > minChars && ctx.prevTerm !== word ) {
			ctx.callSuggestions( word, ( s ) => {
				ctx.awesomplete.list = _.uniq( _.map( s, getValue ) );
				ctx.awesomplete.evaluate(); // must be called because list is dynamically set.
			} );
			ctx.prevTerm = word;
		}
		ctx.prevTerm = el.value;

		// Awesomplete places a containing div around the input.
		// When the component gets removed from some view, we will want to remove this container.
		ctx.onunload = () => {
			let container = ctx.awesomplete.container;
			container.parentNode.removeChild( container );
		}
	}
}

function view( __, { getValue, minChars, suggestions, oninput, value, delay, ...attrs } ) {
	return m( 'input', {
		config: config( { getValue, minChars, suggestions, value } ),
		oninput: e => oninput ? oninput( e ) : e, // force redraw
		...attrs
	} )
}

export default { view };