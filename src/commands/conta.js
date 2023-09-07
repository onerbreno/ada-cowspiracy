import Discord from 'discord.js'
import { formatCurrency } from '../utils/formatCurrency'

export const command = {
  name: 'conta',
  description: 'Exibe as informações da conta.',

  async run({ client, message, userAccount, args }) {
    const response = userAccount.getAccountInfo()

    const balance = formatCurrency(response.balance)

    message.channel.send({
      embeds: [{
        color: Discord.resolveColor('8B09E5'),
        author: {
          name: userAccount.name,
          icon_url: userAccount.avatarUrl
        },
        fields: [
          {
            name: 'Dinheiro',
            value: balance,
            inline: false,
          },
          {
            name: 'Disponível para trabalhar',
            value: userAccount.canWork ? 'Sim' : 'Não',
            inline: false,
          }
        ]
      }]
    });

  }
}
