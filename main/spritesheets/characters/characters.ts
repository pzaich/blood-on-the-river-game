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
    id: 'tree',
    image: require('./tree.png'),
    ...RMSpritesheet(3, 4)
})
export class TreeSprite {}

@Spritesheet({
    id: 'crab-sprite',
    image: require('./crab.png'),
    ...RMSpritesheet(3, 4)
})
export class CrabSprite {}

@Spritesheet({
    id: 'mussel-sprite',
    image: require('./mussel.png'),
    ...RMSpritesheet(3, 4)
})
export class MusselSprite {}

@Spritesheet({
    id: 'namontack-sprite',
    image: require('./namontack.png'),
    ...RMSpritesheet(3, 4)
})
export class NamontackSprite {}

@Spritesheet({
    id: 'deer-sprite',
    image: require('./deer.png'),
    ...RMSpritesheet(3, 4)
})
export class DeerSprite {}

@Spritesheet({
    id: 'rabbit-sprite',
    image: require('./rabbit.png'),
    ...RMSpritesheet(3, 4)
})
export class RabbitSprite {}

@Spritesheet({
    id: 'berry-sprite',
    image: require('./berry.png'),
    ...RMSpritesheet(3, 4)
})
export class BerrySprite {}

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
