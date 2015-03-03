(function (global) {
	var slice = Array.prototype.slice;

	/**
	 * Partially apply the specified function by returning a new function that
	 * associates specified arguments to be used as the leading arguments at the
	 * time of execution.
	 * 
	 * Example:
	 * 
	 * function buildChineseName(lastName, firstName, middleName) {
	 *     return lastName + ' ' + firstName + '-' + middleName;
	 * }
	 * 
	 * var buildLiFamilyName = partial(buildChineseName, 'Li');
	 * 
	 * buildLiFamilyName('Qi', 'Xian');    // returns 'Li Qi-Xian';
	 */
	function partial(fn) {
		var partiallyAppliedArguments = slice.call(arguments, 1);

		return function () {
			var completeArguments = partiallyAppliedArguments.concat(slice.call(arguments));
			return fn.apply(this, completeArguments);
		};
	}

	global.fnx = {
		partial: partial
	};
})(this);
