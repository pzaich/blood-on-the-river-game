import { RpgPlayer, type RpgPlayerHooks, Control, Components } from '@rpgjs/server'

const player: RpgPlayerHooks = {
    onConnected(player: RpgPlayer) {
        player.name = 'Samuel'
        player.setComponentsTop(Components.text('{name}'))

        if (typeof window !== 'undefined') {
            ;(window as any).__PLAYER__ = player
        }
    },

    onInput(_player: RpgPlayer, { input: _input }) {
        // Menu disabled — no callMainMenu on Escape
    },

    async onJoinMap(player: RpgPlayer) {
        if (!player.getVariable('quest_1a')) {
            player.setVariable('quest_1a', 'active')
        }
    }
}

export default player
