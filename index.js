
// THE BEERWARE LICENSE (Revision 42):
// <thenoviceoof> wrote this file. As long as you retain this notice you
// can do whatever you want with this stuff. If we meet some day, and you
// think this stuff is worth it, you can buy me a beer in return

// - 20XX Nathan Hwang (thenoviceoof) -> C code
// - 2022 Affolter Matias -> JS code (Changed some char in the dictionary)
var Base64 = (function (){

    var config = {};
    config.MEMORY_LENGTH = 8192*2;
    config.Base64ABCCC = Uint8Array.of(65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47);
    config.CHUNCK_LENGTH = 256;
    config.B64EC = 255;
    config.B64C = Uint8Array.of(255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 62, 255, 255, 255, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 255, 255, 255, 0, 255, 255, 255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 255, 255, 255, 255, 255, 255, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51);
    config.B64CL = 123;

    var Base64 = function Base64() {
        if (!(this instanceof Base64)) {
            return new Base64();
        }
        this.CHUNCK_LENGTH_ = config.CHUNCK_LENGTH;
        this.Base64ABCCC_ = config.Base64ABCCC;
        this.B64C_ = config.B64C;
        this.B64EC_ = config.B64EC;
        this.B64CL_ = config.B64CL;
        this.MEMORY_LENGTH_ = config.MEMORY_LENGTH;
        this.TEXT_DECODER_ = new TextDecoder();
        this.TEXT_ENCODER_ = new TextEncoder();
        this.memory_ = new Uint8Array(this.MEMORY_LENGTH_);
    };
    Object.defineProperty(Base64.prototype, 'CHUNCK_LENGTH', {
        get: function get() {
            "use strict";
            return this.CHUNCK_LENGTH_ | 0;
        }
    });
    Object.defineProperty(Base64.prototype, 'Base64ABCCC_E', {
        get: function get() {
            return function (i) {
                "use strict";
                return this.Base64ABCCC_[i | 0] & 0xFF;
            };
        }
    });
    Object.defineProperty(Base64.prototype, 'B64C_E', {
        get: function get() {
            return function (i) {
                "use strict";
                return this.B64C_[i | 0] & 0xFF;
            };
        }
    });
    Object.defineProperty(Base64.prototype, 'B64EC', {
        get: function get() {
            "use strict";
            return this.B64EC_ | 0;
        }
    });
    Object.defineProperty(Base64.prototype, 'B64CL', {
        get: function get() {
            "use strict";
            return this.B64CL_ | 0;
        }
    });
    Object.defineProperty(Base64.prototype, 'encodeText', {
        get: function get() {
            return function (input) {
                "use strict";
                return this.TEXT_ENCODER_.encode(input)
            };
        },
        enumerable: false,
        configurable: false
    });
    Object.defineProperty(Base64.prototype, 'decodeText', {
        get: function get() {
            return function (input) {
                "use strict";
                return this.TEXT_DECODER_.decode(input)
            };
        },
        enumerable: false,
        configurable: false
    });
    Object.defineProperty(Base64.prototype, 'maybeExtendMemory', {
        get: function get() {
            return function (needed_size) {
                "use strict";
                needed_size = (needed_size | 0) >>> 0;
                this.memory_ = new Uint8Array(needed_size + (needed_size & this.MEMORY_LENGTH_) | 0);

            };
        },
        enumerable: false,
        configurable: false
    });
    Object.defineProperty(Base64.prototype, 'setMemory', {
        get: function get() {
            return function (index, value) {
                "use strict";
                this.memory_[(index | 0) >>> 0] = (value | 0) & 0xFF;
            };
        },
        enumerable: false,
        configurable: false
    });

    Object.defineProperty(Base64.prototype, 'getMemorySubarray', {
        get: function get() {
            return function (start, stop) {
                "use strict";
                start = (start | 0) >>> 0;
                stop = (stop | 0) >>> 0;
                return this.memory_.subarray(start|0, stop|0);
            };
        },
        enumerable: false,
        configurable: false
    });

    Object.defineProperty(Base64.prototype, 'getMemorySlice', {
        get: function get() {
            return function (start, stop) {
                "use strict";
                start = (start | 0) >>> 0;
                stop = (stop | 0) >>> 0;
                return this.memory_.slice(start|0, stop|0);
            };
        },
        enumerable: false,
        configurable: false
    });

    Object.defineProperty(Base64.prototype, 'setMemoryUint8a', {
        get: function get() {
            return function (index, uint8x16) {
                "use strict";
                this.memory_.set(uint8x16, (index | 0) >>> 0);
            };
        },
        enumerable: false,
        configurable: false
    });
    Base64.prototype.encode_string = function (j) {

        "use strict";
        return this.decodeText(this.getMemorySubarray(0, j|0));
    }
    Base64.prototype.encode = function (uint8a) {
        "use strict";

        var i = 2,
            j = 0;
        var l = uint8a.length | 0;
        var k = l % 3 | 0;
        //var n = Math.floor(l / 3) * 4 + (k && k + 1) | 0;
        var N = Math.ceil(l / 3) * 4 | 0;
        this.maybeExtendMemory(N);
        for (i = 2, j = 0; (i | 0) < (l | 0); i = (i + 3 | 0) >>> 0, j = (j + 4 | 0) >>> 0) {
            this.setMemoryUint8a(j | 0, Uint8Array.of(this.Base64ABCCC_E(uint8a[i - 2 | 0] >> 2) & 0xFF, this.Base64ABCCC_E((uint8a[i - 2 | 0] & 0x03) << 4 | uint8a[i - 1 | 0] >> 4) & 0xFF, this.Base64ABCCC_E((uint8a[i - 1 | 0] & 0x0F) << 2 | uint8a[i] >> 6) & 0xFF, this.Base64ABCCC_E(uint8a[i | 0] & 0x3F) & 0xFF));
        }
        if ((i | 0) == (l + 1 | 0)) {
            // 1 octet yet to write
            this.setMemory(j | 0, this.Base64ABCCC_E(uint8a[i - 2 | 0] >> 2) & 0xFF);
            this.setMemory(j + 1 | 0, this.Base64ABCCC_E((uint8a[i - 2 | 0] & 0x03) << 4) & 0xFF);
            this.setMemory(j + 2 | 0,  "=".charCodeAt(0) & 0xFF);
            this.setMemory(j + 3 | 0,  "=".charCodeAt(0) & 0xFF);
            j = (j + 4 | 0) >>> 0;
        }
        if ((i | 0) == (l | 0)) {
            this.setMemory(j | 0, this.Base64ABCCC_E(uint8a[i - 2 | 0] >> 2) & 0xFF);
            this.setMemory(j + 1 | 0, this.Base64ABCCC_E((uint8a[i - 2 | 0] & 0x03) << 4 | uint8a[i - 1 | 0] >> 4) & 0xFF);
            this.setMemory(j + 2 | 0, this.Base64ABCCC_E((uint8a[i - 1 | 0] & 0x0F) << 2) & 0xFF);
            this.setMemory(j + 3 | 0, "=".charCodeAt(0) & 0xFF);
            j = (j + 4 | 0) >>> 0;
        }

        return this.encode_string(j|0)
    };
    Base64.prototype._getBase64CodesBufferResults = function (buffer) {
        "use strict";
        return Uint8Array.of(buffer >> 16 & 0xFF, buffer >> 8 & 0xFF, buffer & 0xFF);
    };
    Base64.prototype._getBase64CodesBufferResultsBy4 = function (buffer_1, buffer_2, buffer_3, buffer_4, array) {
        "use strict";
        array[0] = buffer_1 >> 16 & 0xFF;
        array[1] = buffer_1 >> 8 & 0xFF;
        array[2] = buffer_1 & 0xFF;
        array[3] = buffer_2 >> 16 & 0xFF;
        array[4] = buffer_2 >> 8 & 0xFF;
        array[5] = buffer_2 & 0xFF;
        array[6] = buffer_3 >> 16 & 0xFF;
        array[7] = buffer_3 >> 8 & 0xFF;
        array[8] = buffer_3 & 0xFF;
        array[9] = buffer_4 >> 16 & 0xFF;
        array[10] = buffer_4 >> 8 & 0xFF;
        array[11] = buffer_4 & 0xFF;
        return array;
    };
    Base64.prototype._getBase64Code = function (char_code) {
        "use strict";
        char_code = (char_code | 0) & 0xFF;
        if ((char_code | 0) >>> 0 >= (this.B64CL | 0) >>> 0) {
            throw new Error("Unable to parse base64 string.");
        }
        var code = (this.B64C_E(char_code | 0) | 0) >>> 0;
        if ((code | 0) >>> 0 == (this.B64EC | 0) >>> 0) {
            throw new Error("Unable to parse base64 string.");
        }
        return (code | 0) & 0xFF;
    };
    Base64.prototype._getBase64CodesBuffer = function (str_char_codes) {
        "use strict";
        return (this._getBase64Code(str_char_codes[0]) << 18 | this._getBase64Code(str_char_codes[1]) << 12 | this._getBase64Code(str_char_codes[2]) << 6 | this._getBase64Code(str_char_codes[3]) | 0) >>> 0;
    };
    Base64.prototype.decode = function (str, copy_memory) {
        "use strict";
        copy_memory = typeof copy_memory == "undefined" ? 0: (copy_memory | 0) & 1;
        if ((str.length % 4 | 0) > 0) {
            throw new Error("Unable to parse base64 string.");
        }
        var index = str.indexOf("=") | 0;
        if ((index | 0) > -1 && (index | 0) < (str.length - 2 | 0)) {
            throw new Error("Unable to parse base64 string.");
        }


        var str_char_code = this.encodeText(str);
        var missingOctets = str.endsWith("==") ? 2 : str.endsWith("=") ? 1 : 0,
            n = str.length | 0,
            size = 3 * (n / 4) | 0;

        this.maybeExtendMemory(size);
        var str_char_code_splitted = new Uint8Array(16);
        var temp_array = new Uint8Array(12);
        var i = 0,
            j = 0;
        for (; (i + 16 | 0) < (n | 0); i = (i + 16 | 0) >>> 0, j = (j + 12 | 0) >>> 0) {
            // Single Operation Multiple Data (SIMD) up to 3x faster

            str_char_code_splitted.set(str_char_code.subarray(i | 0, i + 16 | 0));
            this.setMemoryUint8a(j | 0, this._getBase64CodesBufferResultsBy4(this._getBase64CodesBuffer(str_char_code_splitted.subarray(0, 4)), this._getBase64CodesBuffer(str_char_code_splitted.subarray(4, 8)), this._getBase64CodesBuffer(str_char_code_splitted.subarray(8, 12)), this._getBase64CodesBuffer(str_char_code_splitted.subarray(12, 16)), temp_array));
        }
        for (; (i | 0) < (n | 0); i = (i + 4 | 0) >>> 0, j = (j + 3 | 0) >>> 0) {
            // Single Operation Single Data (normal)
            this.setMemoryUint8a(j | 0, this._getBase64CodesBufferResults(this._getBase64CodesBuffer(str_char_code.subarray(i | 0, i + 4 | 0))));
        }

        return (copy_memory|0) > 0 ? this.getMemorySlice(0, size - missingOctets | 0): this.getMemorySubarray(0, size - missingOctets | 0);
    };

    return Base64;
})();

var Base92 = (function (){
    var config = {};
    config.TILD_CHAR_CODE = 126;
    config.TILD_CHAR_CODE = 126;
    config.BACKSLASH_CHAR = String.fromCharCode(92);
    config.SLASH_CHAR = String.fromCharCode(47);
    config.CHUNCK_LENGTH = 512;
    config.CHUNCK_LENGTH_BIT_N = 9;
    config.MEMORY_LENGTH = 8192*2;
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
        this.MEMORY_LENGTH_ = config.MEMORY_LENGTH;
        this.CHUNCK_LENGTH_ = config.CHUNCK_LENGTH;
        this.CHUNCK_LENGTH_BIT_N_ = config.CHUNCK_LENGTH_BIT_N_;
        this.ENCODE_MAPPING_ = config.ENCODE_MAPPING;
        this.DECODE_MAPPING_ = config.DECODE_MAPPING;
        this.TEXT_DECODER_ = new TextDecoder();
        this.memory_ = new Uint8Array(this.MEMORY_LENGTH_);
        return this;
    };

    Object.defineProperty(Base92.prototype, 'decodeText', {
        get: function get() {
            return function (input) {
                "use strict";
                return this.TEXT_DECODER_.decode(input)
            };
        },
        enumerable: false,
        configurable: false
    });
    Object.defineProperty(Base92.prototype, 'maybeExtendMemory', {
        get: function get() {
            return function (needed_size) {
                "use strict";
                needed_size = (needed_size | 0) >>> 0;
                this.memory_ = new Uint8Array(needed_size + (needed_size & this.MEMORY_LENGTH_) | 0);
            };
        },
        enumerable: false,
        configurable: false
    });

    Object.defineProperty(Base92.prototype, 'setMemory', {
        get: function get() {
            return function (index, value) {
                "use strict";
                this.memory_[(index | 0) >>> 0] = (value | 0) & 0xFF;
            };
        },
        enumerable: false,
        configurable: false
    });

    Object.defineProperty(Base92.prototype, 'getMemorySubarray', {
        get: function get() {
            return function (start, stop) {
                "use strict";
                start = (start | 0) >>> 0;
                stop = (stop | 0) >>> 0;
                return this.memory_.subarray(start|0, stop|0);
            };
        },
        enumerable: false,
        configurable: false
    });

    Object.defineProperty(Base92.prototype, 'getMemorySlice', {
        get: function get() {
            return function (start, stop) {
                "use strict";
                start = (start | 0) >>> 0;
                stop = (stop | 0) >>> 0;
                return this.memory_.slice(start|0, stop|0);
            };
        },
        enumerable: false,
        configurable: false
    });

    Object.defineProperty(Base92.prototype, 'setMemory128bits', {
        get: function get() {
            return function (index, uint8x16) {
                "use strict";
                this.memory_.set(uint8x16, (index | 0) >>> 0);
            };
        },
        enumerable: false,
        configurable: false
    });

    Object.defineProperty(Base92.prototype, 'decode128bitsChars', {
        get: function get() {
            return function (b) {
                "use strict";
                b[0] = this.DECODE_MAPPING_[b[0] | 0] & 0xFF;
                b[1] = this.DECODE_MAPPING_[b[1] | 0] & 0xFF;
                b[2] = this.DECODE_MAPPING_[b[2] | 0] & 0xFF;
                b[3] = this.DECODE_MAPPING_[b[3] | 0] & 0xFF;
                b[4] = this.DECODE_MAPPING_[b[4] | 0] & 0xFF;
                b[5] = this.DECODE_MAPPING_[b[5] | 0] & 0xFF;
                b[6] = this.DECODE_MAPPING_[b[6] | 0] & 0xFF;
                b[7] = this.DECODE_MAPPING_[b[7] | 0] & 0xFF;
                b[8] = this.DECODE_MAPPING_[b[8] | 0] & 0xFF;
                b[9] = this.DECODE_MAPPING_[b[9] | 0] & 0xFF;
                b[10] = this.DECODE_MAPPING_[b[10] | 0] & 0xFF;
                b[11] = this.DECODE_MAPPING_[b[11] | 0] & 0xFF;
                b[12] = this.DECODE_MAPPING_[b[12] | 0] & 0xFF;
                b[13] = this.DECODE_MAPPING_[b[13] | 0] & 0xFF;
                b[14] = this.DECODE_MAPPING_[b[14] | 0] & 0xFF;
                b[15] = this.DECODE_MAPPING_[b[15] | 0] & 0xFF;
            };
        },
        enumerable: false,
        configurable: false
    });
    Object.defineProperty(Base92.prototype, 'decode128bitsString', {
        get: function get() {
            return function (b, string, i) {
                "use strict";
                b[0] = string.charCodeAt(i | 0) & 0xFF;
                b[1] = string.charCodeAt(i + 1 | 0) & 0xFF;
                b[2] = string.charCodeAt(i + 2 | 0) & 0xFF;
                b[3] = string.charCodeAt(i + 3 | 0) & 0xFF;
                b[4] = string.charCodeAt(i + 4 | 0) & 0xFF;
                b[5] = string.charCodeAt(i + 5 | 0) & 0xFF;
                b[6] = string.charCodeAt(i + 6 | 0) & 0xFF;
                b[7] = string.charCodeAt(i + 7 | 0) & 0xFF;
                b[8] = string.charCodeAt(i + 8 | 0) & 0xFF;
                b[9] = string.charCodeAt(i + 9 | 0) & 0xFF;
                b[10] = string.charCodeAt(i + 10 | 0) & 0xFF;
                b[11] = string.charCodeAt(i + 11 | 0) & 0xFF;
                b[12] = string.charCodeAt(i + 12 | 0) & 0xFF;
                b[13] = string.charCodeAt(i + 13 | 0) & 0xFF;
                b[14] = string.charCodeAt(i + 14 | 0) & 0xFF;
                b[15] = string.charCodeAt(i + 15 | 0) & 0xFF;
                return b;
            };
        },
        enumerable: false,
        configurable: false
    });
    Object.defineProperty(Base92.prototype, 'decodeChar', {
        get: function get() {
            return function (i) {
                "use strict";
                return (this.DECODE_MAPPING_[(i | 0) >>> 0] | 0) >>> 0;
            };
        },
        enumerable: false,
        configurable: false
    });
    Object.defineProperty(Base92.prototype, 'encodeChar', {
        get: function get() {
            return function (i) {
                "use strict";
                return (this.ENCODE_MAPPING_[(i | 0) >>> 0] | 0) >>> 0;
            };
        },
        enumerable: false,
        configurable: false
    });
    Object.defineProperty(Base92.prototype, 'BACKSLASH_CHAR', {
        get: function get() {
            "use strict";
            return this.BACKSLASH_CHAR_ | 0;
        },
        enumerable: false,
        configurable: false
    });
    Object.defineProperty(Base92.prototype, 'SLASH_CHAR', {
        get: function get() {
            "use strict";
            return this.SLASH_CHAR_ | 0;
        },
        enumerable: false,
        configurable: false
    });
    Object.defineProperty(Base92.prototype, 'CHUNCK_LENGTH', {
        get: function get() {
            "use strict";
            return this.CHUNCK_LENGTH_ | 0;
        },
        enumerable: false,
        configurable: false
    });
    Object.defineProperty(Base92.prototype, 'CHUNCK_LENGTH_BIT_N', {
        get: function get() {
            "use strict";
            return this.CHUNCK_LENGTH_BIT_N_ | 0;
        },
        enumerable: false,
        configurable: false
    });
    Object.defineProperty(Base92.prototype, 'TILD_CHAR_CODE', {
        get: function get() {
            "use strict";
            return this.TILD_CHAR_CODE_ | 0;
        },
        enumerable: false,
        configurable: false
    });

    Base92.prototype.encode_string = function (j) {

        "use strict";
        return this.decodeText(this.getMemorySubarray(0, j|0));
    }


    Object.defineProperty(Base92.prototype, 'computeDoubleChar', {
        get: function get() {
            return function (tmp, c_uint8x16, c_uint8x16_i) {
                "use strict";
                tmp = (tmp | 0) >>> 0;
                var quotient = Math.floor(tmp / 91);
                var remainder = tmp % 91;
                c_uint8x16[(c_uint8x16_i | 0) >>> 0] = this.ENCODE_MAPPING_[quotient] & 0xFF;
                c_uint8x16[(c_uint8x16_i + 1 | 0) >>> 0] = this.ENCODE_MAPPING_[remainder] & 0xFF;
            };
        },
        enumerable: false,
        configurable: false
    });

    Base92.prototype.encode = function (uint8a) {

        "use strict";
        var i = 0,
            j = 0,
            j0 = j|0; // i for raw, j for encoded
        var input_length = uint8a.length | 0;
        var input_length_less_33 = (input_length|0) < 33 ? 0: (input_length - 33 | 0) >>> 0;
        var size = (input_length * 8 | 0) % 13 | 0; // for the malloc
        var workspace = 0; // bits holding bin
        var wssize = 0; // number of good bits in workspace
        var tmp = 0;


        var nums = Uint32Array.of(i, j, j0, workspace, wssize, tmp, input_length_less_33, input_length, 0, 0, 0, 0)
        var c_uint8x16 = new Uint8Array(64),
            c_uint8x161 = c_uint8x16.subarray(0, 16),
            c_uint8x162 = c_uint8x16.subarray(16, 32),
            c_uint8x163 = c_uint8x16.subarray(32, 48),
            c_uint8x164 = c_uint8x16.subarray(48, 64);

        if ((uint8a.length | 0) == 0) {

            // BASE92
            this.setMemory(0, this.TILD_CHAR_CODE);
            return this.encode_string(1);
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
        this.maybeExtendMemory(size);
        var computeDoubleChar = this.computeDoubleChar.bind(this);
        function compute_all(c_uint8x160){
            "use strict";
            compute(c_uint8x160, 0);
            compute(c_uint8x160, 1);
            compute(c_uint8x160, 2);
            compute(c_uint8x160, 3);
            compute(c_uint8x160, 4);
            compute(c_uint8x160, 5);
            compute(c_uint8x160, 6);
            compute(c_uint8x160, 7);
            nums[0] = (nums[0] + 8 | 0) >>> 0;
        }
        function compute(c_uint8x160, x){
            "use strict";
            nums[3] = (nums[3] << 8 | uint8a[nums[0]+x|0] | 0) >>> 0;
            nums[4] = (nums[4] + 8 | 0) >>> 0;
            if((nums[4] | 0) >= 13) {
                nums[4] = (nums[4] - 13 | 0) >>> 0;
                computeDoubleChar(nums[3] >> nums[4] & 8191, c_uint8x160, nums[1] - nums[2]|0);
                nums[1] = (nums[1] + 2 | 0) >>> 0;
            }
        }

        // Faster batch processing
        for (; nums[0] < nums[6];) {

            nums[2] = nums[1];
            nums[8] = nums[1];
            compute_all(c_uint8x161);

            nums[2] = nums[1];
            nums[9] = nums[1];
            compute_all(c_uint8x162);

            nums[2] = nums[1];
            nums[10] = nums[1];
            compute_all(c_uint8x163);

            nums[2] = nums[1];
            nums[11] = nums[1];
            compute_all(c_uint8x164);

            this.setMemory128bits(nums[8], c_uint8x161);
            this.setMemory128bits(nums[9], c_uint8x162);
            this.setMemory128bits(nums[10], c_uint8x163);
            this.setMemory128bits(nums[11], c_uint8x164);
        }

        // Slower single instruction processing
        for (; nums[0] < nums[7]; nums[0] = (nums[0] + 1 | 0) >>> 0) {

            nums[3] = (nums[3] << 8 | uint8a[nums[0]]) >>> 0;
            nums[4] = (nums[4] + 8 | 0) >>> 0;
            if ((nums[4] | 0) >= 13) {
                nums[5] = nums[3] >> (nums[4] - 13 | 0) & 8191;
                this.setMemory(nums[1] | 0, this.encodeChar(nums[5] / 91 | 0) & 0xFF);
                this.setMemory(nums[1] + 1 | 0, this.encodeChar(nums[5] % 91 | 0) & 0xFF);
                nums[1] = (nums[1] + 2 | 0) >>> 0;
                nums[4] = nums[4] - 13 | 0;
            }
        }

        // encode a last byte
        if (0 < (nums[4] | 0) && (nums[4] | 0) < 7) {
            nums[5] = nums[3] << (6 - nums[4] | 0) & 63; // pad the right side
            this.setMemory(nums[1] | 0, this.encodeChar(nums[5] | 0) & 0xFF);
            nums[1] = (nums[1] + 1 | 0) >>> 0;
        } else if (7 <= (nums[4] | 0)) {
            nums[5] = nums[3] << (13 - nums[4] | 0) & 8191; // pad the right side
            this.setMemory(nums[1] | 0, this.encodeChar(nums[5] / 91 | 0));
            this.setMemory(nums[1]+1 | 0, this.encodeChar(nums[5] % 91 | 0) & 0xFF);
            nums[1] = (nums[1] + 2 | 0) >>> 0;
        }

        return this.encode_string(nums[1]);
    };
    Base92.prototype.decode = function (string, copy_memory) {
        "use strict";

        string|0;

        copy_memory = typeof copy_memory == "undefined" ? 0: (copy_memory | 0) & 1;
        var i = 0,
            j = 0,
            workspace = 0,
            wssize = 0,
            b = new Uint8Array(64),
            b1 = b.subarray(0, 16),
            b2 = b.subarray(16, 32),
            b3 = b.subarray(32, 48),
            b4 = b.subarray(48, 64),
            mathimul = Math.imul;

        // calculate size
        var input_length = string.length;
        var input_length_less_65 = input_length - 65 | 0;
        var size = (input_length * 13 + (input_length % 2) * 6) / 8 | 0;
        this.maybeExtendMemory(size);

        // handle small cases first
        if ((string.charCodeAt(0) - this.TILD_CHAR_CODE | 0) == 0 || (input_length | 0) == 0) {
            return Uint8Array.of(this.TILD_CHAR_CODE);
        }

        // this case does not fit the specs
        if ((input_length | 0) < 2) {
            return Uint8Array.of();
        }

        var setMemory = this.setMemory.bind(this);

        function compute_all(b0){
            "use strict";
            compute(b0, 0);
            compute(b0, 2);
            compute(b0, 4);
            compute(b0, 6);
            compute(b0, 8);
            compute(b0, 10);
            compute(b0, 12);
            compute(b0, 14);
        }
        function compute(b0, x){
            "use strict";
            workspace = workspace << 13 | (mathimul(b0[x|0], 91) + b0[x+1|0] | 0);
            wssize = (wssize + 13 | 0) >>> 0;
            while ((wssize | 0) >= 8) {
                setMemory(j|0, workspace >> wssize - 8 & 0xFF);
                j = (j + 1 | 0) >>> 0;
                wssize = (wssize - 8 | 0) >>> 0;
            }
        }

        for (; (i | 0) < (input_length_less_65 | 0); i = (i + 64 | 0) >>> 0) {

            this.decode128bitsChars(this.decode128bitsString(b1, string, i|0));
            this.decode128bitsChars(this.decode128bitsString(b2, string, i+16|0));
            this.decode128bitsChars(this.decode128bitsString(b3, string, i+32|0));
            this.decode128bitsChars(this.decode128bitsString(b4, string, i+48|0));
            compute_all(b1);
            compute_all(b2);
            compute_all(b3);
            compute_all(b4);
        }

        for (; (i|0) < (input_length - 1 | 0); i = (i + 2 | 0) >>> 0) {

            b1[0] = this.decodeChar(string.charCodeAt(i | 0));
            b1[1] = this.decodeChar(string.charCodeAt(i + 1 | 0));

            workspace = workspace << 13 | (mathimul(b1[0], 91) + b1[1] | 0);
            wssize = (wssize + 13 | 0) >>> 0;
            while ((wssize | 0) >= 8) {
                this.setMemory(j|0, workspace >> wssize - 8 & 0xFF);
                j = (j + 1 | 0) >>> 0;
                wssize = (wssize - 8 | 0) >>> 0;
            }
        }
        // handle single char
        if ((input_length % 2) == 1) {
            workspace = workspace << 6 | this.decodeChar(string.charCodeAt(input_length - 1 | 0));
            wssize = (wssize + 6 | 0) >>> 0;
            while ((wssize | 0) >= 8) {
                this.setMemory(j|0, workspace >> wssize - 8 & 0xFF);
                j = (j + 1 | 0) >>> 0;
                wssize = (wssize - 8 | 0) >>> 0;
            }
        }
        return (copy_memory|0) > 0 ? this.getMemorySlice(0, j|0): this.getMemorySubarray(0, j|0);
    };
    return Base92;
})();
/*
window.Base92 = Base92;
window.Base64 = Base64;
*/
if("module" in window){
    module.exports = {Base92: Base92, Base64: Base64};
}

