import { createApi } from 'unsplash-js'
import nodeFetch from 'node-fetch'

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_API,
  fetch: nodeFetch,
});

export const command = {
  name: 'vaca',
  description: '🤫',

  async run({ client, message, userAccount, args }) {
    const result = await unsplash.photos.getRandom({
      query: 'cow',
      orientation: 'landscape'
    })
    message.reply(result.response.urls.small)
  }
}
