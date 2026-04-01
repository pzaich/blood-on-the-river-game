import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'

@EventData({
    name: 'hunter',
    hitbox: { width: 24, height: 16 }
})
export default class HunterEvent extends RpgEvent {
    onInit() {
        this.setGraphic('namontack-sprite')
        this.setComponentsTop(Components.text('Namontack'))
    }

    async onAction(player: RpgPlayer) {
        const quest = player.getVariable('current_quest')
        if (quest !== 3) {
            await player.showText("I'm the hunter. Come back when you're ready to learn.", { talkWith: this })
            return
        }

        const q3a = player.getVariable('quest_3a')
        const q3b = player.getVariable('quest_3b')
        const q3c = player.getVariable('quest_3c')
        const q3d = player.getVariable('quest_3d')
        const q3e = player.getVariable('quest_3e')

        if (!q3a) {
            await player.showText("Welcome to the wilderness, Samuel! I'll teach you to survive.", { talkWith: this })
            await player.showText("First, sword training. Hit the training targets to learn.", { talkWith: this })
            player.setVariable('quest_3a', 'active')
            player.setVariable('quest_3a_hits', 0)
            return
        }

        if (q3a === 'active') {
            const hits = player.getVariable('quest_3a_hits') || 0
            if (hits >= 3) {
                await player.showText("Good swordsmanship! Now let's try the musket.", { talkWith: this })
                player.setVariable('quest_3a', 'complete')
                player.setVariable('quest_3b', 'active')
                player.setVariable('quest_3b_hits', 0)
            } else {
                await player.showText(`Chase the moving targets and hit them! (${hits}/3)`, { talkWith: this })
            }
            return
        }

        if (q3b === 'active') {
            const hits = player.getVariable('quest_3b_hits') || 0
            if (hits >= 3) {
                await player.showText("Fine shooting! Now gather food. Collect 5 mussels and 5 crabs from the shore.", { talkWith: this })
                player.setVariable('quest_3b', 'complete')
                player.setVariable('quest_3c', 'active')
                player.setVariable('quest_3_mussels', 0)
                player.setVariable('quest_3_crabs', 0)
            } else {
                await player.showText(`Chase the targets and shoot! (${hits}/3)`, { talkWith: this })
            }
            return
        }

        if (q3c === 'active') {
            const m = player.getVariable('quest_3_mussels') || 0
            const c = player.getVariable('quest_3_crabs') || 0
            if (m >= 5 && c >= 5) {
                await player.showText("Excellent! Now hunt 3 rabbits in the forest.", { talkWith: this })
                player.setVariable('quest_3c', 'complete')
                player.setVariable('quest_3d', 'active')
                player.setVariable('quest_3_rabbits', 0)
            } else {
                await player.showText(`Keep gathering! (Mussels: ${m}/5, Crabs: ${c}/5)`, { talkWith: this })
            }
            return
        }

        if (q3d === 'active') {
            const r = player.getVariable('quest_3_rabbits') || 0
            if (r >= 3) {
                await player.showText("You're a natural hunter! One final challenge — find and hunt the great deer.", { talkWith: this })
                player.setVariable('quest_3d', 'complete')
                player.setVariable('quest_3e', 'active')
            } else {
                await player.showText(`Hunt rabbits in the forest. (${r}/3)`, { talkWith: this })
            }
            return
        }

        if (q3e === 'active') {
            await player.showText("The deer roams deep in the forest. Be patient and careful.", { talkWith: this })
            return
        }

        if (q3e === 'complete') {
            await player.showText("You've mastered the hunt, Samuel! Head back to Jamestown.", { talkWith: this })
            player.setVariable('current_quest', 4)
            return
        }
    }
}
