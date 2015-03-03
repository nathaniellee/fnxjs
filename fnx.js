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
		/**
		 * Remember the n arguments specified after the function to be partially
		 * applied: these will be the first n arguments used when the returned
		 * function is executed.
		 */
		var partiallyAppliedArguments = slice.call(arguments, 1);

		/**
		 * This new function will apply the specified function `fn` to the
		 * combination of the partially applied arguments and any arguments that
		 * are provided at execution time.
		 */
		return function () {
			var completeArguments = partiallyAppliedArguments.concat(slice.call(arguments));
			return fn.apply(this, completeArguments);
		};
	}

	global.fnx = {
		partial: partial
	};
})(this);
