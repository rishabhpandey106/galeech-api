import { Hono } from "hono";
import { cors } from "hono/cors";
import { env } from "hono/adapter"
import { Index } from "@upstash/vector";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"

const app = new Hono();

type Environment = {
    VECTOR_URL: string,
    VECTOR_PASSWORD: string
}

const WHITE_LIST = [
    'gali',
    'gaalech',
    'chor',
]

const THRESHOLD = 0.88

const semanticSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 25,
    chunkOverlap: 8,
    separators: [" "],
})

app.use(cors())

app.post("/", async (c) => {
    if(c.req.header("Content-Type") !== "application/json") {
        return c.json({
            success: false,
            error: "Invalid content type",
        }, {status: 406})
    }

    try {
        const {VECTOR_URL, VECTOR_PASSWORD} = env<Environment>(c)

        const index = new Index({
            url: VECTOR_URL,
            token: VECTOR_PASSWORD,
            cache: false,
          })
        
        const body = await c.req.json();
        let {text} = body as { text: string };

        if(!text) {
            return c.json({
                success: false,
                error: "No text provided",
            }, {status: 400})
        }

        if(text.length > 1000){
            return c.json({
                success: false,
                error: "Text is too long(>1000 characters)",
            }, {status: 400})
        } 

        text = text.split(/\s/).filter(word => !WHITE_LIST.includes(word.toLowerCase())).join(" ")

        const [wordchunks, sentencechunks] = await Promise.all([
            textToWord(text),
            textToSentence(text),
        ])

        const flagged = new Set<{score: number, text: string}>();

        const vectorResult = await Promise.all([
             ...wordchunks.map(async (word) => {
                 const [vector] = await index.query({
                     data: word,
                     topK: 1,
                     includeMetadata: true
                 })

                 if(vector && vector.score > 0.9){
                     flagged.add({score: vector.score, text: vector.metadata!.text as string})
                 }

                 return {score: 0}
             }),
             ...sentencechunks.map(async (sentence) => {
                 const [vector] = await index.query({
                     data: sentence,
                     topK: 1,
                     includeMetadata: true
                 })

                 if(vector && vector.score > THRESHOLD){ 
                     flagged.add({score: vector.score, text: vector.metadata!.text as string})
                 }

                 return vector!
             })
        ])

        if(flagged.size > 0) {
            const sorted = Array.from(flagged).sort((a, b) => a.score > b.score ? -1 : 1)[0]
            return c.json({
                success: true,
                isFlagged: true,
                score: sorted.score,
                text: sorted.text,
            },{status: 200})
        }
        else {
            const mostGaleechChunk = vectorResult.sort((a, b) => a.score > b.score ? -1 : 1)[0]
            return c.json({
                success: true,
                isFlagged: false,
                score: mostGaleechChunk.score,
            },{status: 200})
        }

    } catch (error) {
        console.log(error);

        return c.json({
            success: false,
            error: "An error occured",},
            {
                status: 405
            })
    }
})

async function textToWord(text: string) {
    return text.split(/\s/)
}

async function textToSentence(text: string): Promise<string[]> {
    if(text.split(/\s/).length === 1) {
        return []
    }

    const document = await semanticSplitter.createDocuments([text])
    const chunks = document.map((chunk)=>
        chunk.pageContent
    )
    return chunks
}

export default app