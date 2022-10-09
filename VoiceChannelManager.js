const VoiceChannelManager = class {
    constructor(oldState, newState) {

        this.oldState = oldState
        this.newState = newState

        this.state = state => ({
            old: this.oldState,
            new: this.newState,
            channel: state.guild.channels.cache.get(state.channelId)
        })
    }

    _filter(filter = null, type = "join") {
        if (this.oldState.channelId === this.newState.channelId) return false
        if (filter != null && !filter(this.oldState, this.newState)) return false

        if (type === "join") {
            if (this.newState.channelId === null) return false
        } else if (type === "leave") {
            if (this.oldState.channelId === null) return false
        }

        return true
    }

    onJoin(handler, filter) {
        if (!this._filter(filter, "join")) return null
        return new Promise((resolve, reject) => handler(this.state(this.newState), resolve, reject))
    }

    onLeave(handler, filter) {
        if (!this._filter(filter, "leave")) return null
        return new Promise((resolve, reject) => handler(this.state(this.oldState), resolve, reject))
    }

    findCh(state, value) {
        return state.guild.channels.cache.find(ch => ch.topic?.includes(value))
    }
}


module.exports = VoiceChannelManager
