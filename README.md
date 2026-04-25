# AvatarCrop

> [!WARNING]
> **This branch contains one intentionally failing test.**
> The test `"intentionally failing test"` in `src/app/app.component.spec.ts` uses `expect(true).toBe(false)` and is **designed to fail**. It was added deliberately to verify that the CI pipeline correctly detects test failures and triggers webhook failure-reporting. This is not a broken build — all other tests pass and the application compiles cleanly.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
