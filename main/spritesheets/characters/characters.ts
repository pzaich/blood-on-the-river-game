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
    id: 'powhatan',
    image: require('./powhatan.png'),
    ...RMSpritesheet(3, 4)
})
export class PowhatanSprite {}

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
    id: 'chicken-sprite',
    image: require('./chicken.png'),
    ...RMSpritesheet(3, 4)
})
export class ChickenSprite {}

@Spritesheet({
    id: 'pig-sprite',
    image: require('./pig.png'),
    ...RMSpritesheet(3, 4)
})
export class PigSprite {}

@Spritesheet({
    id: 'turkey-sprite',
    image: require('./turkey.png'),
    ...RMSpritesheet(3, 4)
})
export class TurkeySprite {}

@Spritesheet({
    id: 'bear-sprite',
    image: require('./bear.png'),
    ...RMSpritesheet(3, 4)
})
export class BearSprite {}

@Spritesheet({
    id: 'corn-sprite',
    image: require('./corn.png'),
    ...RMSpritesheet(3, 4)
})
export class CornSprite {}

@Spritesheet({
    id: 'wall-sprite',
    image: require('./wall.png'),
    ...RMSpritesheet(3, 4)
})
export class WallSprite {}

@Spritesheet({
    id: 'squirrel-sprite',
    image: require('./squirrel.png'),
    ...RMSpritesheet(3, 4)
})
export class SquirrelSprite {}

@Spritesheet({
    id: 'wheat-sprite',
    image: require('./wheat.png'),
    ...RMSpritesheet(3, 4)
})
export class WheatSprite {}

@Spritesheet({
    id: 'carrot-sprite',
    image: require('./carrot.png'),
    ...RMSpritesheet(3, 4)
})
export class CarrotSprite {}

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
