import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'

@EventData({
    name: 'reverend-hunt',
    hitbox: {
        width: 32,
        height: 16
    }
})
export default class ReverendHuntEvent extends RpgEvent {
    onInit() {
        this.setGraphic('hunt')
        this.setComponentsTop(Components.text('Rev. Robert Hunt'))
    }

    async onAction(player: RpgPlayer) {
        const quest1a = player.getVariable('quest_1a')

        if (!quest1a) {
            await player.showText("Welcome aboard the Susan Constant, child. I am Reverend Hunt.", {
                talkWith: this
            })
            await player.showText("Captain Smith is looking for a page. You should speak with him — he's at the bow of the ship.", {
                talkWith: this
            })
            return
        }

        if (quest1a === 'complete' && player.getVariable('quest_1b') === 'active') {
            await player.showText("Looking for supplies? I saw a crate near the mast and another by the stern.", {
                talkWith: this
            })
            return
        }

        await player.showText("Remember, Samuel — patience and kindness will serve you better than anger.", {
            talkWith: this
        })
        await player.showText("We are all in this together. Look after one another.", {
            talkWith: this
        })
    }
}
