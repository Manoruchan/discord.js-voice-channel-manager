const VoiceChannelManager = class {
    constructor(oldState, newState) {

        this.oldState = oldState
        this.newState = newState
        
        this.oldId = this.oldState.channelId
        this.newId = this.newState.channelId

        this.state = state => ({
            old: this.oldState,
            new: this.newState,
            channel: state.guild.channels.cache.get(state.channelId),
            findCh: value => this.findCh(state, value)
        })
    }

    _filter(filter = null, type = "join") {
        if (this.oldId === this.newId) return false
        if (filter != null && !filter(this.oldState, this.newState)) return false

        if (type === "move") {
            if (this.newId === null && this.oldId === null) return false
        } else if (type === "join") {
            if (this.newId === null) return false
        } else if (type === "leave") {
            if (this.oldId === null) return false
        }

        return true
    }
    
    onMove(handler, filter) {
        if (!this._filter(filter, "move")) return null
        return new Promise((resolve, reject) => handler(this.state(this.newState), resolve, reject))
    }

    onJoin(handler, filter) {
        if (!this._filter(filter, "join")) return null
        return new Promise((resolve, reject) => handler(this.state(this.newState), resolve, reject))
    }

    onLeave(handler, filter) {
        if (!this._filter(filter, "leave")) return null
        return new Promise((resolve, reject) => handler(this.state(this.oldState), resolve, reject))
    }

    findCh(s, v) {
        return s.guild.channels.cache.get(v) || s.guild.channels.cache.find(ch => ch.name === v)
    }
    
    findTopic(s, v) {
        return s.guild.channels.cache.find(ch => ch.topic?.includes(v))
    }
}


module.exports = VoiceChannelManager
