import { CHARACTER_HEIGHT, CHARACTER_SCALE, ROTATION } from '../../../production/animation/utils.js';

export const sceneConfig = {
    // Main beats in the scene
    events: {
        sceneStart: 0,
        walkingToCoffee: 3000,
        alexAsksAboutEmployees: 10000,
        leaExplainsShift: 18000,
        alexCalmsLea: 25000
    },

    // Characters positioned on marks (NO movements yet)
    characters: [
        {
            id: 'alex',
            name: 'Alex',
            scale: CHARACTER_SCALE,
            actions: [
                {
                    type: 'standing',
                    event: 'sceneStart',
                    delay: 0,
                    startPosition: { x: 0, y: CHARACTER_HEIGHT.STANDING, z: 8 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                }
            ]
        },
        {
            id: 'lea',
            name: 'Lea',
            scale: CHARACTER_SCALE,
            actions: [
                {
                    type: 'standing',
                    event: 'sceneStart',
                    delay: 0,
                    startPosition: { x: 0.5, y: CHARACTER_HEIGHT.STANDING, z: 8.5 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                }
            ]
        }
    ],

    // Camera moves - empty for now
    cameraMoves: [],

    timeline: [
        { event: 'sceneStart', delay: 0, action: 'sceneStart' },
        { event: 'walkingToCoffee', delay: 0, action: 'walkingToCoffee' },
        { event: 'alexAsksAboutEmployees', delay: 0, action: 'alexAsksAboutEmployees' },
        { event: 'leaExplainsShift', delay: 0, action: 'leaExplainsShift' },
        { event: 'alexCalmsLea', delay: 0, action: 'alexCalmsLea' }
    ]
};
