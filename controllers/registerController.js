function register(request,response){
  response.render('register', {title: 'Register', name: 'register.css'});
  response.end();
}

exports.register = register;
