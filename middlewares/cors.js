const allowedCors = [
  'https://mesto.blyaderuiner.nomoredomains.monster/',
  'https://api.mesto.blyaderuiner.nomoredomains.monster/',
  'localhost:3000',
];

function cors(req, res, next) {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);

    return res.end();
  }

  return next();
}

module.exports = cors;
