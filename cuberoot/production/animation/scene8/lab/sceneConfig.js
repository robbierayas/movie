import { CHARACTER_HEIGHT, CHARACTER_SCALE, ROTATION } from '../../utils.js';

/**
 * Act 1 Scene 8 - The Lost Person Incident
 * ~7 minutes long (420 seconds)
 *
 * CHARACTER MARKS (final positions):
 * - marcus:  { x: 2.2,  y: 0.1, z: 9.7  } // Near transmitter, leaning
 * - edgar:   { x: 2.7,  y: 0.1, z: 9.2  } // To side with tablet
 * - alex:    { x: 2.0,  y: 0.1, z: 9.0  } // Center, examining skin
 * - lea:     { x: 3.3,  y: 0.1, z: 9.2  } // Near group, composed
 * - morris:  { x: 1.8,  y: 0.1, z: 8.2  } // Holding sof-tak skin
 * - darius:  { x: 0.5,  y: 0.1, z: 8.5  } // Close to Morris
 * - sofia:   { x: 1.2,  y: 0.1, z: 8.5  } // Between Morris and Darius
 * - nina:    { x: 4.2,  y: 0.1, z: 10.1 } // East side, observing
 * - rashid:  { x: 4.2,  y: 0.1, z: 10.9 } // Near Chen
 * - chen:    { x: 2.9,  y: 0.1, z: 11.3 } // South, near transmitter
 * - yuki:    { x: 3.8,  y: 0.1, z: 10.6 } // Between Nina and Chen
 *
 * DOOR ENTRANCE: { x: -7, z: -11 } (north wall)
 */
export const sceneConfig = {
    // Scene timeline (420 seconds = 7 minutes)
    events: {
        sceneStart: 0,
        hallwayWalk: 2000,
        labArrival: 5000,
        teamEnters: 8000,
        morrisQuestion: 10000,
        leaSitDown: 18000,
        teamSeated: 25000,
        marcusIntro: 30000,
        barryIncident: 35000,
        dariusReacts: 55000,
        leaAdmits: 62000,
        alexQuestions: 75000,
        marcusMessage: 90000,
        morrisRealization: 105000,
        dariusPlural: 125000,
        joshIncident: 135000,
        alexExpertComment: 165000,
        leaEmotional: 180000,
        edgarStaffing: 195000,
        sofiaChallenge: 210000,
        alexRedirect: 235000,
        strangeDetail: 245000,
        yukiRashidDebate: 275000,
        chenInterrupts: 290000,
        ninaData: 305000,
        dataReveal: 325000,
        teamGathersData: 345000,
        sceneEnd: 420000
    },

    characters: [
        // === ENTERING FROM HALLWAY ===

        // MARCUS - Head of QL, explains incidents
        {
            id: 'marcus',
            name: 'Marcus',
            scale: CHARACTER_SCALE,
            actions: [
                // Walk from door to mark
                {
                    type: 'walk',
                    event: 'teamEnters',
                    delay: 0,
                    startPosition: { x: -7, y: CHARACTER_HEIGHT.WALKING, z: -11 },
                    endPosition: { x: 2.2, y: CHARACTER_HEIGHT.WALKING, z: 9.7 },
                    distancePerCycle: 2
                },
                // Stand at mark
                {
                    type: 'standing',
                    event: 'teamSeated',
                    delay: 0,
                    startPosition: { x: 2.2, y: CHARACTER_HEIGHT.STANDING, z: 9.7 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Talk - "Before we go further..."
                {
                    type: 'talking',
                    event: 'marcusIntro',
                    delay: 0,
                    duration: 5000
                },
                {
                    type: 'standing',
                    event: 'marcusIntro',
                    delay: 5000,
                    startPosition: { x: 2.2, y: CHARACTER_HEIGHT.STANDING, z: 9.7 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Talk - Barry incident
                {
                    type: 'talking',
                    event: 'barryIncident',
                    delay: 0,
                    duration: 18000
                },
                {
                    type: 'standing',
                    event: 'barryIncident',
                    delay: 18000,
                    startPosition: { x: 2.2, y: CHARACTER_HEIGHT.STANDING, z: 9.7 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Talk - "We know he's safe"
                {
                    type: 'talking',
                    event: 'alexQuestions',
                    delay: 0,
                    duration: 2000
                },
                {
                    type: 'standing',
                    event: 'alexQuestions',
                    delay: 2000,
                    startPosition: { x: 2.2, y: CHARACTER_HEIGHT.STANDING, z: 9.7 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Talk - "Yes"
                {
                    type: 'talking',
                    event: 'alexQuestions',
                    delay: 3000,
                    duration: 1000
                },
                {
                    type: 'standing',
                    event: 'alexQuestions',
                    delay: 4000,
                    startPosition: { x: 2.2, y: CHARACTER_HEIGHT.STANDING, z: 9.7 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Talk - Message from Barry
                {
                    type: 'talking',
                    event: 'marcusMessage',
                    delay: 0,
                    duration: 5000
                },
                {
                    type: 'standing',
                    event: 'marcusMessage',
                    delay: 5000,
                    startPosition: { x: 2.2, y: CHARACTER_HEIGHT.STANDING, z: 9.7 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Talk - Josh incident
                {
                    type: 'talking',
                    event: 'joshIncident',
                    delay: 0,
                    duration: 25000
                },
                {
                    type: 'standing',
                    event: 'joshIncident',
                    delay: 25000,
                    startPosition: { x: 2.2, y: CHARACTER_HEIGHT.STANDING, z: 9.7 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Talk - Strange detail
                {
                    type: 'talking',
                    event: 'strangeDetail',
                    delay: 0,
                    duration: 12000
                },
                {
                    type: 'standing',
                    event: 'strangeDetail',
                    delay: 12000,
                    startPosition: { x: 2.2, y: CHARACTER_HEIGHT.STANDING, z: 9.7 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Talk - "What kind of data?"
                {
                    type: 'talking',
                    event: 'dataReveal',
                    delay: 0,
                    duration: 2000
                },
                {
                    type: 'standing',
                    event: 'dataReveal',
                    delay: 2000,
                    startPosition: { x: 2.2, y: CHARACTER_HEIGHT.STANDING, z: 9.7 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                }
            ]
        },

        // EDGAR - VP, oblivious
        {
            id: 'edgar',
            name: 'Edgar',
            scale: CHARACTER_SCALE,
            actions: [
                // Walk from door to mark
                {
                    type: 'walk',
                    event: 'teamEnters',
                    delay: 200,
                    startPosition: { x: -7, y: CHARACTER_HEIGHT.WALKING, z: -11 },
                    endPosition: { x: 2.7, y: CHARACTER_HEIGHT.WALKING, z: 9.2 },
                    distancePerCycle: 2
                },
                // Stand at mark
                {
                    type: 'standing',
                    event: 'teamSeated',
                    delay: 0,
                    startPosition: { x: 2.7, y: CHARACTER_HEIGHT.STANDING, z: 9.2 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Talk - Oblivious staffing comment
                {
                    type: 'talking',
                    event: 'edgarStaffing',
                    delay: 0,
                    duration: 13000
                },
                {
                    type: 'standing',
                    event: 'edgarStaffing',
                    delay: 13000,
                    startPosition: { x: 2.7, y: CHARACTER_HEIGHT.STANDING, z: 9.2 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                }
            ]
        },

        // ALEX - Food team lead, examining skin
        {
            id: 'alex',
            name: 'Alex',
            scale: CHARACTER_SCALE,
            actions: [
                // Walk from door to mark
                {
                    type: 'walk',
                    event: 'teamEnters',
                    delay: 400,
                    startPosition: { x: -7, y: CHARACTER_HEIGHT.WALKING, z: -11 },
                    endPosition: { x: 2.0, y: CHARACTER_HEIGHT.WALKING, z: 9.0 },
                    distancePerCycle: 2
                },
                // Stand at mark
                {
                    type: 'standing',
                    event: 'teamSeated',
                    delay: 0,
                    startPosition: { x: 2.0, y: CHARACTER_HEIGHT.STANDING, z: 9.0 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Face Marcus for questions
                {
                    type: 'face',
                    targetCharacter: 'marcus',
                    event: 'alexQuestions',
                    delay: 0
                },
                // Talk - "You know he's safe?"
                {
                    type: 'talking',
                    event: 'alexQuestions',
                    delay: 0,
                    duration: 2000
                },
                {
                    type: 'standing',
                    event: 'alexQuestions',
                    delay: 2000,
                    startPosition: { x: 2.0, y: CHARACTER_HEIGHT.STANDING, z: 9.0 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Talk - "In the death cube?"
                {
                    type: 'talking',
                    event: 'alexQuestions',
                    delay: 5000,
                    duration: 2000
                },
                {
                    type: 'standing',
                    event: 'alexQuestions',
                    delay: 7000,
                    startPosition: { x: 2.0, y: CHARACTER_HEIGHT.STANDING, z: 9.0 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Talk - "You can't talk to him?"
                {
                    type: 'talking',
                    event: 'marcusMessage',
                    delay: 6000,
                    duration: 2000
                },
                {
                    type: 'standing',
                    event: 'marcusMessage',
                    delay: 8000,
                    startPosition: { x: 2.0, y: CHARACTER_HEIGHT.STANDING, z: 9.0 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Face Lea for expert comment
                {
                    type: 'face',
                    targetCharacter: 'lea',
                    event: 'alexExpertComment',
                    delay: 0
                },
                // Talk - "They were the experts"
                {
                    type: 'talking',
                    event: 'alexExpertComment',
                    delay: 0,
                    duration: 8000
                },
                {
                    type: 'standing',
                    event: 'alexExpertComment',
                    delay: 8000,
                    startPosition: { x: 2.0, y: CHARACTER_HEIGHT.STANDING, z: 9.0 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Face Marcus to redirect
                {
                    type: 'face',
                    targetCharacter: 'marcus',
                    event: 'alexRedirect',
                    delay: 0
                },
                // Talk - "What's the strange detail?"
                {
                    type: 'talking',
                    event: 'alexRedirect',
                    delay: 0,
                    duration: 2000
                },
                {
                    type: 'standing',
                    event: 'alexRedirect',
                    delay: 2000,
                    startPosition: { x: 2.0, y: CHARACTER_HEIGHT.STANDING, z: 9.0 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                }
            ]
        },

        // LEA - Dimensional expert, emotional
        {
            id: 'lea',
            name: 'Lea',
            scale: CHARACTER_SCALE,
            actions: [
                // Walk from door to mark
                {
                    type: 'walk',
                    event: 'teamEnters',
                    delay: 600,
                    startPosition: { x: -7, y: CHARACTER_HEIGHT.WALKING, z: -11 },
                    endPosition: { x: 3.3, y: CHARACTER_HEIGHT.WALKING, z: 9.2 },
                    distancePerCycle: 2
                },
                // Stand at mark
                {
                    type: 'standing',
                    event: 'teamSeated',
                    delay: 0,
                    startPosition: { x: 3.3, y: CHARACTER_HEIGHT.STANDING, z: 9.2 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Face group for sit down
                {
                    type: 'face',
                    targetCharacter: 'morris',
                    event: 'leaSitDown',
                    delay: 0
                },
                // Talk - "We're here to explain..."
                {
                    type: 'talking',
                    event: 'leaSitDown',
                    delay: 0,
                    duration: 4000
                },
                {
                    type: 'standing',
                    event: 'leaSitDown',
                    delay: 4000,
                    startPosition: { x: 3.3, y: CHARACTER_HEIGHT.STANDING, z: 9.2 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Talk - "We didn't shut down..."
                {
                    type: 'talking',
                    event: 'leaAdmits',
                    delay: 0,
                    duration: 4000
                },
                {
                    type: 'standing',
                    event: 'leaAdmits',
                    delay: 4000,
                    startPosition: { x: 3.3, y: CHARACTER_HEIGHT.STANDING, z: 9.2 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Talk - "Barry's smart..."
                {
                    type: 'talking',
                    event: 'alexQuestions',
                    delay: 8000,
                    duration: 7000
                },
                {
                    type: 'standing',
                    event: 'alexQuestions',
                    delay: 15000,
                    startPosition: { x: 3.3, y: CHARACTER_HEIGHT.STANDING, z: 9.2 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Talk - "No. Only... only one-way"
                {
                    type: 'talking',
                    event: 'marcusMessage',
                    delay: 9000,
                    duration: 5000
                },
                {
                    type: 'standing',
                    event: 'marcusMessage',
                    delay: 14000,
                    startPosition: { x: 3.3, y: CHARACTER_HEIGHT.STANDING, z: 9.2 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Talk - Josh and Barry separated
                {
                    type: 'talking',
                    event: 'joshIncident',
                    delay: 10000,
                    duration: 5000
                },
                {
                    type: 'standing',
                    event: 'joshIncident',
                    delay: 15000,
                    startPosition: { x: 3.3, y: CHARACTER_HEIGHT.STANDING, z: 9.2 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Talk - Can't finish about Josh (emotional)
                {
                    type: 'talking',
                    event: 'leaEmotional',
                    delay: 0,
                    duration: 8000
                },
                {
                    type: 'standing',
                    event: 'leaEmotional',
                    delay: 8000,
                    startPosition: { x: 3.3, y: CHARACTER_HEIGHT.STANDING, z: 9.2 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Talk - "Something's happening to consciousness"
                {
                    type: 'talking',
                    event: 'strangeDetail',
                    delay: 15000,
                    duration: 4000
                },
                {
                    type: 'standing',
                    event: 'strangeDetail',
                    delay: 19000,
                    startPosition: { x: 3.3, y: CHARACTER_HEIGHT.STANDING, z: 9.2 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                }
            ]
        },

        // === ALREADY IN LAB (FROM SCENE 6) ===

        // MORRIS - Holding sof-tak skin
        {
            id: 'morris',
            name: 'Morris',
            scale: CHARACTER_SCALE,
            actions: [
                // Already at mark from Scene 6
                {
                    type: 'standing',
                    event: 'sceneStart',
                    delay: 0,
                    startPosition: { x: 1.8, y: CHARACTER_HEIGHT.STANDING, z: 8.2 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                },
                // Face entering group
                {
                    type: 'face',
                    targetCharacter: 'marcus',
                    event: 'morrisQuestion',
                    delay: 0
                },
                // Talk - Stammering question about message
                {
                    type: 'talking',
                    event: 'morrisQuestion',
                    delay: 0,
                    duration: 7000
                },
                {
                    type: 'standing',
                    event: 'morrisQuestion',
                    delay: 7000,
                    startPosition: { x: 1.8, y: CHARACTER_HEIGHT.STANDING, z: 8.2 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                },
                // Talk - "Wait, so when Chen sent..."
                {
                    type: 'talking',
                    event: 'morrisRealization',
                    delay: 0,
                    duration: 5000
                },
                {
                    type: 'standing',
                    event: 'morrisRealization',
                    delay: 5000,
                    startPosition: { x: 1.8, y: CHARACTER_HEIGHT.STANDING, z: 8.2 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                }
            ]
        },

        // DARIUS - Questions authority
        {
            id: 'darius',
            name: 'Darius',
            scale: CHARACTER_SCALE,
            actions: [
                // Already at mark
                {
                    type: 'standing',
                    event: 'sceneStart',
                    delay: 0,
                    startPosition: { x: 0.5, y: CHARACTER_HEIGHT.STANDING, z: 8.5 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                },
                // Face Morris then Marcus
                {
                    type: 'face',
                    targetCharacter: 'marcus',
                    event: 'morrisQuestion',
                    delay: 7500
                },
                // Talk - "What does the message mean?"
                {
                    type: 'talking',
                    event: 'morrisQuestion',
                    delay: 7500,
                    duration: 2000
                },
                {
                    type: 'standing',
                    event: 'morrisQuestion',
                    delay: 9500,
                    startPosition: { x: 0.5, y: CHARACTER_HEIGHT.STANDING, z: 8.5 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                },
                // Face Marcus for challenge
                {
                    type: 'face',
                    targetCharacter: 'marcus',
                    event: 'dariusReacts',
                    delay: 0
                },
                // Talk - "You kept going?"
                {
                    type: 'talking',
                    event: 'dariusReacts',
                    delay: 0,
                    duration: 3000
                },
                {
                    type: 'standing',
                    event: 'dariusReacts',
                    delay: 3000,
                    startPosition: { x: 0.5, y: CHARACTER_HEIGHT.STANDING, z: 8.5 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                },
                // Talk - "Message says plural"
                {
                    type: 'talking',
                    event: 'dariusPlural',
                    delay: 0,
                    duration: 4000
                },
                {
                    type: 'standing',
                    event: 'dariusPlural',
                    delay: 4000,
                    startPosition: { x: 0.5, y: CHARACTER_HEIGHT.STANDING, z: 8.5 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                },
                // Talk - "What does that mean?"
                {
                    type: 'talking',
                    event: 'strangeDetail',
                    delay: 13000,
                    duration: 2000
                },
                {
                    type: 'standing',
                    event: 'strangeDetail',
                    delay: 15000,
                    startPosition: { x: 0.5, y: CHARACTER_HEIGHT.STANDING, z: 8.5 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                }
            ]
        },

        // SOFIA - Challenges Edgar
        {
            id: 'sofia',
            name: 'Sofia',
            scale: CHARACTER_SCALE,
            actions: [
                // Already at mark
                {
                    type: 'standing',
                    event: 'sceneStart',
                    delay: 0,
                    startPosition: { x: 1.2, y: CHARACTER_HEIGHT.STANDING, z: 8.5 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                },
                // Face entering group
                {
                    type: 'face',
                    targetCharacter: 'marcus',
                    event: 'morrisQuestion',
                    delay: 10000
                },
                // Talk - "Who wrote this?"
                {
                    type: 'talking',
                    event: 'morrisQuestion',
                    delay: 10000,
                    duration: 2000
                },
                {
                    type: 'standing',
                    event: 'morrisQuestion',
                    delay: 12000,
                    startPosition: { x: 1.2, y: CHARACTER_HEIGHT.STANDING, z: 8.5 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                },
                // Face Edgar for challenge
                {
                    type: 'face',
                    targetCharacter: 'edgar',
                    event: 'sofiaChallenge',
                    delay: 0
                },
                // Talk - Challenge staffing comment
                {
                    type: 'talking',
                    event: 'sofiaChallenge',
                    delay: 0,
                    duration: 5000
                },
                {
                    type: 'standing',
                    event: 'sofiaChallenge',
                    delay: 5000,
                    startPosition: { x: 1.2, y: CHARACTER_HEIGHT.STANDING, z: 8.5 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                }
            ]
        },

        // NINA - Announces data
        {
            id: 'nina',
            name: 'Nina',
            scale: CHARACTER_SCALE,
            actions: [
                // Already at mark
                {
                    type: 'standing',
                    event: 'sceneStart',
                    delay: 0,
                    startPosition: { x: 4.2, y: CHARACTER_HEIGHT.STANDING, z: 10.1 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 }
                },
                // Face Lea to announce data
                {
                    type: 'face',
                    targetCharacter: 'lea',
                    event: 'ninaData',
                    delay: 0
                },
                // Talk - "Lea, there's something else"
                {
                    type: 'talking',
                    event: 'ninaData',
                    delay: 0,
                    duration: 18000
                },
                {
                    type: 'standing',
                    event: 'ninaData',
                    delay: 18000,
                    startPosition: { x: 4.2, y: CHARACTER_HEIGHT.STANDING, z: 10.1 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 }
                },
                // Talk - "The kind that changes everything"
                {
                    type: 'talking',
                    event: 'dataReveal',
                    delay: 3000,
                    duration: 3000
                },
                {
                    type: 'standing',
                    event: 'dataReveal',
                    delay: 6000,
                    startPosition: { x: 4.2, y: CHARACTER_HEIGHT.STANDING, z: 10.1 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 }
                }
            ]
        },

        // RASHID - Technical debate
        {
            id: 'rashid',
            name: 'Rashid',
            scale: CHARACTER_SCALE,
            actions: [
                // Already at mark
                {
                    type: 'standing',
                    event: 'sceneStart',
                    delay: 0,
                    startPosition: { x: 4.2, y: CHARACTER_HEIGHT.STANDING, z: 10.9 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 }
                },
                // Talk - "No, the atoms collisions"
                {
                    type: 'talking',
                    event: 'yukiRashidDebate',
                    delay: 3000,
                    duration: 2000
                },
                {
                    type: 'standing',
                    event: 'yukiRashidDebate',
                    delay: 5000,
                    startPosition: { x: 4.2, y: CHARACTER_HEIGHT.STANDING, z: 10.9 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 }
                }
            ]
        },

        // CHEN - Quiet, pained
        {
            id: 'chen',
            name: 'Chen',
            scale: CHARACTER_SCALE,
            actions: [
                // Already at mark
                {
                    type: 'standing',
                    event: 'sceneStart',
                    delay: 0,
                    startPosition: { x: 2.9, y: CHARACTER_HEIGHT.STANDING, z: 11.3 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Talk - "We don't understand it fully"
                {
                    type: 'talking',
                    event: 'chenInterrupts',
                    delay: 0,
                    duration: 3000
                },
                {
                    type: 'standing',
                    event: 'chenInterrupts',
                    delay: 3000,
                    startPosition: { x: 2.9, y: CHARACTER_HEIGHT.STANDING, z: 11.3 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                }
            ]
        },

        // YUKI - Clinical, technical
        {
            id: 'yuki',
            name: 'Yuki',
            scale: CHARACTER_SCALE,
            actions: [
                // Already at mark
                {
                    type: 'standing',
                    event: 'sceneStart',
                    delay: 0,
                    startPosition: { x: 3.8, y: CHARACTER_HEIGHT.STANDING, z: 10.6 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 }
                },
                // Talk - "Just right there" comment
                {
                    type: 'talking',
                    event: 'morrisRealization',
                    delay: 6000,
                    duration: 4000
                },
                {
                    type: 'standing',
                    event: 'morrisRealization',
                    delay: 10000,
                    startPosition: { x: 3.8, y: CHARACTER_HEIGHT.STANDING, z: 10.6 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 }
                },
                // Talk - "Well, their atoms"
                {
                    type: 'talking',
                    event: 'yukiRashidDebate',
                    delay: 0,
                    duration: 2000
                },
                {
                    type: 'standing',
                    event: 'yukiRashidDebate',
                    delay: 2000,
                    startPosition: { x: 3.8, y: CHARACTER_HEIGHT.STANDING, z: 10.6 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 }
                },
                // Talk - Whisper "That's if it's not subatomic"
                {
                    type: 'talking',
                    event: 'chenInterrupts',
                    delay: 4000,
                    duration: 2000
                },
                {
                    type: 'standing',
                    event: 'chenInterrupts',
                    delay: 6000,
                    startPosition: { x: 3.8, y: CHARACTER_HEIGHT.STANDING, z: 10.6 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 }
                }
            ]
        }
    ],

    // Camera moves with variety and dialogue framing (30+ moves)
    cameraMoves: [
        // 1. Opening - Hallway establishing
        {
            event: 'sceneStart',
            delay: 0,
            type: 'cutToPosition',
            targetPos: { x: -10, y: 2, z: -13 },
            lookAt: { x: -7, y: 1.5, z: -11 }
        },

        // 2. Track group walking to lab
        {
            event: 'hallwayWalk',
            delay: 0,
            type: 'trackCharacter',
            characterId: 'marcus',
            offsetX: -3,
            offsetZ: -2,
            height: 1.5
        },

        // 3. Stop tracking, cut to lab interior
        {
            event: 'labArrival',
            delay: 0,
            type: 'stopTracking'
        },
        {
            event: 'labArrival',
            delay: 100,
            type: 'cutToPosition',
            targetPos: { x: 0, y: 2.5, z: 5 },
            lookAt: { x: 1.5, y: 1.5, z: 9 }
        },

        // 4. Wide shot of lab activity
        {
            event: 'teamEnters',
            delay: 0,
            type: 'panToPosition',
            targetPos: { x: -3, y: 2.8, z: 3 },
            lookAt: { x: 1, y: 1.5, z: 8 },
            duration: 3000
        },

        // 5. Cut to Morris holding sof-tak skin
        {
            event: 'morrisQuestion',
            delay: 0,
            type: 'cutToPosition',
            targetPos: { x: 0, y: 1.6, z: 7 },
            lookAt: { x: 1.8, y: 1.5, z: 8.2 }
        },

        // 6. Morris and Darius - 160° dialogue geometry
        // Morris at (1.8, 8.2), Darius at (0.5, 8.5)
        // Center: (1.15, 8.35), radius: 0.68
        {
            event: 'morrisQuestion',
            delay: 8000,
            type: 'cutToPosition',
            targetPos: { x: 0.69, y: 1.55, z: 7.84 },
            lookAt: { x: 0.5, y: 1.6, z: 8.5 }
        },

        // 7. Sofia asks "Who wrote this?"
        {
            event: 'morrisQuestion',
            delay: 10500,
            type: 'cutToPosition',
            targetPos: { x: -0.5, y: 1.6, z: 7.5 },
            lookAt: { x: 1.2, y: 1.5, z: 8.5 }
        },

        // 8. Lea steps forward
        {
            event: 'leaSitDown',
            delay: 0,
            type: 'panToPosition',
            targetPos: { x: 1.5, y: 1.8, z: 7.5 },
            lookAt: { x: 3.3, y: 1.6, z: 9.2 },
            duration: 2000
        },

        // 9. Wide shot as team sits
        {
            event: 'teamSeated',
            delay: 0,
            type: 'cutToPosition',
            targetPos: { x: -2, y: 3, z: 5 },
            lookAt: { x: 2, y: 1.5, z: 9 }
        },

        // 10. Marcus begins explanation
        {
            event: 'marcusIntro',
            delay: 0,
            type: 'cutToPosition',
            targetPos: { x: 0, y: 1.7, z: 8 },
            lookAt: { x: 2.2, y: 1.6, z: 9.7 }
        },

        // 11. Close on Marcus for Barry story
        {
            event: 'barryIncident',
            delay: 0,
            type: 'panToPosition',
            targetPos: { x: 0.5, y: 1.6, z: 8.5 },
            lookAt: { x: 2.2, y: 1.6, z: 9.7 },
            duration: 2000
        },

        // 12. Darius reacts - 160° dialogue
        // Darius at (0.5, 8.5), Marcus at (2.2, 9.7)
        // Center: (1.35, 9.1), radius: 1.07
        {
            event: 'dariusReacts',
            delay: 0,
            type: 'cutToPosition',
            targetPos: { x: 0.62, y: 1.55, z: 8.42 },
            lookAt: { x: 0.5, y: 1.6, z: 8.5 }
        },

        // 13. Lea admits continuing
        {
            event: 'leaAdmits',
            delay: 0,
            type: 'cutToPosition',
            targetPos: { x: 2, y: 1.6, z: 7.8 },
            lookAt: { x: 3.3, y: 1.6, z: 9.2 }
        },

        // 14. Alex questions - 160° dialogue
        // Alex at (2.0, 9.0), Marcus at (2.2, 9.7)
        // Center: (2.1, 9.35), radius: 0.36
        {
            event: 'alexQuestions',
            delay: 0,
            type: 'cutToPosition',
            targetPos: { x: 1.93, y: 1.55, z: 9.04 },
            lookAt: { x: 2.0, y: 1.6, z: 9.0 }
        },

        // 15. Lea explains Barry's device
        {
            event: 'alexQuestions',
            delay: 9000,
            type: 'cutToPosition',
            targetPos: { x: 2, y: 1.6, z: 7.8 },
            lookAt: { x: 3.3, y: 1.6, z: 9.2 }
        },

        // 16. Marcus gestures to sof-tak skin Alex holds
        {
            event: 'marcusMessage',
            delay: 0,
            type: 'cutToPosition',
            targetPos: { x: 0.5, y: 1.5, z: 7.8 },
            lookAt: { x: 2.0, y: 1.4, z: 9.0 }
        },

        // 17. Morris realization
        {
            event: 'morrisRealization',
            delay: 0,
            type: 'cutToPosition',
            targetPos: { x: 0, y: 1.6, z: 7 },
            lookAt: { x: 1.8, y: 1.5, z: 8.2 }
        },

        // 18. Chen nods, pained
        {
            event: 'morrisRealization',
            delay: 6000,
            type: 'cutToPosition',
            targetPos: { x: 1.5, y: 1.6, z: 10 },
            lookAt: { x: 2.9, y: 1.6, z: 11.3 }
        },

        // 19. Yuki clinical response
        {
            event: 'morrisRealization',
            delay: 7000,
            type: 'cutToPosition',
            targetPos: { x: 2.5, y: 1.6, z: 9.5 },
            lookAt: { x: 3.8, y: 1.6, z: 10.6 }
        },

        // 20. Wide shot for Darius "plural" observation
        {
            event: 'dariusPlural',
            delay: 0,
            type: 'cutToPosition',
            targetPos: { x: -2, y: 2.5, z: 6 },
            lookAt: { x: 1.5, y: 1.5, z: 9 }
        },

        // 21. Lea's composure cracks
        {
            event: 'dariusPlural',
            delay: 5000,
            type: 'cutToPosition',
            targetPos: { x: 2, y: 1.6, z: 7.8 },
            lookAt: { x: 3.3, y: 1.6, z: 9.2 }
        },

        // 22. Marcus Josh story
        {
            event: 'joshIncident',
            delay: 0,
            type: 'cutToPosition',
            targetPos: { x: 0.5, y: 1.6, z: 8.5 },
            lookAt: { x: 2.2, y: 1.6, z: 9.7 }
        },

        // 23. Lea emotional about Josh
        {
            event: 'joshIncident',
            delay: 11000,
            type: 'cutToPosition',
            targetPos: { x: 1.5, y: 1.5, z: 7.5 },
            lookAt: { x: 3.3, y: 1.6, z: 9.2 }
        },

        // 24. Alex expert comment - facing Lea
        {
            event: 'alexExpertComment',
            delay: 0,
            type: 'cutToPosition',
            targetPos: { x: 2.5, y: 1.55, z: 8.5 },
            lookAt: { x: 2.0, y: 1.6, z: 9.0 }
        },

        // 25. Lea can't finish (close on emotion)
        {
            event: 'leaEmotional',
            delay: 0,
            type: 'cutToPosition',
            targetPos: { x: 2.5, y: 1.5, z: 8.2 },
            lookAt: { x: 3.3, y: 1.6, z: 9.2 }
        },

        // 26. Edgar oblivious
        {
            event: 'edgarStaffing',
            delay: 0,
            type: 'cutToPosition',
            targetPos: { x: 1, y: 1.6, z: 8 },
            lookAt: { x: 2.7, y: 1.6, z: 9.2 }
        },

        // 27. Sofia challenges Edgar - 160° dialogue
        // Sofia at (1.2, 8.5), Edgar at (2.7, 9.2)
        // Center: (1.95, 8.85), radius: 0.91
        {
            event: 'sofiaChallenge',
            delay: 0,
            type: 'cutToPosition',
            targetPos: { x: 1.23, y: 1.55, z: 8.22 },
            lookAt: { x: 1.2, y: 1.6, z: 8.5 }
        },

        // 28. Edgar confused response
        {
            event: 'sofiaChallenge',
            delay: 6000,
            type: 'cutToPosition',
            targetPos: { x: 1.5, y: 1.6, z: 8.2 },
            lookAt: { x: 2.7, y: 1.6, z: 9.2 }
        },

        // 29. Alex redirects to Marcus
        {
            event: 'alexRedirect',
            delay: 0,
            type: 'cutToPosition',
            targetPos: { x: 1, y: 1.6, z: 7.8 },
            lookAt: { x: 2.0, y: 1.6, z: 9.0 }
        },

        // 30. Marcus explains strange detail
        {
            event: 'strangeDetail',
            delay: 0,
            type: 'cutToPosition',
            targetPos: { x: 0.5, y: 1.6, z: 8.5 },
            lookAt: { x: 2.2, y: 1.6, z: 9.7 }
        },

        // 31. Lea on consciousness
        {
            event: 'strangeDetail',
            delay: 16000,
            type: 'cutToPosition',
            targetPos: { x: 2, y: 1.6, z: 7.8 },
            lookAt: { x: 3.3, y: 1.6, z: 9.2 }
        },

        // 32. Yuki/Rashid technical debate
        {
            event: 'yukiRashidDebate',
            delay: 0,
            type: 'cutToPosition',
            targetPos: { x: 3, y: 1.7, z: 9.5 },
            lookAt: { x: 4, y: 1.5, z: 10.5 }
        },

        // 33. Chen interrupts
        {
            event: 'chenInterrupts',
            delay: 0,
            type: 'cutToPosition',
            targetPos: { x: 1.5, y: 1.6, z: 10 },
            lookAt: { x: 2.9, y: 1.6, z: 11.3 }
        },

        // 34. Nina announces data
        {
            event: 'ninaData',
            delay: 0,
            type: 'cutToPosition',
            targetPos: { x: 3, y: 1.6, z: 9 },
            lookAt: { x: 4.2, y: 1.6, z: 10.1 }
        },

        // 35. Lea and Marcus react to Nina
        {
            event: 'dataReveal',
            delay: 0,
            type: 'cutToPosition',
            targetPos: { x: 0, y: 2, z: 7 },
            lookAt: { x: 2.5, y: 1.5, z: 9.5 }
        },

        // 36. Nina reveals significance
        {
            event: 'dataReveal',
            delay: 4000,
            type: 'cutToPosition',
            targetPos: { x: 3, y: 1.6, z: 9 },
            lookAt: { x: 4.2, y: 1.6, z: 10.1 }
        },

        // 37. Wide shot - team gathers
        {
            event: 'teamGathersData',
            delay: 0,
            type: 'panToPosition',
            targetPos: { x: -1, y: 3, z: 5 },
            lookAt: { x: 3, y: 1.5, z: 10 },
            duration: 5000
        },

        // 38. Final shot - Alex holds sof-tak skin
        {
            event: 'sceneEnd',
            delay: -10000,
            type: 'cutToPosition',
            targetPos: { x: 1, y: 1.5, z: 7.5 },
            lookAt: { x: 2.0, y: 1.4, z: 9.0 }
        }
    ],

    // Timeline actions
    timeline: [
        { event: 'sceneStart', delay: 0, action: 'sceneStart' },
        { event: 'hallwayWalk', delay: 0, action: 'hallwayWalk' },
        { event: 'labArrival', delay: 0, action: 'labArrival' },
        { event: 'teamEnters', delay: 0, action: 'teamEnters' },
        { event: 'morrisQuestion', delay: 0, action: 'morrisQuestion' },
        { event: 'leaSitDown', delay: 0, action: 'leaSitDown' },
        { event: 'teamSeated', delay: 0, action: 'teamSeated' },
        { event: 'marcusIntro', delay: 0, action: 'marcusIntro' },
        { event: 'barryIncident', delay: 0, action: 'barryIncident' },
        { event: 'dariusReacts', delay: 0, action: 'dariusReacts' },
        { event: 'leaAdmits', delay: 0, action: 'leaAdmits' },
        { event: 'alexQuestions', delay: 0, action: 'alexQuestions' },
        { event: 'marcusMessage', delay: 0, action: 'marcusMessage' },
        { event: 'morrisRealization', delay: 0, action: 'morrisRealization' },
        { event: 'dariusPlural', delay: 0, action: 'dariusPlural' },
        { event: 'joshIncident', delay: 0, action: 'joshIncident' },
        { event: 'alexExpertComment', delay: 0, action: 'alexExpertComment' },
        { event: 'leaEmotional', delay: 0, action: 'leaEmotional' },
        { event: 'edgarStaffing', delay: 0, action: 'edgarStaffing' },
        { event: 'sofiaChallenge', delay: 0, action: 'sofiaChallenge' },
        { event: 'alexRedirect', delay: 0, action: 'alexRedirect' },
        { event: 'strangeDetail', delay: 0, action: 'strangeDetail' },
        { event: 'yukiRashidDebate', delay: 0, action: 'yukiRashidDebate' },
        { event: 'chenInterrupts', delay: 0, action: 'chenInterrupts' },
        { event: 'ninaData', delay: 0, action: 'ninaData' },
        { event: 'dataReveal', delay: 0, action: 'dataReveal' },
        { event: 'teamGathersData', delay: 0, action: 'teamGathersData' },
        { event: 'sceneEnd', delay: 0, action: 'sceneEnd' }
    ]
};
