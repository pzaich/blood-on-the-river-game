import { RpgPlayer, type RpgPlayerHooks, Control, Components } from '@rpgjs/server'

const SAVE_KEY = 'blood-on-the-river-save'

const player: RpgPlayerHooks = {
    onConnected(player: RpgPlayer) {
        player.name = 'Samuel'
        player.setComponentsTop(Components.text('{name}'))

        // Expose player to debug panel (dev mode only)
        if (typeof window !== 'undefined') {
            ;(window as any).__PLAYER__ = player
        }
    },

    onInput(player: RpgPlayer, { input }) {
        if (input == Control.Back) {
            player.callMainMenu()
        }
    },

    async onJoinMap(player: RpgPlayer) {
        if (!player.getVariable('quest_1a')) {
            player.setVariable('quest_1a', 'active')
        }
    }
}

export default player
