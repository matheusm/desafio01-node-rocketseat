import fs from 'fs'
import { parse } from 'csv-parse';

const csvPath = new URL("./test.csv", import.meta.url)

const stream = fs.createReadStream(csvPath)

const parser = parse({ 
  delimiter: ",",
  from_line: 2,
  skipEmptyLines: true,
})

async function run() {
  const linesParse = stream.pipe(parser)

  for await (const line of linesParse) {
    const [title, description] = line;

    await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description
      })
    })
  }
}

run()