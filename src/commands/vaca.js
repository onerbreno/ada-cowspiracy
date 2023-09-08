import { createApi } from 'unsplash-js'
import nodeFetch from 'node-fetch'
import Discord from 'discord.js'

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_API,
  fetch: nodeFetch,
})

export const command = {
  name: 'vaca',
  description: '🤫',

  async run({ client, message, userAccount, args }) {
    const result = await unsplash.photos.getRandom({
      query: 'cow',
      orientation: 'landscape'
    })

    const price = 300
    const response = userAccount.buy({ price }) 

    if (response) {
      message.channel.send({
        embeds: [{
          color: Discord.resolveColor('8B09E5'),
          author: {
            name: userAccount.name,
            icon_url: userAccount.avatarUrl
          },
          description: response
        }]
      })
      return
    }


    message.channel.send({
      embeds: [{
        color: Discord.resolveColor('8B09E5'),
        author: {
          name: userAccount.name,
          icon_url: userAccount.avatarUrl
        },
        image: {
          url: result.response.urls.small
        },
        description: "## Você comprou uma vaquinha! :tada:"
      }]
    })

    message.channel.send({ content: 'Muuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu', tts: 'true', })

  }
}
