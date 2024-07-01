import fs from "fs"
import csv from "csv-parser"
import { Index } from "@upstash/vector"

const index = new Index({
  url: YOUR_VECTOR_DATABASE_URL,
  token: YOUR_VECTOR_DATABASE_API_KEY,
})

interface Row {
    text: string
}

async function parseCSV(file: string): Promise<Row[]> {
    return new Promise((resolve, reject) => {  
        const rows: Row[] = []
        fs.createReadStream(file)
            .on("error", error => reject(error))
            .pipe(csv({separator: ","}))
            .on("error", error => reject(error))
            .on("finish", () => resolve(rows))
            .on("data", chunk => rows.push(chunk))
    })
}

const STEP = 30

const seed = async () => {
    const data = await parseCSV("data.csv")
    for (let i = 0; i < data.length; i += STEP) {
        const chunk = data.slice(i, i + STEP);
        const formattedData = chunk.map((row, batchIndex)=>({
            data: row.text,
            id: i + batchIndex,
            metadata: {
                text: row.text
            }
        }))
        
        await index.upsert(formattedData)
    }
}

seed();