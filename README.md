# **UTARi Accommodation Common Functions and Types**

This is the repository that holds that commonly used functions and types of client and server of UTARi to avoid code duplications

It emulates the design of a NPM package so that it can be installed as NPM package for both client and server of UTARi

## Tech Used

| Aspect                                                                 | Name           |
| ---------------------------------------------------------------------- | -------------- |
| Development Language                                                   | TypeScipt      |
| Scripting Language                                                     | JavaScript     |
| Bundling                                                               | Esbuild        |
| Testing                                                                | Jest           |
| Run-time Environment                                                   | NodeJS         |
| Build Automation Tool                                                  | Make           |
| Text Editor                                                            | NeoVim         |
| Dependency Management                                                  | Yarn           |
| Continuous Integration, Continuous Delivery, and Continuous Deployment | GitHub Actions |

#### Install Dependencies

1. Run `yarn` to install all dependencies, preferably `yarn install --frozen-lockfile`

#### Make Commands

_*Below are the listed commands that you can use to build/develop/test this app*_

| Command           | Usage                                             |
| ----------------- | ------------------------------------------------- |
| make start        | Start development                                 |
| make test         | Run all test code                                 |
| make build        | Bundle and build the app                          |
| make typecheck    | Run typechecking for source code                  |
| make lint         | Run linter for source and test code               |
| make format-check | Run prettier to check source and test code format |
| make format       | Run prettier to format source and test code       |
| make install      | Install all dependencies                          |
