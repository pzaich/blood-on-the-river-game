import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'to-jamestown-pv',
    hitbox: { width: 8, height: 8 }
})
export default class ToJamestownPVEvent extends RpgEvent {
    onInit() {}

    async onPlayerTouch(player: RpgPlayer) {
        player.changeMap('jamestown')
    }
}
