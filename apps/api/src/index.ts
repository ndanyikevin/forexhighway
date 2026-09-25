import { Hono } from 'hono'
import { serve } from '@hono/node-server'

const app = new Hono()

app.get('/', (c) => {
    return c.json({
        ok: true,
        message: 'ForexHighway API',
    })
})

app.get('/health', (c) => {
    return c.json({
        ok: true,
    })
})

serve(
    {
        fetch: app.fetch,
        port: 4000,
    },
    (info) => {
        console.log(`Server is listening on port ${info.port}`)
    },
)