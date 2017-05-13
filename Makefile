check: lint test

lint:
	./node_modules/.bin/jshint *.js test

test:
	./node_modules/.bin/mocha --recursive

.PHONY: check lint test
