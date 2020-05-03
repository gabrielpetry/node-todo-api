const defaultError = {
  type: 'object',
  properties: {
    error: { type: 'string' },
  },
}

export default {
  400: defaultError,
  500: defaultError,
  404: defaultError,
}
