// For more info, check https://www.netlify.com/docs/functions/#javascript-lambda-functions
module.exports.handler = async function(event, context) {
  return {
    // return null to show no errors
    statusCode: 200, // http status code
    body: JSON.stringify({
      msg: "Hello, World! This is better " + Math.round(Math.random() * 10)
    })
  }
}

