function init(request, response) {
  response.render('index', { name: 'login.css' });
  response.end();
}


exports.init = init;
