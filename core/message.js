
var message = { };

message.fail = function(msg) {
    console.error("[ ", "\x1b[31mERROR", "\x1b[0m ] ", msg);
}

message.success = function(msg) {
    console.log("[", "\x1b[34mSUCCESS", "\x1b[0m] ", msg);
}

module.exports = message;