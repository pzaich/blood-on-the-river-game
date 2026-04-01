import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'village-elder',
    hitbox: { width: 24, height: 16 }
})
export default class VillageElderEvent extends RpgEvent {
    onInit() { this.setGraphic('powhatan') }

    async onAction(player: RpgPlayer) {
        if (player.getVariable('quest_4c') !== 'active') {
            await player.showText("I am the Village Elder. I teach the young ones to craft.", { talkWith: this })
            return
        }

        const hide = player.getVariable('quest_4c_hide')
        const sinew = player.getVariable('quest_4c_sinew')

        if (!hide || !sinew) {
            await player.showText("To make a pouch, you need deer hide and sinew. Look around the village for them.", { talkWith: this })
            if (hide) await player.showText("You have the deer hide. Now find sinew.", { talkWith: this })
            if (sinew) await player.showText("You have the sinew. Now find deer hide.", { talkWith: this })
            return
        }

        await player.showText("You have both materials! Let me show you how to make a pouch...", { talkWith: this })
        await player.showText("First, cut the hide to size. Then punch holes along the edge. Finally, thread the sinew through to form the pouch.", { talkWith: this })
        await player.showText("There! A fine leather pouch. You can carry more supplies now.", { talkWith: this })
        player.setVariable('quest_4c', 'complete')
        player.showNotification("Leather Pouch crafted! Talk to Namontack.", { time: 3000 })
    }
}
