import 'dotenv/config'
import { Client, GatewayIntentBits } from 'discord.js'
import { Account } from './accounts.js'
import { loadCommands } from './utils/loadCommands.js'

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
})

let commands = new Map()

client.once('ready', async () => {
  commands = await loadCommands()
  console.log(`Logged in as ${client.user?.tag}`)
})

client.on('guildCreate', (guild) => {
  const botUsername = client.user.username
  const botName = client.user.displayName
  const botId = client.user.id


  const botAccount = new Account({
    id: botId,
    name: botName,
    username: botUsername,
  })

  Account.create(botAccount)
})

client.on('messageCreate', (message) => {
  if (message.author.bot) return

  const author = message.author

  const messageHasPrefix = message.content.startsWith(process.env.BOT_PREFIX)
  if (!messageHasPrefix) return
  
  
  const args = message.content.slice(process.env.BOT_PREFIX.length).trim().split(/ +/)
  const commandName = args.shift().toLowerCase()

  let account = Account.get(author.id)

  if (!account) {
    const newAccount = new Account({
      name: author.displayName,
      username: author.username,
      avatarUrl: author.avatarURL()
    }, author.id)
    
    Account.create(newAccount)
    account = newAccount
  }

  const command = commands.get(commandName)

  if (command) {
    command.run({
      client,
      message,
      userAccount: account,
      args
    })
  }

  // if (command === 'trabalhar') {

  // }

  // if (command === 'conta') {
  //   const response = authorAccount.getAccountInfo()
  //   message.reply(JSON.stringify(response))
  //   return
  // }

  // if (command === 'transferir') {
  //   const targetAccount = args[0]
  //   const amount = Number(args[1])

  //   if (!targetAccount || isNaN(amount)) {
  //     message.reply('Inválido')
  //     return
  //   }

  //   const response = authorAccount.transferMoney({
  //     targetAccount,
  //     amount,
  //   })

  //   message.reply(response)
  // }

  // if (command === 'apostar') {
  //   // Implemente o minigame de apostas aqui
  // }
})

client.login(process.env.BOT_TOKEN) // Faça login com o token do seu bot
