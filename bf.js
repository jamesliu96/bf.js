/*!
 * BF.JS v0.3.2
 * Copyright (C) 2014 James Liu
 * github.com/jamesliu96/bf.js
 **/

function BF() {
    this.code = arguments[0];
    this.command = this.code.split("");
    this.memory = [0];
    this.position = 0;
}

BF.version = BF.__version__ = "0.3.2";

BF.map = {
    add: "+",
    subtract: "-",
    forward: ">",
    backward: "<",
    open: "[",
    close: "]",
    output: ".",
    input: ","
};

BF.write = console.log;

BF.toChar = function () {
    return String.fromCharCode(arguments[0]);
};

BF.prototype.run = function () {
    this.__reset__();
    BF.write(this.__parse__());
};

BF.prototype.__parse__ = function () {
    var command = this.command,
        map = BF.map,
        loops = [];
    this.out = "";
    for(var i = 0; i < command.length; i++) {
        switch(command[i]) {
            case map.add:
                if (this.memory[this.position] == 255) {
                    this.memory[this.position] = 0;
                } else {
                    this.memory[this.position]++;
                }
                break;
            case map.subtract:
                if (this.memory[this.position] == 0) {
                    this.memory[this.position] = 255;
                } else {
                    this.memory[this.position]--;
                }
                break;
            case map.forward:
                this.position++;
                if (!this.memory[this.position]) {
                    this.memory[this.position] = 0;
                }
                break;
            case map.backward:
                this.position--;
                break;
            case map.open:
                loops.push(i - 1);
                break;
            case map.close:
                if(!this.memory[this.position] == 0) {
                    i = loops.pop();
                }
                break;
            case map.output:
                this.out += BF.toChar(this.memory[this.position]);
                break;
            // case map.input:
            //     this.input();
            //     break;
        }
    }
    return this.out;
};

BF.prototype.__reset__ = function () {
    this.memory = [0];
    this.position = 0;
};


// var bf = new BF("++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>.");
// bf.run();
