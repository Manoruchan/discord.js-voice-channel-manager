# discord.js-voice-channel-manager

# Features

Manager will provide handler of Join and Leave event.

# Requirements

* Discord.js v14

# Usage

Please create javascript file named "VoiceChannelManager".
And copy &amp; paste [code](),
then use import or require to get module.

# Example of usage

```js
const { VoiceChannelManager } = require("./VoiceChannelManager.js")

const {
    Client,
    GatewayIntentBits,
    PermissionFlagsBits
} = require("discord.js")

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
        VoiceState.findCh(state.new, state.channel.name).permissionOverwrites.edit(state.new.id, { ViewChannel: true })
    })

    VoiceState.onLeave(state => {
        if (!state.channel.name.startsWith(channel_prefix)) return
        VoiceState.findCh(state.old, state.channel.name).permissionOverwrites.edit(state.old.id, { ViewChannel: null })
    })
})

client.login("your token here 0w0")
```

# Note

Method findCh will get a topic of channels.
