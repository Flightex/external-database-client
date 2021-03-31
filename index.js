const f = require("node-fetch");
const { https, port, url, token } = require("./config.js");

exports.set = async function(key, value, time) {
  const body = {
      "data": {
        "key": key,
        "value": value
      },
      "expire": time
    }
  let res = await f(`http${(https == true) ? "s" : "" }://${url}:${port}/set`, {
    method: "post",
    headers: {
      "token": token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
};

exports.get = async function(key) {
  const body = {
    "data": {
      "key": key
    }
  }
  let res = await f(`http${(https == true) ? "s" : "" }://${url}:${port}/get`, {
    method: "post",
    headers: {
      "token": token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
  let output = await res.text();
  return output;
};

exports.ping = async function() {
  let dateBefore = Date.now()
  let res = await f(`http${(https == true) ? "s" : "" }://${url}:${port}/ping`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "token": token
    }
  })
  let dateAfter = Date.now()
  let latency = (dateAfter - dateBefore) 
  return latency;
};