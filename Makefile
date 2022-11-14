## declare PHONY
.PHONY: build test
MAKEFLAGS += --silent

NODE_BIN=node_modules/.bin/

all:
	make lint &&\
		make typecheck &&\
		make format-check &&\
		make test &&\
		make build

## install
install:
	yarn install --frozen-lockfile

## type check
tsc=$(NODE_BIN)tsc
typecheck:
	$(tsc) -p tsconfig.json --noEmit $(arguments) 

typecheck-watch:
	make typecheck arguments=--watch

## build
prebuild:
	rm -rf build
build: prebuild
	$(tsc) -p tsconfig.build.json && $(NODE_BIN)ts-add-js-extension add --dir=build

## test
test:
	$(NODE_BIN)vitest

## format
prettier=$(NODE_BIN)prettier
prettify:
	$(prettier) --$(type) src/ test/

format-check:
	make prettify type=check

format:
	make prettify type=write

## lint
lint:
	$(NODE_BIN)eslint src/ test/ -f='stylish' --color
