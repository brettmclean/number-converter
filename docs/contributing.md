## Contributing Code

To contribute to number-converter, clone this repository and install dependencies:
```
git clone https://github.com/brettmclean/number-converter.git
cd number-converter
npm install
```

### Verifying Code

Before pushing any commits, ensure your code meets standards by running:
```
npm run check --silent
```
The output should look similar to:
```
Started
............................................................

60 specs, 0 failures
Finished in 0.050 seconds
```

If any problems are shown in the output, they should be fixed before code changes are committed. This command performs the following three steps.

#### Testing Code

Use `npm test` to run all unit tests in the `spec` directory.

#### Linting Code

Use `npm run lint` to check all code (including unit tests) for constructs which have been known to lead to bugs.

#### Checking Code Style

Use `npm run style` to check that code meets established style standards for this project.
