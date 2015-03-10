(function () {
	var expect = chai.expect;
	describe('fnx.partial(fn, [arg1], [argN])', function () {
		function buildChineseName(lastName, firstName, middleName) {
			return lastName + ' ' + firstName + '-' + middleName;
		}

		it('returns a function.', function () {
			expect(fnx.partial(buildChineseName)).to.be.a('Function');
		});

		it('requires a function as the first argument.', function () {
			expect(function () {
				[
					'abc',
					123,
					true,
					false,
					[],
					{}
				].forEach(function (firstArg) {
					expect(function () {
						fnx.partial(firstArg)();
					}).to.throw();
				});
				expect(function () {
					fnx.partial(buildChineseName)();
				}).to.not.throw();
			});
		});

		it('uses the n additional arguments as the first n arguments for the specified function.', function () {
			var builtChineseName = buildChineseName('Li', 'Qi', 'Xian');
			expect(fnx.partial(buildChineseName)('Li', 'Qi', 'Xian')).to.equal(builtChineseName);
			expect(fnx.partial(buildChineseName, 'Li')('Qi', 'Xian')).to.equal(builtChineseName);
			expect(fnx.partial(buildChineseName, 'Li', 'Qi')('Xian')).to.equal(builtChineseName);
			expect(fnx.partial(buildChineseName, 'Li', 'Qi', 'Xian')()).to.equal(builtChineseName);
		});
	});
})();
