import { RpgPlayer, type RpgPlayerHooks, Control, Components } from '@rpgjs/server'

const player: RpgPlayerHooks = {
    onConnected(player: RpgPlayer) {
        player.name = 'Samuel'
        player.setComponentsTop(Components.text('{name}'))

        if (typeof window !== 'undefined') {
            ;(window as any).__PLAYER__ = player

            // Restore quest state from localStorage (after debug map change)
            try {
                const savedState = localStorage.getItem('quest-state')
                if (savedState) {
                    const state = JSON.parse(savedState)
                    Object.entries(state).forEach(([k, v]) => {
                        player.setVariable(k, v)
                    })
                    localStorage.removeItem('quest-state')
                }
            } catch {}

            // Change to target map if set (after page reload for map switch)
            try {
                const targetMap = localStorage.getItem('target-map')
                if (targetMap) {
                    localStorage.removeItem('target-map')
                    setTimeout(() => {
                        player.changeMap(targetMap)
                    }, 500)
                }
            } catch {}
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
