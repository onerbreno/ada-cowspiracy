import Discord from 'discord.js'

export const command = {
  name: 'apostar',
  description: 'Aposta dinheiro em um número sorteado. \nRecebe **dinheiro** e **número da sorte**.',

  async run({ client, message, userAccount, args }) {
    const amount = Number(args[0])
    const userSelectedNumber = args[1]

    const response = userAccount.placeBet(amount, userSelectedNumber)

    message.channel.send({
      embeds: [{
        color: Discord.resolveColor('8B09E5'),
        author: {
          name: response.name,
          icon_url: response.avatarUrl
        },
        description: response,
      }]
    });
  }
}
