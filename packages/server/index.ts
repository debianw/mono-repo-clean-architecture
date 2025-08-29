import express, { type Request, type Response } from 'express'
import Config from 'server/config'

const app = express()

app.get('/', (req: Request, res: Response) => {
  console.log('key', Config.openai)
  res.send('ok...')
})

app.listen(Config.port, () => {
  console.log(`Service listening on port ${Config.port}`)
})