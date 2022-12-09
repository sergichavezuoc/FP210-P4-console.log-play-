const swaggerAutogen = require('swagger-autogen')()
const doc = {
    info: {
      title: 'Console.log(play) API',
      description: 'API explanation with example. Available for integrations with third parties',
    },
    host: 'localhost:3000',
    schemes: ['http'],
  };
const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/apiRouter.js']

swaggerAutogen(outputFile, endpointsFiles,doc)