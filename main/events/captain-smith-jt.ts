import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'

@EventData({
    name: 'captain-smith-jt',
    hitbox: { width: 16, height: 16 }
})
export default class CaptainSmithJTEvent extends RpgEvent {
    onInit() {
        this.setGraphic('smith')
        this.setComponentsTop(Components.text('Capt. John Smith'))
    }

    async onAction(player: RpgPlayer) {
        const quest = player.getVariable('current_quest')

        if (quest === 2) {
            const q2a = player.getVariable('quest_2a')
            const q2e = player.getVariable('quest_2e')

            if (!q2a) {
                await player.showText("Welcome to Virginia, Samuel! This is where we'll build James Fort.", { talkWith: this })
                await player.showText("Talk to the carpenter — he'll tell you what we need.", { talkWith: this })
                player.setVariable('quest_2a', 'active')
                player.setVariable('quest_2_logs', 0)
                return
            }

            if (q2e === 'complete') {
                await player.showText("James Fort is built! You've done well, Samuel.", { talkWith: this })
                await player.showText("But we need food. Time to learn to hunt. Head east into the wilderness.", { talkWith: this })
                player.setVariable('current_quest', 3)
                return
            }

            await player.showText("Keep working with the carpenter, Samuel. The fort won't build itself!", { talkWith: this })
            return
        }

        if (quest === 3) {
            await player.showText("Head east to the wilderness to hunt, Samuel.", { talkWith: this })
            return
        }

        if (quest === 4) {
            await player.showText("Visit the Powhatan village to the north, Samuel. We need allies.", { talkWith: this })
            return
        }

        if (quest === 5) {
            const q5a = player.getVariable('quest_5a')
            const q5b = player.getVariable('quest_5b')
            const q5c = player.getVariable('quest_5c')
            const q5d = player.getVariable('quest_5d')

            if (!q5a) {
                await player.showText("Samuel! Namontack has come to trade. Go speak with him by the gate.", { talkWith: this })
                player.setVariable('quest_5a', 'active')
                return
            }

            if (q5a === 'complete' && !q5b) {
                await player.showText("Good trade! But look — the lookout has spotted something. Check the tower!", { talkWith: this })
                player.setVariable('quest_5b', 'active')
                return
            }

            if (q5b === 'complete' && !q5c) {
                await player.showText("The Spanish are gone, but we have another problem.", { talkWith: this })
                await player.showText("Some settlers are angry at the Powhatan. A dispute over fishing nets. Can you help?", { talkWith: this })
                await player.showText("Talk to the settler and Namontack. Use what you've learned to make peace.", { talkWith: this })
                player.setVariable('quest_5c', 'active')
                return
            }

            if (q5c === 'complete' && !q5d) {
                await player.showText("You did it, Samuel. You kept the peace.", { talkWith: this })
                await player.showText("When I first met you on that ship, you were an angry orphan boy.", { talkWith: this })
                await player.showText("Now look at you — a builder, a hunter, a friend to the Powhatan, a peacemaker.", { talkWith: this })
                await player.showText("Virginia needs people like you, Samuel. Will you stay?", { talkWith: this })
                const choice = await player.showChoices("Samuel's Choice", [
                    { text: "This is my home now. I'll stay.", value: 'stay' },
                    { text: "I'll stay — for my friends.", value: 'friends' }
                ])
                await player.showText("Then welcome home, Samuel Collier of Jamestown.", { talkWith: this })
                await player.showText("Your journey from London to Virginia, from anger to friendship, has made you who you are.", { talkWith: this })
                await player.showText("And this is only the beginning...", { talkWith: this })
                player.setVariable('quest_5d', 'complete')
                player.showNotification("Congratulations! You've completed Blood on the River!", { time: 5000 })
                return
            }

            if (q5d === 'complete') {
                await player.showText("You've done great things, Samuel. Jamestown is proud of you.", { talkWith: this })
                return
            }

            await player.showText("There's work to be done, Samuel.", { talkWith: this })
            return
        }

        await player.showText("We have much work to do here in Virginia.", { talkWith: this })
    }
}
