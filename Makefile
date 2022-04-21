## declare PHONY
.PHONY: build test

NODE_BIN=node_modules/.bin/

all:
	make lint &&\
		make typecheck &&\
		make format-check &&\
		make test &&\
		make build

## type check
tsc=$(NODE_BIN)tsc
transpile:
	$(tsc) -p tsconfig.json $(arguments) 

typecheck:
	make transpile arguments=--noEmit

## build
prebuild:
	rm -rf build
build: prebuild
	make transpile && $(NODE_BIN)ts-add-js-extension add --dir=build

## test
test:
	$(NODE_BIN)esbuild test/index.ts --bundle --minify --target=node16.3.1 --platform=node --outfile=__test__/index.test.js &&\
		$(NODE_BIN)jest __test__

## format
prettier=$(NODE_BIN)prettier
prettier=$(NODE_BIN)prettier
prettify-src:
	$(prettier) --$(type) src/

prettify-test:
	$(prettier) --$(type) test/

format-check:
	(trap 'kill 0' INT; make prettify-src type=check & make prettify-test type=check)

format:
	(trap 'kill 0' INT; make prettify-src type=write & make prettify-test type=write)

## lint
eslint:
	$(NODE_BIN)eslint $(folder)/** -f='stylish' --color
lint-src:
	make eslint folder=src

lint-test:
	make eslint folder=test

lint:
	(trap 'kill 0' INT; make lint-src & make lint-test)
