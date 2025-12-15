import { createApp } from "../app"
import "dotenv/config"
import db from "./db/db"

const PORT = process.env.PORT || 8000

const app = createApp(db)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})