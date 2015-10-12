## Using from Command line

Number-converter can be used from the command-line. To install, run as root:
```
npm install -g number-converter
```

#### Basic Usage

To convert from binary to roman numerals, run:

```
number-converter --from binary --to roman 1000100
```

This outputs
```
LXVIII
```
to the console.

For more details, run:
```
number-converter --help
```

#### Command Line Number Types

The following number types can be passed as arguments to the `--from` and `--to` options:

* roman
* binary
* octal
* decimal
* hexadecimal
* scientific

If a `--from` or `--to` option is not provided, it will default to using decimal.

#### Batch Convert Numbers

Multiple numbers can be passed at once as command line arguments. They will be converted and output in order. Running
```
number-converter --to roman 1 6 9 49
```
outputs
```
I
VI
IX
XLIX
```

#### Piping Numbers

A stream of numbers can be piped into number-converter and conversion will be performed and output on the fly.

Suppose we have a file containing a list of years written in decimal numbers.

**years_decimal.txt**
```
1952
1969
1972
1986
1999
2000
2015
```

Running
```
cat years_decimal.txt | number-converter --to roman
```
will output
```
MCMLII
MCMLXIX
MCMLXXII
MCMLXXXVI
MCMXCIX
MM
MMXV
```

The output of number-converter can be piped into other commands or redirected to a file.
