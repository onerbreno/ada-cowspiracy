import Discord from 'discord.js'
import { formatCurrency } from '../utils/formatCurrency'

export const command = {
  name: 'trabalhar',
  description: 'Ganha dinheiro.',

  async run({ client, message, userAccount, args }) {
    const response = userAccount.work()

    message.channel.send({
      embeds: [{
        color: Discord.resolveColor('8B09E5'),
        author: {
          name: userAccount.name,
          icon_url: userAccount.avatarUrl
        },
        description: response,
      }]
    })
  }
}
