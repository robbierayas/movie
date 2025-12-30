import { CHARACTER_HEIGHT, CHARACTER_SCALE, ROTATION } from '../../utils.js';

/**
 * Act 1 Scene 6 - Lab Introduction and First Test
 * ~7 minutes long (420 seconds)
 *
 * CHARACTER MARKS (final positions after entrance):
 * - Morris:  { x: -8,  y: 0.1, z: -5   } // Chalkboard area
 * - Darius:  { x: -1,  y: 0.1, z: 10   } // Transmitter
 * - Sofia:   { x: -9,  y: 0.1, z: -2   } // Chalkboard area
 * - Nina:    { x: -11, y: 0.1, z: -5   } // Chalkboard
 * - Rashid:  { x: -11, y: 0.1, z: -3.5 } // Chalkboard
 * - Chen:    { x: 1,   y: 0.1, z: 10   } // Transmitter
 * - Yuki:    { x: -11, y: 0.1, z: -6.5 } // Chalkboard
 *
 * DOOR ENTRANCE: { x: -7, z: -11 } (north wall)
 */
export const sceneConfig = {
    // Scene timeline (~420 seconds = 7 minutes)
    events: {
        sceneStart: 0,
        labReveal: 8000,
        teamEnters: 15000,
        teamComing: 20000,     // Still entering, camera watches
        spreadOut: 25000,       // Team spreads out to positions
        atMarks: 42000,         // Team reaches their marks (17s walk time)
        dariusChenTalk: 45000,  // Darius asks Chen about transmitter
        morrisNinaChalkboard: 59000, // Morris asks about equations
        yukiFixesEquation: 102000, // Yuki corrects equation
        sofiaBarryDesk: 122000,   // Sofia at Barry's desk
        dariusComment: 142000,    // Darius "He has kids, too"
        sofiaStory: 155000,       // Sofia tells sof-tak story
        dariusAsksDemo: 189000,   // Darius asks for demo
        chenHesitates: 202000,    // Chen "as long as it's not alive"
        morrisOffersSoftak: 229000, // Morris offers sof-tak
        teamGathers: 239000,      // Team gathers around transmitter
        atTransmitter: 259000,    // All at transmitter
        countdown: 267000,        // Chen counts down
        transmission: 272000,     // Transmission effect
        morrisReacts: 292000,     // Morris "It's beautiful"
        dariusGone: 312000,       // Darius "It's gone"
        chenExplains: 317000,     // Chen explains transmission
        chenShutdown: 339000,     // Chen shutting down
        dariusJoke: 352000,       // Darius "probably not getting that back"
        messageReturns: 362000,   // Message returns
        chenPicksUp: 372000,      // Chen picks up fragment
        messageRevealed: 382000,  // Message revealed: WE'RE ALL DYING
        teamHorror: 385000,       // Team reacts in horror
        sofiaQuestion: 397000,    // Sofia "Who wrote this?"
        morrisStammers: 402000,   // Morris stammering
        realization: 415000,      // Team realizes what happened
        sofiaChallenge: 417000,   // Sofia challenges Chen
        sceneEnd: 420000          // Fade to black
    },

    characters: [
        // MORRIS - Food scientist, curious about science
        {
            id: 'morris',
            name: 'Morris',
            scale: CHARACTER_SCALE,
            actions: [
                // Walk from door to chalkboard mark
                {
                    type: 'walk',
                    event: 'spreadOut',
                    delay: 0,
                    startPosition: { x: -7, y: CHARACTER_HEIGHT.WALKING, z: -11 },
                    endPosition: { x: -8, y: CHARACTER_HEIGHT.WALKING, z: -5 },
                    distancePerCycle: 2
                },
                // Stand at mark
                {
                    type: 'standing',
                    event: 'atMarks',
                    delay: 0,
                    startPosition: { x: -8, y: CHARACTER_HEIGHT.STANDING, z: -5 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 }
                },
                // Face Nina for chalkboard conversation
                {
                    type: 'face',
                    targetCharacter: 'nina',
                    event: 'morrisNinaChalkboard',
                    delay: 0
                },
                // Talk asking about equations (lines 146-148)
                {
                    type: 'talking',
                    event: 'morrisNinaChalkboard',
                    delay: 0,
                    duration: 3000
                },
                {
                    type: 'standing',
                    event: 'morrisNinaChalkboard',
                    delay: 3000,
                    startPosition: { x: -8, y: CHARACTER_HEIGHT.STANDING, z: -5 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 }
                },
                // Talk asking "Like... all their memories?" (line 159)
                {
                    type: 'talking',
                    event: 'morrisNinaChalkboard',
                    delay: 10000,
                    duration: 2000
                },
                {
                    type: 'standing',
                    event: 'morrisNinaChalkboard',
                    delay: 12000,
                    startPosition: { x: -8, y: CHARACTER_HEIGHT.STANDING, z: -5 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 }
                },
                // Talk "But it's not necessarily lost yet" (line 177)
                {
                    type: 'talking',
                    event: 'morrisNinaChalkboard',
                    delay: 30000,
                    duration: 2000
                },
                {
                    type: 'standing',
                    event: 'morrisNinaChalkboard',
                    delay: 32000,
                    startPosition: { x: -8, y: CHARACTER_HEIGHT.STANDING, z: -5 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 }
                },
                // Talk "Can it be prevented?" (lines 196-197)
                {
                    type: 'talking',
                    event: 'morrisNinaChalkboard',
                    delay: 40000,
                    duration: 2000
                },
                {
                    type: 'standing',
                    event: 'morrisNinaChalkboard',
                    delay: 42000,
                    startPosition: { x: -8, y: CHARACTER_HEIGHT.STANDING, z: -5 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 }
                },
                // Walk to transmitter for demo
                {
                    type: 'walk',
                    event: 'teamGathers',
                    delay: 0,
                    startPosition: { x: -8, y: CHARACTER_HEIGHT.WALKING, z: -5 },
                    endPosition: { x: -1, y: CHARACTER_HEIGHT.WALKING, z: 8 },
                    distancePerCycle: 2
                },
                // Stand at transmitter
                {
                    type: 'standing',
                    event: 'atTransmitter',
                    delay: 0,
                    startPosition: { x: -1, y: CHARACTER_HEIGHT.STANDING, z: 8 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                },
                // Talk "Not... alive?" (lines 284-285)
                {
                    type: 'talking',
                    event: 'chenHesitates',
                    delay: 10000,
                    duration: 3000
                },
                {
                    type: 'standing',
                    event: 'chenHesitates',
                    delay: 13000,
                    startPosition: { x: -1, y: CHARACTER_HEIGHT.STANDING, z: 8 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                },
                // Talk offering sof-tak (lines 302-305)
                {
                    type: 'talking',
                    event: 'morrisOffersSoftak',
                    delay: 0,
                    duration: 4000
                },
                {
                    type: 'standing',
                    event: 'morrisOffersSoftak',
                    delay: 4000,
                    startPosition: { x: -1, y: CHARACTER_HEIGHT.STANDING, z: 8 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                },
                // Talk "It's beautiful..." (line 322)
                {
                    type: 'talking',
                    event: 'morrisReacts',
                    delay: 0,
                    duration: 2000
                },
                {
                    type: 'standing',
                    event: 'morrisReacts',
                    delay: 2000,
                    startPosition: { x: -1, y: CHARACTER_HEIGHT.STANDING, z: 8 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                },
                // Talk "And it's... somewhere, right?" (lines 346-347)
                {
                    type: 'talking',
                    event: 'chenExplains',
                    delay: 3000,
                    duration: 3000
                },
                {
                    type: 'standing',
                    event: 'chenExplains',
                    delay: 6000,
                    startPosition: { x: -1, y: CHARACTER_HEIGHT.STANDING, z: 8 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                },
                // Talk stammering about message (lines 429-433)
                {
                    type: 'talking',
                    event: 'morrisStammers',
                    delay: 0,
                    duration: 8000
                },
                {
                    type: 'standing',
                    event: 'morrisStammers',
                    delay: 8000,
                    startPosition: { x: -1, y: CHARACTER_HEIGHT.STANDING, z: 8 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                }
            ]
        },

        // DARIUS - Food scientist, goes to transmitter
        {
            id: 'darius',
            name: 'Darius',
            scale: CHARACTER_SCALE,
            actions: [
                // Walk from door to waypoint (avoid west desks)
                {
                    type: 'walk',
                    event: 'spreadOut',
                    delay: 200,
                    startPosition: { x: -7, y: CHARACTER_HEIGHT.WALKING, z: -11 },
                    endPosition: { x: -9, y: CHARACTER_HEIGHT.WALKING, z: -6 },
                    distancePerCycle: 2
                },
                // Walk from waypoint to transmitter mark
                {
                    type: 'walk',
                    event: 'spreadOut',
                    delay: 3500,
                    startPosition: { x: -9, y: CHARACTER_HEIGHT.WALKING, z: -6 },
                    endPosition: { x: -1, y: CHARACTER_HEIGHT.WALKING, z: 10 },
                    distancePerCycle: 2
                },
                // Stand at mark
                {
                    type: 'standing',
                    event: 'atMarks',
                    delay: 0,
                    startPosition: { x: -1, y: CHARACTER_HEIGHT.STANDING, z: 10 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                },
                // Face Chen to ask about transmitter
                {
                    type: 'face',
                    targetCharacter: 'chen',
                    event: 'dariusChenTalk',
                    delay: 0
                },
                // Talk asking about transmitter (lines 111-142)
                {
                    type: 'talking',
                    event: 'dariusChenTalk',
                    delay: 0,
                    duration: 12000
                },
                {
                    type: 'standing',
                    event: 'dariusChenTalk',
                    delay: 12000,
                    startPosition: { x: -1, y: CHARACTER_HEIGHT.STANDING, z: 10 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                },
                // Face Sofia for comment about Barry
                {
                    type: 'face',
                    targetCharacter: 'sofia',
                    event: 'dariusComment',
                    delay: 0
                },
                // Talk "He has kids, too" (lines 228-231)
                {
                    type: 'talking',
                    event: 'dariusComment',
                    delay: 0,
                    duration: 2000
                },
                {
                    type: 'standing',
                    event: 'dariusComment',
                    delay: 2000,
                    startPosition: { x: -1, y: CHARACTER_HEIGHT.STANDING, z: 10 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                },
                // Talk during Sofia's story "You already know..." (lines 248-252)
                {
                    type: 'talking',
                    event: 'sofiaStory',
                    delay: 15000,
                    duration: 3000
                },
                {
                    type: 'standing',
                    event: 'sofiaStory',
                    delay: 18000,
                    startPosition: { x: -1, y: CHARACTER_HEIGHT.STANDING, z: 10 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                },
                // Face Chen to ask for demo
                {
                    type: 'face',
                    targetCharacter: 'chen',
                    event: 'dariusAsksDemo',
                    delay: 0
                },
                // Talk asking for demo (lines 265-274)
                {
                    type: 'talking',
                    event: 'dariusAsksDemo',
                    delay: 0,
                    duration: 10000
                },
                {
                    type: 'standing',
                    event: 'dariusAsksDemo',
                    delay: 10000,
                    startPosition: { x: -1, y: CHARACTER_HEIGHT.STANDING, z: 10 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                },
                // Already at transmitter, just turn for demo
                {
                    type: 'standing',
                    event: 'atTransmitter',
                    delay: 0,
                    startPosition: { x: -1, y: CHARACTER_HEIGHT.STANDING, z: 10 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Talk "It's gone" (line 338)
                {
                    type: 'talking',
                    event: 'dariusGone',
                    delay: 0,
                    duration: 2000
                },
                {
                    type: 'standing',
                    event: 'dariusGone',
                    delay: 2000,
                    startPosition: { x: -1, y: CHARACTER_HEIGHT.STANDING, z: 10 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Talk joke "probably not getting that back"
                {
                    type: 'talking',
                    event: 'dariusJoke',
                    delay: 0,
                    duration: 3000
                },
                {
                    type: 'standing',
                    event: 'dariusJoke',
                    delay: 3000,
                    startPosition: { x: -1, y: CHARACTER_HEIGHT.STANDING, z: 10 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Talk "Barry. Or whoever's with him" (lines 410-412)
                {
                    type: 'talking',
                    event: 'realization',
                    delay: 0,
                    duration: 3000
                },
                {
                    type: 'standing',
                    event: 'realization',
                    delay: 3000,
                    startPosition: { x: -1, y: CHARACTER_HEIGHT.STANDING, z: 10 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Talk "When you sent the sof-tak through..." (lines 435-437)
                {
                    type: 'talking',
                    event: 'realization',
                    delay: 5000,
                    duration: 3000
                },
                {
                    type: 'standing',
                    event: 'realization',
                    delay: 8000,
                    startPosition: { x: -1, y: CHARACTER_HEIGHT.STANDING, z: 10 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                }
            ]
        },

        // SOFIA - Lab chemist, moves to Barry's desk
        {
            id: 'sofia',
            name: 'Sofia',
            scale: CHARACTER_SCALE,
            actions: [
                // Walk from door to chalkboard area
                {
                    type: 'walk',
                    event: 'spreadOut',
                    delay: 400,
                    startPosition: { x: -7, y: CHARACTER_HEIGHT.WALKING, z: -11 },
                    endPosition: { x: -9, y: CHARACTER_HEIGHT.WALKING, z: -2 },
                    distancePerCycle: 2
                },
                // Stand at chalkboard
                {
                    type: 'standing',
                    event: 'atMarks',
                    delay: 0,
                    startPosition: { x: -9, y: CHARACTER_HEIGHT.STANDING, z: -2 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 }
                },
                // Walk to Barry's desk
                {
                    type: 'walk',
                    event: 'sofiaBarryDesk',
                    delay: 0,
                    startPosition: { x: -9, y: CHARACTER_HEIGHT.WALKING, z: -2 },
                    endPosition: { x: -8, y: CHARACTER_HEIGHT.WALKING, z: 3.5 },
                    distancePerCycle: 1.5
                },
                // Stand at Barry's desk
                {
                    type: 'standing',
                    event: 'sofiaBarryDesk',
                    delay: 5000,
                    startPosition: { x: -8, y: CHARACTER_HEIGHT.STANDING, z: 3.5 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 }
                },
                // Talk "This was Barry's workspace?" (line 217-218)
                {
                    type: 'talking',
                    event: 'sofiaBarryDesk',
                    delay: 5000,
                    duration: 3000
                },
                {
                    type: 'standing',
                    event: 'sofiaBarryDesk',
                    delay: 8000,
                    startPosition: { x: -8, y: CHARACTER_HEIGHT.STANDING, z: 3.5 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 }
                },
                // Return to group
                {
                    type: 'walk',
                    event: 'sofiaStory',
                    delay: 0,
                    startPosition: { x: -8, y: CHARACTER_HEIGHT.WALKING, z: 3.5 },
                    endPosition: { x: -4, y: CHARACTER_HEIGHT.WALKING, z: 0 },
                    distancePerCycle: 1.5
                },
                // Stand for story
                {
                    type: 'standing',
                    event: 'sofiaStory',
                    delay: 5000,
                    startPosition: { x: -4, y: CHARACTER_HEIGHT.STANDING, z: 0 },
                    rotation: { x: 0, y: ROTATION.EAST, z: 0 }
                },
                // Talk telling sof-tak story (lines 235-263)
                {
                    type: 'talking',
                    event: 'sofiaStory',
                    delay: 5000,
                    duration: 25000
                },
                {
                    type: 'standing',
                    event: 'sofiaStory',
                    delay: 30000,
                    startPosition: { x: -4, y: CHARACTER_HEIGHT.STANDING, z: 0 },
                    rotation: { x: 0, y: ROTATION.EAST, z: 0 }
                },
                // Talk "Well, we're not going to send a person" (lines 291-293)
                {
                    type: 'talking',
                    event: 'chenHesitates',
                    delay: 17000,
                    duration: 3000
                },
                {
                    type: 'standing',
                    event: 'chenHesitates',
                    delay: 20000,
                    startPosition: { x: -4, y: CHARACTER_HEIGHT.STANDING, z: 0 },
                    rotation: { x: 0, y: ROTATION.EAST, z: 0 }
                },
                // Walk to transmitter
                {
                    type: 'walk',
                    event: 'teamGathers',
                    delay: 200,
                    startPosition: { x: -4, y: CHARACTER_HEIGHT.WALKING, z: 0 },
                    endPosition: { x: -2.5, y: CHARACTER_HEIGHT.WALKING, z: 8.5 },
                    distancePerCycle: 2
                },
                // Stand at transmitter
                {
                    type: 'standing',
                    event: 'atTransmitter',
                    delay: 0,
                    startPosition: { x: -2.5, y: CHARACTER_HEIGHT.STANDING, z: 8.5 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                },
                // Talk "Can you bring it back?" (lines 352-353)
                {
                    type: 'talking',
                    event: 'chenExplains',
                    delay: 10000,
                    duration: 2000
                },
                {
                    type: 'standing',
                    event: 'chenExplains',
                    delay: 12000,
                    startPosition: { x: -2.5, y: CHARACTER_HEIGHT.STANDING, z: 8.5 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                },
                // Face Chen for question
                {
                    type: 'face',
                    targetCharacter: 'chen',
                    event: 'sofiaQuestion',
                    delay: 0
                },
                // Talk "Who wrote this?" (lines 402-404)
                {
                    type: 'talking',
                    event: 'sofiaQuestion',
                    delay: 0,
                    duration: 2000
                },
                {
                    type: 'standing',
                    event: 'sofiaQuestion',
                    delay: 2000,
                    startPosition: { x: -2.5, y: CHARACTER_HEIGHT.STANDING, z: 8.5 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                },
                // Talk final challenge (lines 443-446)
                {
                    type: 'talking',
                    event: 'sofiaChallenge',
                    delay: 0,
                    duration: 8000
                },
                {
                    type: 'standing',
                    event: 'sofiaChallenge',
                    delay: 8000,
                    startPosition: { x: -2.5, y: CHARACTER_HEIGHT.STANDING, z: 8.5 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                }
            ]
        },

        // NINA - Mathematician, explains memory erasure
        {
            id: 'nina',
            name: 'Nina',
            scale: CHARACTER_SCALE,
            actions: [
                // Walk from door to chalkboard
                {
                    type: 'walk',
                    event: 'spreadOut',
                    delay: 600,
                    startPosition: { x: -7, y: CHARACTER_HEIGHT.WALKING, z: -11 },
                    endPosition: { x: -11, y: CHARACTER_HEIGHT.WALKING, z: -5 },
                    distancePerCycle: 2
                },
                // Stand at chalkboard
                {
                    type: 'standing',
                    event: 'atMarks',
                    delay: 0,
                    startPosition: { x: -11, y: CHARACTER_HEIGHT.STANDING, z: -5 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 }
                },
                // Face Morris to explain
                {
                    type: 'face',
                    targetCharacter: 'morris',
                    event: 'morrisNinaChalkboard',
                    delay: 3000
                },
                // Talk explaining memory erasure (lines 150-203)
                {
                    type: 'talking',
                    event: 'morrisNinaChalkboard',
                    delay: 3000,
                    duration: 40000
                },
                {
                    type: 'standing',
                    event: 'morrisNinaChalkboard',
                    delay: 43000,
                    startPosition: { x: -11, y: CHARACTER_HEIGHT.STANDING, z: -5 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 }
                },
                // Talk responding to Yuki "That's been wrong for three weeks" (line 208)
                {
                    type: 'talking',
                    event: 'yukiFixesEquation',
                    delay: 10000,
                    duration: 3000
                },
                {
                    type: 'standing',
                    event: 'yukiFixesEquation',
                    delay: 13000,
                    startPosition: { x: -11, y: CHARACTER_HEIGHT.STANDING, z: -5 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 }
                },
                // Walk to transmitter
                {
                    type: 'walk',
                    event: 'teamGathers',
                    delay: 400,
                    startPosition: { x: -11, y: CHARACTER_HEIGHT.WALKING, z: -5 },
                    endPosition: { x: 1.5, y: CHARACTER_HEIGHT.WALKING, z: 8 },
                    distancePerCycle: 2
                },
                // Stand at transmitter
                {
                    type: 'standing',
                    event: 'atTransmitter',
                    delay: 0,
                    startPosition: { x: 1.5, y: CHARACTER_HEIGHT.STANDING, z: 8 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                },
                // Talk "What about something simple?" (lines 299-300)
                {
                    type: 'talking',
                    event: 'chenHesitates',
                    delay: 22000,
                    duration: 3000
                },
                {
                    type: 'standing',
                    event: 'chenHesitates',
                    delay: 25000,
                    startPosition: { x: 1.5, y: CHARACTER_HEIGHT.STANDING, z: 8 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                },
                // Talk "The spatial coordinates are just... vanishing" (lines 325-327)
                {
                    type: 'talking',
                    event: 'transmission',
                    delay: 5000,
                    duration: 3000
                },
                {
                    type: 'standing',
                    event: 'transmission',
                    delay: 8000,
                    startPosition: { x: 1.5, y: CHARACTER_HEIGHT.STANDING, z: 8 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                },
                // Talk "Chen, what's happening?" (line 376)
                {
                    type: 'talking',
                    event: 'messageReturns',
                    delay: 5000,
                    duration: 2000
                },
                {
                    type: 'standing',
                    event: 'messageReturns',
                    delay: 7000,
                    startPosition: { x: 1.5, y: CHARACTER_HEIGHT.STANDING, z: 8 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                },
                // Talk "They're in root-space with it" (lines 414-416)
                {
                    type: 'talking',
                    event: 'realization',
                    delay: 3000,
                    duration: 3000
                },
                {
                    type: 'standing',
                    event: 'realization',
                    delay: 6000,
                    startPosition: { x: 1.5, y: CHARACTER_HEIGHT.STANDING, z: 8 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                }
            ]
        },

        // RASHID - Background mathematician
        {
            id: 'rashid',
            name: 'Rashid',
            scale: CHARACTER_SCALE,
            actions: [
                // Walk from door to chalkboard
                {
                    type: 'walk',
                    event: 'spreadOut',
                    delay: 800,
                    startPosition: { x: -7, y: CHARACTER_HEIGHT.WALKING, z: -11 },
                    endPosition: { x: -11, y: CHARACTER_HEIGHT.WALKING, z: -3.5 },
                    distancePerCycle: 2
                },
                // Stand at chalkboard
                {
                    type: 'standing',
                    event: 'atMarks',
                    delay: 0,
                    startPosition: { x: -11, y: CHARACTER_HEIGHT.STANDING, z: -3.5 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 }
                },
                // Talk "Oh. Yeah." (lines 189-192)
                {
                    type: 'talking',
                    event: 'yukiFixesEquation',
                    delay: 5000,
                    duration: 2000
                },
                {
                    type: 'standing',
                    event: 'yukiFixesEquation',
                    delay: 7000,
                    startPosition: { x: -11, y: CHARACTER_HEIGHT.STANDING, z: -3.5 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 }
                },
                // Talk "Barry kept saying he'd fix it" (lines 210-213)
                {
                    type: 'talking',
                    event: 'yukiFixesEquation',
                    delay: 15000,
                    duration: 3000
                },
                {
                    type: 'standing',
                    event: 'yukiFixesEquation',
                    delay: 18000,
                    startPosition: { x: -11, y: CHARACTER_HEIGHT.STANDING, z: -3.5 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 }
                },
                // Walk to transmitter
                {
                    type: 'walk',
                    event: 'teamGathers',
                    delay: 500,
                    startPosition: { x: -11, y: CHARACTER_HEIGHT.WALKING, z: -3.5 },
                    endPosition: { x: 2.5, y: CHARACTER_HEIGHT.WALKING, z: 9 },
                    distancePerCycle: 2
                },
                // Stand at transmitter
                {
                    type: 'standing',
                    event: 'atTransmitter',
                    delay: 0,
                    startPosition: { x: 2.5, y: CHARACTER_HEIGHT.STANDING, z: 9 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                },
                // Talk responding to Yuki "Theoretically? It's a singularity point—" (lines 333-335)
                {
                    type: 'talking',
                    event: 'transmission',
                    delay: 10000,
                    duration: 3000
                },
                {
                    type: 'standing',
                    event: 'transmission',
                    delay: 13000,
                    startPosition: { x: 2.5, y: CHARACTER_HEIGHT.STANDING, z: 9 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                },
                // Talk "And they're dying" (lines 426-427)
                {
                    type: 'talking',
                    event: 'realization',
                    delay: 8000,
                    duration: 2000
                },
                {
                    type: 'standing',
                    event: 'realization',
                    delay: 10000,
                    startPosition: { x: 2.5, y: CHARACTER_HEIGHT.STANDING, z: 9 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                }
            ]
        },

        // CHEN - Electrical engineer, runs transmitter
        {
            id: 'chen',
            name: 'Chen',
            scale: CHARACTER_SCALE,
            actions: [
                // Walk from door to waypoint (avoid west desks)
                {
                    type: 'walk',
                    event: 'spreadOut',
                    delay: 1000,
                    startPosition: { x: -7, y: CHARACTER_HEIGHT.WALKING, z: -11 },
                    endPosition: { x: -9, y: CHARACTER_HEIGHT.WALKING, z: -6.5 },
                    distancePerCycle: 2
                },
                // Walk from waypoint to transmitter
                {
                    type: 'walk',
                    event: 'spreadOut',
                    delay: 4000,
                    startPosition: { x: -9, y: CHARACTER_HEIGHT.WALKING, z: -6.5 },
                    endPosition: { x: 1, y: CHARACTER_HEIGHT.WALKING, z: 10 },
                    distancePerCycle: 2
                },
                // Stand at transmitter
                {
                    type: 'standing',
                    event: 'atMarks',
                    delay: 0,
                    startPosition: { x: 1, y: CHARACTER_HEIGHT.STANDING, z: 10 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                },
                // Face Darius to respond
                {
                    type: 'face',
                    targetCharacter: 'darius',
                    event: 'dariusChenTalk',
                    delay: 3000
                },
                // Talk responding to Darius (lines 116-142)
                {
                    type: 'talking',
                    event: 'dariusChenTalk',
                    delay: 3000,
                    duration: 11000
                },
                {
                    type: 'standing',
                    event: 'dariusChenTalk',
                    delay: 14000,
                    startPosition: { x: 1, y: CHARACTER_HEIGHT.STANDING, z: 10 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                },
                // Talk about Barry's desk (lines 222-224)
                {
                    type: 'talking',
                    event: 'sofiaBarryDesk',
                    delay: 10000,
                    duration: 5000
                },
                {
                    type: 'standing',
                    event: 'sofiaBarryDesk',
                    delay: 15000,
                    startPosition: { x: 1, y: CHARACTER_HEIGHT.STANDING, z: 10 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                },
                // Talk "as long as it's not alive" (lines 276-297)
                {
                    type: 'talking',
                    event: 'chenHesitates',
                    delay: 0,
                    duration: 22000
                },
                {
                    type: 'standing',
                    event: 'chenHesitates',
                    delay: 22000,
                    startPosition: { x: 1, y: CHARACTER_HEIGHT.STANDING, z: 10 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                },
                // Already at transmitter, turn for demo
                {
                    type: 'standing',
                    event: 'atTransmitter',
                    delay: 0,
                    startPosition: { x: 1, y: CHARACTER_HEIGHT.STANDING, z: 10 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Talk "Sof-tak works" (line 307-308)
                {
                    type: 'talking',
                    event: 'morrisOffersSoftak',
                    delay: 5000,
                    duration: 2000
                },
                {
                    type: 'standing',
                    event: 'morrisOffersSoftak',
                    delay: 7000,
                    startPosition: { x: 1, y: CHARACTER_HEIGHT.STANDING, z: 10 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Talk countdown (lines 312-316)
                {
                    type: 'talking',
                    event: 'countdown',
                    delay: 0,
                    duration: 5000
                },
                {
                    type: 'standing',
                    event: 'countdown',
                    delay: 5000,
                    startPosition: { x: 1, y: CHARACTER_HEIGHT.STANDING, z: 10 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Talk explaining (lines 343-358)
                {
                    type: 'talking',
                    event: 'chenExplains',
                    delay: 0,
                    duration: 20000
                },
                {
                    type: 'standing',
                    event: 'chenExplains',
                    delay: 20000,
                    startPosition: { x: 1, y: CHARACTER_HEIGHT.STANDING, z: 10 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Talk "That's the demo" (line 362-363)
                {
                    type: 'talking',
                    event: 'chenShutdown',
                    delay: 0,
                    duration: 3000
                },
                {
                    type: 'standing',
                    event: 'chenShutdown',
                    delay: 3000,
                    startPosition: { x: 1, y: CHARACTER_HEIGHT.STANDING, z: 10 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Talk "That's not supposed to—" (lines 369-379)
                {
                    type: 'talking',
                    event: 'messageReturns',
                    delay: 0,
                    duration: 10000
                },
                {
                    type: 'standing',
                    event: 'messageReturns',
                    delay: 10000,
                    startPosition: { x: 1, y: CHARACTER_HEIGHT.STANDING, z: 10 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Talk "They grabbed it..." (lines 418-420)
                {
                    type: 'talking',
                    event: 'realization',
                    delay: 6000,
                    duration: 3000
                },
                {
                    type: 'standing',
                    event: 'realization',
                    delay: 9000,
                    startPosition: { x: 1, y: CHARACTER_HEIGHT.STANDING, z: 10 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                }
            ]
        },

        // YUKI - Background mathematician, corrects equation
        {
            id: 'yuki',
            name: 'Yuki',
            scale: CHARACTER_SCALE,
            actions: [
                // Walk from door to chalkboard
                {
                    type: 'walk',
                    event: 'spreadOut',
                    delay: 1200,
                    startPosition: { x: -7, y: CHARACTER_HEIGHT.WALKING, z: -11 },
                    endPosition: { x: -11, y: CHARACTER_HEIGHT.WALKING, z: -6.5 },
                    distancePerCycle: 2
                },
                // Stand at chalkboard
                {
                    type: 'standing',
                    event: 'atMarks',
                    delay: 0,
                    startPosition: { x: -11, y: CHARACTER_HEIGHT.STANDING, z: -6.5 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 }
                },
                // Talk correcting equation (lines 179-194)
                {
                    type: 'talking',
                    event: 'yukiFixesEquation',
                    delay: 0,
                    duration: 10000
                },
                {
                    type: 'standing',
                    event: 'yukiFixesEquation',
                    delay: 10000,
                    startPosition: { x: -11, y: CHARACTER_HEIGHT.STANDING, z: -6.5 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 }
                },
                // Walk to transmitter
                {
                    type: 'walk',
                    event: 'teamGathers',
                    delay: 600,
                    startPosition: { x: -11, y: CHARACTER_HEIGHT.WALKING, z: -6.5 },
                    endPosition: { x: 3, y: CHARACTER_HEIGHT.WALKING, z: 8.5 },
                    distancePerCycle: 2
                },
                // Stand at transmitter
                {
                    type: 'standing',
                    event: 'atTransmitter',
                    delay: 0,
                    startPosition: { x: 3, y: CHARACTER_HEIGHT.STANDING, z: 8.5 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                },
                // Talk "Can you even measure zero dimensions?" (lines 329-331)
                {
                    type: 'talking',
                    event: 'transmission',
                    delay: 8000,
                    duration: 3000
                },
                {
                    type: 'standing',
                    event: 'transmission',
                    delay: 11000,
                    startPosition: { x: 3, y: CHARACTER_HEIGHT.STANDING, z: 8.5 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                },
                // Talk "They're conscious..." (lines 422-424)
                {
                    type: 'talking',
                    event: 'realization',
                    delay: 7000,
                    duration: 2000
                },
                {
                    type: 'standing',
                    event: 'realization',
                    delay: 9000,
                    startPosition: { x: 3, y: CHARACTER_HEIGHT.STANDING, z: 8.5 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                }
            ]
        }
    ],

    // Camera moves with variety and 160° dialogue geometry
    cameraMoves: [
        // 1. Opening - close on Barry's desk photo
        {
            event: 'sceneStart',
            delay: 0,
            type: 'cutToPosition',
            targetPos: { x: -7, y: 1.5, z: 3.5 },
            lookAt: { x: -6.5, y: 1.2, z: 3.5 }
        },

        // 2. Pull back to reveal lab, ending near door
        {
            event: 'labReveal',
            delay: 0,
            type: 'panToPosition',
            targetPos: { x: -7, y: 1.5, z: -11 },
            lookAt: { x: -2, y: 1.5, z: 0 },
            duration: 5000
        },

        // 3. Wide shot of door for team entrance
        {
            event: 'teamEnters',
            delay: 0,
            type: 'cutToPosition',
            targetPos: { x: -2, y: 2, z: -8 },
            lookAt: { x: -7, y: 1.5, z: -11 }
        },

        // 4. Camera stays on entrance, pans to equipment table
        {
            event: 'teamComing',
            delay: 0,
            type: 'panToPosition',
            targetPos: { x: 2, y: 2.5, z: -9.5 },
            lookAt: { x: -7, y: 1.5, z: -11 },
            duration: 5000
        },

        // 5. Track team spreading out - pan from equipment table to Barry's desk line
        {
            event: 'spreadOut',
            delay: 0,
            type: 'panKeepAngle',
            targetPos: { x: 2, y: 2.5, z: 3.5 },
            lookAt: { x: -9, y: 1.5, z: -8 },
            duration: 10000
        },

        // 5. Wide shot of team at marks
        {
            event: 'atMarks',
            delay: 0,
            type: 'cutToPosition',
            targetPos: { x: 0, y: 2.8, z: -3 },
            lookAt: { x: 0, y: 1.5, z: 3 }
        },

        // 6. Darius and Chen - 160° dialogue geometry
        // Darius at { x: -1, z: 10 }, Chen at { x: 1, z: 10 }
        // Center: { x: 0, z: 10 }, radius: 1.0, forward: 0° (east)
        {
            event: 'dariusChenTalk',
            delay: 0,
            type: 'panToPosition',
            targetPos: { x: -0.94, y: 1.55, z: 9.66 },
            lookAt: { x: -1, y: 1.6, z: 10 },
            duration: 2000
        },

        // 7. Morris and Nina chalkboard - 160° dialogue geometry
        // Morris at { x: -8, z: -5 }, Nina at { x: -11, z: -5 }
        // Center: { x: -9.5, z: -5 }, radius: 1.5, forward: 180° (west)
        {
            event: 'morrisNinaChalkboard',
            delay: 0,
            type: 'cutToPosition',
            targetPos: { x: -8.09, y: 1.55, z: -5.52 },
            lookAt: { x: -8, y: 1.6, z: -5 }
        },

        // 8. Track Nina during explanation
        {
            event: 'morrisNinaChalkboard',
            delay: 8000,
            type: 'trackCharacter',
            characterId: 'nina',
            offsetX: 2,
            offsetZ: -2,
            height: 1.5
        },

        // 9. Stop tracking, pan to Yuki fixing equation
        {
            event: 'yukiFixesEquation',
            delay: 0,
            type: 'stopTracking'
        },
        {
            event: 'yukiFixesEquation',
            delay: 100,
            type: 'panToPosition',
            targetPos: { x: -8, y: 1.8, z: -5 },
            lookAt: { x: -11, y: 1.7, z: -5.5 },
            duration: 2000
        },

        // 10. Track Sofia to Barry's desk
        {
            event: 'sofiaBarryDesk',
            delay: 0,
            type: 'trackCharacter',
            characterId: 'sofia',
            offsetX: 3,
            offsetZ: -2,
            height: 1.55
        },

        // 11. Stop tracking, close on Barry's photo
        {
            event: 'sofiaBarryDesk',
            delay: 6000,
            type: 'stopTracking'
        },
        {
            event: 'sofiaBarryDesk',
            delay: 6100,
            type: 'panToPosition',
            targetPos: { x: -5.5, y: 1.6, z: 3.5 },
            lookAt: { x: -6.5, y: 1.2, z: 3.5 },
            duration: 2000
        },

        // 12. Cut to Darius for quiet comment
        {
            event: 'dariusComment',
            delay: 0,
            type: 'cutToPosition',
            targetPos: { x: -3, y: 1.7, z: 9 },
            lookAt: { x: -1, y: 1.5, z: 10 }
        },

        // 13. Track Sofia returning for story
        {
            event: 'sofiaStory',
            delay: 0,
            type: 'trackCharacter',
            characterId: 'sofia',
            offsetX: 2,
            offsetZ: -2,
            height: 1.5
        },

        // 14. Stop tracking, wide for group story
        {
            event: 'sofiaStory',
            delay: 6000,
            type: 'stopTracking'
        },
        {
            event: 'sofiaStory',
            delay: 6100,
            type: 'cutToPosition',
            targetPos: { x: 0, y: 2.5, z: -3 },
            lookAt: { x: -2, y: 1.5, z: 2 }
        },

        // 15. Pan to Darius asking for demo
        {
            event: 'dariusAsksDemo',
            delay: 0,
            type: 'panToPosition',
            targetPos: { x: -2, y: 1.8, z: 8 },
            lookAt: { x: 0, y: 1.5, z: 10 },
            duration: 2000
        },

        // 16. Cut to Chen's hesitation
        {
            event: 'chenHesitates',
            delay: 0,
            type: 'cutToPosition',
            targetPos: { x: 3, y: 1.6, z: 9 },
            lookAt: { x: 1, y: 1.5, z: 10 }
        },

        // 17. Wide shot for team gathering
        {
            event: 'teamGathers',
            delay: 0,
            type: 'panToPosition',
            targetPos: { x: -4, y: 2.8, z: 4 },
            lookAt: { x: 0, y: 1.5, z: 9 },
            duration: 8000
        },

        // 18. Medium shot of transmitter with team
        {
            event: 'atTransmitter',
            delay: 0,
            type: 'cutToPosition',
            targetPos: { x: -3, y: 1.8, z: 6 },
            lookAt: { x: 0, y: 1.5, z: 10 }
        },

        // 19. Track Chen preparing
        {
            event: 'countdown',
            delay: 0,
            type: 'trackCharacter',
            characterId: 'chen',
            offsetX: 2,
            offsetZ: -1.5,
            height: 1.6
        },

        // 20. Stop tracking, close on transmitter core
        {
            event: 'transmission',
            delay: 0,
            type: 'stopTracking'
        },
        {
            event: 'transmission',
            delay: 100,
            type: 'panToPosition',
            targetPos: { x: 0, y: 2.4, z: 9 },
            lookAt: { x: 0, y: 2.5, z: 12 },
            duration: 3000
        },

        // 21. Pull back to see team reactions
        {
            event: 'morrisReacts',
            delay: 0,
            type: 'panToPosition',
            targetPos: { x: -2, y: 2, z: 6 },
            lookAt: { x: 0, y: 1.5, z: 10 },
            duration: 2000
        },

        // 22. Track Chen shutting down
        {
            event: 'chenShutdown',
            delay: 0,
            type: 'trackCharacter',
            characterId: 'chen',
            offsetX: 1.5,
            offsetZ: -1.5,
            height: 1.6
        },

        // 23. Stop tracking, hold on transmitter for message return
        {
            event: 'messageReturns',
            delay: 0,
            type: 'stopTracking'
        },
        {
            event: 'messageReturns',
            delay: 100,
            type: 'panToPosition',
            targetPos: { x: -1, y: 2, z: 9 },
            lookAt: { x: 0, y: 2, z: 12 },
            duration: 1500
        },

        // 24. Track Chen picking up fragment
        {
            event: 'chenPicksUp',
            delay: 0,
            type: 'trackCharacter',
            characterId: 'chen',
            offsetX: 1.5,
            offsetZ: -1,
            height: 1.6
        },

        // 25. Stop tracking, show message
        {
            event: 'messageRevealed',
            delay: 0,
            type: 'stopTracking'
        },
        {
            event: 'messageRevealed',
            delay: 100,
            type: 'panToPosition',
            targetPos: { x: 2, y: 1.7, z: 9 },
            lookAt: { x: 1, y: 1.6, z: 10 },
            duration: 1000
        },

        // 26. Wide shot for horror reaction
        {
            event: 'teamHorror',
            delay: 0,
            type: 'panToPosition',
            targetPos: { x: -4, y: 2.5, z: 5 },
            lookAt: { x: 0, y: 1.5, z: 10 },
            duration: 2000
        },

        // 27. Sofia questioning Chen - 160° dialogue geometry
        // Sofia at { x: -2.5, z: 8.5 }, Chen at { x: 1, z: 10 }
        // Center: { x: -0.75, z: 9.25 }, radius: 1.905, forward: 23° (northeast)
        {
            event: 'sofiaQuestion',
            delay: 0,
            type: 'cutToPosition',
            targetPos: { x: -2.65, y: 1.55, z: 9.06 },
            lookAt: { x: -2.5, y: 1.6, z: 8.5 }
        },

        // 28. Wide shot for realization
        {
            event: 'realization',
            delay: 0,
            type: 'cutToPosition',
            targetPos: { x: 0, y: 2.5, z: 4 },
            lookAt: { x: 0, y: 1.5, z: 9 }
        },

        // 29. Final shot on Sofia's challenge
        {
            event: 'sofiaChallenge',
            delay: 0,
            type: 'panToPosition',
            targetPos: { x: -3, y: 1.8, z: 6 },
            lookAt: { x: -1, y: 1.5, z: 9 },
            duration: 2000
        },

        // 30. Fade to black
        {
            event: 'sceneEnd',
            delay: 0,
            type: 'cutToPosition',
            targetPos: { x: 0, y: 2, z: 5 },
            lookAt: { x: 0, y: 1.5, z: 10 }
        }
    ],

    // Timeline actions
    timeline: [
        { event: 'sceneStart', delay: 0, action: 'sceneStart' },
        { event: 'labReveal', delay: 0, action: 'labReveal' },
        { event: 'teamEnters', delay: 0, action: 'teamEnters' },
        { event: 'teamComing', delay: 0, action: 'teamComing' },
        { event: 'spreadOut', delay: 0, action: 'spreadOut' },
        { event: 'atMarks', delay: 0, action: 'atMarks' },
        { event: 'dariusChenTalk', delay: 0, action: 'dariusChenTalk' },
        { event: 'morrisNinaChalkboard', delay: 0, action: 'morrisNinaChalkboard' },
        { event: 'yukiFixesEquation', delay: 0, action: 'yukiFixesEquation' },
        { event: 'sofiaBarryDesk', delay: 0, action: 'sofiaBarryDesk' },
        { event: 'dariusComment', delay: 0, action: 'dariusComment' },
        { event: 'sofiaStory', delay: 0, action: 'sofiaStory' },
        { event: 'dariusAsksDemo', delay: 0, action: 'dariusAsksDemo' },
        { event: 'chenHesitates', delay: 0, action: 'chenHesitates' },
        { event: 'morrisOffersSoftak', delay: 0, action: 'morrisOffersSoftak' },
        { event: 'teamGathers', delay: 0, action: 'teamGathers' },
        { event: 'atTransmitter', delay: 0, action: 'atTransmitter' },
        { event: 'countdown', delay: 0, action: 'countdown' },
        { event: 'transmission', delay: 0, action: 'transmission' },
        { event: 'morrisReacts', delay: 0, action: 'morrisReacts' },
        { event: 'dariusGone', delay: 0, action: 'dariusGone' },
        { event: 'chenExplains', delay: 0, action: 'chenExplains' },
        { event: 'chenShutdown', delay: 0, action: 'chenShutdown' },
        { event: 'dariusJoke', delay: 0, action: 'dariusJoke' },
        { event: 'messageReturns', delay: 0, action: 'messageReturns' },
        { event: 'chenPicksUp', delay: 0, action: 'chenPicksUp' },
        { event: 'messageRevealed', delay: 0, action: 'messageRevealed' },
        { event: 'teamHorror', delay: 0, action: 'teamHorror' },
        { event: 'sofiaQuestion', delay: 0, action: 'sofiaQuestion' },
        { event: 'morrisStammers', delay: 0, action: 'morrisStammers' },
        { event: 'realization', delay: 0, action: 'realization' },
        { event: 'sofiaChallenge', delay: 0, action: 'sofiaChallenge' },
        { event: 'sceneEnd', delay: 0, action: 'sceneEnd' }
    ]
};
