import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'supply-crate-2',
    hitbox: {
        width: 32,
        height: 16
    }
})
export default class SupplyCrate2Event extends RpgEvent {
    collected = false

    onInit() {
        this.setGraphic('crate')
    }

    async onAction(player: RpgPlayer) {
        if (this.collected) {
            await player.showText("This crate has already been collected.")
            return
        }
        const quest1b = player.getVariable('quest_1b')
        if (quest1b !== 'active') {
            await player.showText("A supply crate. It looks heavy.")
            return
        }
        this.collected = true
        const crates = (player.getVariable('quest_1b_crates') || 0) + 1
        player.setVariable('quest_1b_crates', crates)
        await player.showText(`You picked up a supply crate! (${crates}/3)`)
        if (crates >= 3) {
            await player.showText("You found all the crates! Report back to Captain Smith.")
        }
    }
}
