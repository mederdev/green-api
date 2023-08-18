class SwaggerHelper {
  signIn() {
    return {
      schema: {
        tags: ["User"],
        response: {
          200: {
            type: "object",
            properties: {
              accessToken: { type: "string" },
              refreshToken: { type: "string" },
            },
            additionalProperties: true,
          },
        },
        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
          }
        }
      }
    }
  }
  login() {
    return {
      schema: {
        tags: ["User"],
        response: {
          200: {
            type: "object",
            properties: {
              accessToken: { type: "string" },
              refreshToken: { type: "string" },
            },
            additionalProperties: true,
          }
        },
        body: {
          type: 'object',
          properties: {
            email: { type: "string" },
            password: { type: "string" },
          }
        }
      }
    }
  }
  info() {
    return {
      schema: {
        tags: ["User"],
        response: {
          200: {
            type: "object",
            properties: {
              name: { type: "string" },
              email: { type: "string" },
              password: { type: "string" },
              refreshToken: { type: "string" }
            },
            additionalProperties: true,
          },
        },
        security: [{ apiKey: [] }]
      },
    }
  }

  logout() {
    return {
      schema: {
        tags: ["User"],
        response: {
          200: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
            additionalProperties: true,
          }
        },
        security: [{ apiKey: [] }],
      },
    }
  }
}

export default new SwaggerHelper();
