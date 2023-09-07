import Discord from 'discord.js'
import { Account } from '../accounts'

export const command = {
  name: 'transferir',
  description: 'Transfere dinheiro para outra conta. \nRecebe **username** e **dinheiro**.',

  async run({ client, message, userAccount, args }) {
    const usernameTarget = args[0]
    const amount = Number(args[1])

    const response = userAccount.transferMoney(usernameTarget, amount)

    message.channel.send({
      embeds: [{
        color: Discord.resolveColor('8B09E5'),
        author: {
          name: userAccount.name,
          icon_url: userAccount.avatarUrl
        },
        description: response
      }]
    });
    message.reply(response)
  }
}
