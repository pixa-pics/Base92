# Base92 JavaScript Encoder and Decoder

The `Base92` JavaScript module provides methods to encode and decode data using a base92 encoding scheme. It is not faster than base64 but it provides a more space-efficient result in UTF-8 or UTF-16 source code strings, making it useful for all kinds of inline data in source code.

The module is minified and has a footprint of just 4 kB, and requires no dependencies. This makes it an easy and lightweight solution for your encoding needs.

## Installation

Since this module is provided as an npm package, you can install it using npm:

```bash
npm install base92
```

## Usage

Import the module into your JavaScript code:

```javascript
var Base92 = require('base92');
```

### Encoding

To encode data, create an instance of the `Base92` class and use the encode method. This method takes a Uint8Array` as input:


```javascript
var data = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
var base92 = new Base92();
var encodedData = base92.encode(data);
console.log(encodedData);
```

### Decoding

To `decode data, use the decode method of the `Base92` class instance. This method takes a string as input:

```javascript
var decodedData = base92.decode(encodedData);
console.log(decodedData);
```

## License

THE BEERWARE LICENSE (Revision 42):