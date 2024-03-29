
export function getBaselineValues(baseline1, baseline2) {
    // Calculate the midpoint between baseline1 and baseline2
    const midpoint = (baseline1 + baseline2) / 2;

    // Determine which baseline is high and which is low
    const highBaseline = Math.max(baseline1, baseline2);
    const lowBaseline = Math.min(baseline1, baseline2);

    // Calculate the upper threshold as the average of midpoint and high baseline
    const thresholdUpper = (midpoint + highBaseline) / 2;

    // Calculate the lower threshold as the average of midpoint and low baseline
    const thresholdLower = (midpoint + lowBaseline) / 2;

    // Return the calculated thresholds
    return [
        thresholdUpper,
        thresholdLower
    ]
}

/**
 * @returns The measured stress mapped to the 1, 2, 3 values.
 */
export function getMeasuredStress(hrv, baseline) {

    const [ thresholdUpper, thresholdLower ] = baseline;

    let measuredStress;

    if ( hrv > thresholdUpper) {
        measuredStress = 0; // Low Stress
    } else if ( hrv < thresholdLower ) {
        measuredStress = 2 // High Stress
    } else {
        measuredStress = 1;
    }
    return measuredStress;
}

/**
 * @returns The ideal difficulty and the difficulties of all tasks.
 */
export function getIdealDifficulty(measuredStress) {
    let idealDiff = -50*measuredStress+100;
    return idealDiff
}

/**
 * @returns Absolute differences between the ideal difficulty and the difficulties of all tasks.
 */
export function calculateAbsoluteDifferencesDifficulty(idealDifficulty, taskDifficulties) {
    const difficultyDifferences = taskDifficulties.map(taskDifficulty => Math.abs(idealDifficulty - taskDifficulty));
    return difficultyDifferences;
}

/**
 * @returns Task scores considering both difficulty and priority.
 */
export function calculateTaskScores(difficultyDifferences, taskPriorities) {
    const priorityWeight = 8;
    return difficultyDifferences.map((difficultyDifference, index) =>
        difficultyDifference - priorityWeight * taskPriorities[index]
    );
}

/**
 * @returns A list of all the min score indices.
 */
export function recommendTask(taskScores) {
    const minScore = Math.min(...taskScores);
    const minScoreIndices = [];
    for (let i = 0; i < taskScores.length; i++) {
        if (taskScores[i] === minScore) {
            minScoreIndices.push(i);
        }
    }

    return minScoreIndices;
}

/**
 * @returns The random index of the min scores in case there more than 1 cases with the same smallest min score.
 */

export function getRandomIndex(minScoreIndices) {
    const randomInd = minScoreIndices[(Math.floor(Math.random() * minScoreIndices.length))]
   return randomInd;
}

/* const baseline1 = 90; 
const baseline2 = 30;
const hrv = 71;
const taskDifficulties = [60, 70, 80, 90, 100]; // Example list of task difficulties
const taskPriorities = [1, 2, 3, 2, 3, 3]; // Example list of task priorities
const thresholds = getBaselineValues(baseline1, baseline2)

console.log(`Thresholds ---- ${thresholds} `);

const measuredStress = getMeasuredStress(hrv, thresholds);

console.log(`Measured stress mapped value ----- ${measuredStress}`)

const idealDifficulty = getIdealDifficulty(measuredStress);
const difficultyDifferences = calculateAbsoluteDifferencesDifficulty(idealDifficulty, taskDifficulties);
const taskScores = calculateTaskScores(difficultyDifferences, taskPriorities);
const recommendedTaskIndex = recommendTask(taskScores);

console.log(`Recommended Task Index: ${recommendedTaskIndex}`); */