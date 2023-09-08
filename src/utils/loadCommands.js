import path from 'node:path'
import { readdirSync } from 'node:fs'
import { pathToFileURL } from 'node:url'

export async function loadCommands() {
  const commands = new Map()

  const __dirname = path.resolve(process.cwd(), 'src')
  const files = readdirSync(path.resolve(__dirname, 'commands'))
  
  await Promise.all(files.map(async file => {
    const { command } = await import(pathToFileURL(path.resolve(__dirname, 'commands', file)))
    commands.set(command.name, command)
  }))

  return commands
}