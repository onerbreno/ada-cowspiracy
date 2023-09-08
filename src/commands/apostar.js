import Discord from 'discord.js'

export const command = {
  name: 'apostar',
  description: 'Aposta dinheiro em um número sorteado de 1 a 5. \nRecebe **dinheiro** e **número da sorte**.',

  async run({ client, message, userAccount, args }) {
    const userSelectedNumber = Number(args[0])
    const amount = Number(args[1])

    const response = userAccount.placeBet({ userSelectedNumber, amount })

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
