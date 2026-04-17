import { RpgPlayer, type RpgPlayerHooks, Control, Components } from '@rpgjs/server'

const player: RpgPlayerHooks = {
    onConnected(player: RpgPlayer) {
        player.name = 'Samuel'
        player.setComponentsTop(Components.text('{name}'))

        if (typeof window !== 'undefined') {
            ;(window as any).__PLAYER__ = player
        }
    },

    onInput(player: RpgPlayer, { input }) {
        // Escape: do nothing (menu disabled)
        // Action (space/enter): let RPG-JS handle event interaction normally
    },

    async onJoinMap(player: RpgPlayer) {
        if (!player.getVariable('quest_1a')) {
            player.setVariable('quest_1a', 'active')
        }
    }
}

export default player
