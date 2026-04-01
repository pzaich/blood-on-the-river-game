import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'to-jamestown',
    hitbox: { width: 8, height: 8 }
})
export default class ToJamestownEvent extends RpgEvent {
    onInit() {}

    async onPlayerTouch(player: RpgPlayer) {
        player.changeMap('jamestown')
    }
}
