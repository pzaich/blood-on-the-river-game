import { Spritesheet, Presets } from '@rpgjs/client'

const { RMSpritesheet } = Presets

@Spritesheet({
    id: 'samuel',
    image: require('./samuel.png'),
    ...RMSpritesheet(3, 4)
})
export default class Characters {}

@Spritesheet({
    id: 'smith',
    image: require('./smith.png'),
    ...RMSpritesheet(3, 4)
})
export class SmithSprite {}

@Spritesheet({
    id: 'hunt',
    image: require('./hunt.png'),
    ...RMSpritesheet(3, 4)
})
export class HuntSprite {}

@Spritesheet({
    id: 'richard',
    image: require('./richard.png'),
    ...RMSpritesheet(3, 4)
})
export class RichardSprite {}

@Spritesheet({
    id: 'barrel',
    image: require('./barrel.png'),
    ...RMSpritesheet(3, 4)
})
export class BarrelSprite {}

@Spritesheet({
    id: 'crate',
    image: require('./crate.png'),
    ...RMSpritesheet(3, 4)
})
export class CrateSprite {}

@Spritesheet({
    id: 'hero',
    image: require('./hero.png'),
    ...RMSpritesheet(3, 4)
})
export class HeroSprite {}

@Spritesheet({
    id: 'female',
    image: require('./female.png'),
    ...RMSpritesheet(3, 4)
})
export class FemaleSprite {}
