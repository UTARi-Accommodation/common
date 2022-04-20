## declare PHONY
.PHONY: build test

NODE_BIN=node_modules/.bin/

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
format:
	$(prettier) --write src/

format-check:
	$(prettier) --check src/

## lint
lint-src:
	$(NODE_BIN)eslint src/** -f='stylish' --color
