const express = require("express");

const port = process.env.PORT || 27489;

const server = require("./server.js");

server.listen(port, () => console.log(` == server is listening on port http://127.0.0.1:${port} == `));
