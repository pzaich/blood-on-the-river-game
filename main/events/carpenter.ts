import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'

@EventData({
    name: 'carpenter',
    hitbox: { width: 8, height: 8 }
})
export default class CarpenterEvent extends RpgEvent {
    onInit() {
        this.setGraphic('hunt')
        this.setComponentsTop(Components.text('John Laydon'))
    }

    async onAction(player: RpgPlayer) {
        const quest = player.getVariable('current_quest')
        if (quest != 2) {
            await player.showText("I'm the carpenter. When it's time to build, come talk to me.", { talkWith: this })
            return
        }

        const q2a = player.getVariable('quest_2a')
        const q2b = player.getVariable('quest_2b')
        const q2c = player.getVariable('quest_2c')
        const q2d = player.getVariable('quest_2d')
        const q2e = player.getVariable('quest_2e')

        // Quest 2a: Chop trees
        if (!q2a || q2a === 'active') {
            const logs = player.getVariable('quest_2_logs') || 0
            if (logs >= 10) {
                await player.showText("Excellent work, Samuel! 10 logs collected. Here, take this axe — you've earned it.", { talkWith: this })
                player.setVariable('quest_2a', 'complete')
                player.setVariable('quest_2b', 'active')
                player.setVariable('quest_2_hay', 0)
                player.setVariable('quest_2_mud', 0)
                await player.showText("Now we need hay and mud to fill the walls. Gather 5 hay bales and 5 mud piles from the riverbank.", { talkWith: this })
            } else {
                await player.showText(`We need logs to build! Chop trees at the forest edge. (${logs}/10 logs)`, { talkWith: this })
            }
            return
        }

        // Quest 2b: Gather materials
        if (q2b === 'active') {
            const hay = player.getVariable('quest_2_hay') || 0
            const mud = player.getVariable('quest_2_mud') || 0
            if (hay >= 5 && mud >= 5) {
                await player.showText("All the materials are here! Time to build the palisade walls.", { talkWith: this })
                player.setVariable('quest_2b', 'complete')
                player.setVariable('quest_2c', 'active')
                player.setVariable('quest_2_walls', 0)
                await player.showText("Deliver materials to the 4 construction sites around the clearing to build the walls.", { talkWith: this })
            } else {
                await player.showText(`We need materials from the riverbank. (Hay: ${hay}/5, Mud: ${mud}/5)`, { talkWith: this })
            }
            return
        }

        // Quest 2c: Build palisade walls
        if (q2c === 'active') {
            const walls = player.getVariable('quest_2_walls') || 0
            if (walls >= 4) {
                await player.showText("The palisade walls are up! The fort is taking shape.", { talkWith: this })
                player.setVariable('quest_2c', 'complete')
                player.setVariable('quest_2d', 'active')
                player.setVariable('quest_2d_logs', 0)
                await player.showText("Now we need a storehouse to keep our supplies safe. Deliver 8 logs to the storehouse site.", { talkWith: this })
            } else {
                await player.showText(`Build the palisade! Deliver materials to construction sites. (${walls}/4 walls)`, { talkWith: this })
            }
            return
        }

        // Quest 2d: Build storehouse
        if (q2d === 'active') {
            const logs = player.getVariable('quest_2d_logs') || 0
            if (logs >= 8) {
                await player.showText("The storehouse is built! Our supplies are safe now.", { talkWith: this })
                player.setVariable('quest_2d', 'complete')
                player.setVariable('quest_2e', 'active')
                await player.showText("One last thing — build a lookout tower near the river to watch for Spanish ships.", { talkWith: this })
            } else {
                await player.showText(`The storehouse needs more logs. Chop trees and deliver to the site. (${logs}/8 logs)`, { talkWith: this })
            }
            return
        }

        // Quest 2e: Build lookout
        if (q2e === 'active') {
            await player.showText("Go to the lookout site near the river and build the tower!", { talkWith: this })
            return
        }

        // Quest 2e complete -> start 2f
        const q2f = player.getVariable('quest_2f')
        if (q2e === 'complete' && !q2f) {
            await player.showText("The lookout tower is done! But our people need shelter.", { talkWith: this })
            await player.showText("Build 4 houses inside the fort. Find the house sites and chop more trees!", { talkWith: this })
            player.setVariable('quest_2f', 'active')
            player.setVariable('quest_2f_houses', 0)
            player.setVariable('quest_2f_logs', 0)
            return
        }

        // Quest 2f: Build 4 houses
        if (q2f === 'active') {
            const houses = player.getVariable('quest_2f_houses') || 0
            if (houses >= 4) {
                await player.showText("All four houses are built! The settlers have shelter now.", { talkWith: this })
                await player.showText("James Fort is complete! You're a fine builder, Samuel.", { talkWith: this })
                player.setVariable('quest_2f', 'complete')
            } else {
                const logs = player.getVariable('quest_2f_logs') || 0
                await player.showText(`Build houses at the house sites. Each needs 4 logs. (Houses: ${houses}/4, Logs: ${logs})`, { talkWith: this })
            }
            return
        }

        if (q2f === 'complete') {
            await player.showText("James Fort is complete! You're a fine builder, Samuel.", { talkWith: this })
            return
        }
    }
}
