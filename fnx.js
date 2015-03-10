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

	/**
	 * Set up a pipeline of the specified functions such that the return value
	 * of one function acts as the argument for the next one. Note that the
	 * functions are executed in the reverse order in which they are provided as
	 * arguments which aligns with the mathematical concept of functional
	 * composition: the composition of functions f1, f2 and f3 is the expression
	 * f1(f2(f3(x))).
	 */
	function compose() {
		var functions = arguments;
		var steps = functions.length;

		return function () {
			var value = arguments;
			var n = steps;

			/**
			 * Apply the functions in reverse order, storing the return value
			 * of each application into an array to be used as the argument for
			 * the next application.
			 */
			while (--n >= 0) {
				value = [functions[n].apply(this, value)];
			}

			return value[0];
		};
	}

	global.fnx = {
		compose: compose,
		partial: partial
	};
})(this);
