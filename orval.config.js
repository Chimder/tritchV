module.exports = {
  main: {
    input: 'http://[::1]:4000/api-yaml',
    output: {
      target: './src/shared/api/orvalBack/generated.ts',
      override: {
        mutator: {
          path: './src/shared/api/orvalBack/axios.instance.ts',
          name: 'customInstance',
        },
      },
    },
  },
}
