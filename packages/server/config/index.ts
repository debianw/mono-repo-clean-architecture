type Config = {
  port: number
  openai: {
    key: string
  }
}

export default {
  port: process.env.PORT || 4000,
  openai: {
    key: process.env.OPENAI_KEY
  }
} as Config