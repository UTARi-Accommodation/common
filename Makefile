## declare PHONY
.PHONY: build test

## type check
tsc=node_modules/.bin/tsc
transpile:
	$(tsc) -p tsconfig.json $(arguments) 

typecheck:
	make transpile arguments=--noEmit

## build
build:
	make transpile && node_modules/.bin/ts-add-js-extension add --dir=build

## publish
publish:
	@read -p "What is your commit message: " COMMIT &&\
		make build && git add . && git commit -m "$${COMMIT}" && git push

## test
test:
	node_modules/.bin/esbuild test/index.ts --bundle --minify --target=node16.3.1 --platform=node --outfile=__test__/index.test.js &&\
		node_modules/.bin/jest __test__

## format
prettier=node_modules/.bin/prettier
format:
	$(prettier) --write src/

format-check:
	$(prettier) --check src/

## lint
lint-src:
	node_modules/.bin/eslint src/** -f='stylish' --color
