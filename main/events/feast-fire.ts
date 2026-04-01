import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'feast-fire',
    hitbox: { width: 16, height: 16 }
})
export default class FeastFireEvent extends RpgEvent {
    onInit() { this.setGraphic('barrel') }

    async onAction(player: RpgPlayer) {
        if (player.getVariable('quest_4f') !== 'active') {
            await player.showText("The central fire pit, where the village gathers.")
            return
        }

        await player.showText("You share venison and shellfish from your hunts with the Powhatan people.")
        await player.showText("In return, they share corn, squash, and stories of their ancestors.")
        await player.showText("Namontack teaches you words in his language. The children laugh and play around the fire.")
        await player.showText("Tonight, you are not English or Powhatan. You are simply friends.")
        player.setVariable('quest_4f', 'complete')
        player.showNotification("Feast complete! You've earned the Trust of the Powhatan. Talk to Namontack.", { time: 4000 })
    }
}
