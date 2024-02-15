module.exports = {
  main: {
    // input: "./src/shared/api/swagger.yaml", // Укажите URL вашего Swagger-документа
    input: 'http://[::1]:4000/api-yaml',
    output: {
      target: './src/shared/api/generated.ts',
      override: {
        mutator: {
          path: './src/shared/api/axios.instance.ts',
          name: 'customInstance',
        },
      },
    },
  },
}
