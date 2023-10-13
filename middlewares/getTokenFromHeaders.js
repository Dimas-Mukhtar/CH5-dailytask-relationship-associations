const getTokenFromHeaders = (req) => {
  const token = req.headers.authorization
  const realToken = token.split(" ")[1]
  if (realToken) return realToken
  return {
    status: "Failed",
    message: "There is no token, please login first"
  }
}

module.exports = getTokenFromHeaders
