const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/apiRouter.js']

swaggerAutogen(outputFile, endpointsFiles)