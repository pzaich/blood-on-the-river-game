import { RpgEvent, EventData, RpgPlayer, Move, RpgWorld } from '@rpgjs/server'

function startBarrelMovement(player: RpgPlayer) {
    const barrelNames = ['barrel-1', 'barrel-2', 'barrel-3', 'barrel-4']
    const speeds = [900, 700, 600, 750]
    const intervals: any[] = []

    barrelNames.forEach((name, i) => {
        const interval = setInterval(async () => {
            if (player.getVariable('quest_1c') !== 'active') {
                intervals.forEach(iv => clearInterval(iv))
                return
            }
            try {
                const events = player.otherPlayersCollision || []
                // Find barrel event on the map and move it
                const map = (player as any).getCurrentMap?.()
                if (map) {
                    const ev = map.getEventByName?.(name) || map.events?.[name]
                    if (ev && ev.moveRoutes) {
                        await ev.moveRoutes([Move.tileRandom(2)])
                    }
                }
            } catch {}
        }, speeds[i])
        intervals.push(interval)
    })

    // Store intervals so we can clean up
    ;(player as any).__stormIntervals = intervals
}

function stopBarrelMovement(player: RpgPlayer) {
    const intervals = (player as any).__stormIntervals || []
    intervals.forEach((iv: any) => clearInterval(iv))
    ;(player as any).__stormIntervals = []
}

@EventData({
    name: 'captain-smith',
    hitbox: {
        width: 32,
        height: 16
    }
})
export default class CaptainSmithEvent extends RpgEvent {
    onInit() {
        this.setGraphic('smith')
    }

    async onAction(player: RpgPlayer) {
        const quest1a = player.getVariable('quest_1a')
        const quest1b = player.getVariable('quest_1b')
        const quest1c = player.getVariable('quest_1c')
        const currentQuest = player.getVariable('current_quest') || 0

        // Quest 1a: Meet Captain Smith
        if (!quest1a || quest1a === 'active') {
            await player.showText("You there, boy! I am Captain John Smith.", {
                talkWith: this
            })
            await player.showText("I need a capable page for our journey to Virginia. Someone brave and quick-witted.", {
                talkWith: this
            })
            const choice = await player.showChoices("Will you be my page?", [
                { text: "Yes, Captain!", value: 'yes' },
                { text: "Tell me more first.", value: 'more' }
            ])
            if (choice && choice.value === 'more') {
                await player.showText("We sail to the New World to build a settlement called Jamestown. It will be dangerous, but a great adventure!", {
                    talkWith: this
                })
                await player.showText("So what say you, lad? Will you join me?", {
                    talkWith: this
                })
                const choice2 = await player.showChoices("Join Captain Smith?", [
                    { text: "Yes, I'll join you!", value: 'yes' },
                    { text: "Not yet...", value: 'no' }
                ])
                if (!choice2 || choice2.value === 'no') {
                    await player.showText("Come back when you're ready, boy.", {
                        talkWith: this
                    })
                    return
                }
            }
            await player.showText("Excellent! Here, take this journal. Write down everything you see and learn.", {
                talkWith: this
            })
            player.setVariable('quest_1a', 'complete')
            player.setVariable('current_quest', 1)
            await player.showText("Now, we need supplies for the voyage. Find the 3 supply crates on the deck and bring them to me.", {
                talkWith: this
            })
            player.setVariable('quest_1b', 'active')
            player.setVariable('quest_1b_crates', 0)
            return
        }

        // Quest 1b: Check on supply crate progress
        if (quest1b === 'active') {
            const crates = player.getVariable('quest_1b_crates') || 0
            if (crates >= 3) {
                await player.showText("Well done, Samuel! You found all the supply crates!", {
                    talkWith: this
                })
                await player.showText("Take this knife. Every sailor needs one.", {
                    talkWith: this
                })
                player.setVariable('quest_1b', 'complete')
                player.setVariable('storm_hits', 0)
                player.setVariable('quest_1c', 'active')
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem('storm-active', 'true')
                }
                await player.showText("A storm is coming! Dodge the sliding barrels for 15 seconds!", {
                    talkWith: this
                })
                startBarrelMovement(player)
                setTimeout(() => {
                    stopBarrelMovement(player)
                    const hits = player.getVariable('storm_hits') || 0
                    if (hits < 3) {
                        player.setVariable('quest_1c', 'survived')
                    }
                    if (typeof localStorage !== 'undefined') {
                        localStorage.setItem('storm-active', 'false')
                    }
                }, 15000)
            } else {
                await player.showText(`You've found ${crates} of 3 supply crates. Keep searching the deck!`, {
                    talkWith: this
                })
            }
            return
        }

        // Quest 1c: Storm — restart if barrels aren't moving (player failed)
        if (quest1c === 'active') {
            const hits = player.getVariable('storm_hits') || 0
            if (hits === 0) {
                // Restart the storm
                player.setVariable('storm_hits', 0)
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem('storm-active', 'true')
                }
                await player.showText("Brace yourself, Samuel! Here comes the storm again! Dodge the barrels!", {
                    talkWith: this
                })
                startBarrelMovement(player)
                setTimeout(() => {
                    stopBarrelMovement(player)
                    const h = player.getVariable('storm_hits') || 0
                    if (h < 3) {
                        player.setVariable('quest_1c', 'survived')
                    }
                    if (typeof localStorage !== 'undefined') {
                        localStorage.setItem('storm-active', 'false')
                    }
                }, 15000)
            } else {
                await player.showText("Keep dodging, Samuel! The storm isn't over yet!", {
                    talkWith: this
                })
            }
            return
        }

        // Quest 1c: Survived the storm
        if (quest1c === 'survived') {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('storm-active', 'false')
            }
            await player.showText("The storm has passed! You have your sea legs now, Samuel!", {
                talkWith: this
            })
            await player.showText("Go below deck and talk to the other boys. Make some friends for the journey.", {
                talkWith: this
            })
            player.setVariable('quest_1c', 'complete')
            player.setVariable('quest_1d', 'active')
            return
        }

        // Quest 1d: Waiting for player to befriend Richard
        if (player.getVariable('quest_1d') === 'active') {
            await player.showText("Go below deck and find Richard Mutton. Share your bread with him — we need friends on this journey.", {
                talkWith: this
            })
            return
        }

        // Quest 1 complete
        if (player.getVariable('quest_1d') === 'complete') {
            await player.showText("We're almost to Virginia, Samuel. Get ready for a new world!", {
                talkWith: this
            })

            // Check if all Quest 1 is done - transition to Jamestown
            if (currentQuest === 1) {
                await player.showText("Land ho! Welcome to Virginia!", {
                    talkWith: this
                })
                player.setVariable('current_quest', 2)
                player.changeMap('jamestown')
            }
            return
        }

        // Default
        await player.showText("Keep moving, Samuel. There's work to be done.", {
            talkWith: this
        })
    }
}
