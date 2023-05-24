
// THE BEERWARE LICENSE (Revision 42):
// <thenoviceoof> wrote this file. As long as you retain this notice you
// can do whatever you want with this stuff. If we meet some day, and you
// think this stuff is worth it, you can buy me a beer in return

// - 20XX Nathan Hwang (thenoviceoof) -> C code
// - 2022 Affolter Matias -> JS code (Changed some char in the dictionary)

var config = {};
config.TILD_CHAR_CODE = 126;
config.TILD_CHAR_CODE = 126;
config.BACKSLASH_CHAR = String.fromCharCode(92);
config.SLASH_CHAR = String.fromCharCode(47);
config.CHUNCK_LENGTH = 256;
config.MAPPING = [32, 33, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 93, 94, 95, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126];
config.ENCODE_MAPPING = new Uint8Array(256).fill(0);
config.DECODE_MAPPING = new Uint8Array(256).fill(255);
config.MAPPING.forEach(function (char_code, index_char_code){
    config.ENCODE_MAPPING[index_char_code] = char_code & 0xFF;
    config.DECODE_MAPPING[char_code] = index_char_code & 0xFF;
});

var Base92 = function Base92() {
    if (!(this instanceof Base92)) {
        return new Base92();
    }

    this.TILD_CHAR_CODE_ = config.TILD_CHAR_CODE;
    this.BACKSLASH_CHAR_ = config.BACKSLASH_CHAR;
    this.SLASH_CHAR_ = config.SLASH_CHAR;
    this.CHUNCK_LENGTH_ = config.CHUNCK_LENGTH;
    this.ENCODE_MAPPING_ = config.ENCODE_MAPPING;
    this.DECODE_MAPPING_ = config.DECODE_MAPPING;
    return this;
};

Object.defineProperty(Base92.prototype, 'fromCharCodes', {
    get: function get() {
        return function (char_codes) {
            "use strict";
            return String.fromCharCode.apply(null, char_codes);
        };
    },
    enumerable: false,
    configurable: false
});
Object.defineProperty(Base92.prototype, 'decodeChar', {
    get: function get() {
        return function (i) {
            "use strict";
            i = i | 0;
            return this.DECODE_MAPPING_[i | 0] | 0;
        };
    },
    enumerable: false,
    configurable: false
});
Object.defineProperty(Base92.prototype, 'encodeChar', {
    get: function get() {
        return function (i) {
            "use strict";
            i = i | 0;
            return this.ENCODE_MAPPING_[i | 0] | 0;
        };
    },
    enumerable: false,
    configurable: false
});
Object.defineProperty(Base92.prototype, 'BACKSLASH_CHAR', {
    get: function get() {
        "use strict";
        return this.BACKSLASH_CHAR_;
    },
    enumerable: false,
    configurable: false
});
Object.defineProperty(Base92.prototype, 'SLASH_CHAR', {
    get: function get() {
        "use strict";
        return this.SLASH_CHAR_;
    },
    enumerable: false,
    configurable: false
});
Object.defineProperty(Base92.prototype, 'CHUNCK_LENGTH', {
    get: function get() {
        "use strict";
        return this.CHUNCK_LENGTH_;
    },
    enumerable: false,
    configurable: false
});
Object.defineProperty(Base92.prototype, 'TILD_CHAR_CODE', {
    get: function get() {
        "use strict";
        return this.TILD_CHAR_CODE_;
    },
    enumerable: false,
    configurable: false
});

Base92.prototype.encode_string = function (uint8a) {

    "use strict";
    var full_chunck_number = uint8a.length / this.CHUNCK_LENGTH | 0;
    var last_chunck_length = uint8a.length - full_chunck_number * this.CHUNCK_LENGTH | 0;
    var result_string = "";
    var chunk_number = 0;

    for(; (chunk_number|0) < (full_chunck_number|0); chunk_number = chunk_number + 1 | 0) {
        result_string = result_string + this.fromCharCodes(uint8a.subarray(chunk_number*this.CHUNCK_LENGTH|0, (chunk_number+1|0)*this.CHUNCK_LENGTH));
    }

    if((last_chunck_length|0) > 0) {
        result_string = result_string + this.fromCharCodes(uint8a.subarray(chunk_number*this.CHUNCK_LENGTH|0, chunk_number*this.CHUNCK_LENGTH+last_chunck_length));
    }

    return result_string;
}

Base92.prototype.encode = function (uint8a) {

    "use strict";
    var i = 0,
        j = 0; // i for raw, j for encoded
    var input_length = uint8a.length;
    var size = (input_length * 8 | 0) % 13 | 0; // for the malloc
    var workspace = 0; // bits holding bin
    var wssize = 0; // number of good bits in workspace
    var tmp = 0;
    var c = 0;
    if ((uint8a.length | 0) == 0) {

        // BASE92
        return this.encode_string(Uint8Array.of(this.TILD_CHAR_CODE));
    }

    // precalculate how much space we need to malloc
    if ((size | 0) == 0) {
        size = 2 * (input_length * 8 / 13 | 0) | 0;
    } else if ((size | 0) < 7) {
        size = 2 * (input_length * 8 / 13 | 0) + 1 | 0;
    } else {
        size = 2 * (input_length * 8 / 13 | 0) + 2 | 0;
    }

    // do the malloc
    var results = new Uint8Array(size | 0);

    for (; (i | 0) < (input_length | 0); i = (i + 1 | 0) >>> 0) {

        workspace = workspace << 8 | uint8a[i | 0];
        wssize = wssize + 8 | 0;

        if ((wssize | 0) >= 13) {

            tmp = workspace >> (wssize - 13 | 0) & 8191;
            c = this.encodeChar(tmp / 91 | 0) & 0xFF;
            if ((c | 0) == 0) {
                // do something, illegal character
                return null;
            }
            results[j | 0] = c & 0xFF;
            c = this.encodeChar(tmp % 91 | 0) & 0xFF;
            if ((c | 0) == 0) {
                // do something, illegal character;
                return null;
            }
            results[j + 1 | 0] = c & 0xFF;
            j = (j + 2 | 0) >>> 0;
            wssize = wssize - 13 | 0;
        }
    }
    // encode a last byte
    if (0 < (wssize | 0) && (wssize | 0) < 7) {

        tmp = workspace << (6 - wssize | 0) & 63; // pad the right side
        c = this.encodeChar(tmp | 0) & 0xFF;
        if ((c | 0) == 0) {
            // do something, illegal character
            return null;
        }
        results[j | 0] = c & 0xFF;
    } else if (7 <= (wssize | 0)) {

        tmp = workspace << (13 - wssize | 0) & 8191; // pad the right side
        c = this.encodeChar(tmp / 91 | 0);
        if ((c | 0) == 0) {
            // do something, illegal character
            return null;
        }
        results[j | 0] = c & 0xFF;
        j = (j + 1 | 0) >>> 0;
        c = this.encodeChar(tmp % 91 | 0) & 0xFF;
        if ((c | 0) == 0) {
            // do something, illegal character
            return null;
        }
        results[j | 0] = c & 0xFF;
    }

    return this.encode_string(results);
};
Base92.prototype.decode = function (string) {

    "use strict";
    var i = 0,
        j = 0,
        b1 = 0,
        b2 = 0;
    var input_length = string.length;
    var workspace = 0;
    var wssize = 0;
    // calculate size
    var size = (input_length / 2 * 13 + input_length % 2 * 6) / 8 | 0;
    var res = new Uint8Array(size);

    // handle small cases first
    if ((string.charCodeAt(0) - this.TILD_CHAR_CODE | 0) == 0 || (input_length | 0) == 0) {
        return Uint8Array.of(this.TILD_CHAR_CODE);
    }

    // this case does not fit the specs
    if ((input_length | 0) < 2) {
        return Uint8Array.of();
    }

    // handle pairs of chars
    workspace = 0;
    wssize = 0;
    j = 0;
    for (i = 0; (i + 1 | 0) < (input_length | 0); i = (i + 2 | 0) >>> 0) {

        b1 = this.decodeChar(string.charCodeAt(i | 0));
        b2 = this.decodeChar(string.charCodeAt(i + 1 | 0));

        workspace = workspace << 13 | (Math.imul(b1, 91) + b2 | 0);
        wssize = wssize + 13 | 0;
        while ((wssize | 0) >= 8) {
            res[j | 0] = workspace >> wssize - 8 & 0xFF;
            j = j + 1 | 0;
            wssize = wssize - 8 | 0;
        }
    }
    // handle single char
    if ((input_length % 2 | 0) == 1) {
        workspace = workspace << 6 | this.decodeChar(string.charCodeAt(input_length - 1 | 0));
        wssize = wssize + 6 | 0;
        while ((wssize | 0) >= 8) {
            res[j | 0] = workspace >> wssize - 8 & 0xFF;
            j = j + 1 | 0;
            wssize = wssize - 8 | 0;
        }
    }
    return res;
};

if(typeof module != "undefined") {
    module.exports = Base92;
}else {
    window.Base92 = Base92;
}