import { input } from '@inquirer/prompts'
import { Client } from 'basic-ftp'
import { exit } from 'process'

async function clientAndUpload() {
  const client = new Client()
  client.ftp.verbose = true

  await client.access({
    host: '8.146.209.208',
    port: 21212,
    user: 'h5eventnet',
    password: 'jGpTCx6WaPW3KZjw',
    secure: true,
    secureOptions: {
      rejectUnauthorized: false,
    },
  })
  await client.ensureDir('/t/5')

  console.log(await client.list(), '2.')

  await client.clearWorkingDir()

  await client.uploadFromDir('dist')

  exit()
}

const answer = await input({ message: 'Enter your name' })
console.log(answer)
clientAndUpload()
