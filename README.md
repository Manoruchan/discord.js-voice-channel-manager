# discord.js-voice-channel-manager

# Features

Manager will provide handler of Join and Leave event.

# Requirements

* Discord.js v14

# Usage

Please create javascript file named "VoiceChannelManager".
And copy &amp; paste [code](https://github.com/PriestessSakuraka/discord.js-voice-channel-manager/blob/main/VoiceChannelManager.js),
then use import or require to get module.

# Example of usage

```js
const { VoiceChannelManager } = require("./VoiceChannelManager.js")

const { Client, GatewayIntentBits } = require("discord.js")

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates
    ]
})

client.on("voiceStateUpdate", (oldState, newState) => {
    const VoiceState = new VoiceChannelManager(oldState, newState)
    
    const channel_prefix = "❖"

    VoiceState.onJoin(state => {
        if (!state.channel.name.startsWith(channel_prefix)) return
        state.findTopic(state.channel.name).permissionOverwrites.edit(state.new.id, { ViewChannel: true })
    })

    VoiceState.onLeave(state => {
        if (!state.channel.name.startsWith(channel_prefix)) return
        state.findTopic(state.channel.name).permissionOverwrites.edit(state.old.id, { ViewChannel: null })
    })
})

client.login("token here 0w0")
```

# Note
