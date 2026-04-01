import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'

@EventData({
    name: 'namontack',
    hitbox: { width: 24, height: 16 }
})
export default class NamontackEvent extends RpgEvent {
    onInit() { this.setGraphic('namontack-sprite'); this.setComponentsTop(Components.text('Namontack')) }

    async onAction(player: RpgPlayer) {
        const quest = player.getVariable('current_quest')
        if (quest !== 4) {
            await player.showText("Welcome, friend. Come back when you are ready to learn our ways.", { talkWith: this })
            return
        }

        const q4a = player.getVariable('quest_4a')
        const q4b = player.getVariable('quest_4b')
        const q4c = player.getVariable('quest_4c')
        const q4d = player.getVariable('quest_4d')
        const q4e = player.getVariable('quest_4e')
        const q4f = player.getVariable('quest_4f')

        if (!q4a) {
            await player.showText("Samuel! I am Namontack. My people have been watching your settlement.", { talkWith: this })
            await player.showText("You are brave to come here. I would like to teach you our ways — if you are willing to learn.", { talkWith: this })
            const choice = await player.showChoices("Will you learn from Namontack?", [
                { text: "Yes, I want to learn!", value: 'yes' },
                { text: "Tell me more.", value: 'more' }
            ])
            if (choice && choice.value === 'more') {
                await player.showText("We will teach you to shoot the bow, craft useful things, play our games, and share a feast.", { talkWith: this })
                await player.showText("You will be our honored guest. What do you say?", { talkWith: this })
            }
            await player.showText("Wonderful! First, let me teach you the bow. Go to the archery range on the east side. Hit 3 of 5 targets!", { talkWith: this })
            player.setVariable('quest_4a', 'complete')
            player.setVariable('quest_4b', 'active')
            player.setVariable('quest_4b_hits', 0)
            return
        }

        if (q4b === 'active') {
            const hits = player.getVariable('quest_4b_hits') || 0
            if (hits >= 3) {
                await player.showText("Excellent shooting! You have the eye of a hunter. Take this — a Powhatan bow, crafted by our finest bowyer.", { talkWith: this })
                player.setVariable('quest_4b', 'complete')
                player.setVariable('quest_4c', 'active')
                await player.showText("Now visit the Village Elder. She will teach you to make a leather pouch. You'll need deer hide and sinew — look around the village.", { talkWith: this })
            } else {
                await player.showText(`Keep practicing at the archery range! (${hits}/3 hits)`, { talkWith: this })
            }
            return
        }

        if (q4c === 'active') {
            if (player.getVariable('quest_4c') === 'complete') return
            await player.showText("Have you visited the Village Elder? She's by the longhouses on the west side.", { talkWith: this })
            return
        }

        if (q4c === 'complete' && (!q4d || q4d !== 'complete')) {
            if (q4d !== 'active') {
                await player.showText("Nice pouch! Now let's play Pasuckuakohowog — our ball game!", { talkWith: this })
                await player.showText("Go to the ball field in the south. Score 2 goals to win!", { talkWith: this })
                player.setVariable('quest_4d', 'active')
                player.setVariable('quest_4d_goals', 0)
            } else {
                const goals = player.getVariable('quest_4d_goals') || 0
                if (goals >= 2) {
                    await player.showText("You won! You play like one of us!", { talkWith: this })
                    player.setVariable('quest_4d', 'complete')
                    player.setVariable('quest_4e', 'active')
                    await player.showText("Chief Powhatan wishes to honor you with a ceremony. Go speak with him by the fire.", { talkWith: this })
                } else {
                    await player.showText(`Score goals at the ball field! (${goals}/2)`, { talkWith: this })
                }
            }
            return
        }

        if (q4e === 'active') {
            await player.showText("Go speak with Chief Powhatan at the feast area.", { talkWith: this })
            return
        }

        if (q4e === 'complete' && q4f !== 'complete') {
            if (q4f !== 'active') {
                await player.showText("You look like a true warrior now, Samuel! One last thing — let us share a feast together.", { talkWith: this })
                await player.showText("Go to the feast fire and offer food to celebrate our friendship.", { talkWith: this })
                player.setVariable('quest_4f', 'active')
            } else {
                await player.showText("Go to the feast fire in the center of the village.", { talkWith: this })
            }
            return
        }

        if (q4f === 'complete') {
            await player.showText("You are part of our family now, Samuel. Go back to Jamestown — but remember, we are always here.", { talkWith: this })
            player.setVariable('current_quest', 5)
            return
        }
    }
}
