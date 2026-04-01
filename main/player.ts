import { RpgPlayer, type RpgPlayerHooks, Control, Components } from '@rpgjs/server'

const SAVE_KEY = 'blood-on-the-river-save'

const player: RpgPlayerHooks = {
    onConnected(player: RpgPlayer) {
        player.name = 'Samuel'
        player.setComponentsTop(Components.text('{name}'))

        // Try to load saved game from variable (set via client-side GUI later)
        // For now, fresh start each time
    },

    onInput(player: RpgPlayer, { input }) {
        if (input == Control.Back) {
            player.callMainMenu()
        }
    },

    async onJoinMap(player: RpgPlayer) {
        if (player.getVariable('AFTER_INTRO')) {
            return
        }

        const mapId = (player as any).map?.id || ''

        if (mapId === 'ship') {
            await player.showText("You are Samuel Collier, a young orphan from London.")
            await player.showText("The year is 1607. You stand on the deck of the Susan Constant, bound for the New World.")
            await player.showText("Captain John Smith is looking for a page. Find him on the upper deck!")
            player.setVariable('AFTER_INTRO', true)
            player.setVariable('quest_1a', 'active')
        }
    }
}

export default player
