// Last-resort safety net for errors that escape a route's own try/catch.
// eslint-disable-next-line no-unused-vars
function errorHandler(error, _req, res, _next) {
  console.error('Unhandled server error:', error);
  if (res.headersSent) return;
  res.status(error.status || 500).json({ error: 'Something went wrong. Please try again.' });
}

module.exports = { errorHandler };
