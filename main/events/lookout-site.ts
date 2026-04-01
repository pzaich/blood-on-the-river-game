import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'lookout-site',
    hitbox: { width: 8, height: 8 }
})
export default class LookoutSiteEvent extends RpgEvent {
    onInit() {
        this.setGraphic('crate')
    }

    async onAction(player: RpgPlayer) {
        if (player.getVariable('quest_2e') !== 'active') {
            await player.showText("A good spot overlooking the river.")
            return
        }

        await player.showText("You build a tall lookout tower. Now you can spot any Spanish ships coming up the river!")
        player.setVariable('quest_2e', 'complete')
        player.showNotification("Lookout tower built! Talk to Captain Smith.", { time: 3000 })
    }
}
