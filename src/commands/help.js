import { loadCommands } from "../utils/loadCommands"
import Discord from 'discord.js'

export const command = {
  name: 'help',
  description: 'Exibe todos os comandos.',

  async run({ client, message, userAccount, args }) {

    const commands = [...((await loadCommands()).values())]

    const commandsEmbed = commands.map(command => {
      return {
        name: `${process.env.BOT_PREFIX}${command.name}`,
        value: command.description,
        inline: false
      }
    })

    message.channel.send({
      embeds: [{
        color: Discord.resolveColor('8B09E5'),
        description: "### Lista de comandos",
        fields: commandsEmbed,
      }]
    });

  }
}