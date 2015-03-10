(function () {
	var expect = chai.expect;
	describe('fnx.compose(fn1, [fn2], [fnN])', function () {
		// function buildChineseName(lastName, firstName, middleName) {
		// 	return lastName + ' ' + firstName + '-' + middleName;
		// }

		function double(n) {
			return n * 2;
		}

		function halve(n) {
			return n / 2;
		}

		function square(n) {
			return n * n;
		}

		function roundDown(n) {
			return Math.floor(n);
		}

		it('returns a function.', function () {
			expect(fnx.compose(double)).to.be.a('Function');
		});

		it('does not require any arguments.', function () {
			expect(function () {
				fnx.compose()();
			}).to.not.throw();
		});

		it('requires that all arguments are functions.', function () {
			[
				'abc',
				123,
				true,
				false,
				[],
				{}
			].forEach(function (notAFunction) {
				expect(function () {
					fnx.compose(double, halve, square, roundDown, notAFunction)();
				}).to.throw();
				expect(function () {
					fnx.compose(double, halve, square, notAFunction, roundDown)();
				}).to.throw();
				expect(function () {
					fnx.compose(double, halve, notAFunction, square, roundDown)();
				}).to.throw();
				expect(function () {
					fnx.compose(double, notAFunction, halve, square, roundDown)();
				}).to.throw();
				expect(function () {
					fnx.compose(notAFunction, double, halve, square, roundDown)();
				}).to.throw();
			});

			expect(function () {
				fnx.compose(double, halve, square, roundDown)();
			}).to.not.throw();
		});

		it('returns the result of calling each function using the return value of the following function in the arguments list.', function () {
			expect(fnx.compose(square)(5)).to.equal(square(5));
			expect(fnx.compose(double, square)(5)).to.equal(double(square(5)));
			expect(fnx.compose(halve, double, square)(5)).to.equal(halve(double(square(5))));
			expect(fnx.compose(roundDown, halve, double, square)(5)).to.equal(roundDown(halve(double(square(5)))));
		});
	});
})();
