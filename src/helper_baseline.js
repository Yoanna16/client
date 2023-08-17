
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

export function getMeasuredStress(hrv, baseline) {

    const [ thresholdUpper, thresholdLower ] = baseline;

    let measuredStress;

    if ( hrv > thresholdUpper) {
        measuredStress = 0; // Low Stress
    } else if ( hrv < thresholdLower ) {
        measuredStress = 2 // High Stress
    } else {
        const stressRange = thresholdUpper - thresholdLower;
        //const stressIncrement = stressRange / 6; // Divide the range into 6 parts
        const measuredStress =(thresholdUpper - hrv) / stressRange;
        return Math.round(measuredStress*4)/2;
    }
    return measuredStress;
}

// Calculate Ideal Difficulty
export function getIdealDifficulty(measuredStress) {
    let idealDiff = -50*measuredStress+100;
    return idealDiff
}

// Calculate absolute differences between the ideal difficulty and the difficulties of all tasks:
export function calculateAbsoluteDifferencesDifficulty(idealDifficulty, taskDifficulties) {
    const difficultyDifferences = taskDifficulties.map(taskDifficulty => Math.abs(idealDifficulty - taskDifficulty));
    return difficultyDifferences;
}


// Calculate task scores considering both difficulty and priority 
export function calculateTaskScores(difficultyDifferences, taskPriorities) {
    const priorityWeight = 8;
    return difficultyDifferences.map((difficultyDifference, index) =>
        difficultyDifference - priorityWeight * taskPriorities[index]
    );
}

// Recommend the task with the minimum score, which represents a balance between difficulty and priority: 
export function recommendTask(taskScores) {
    const minScore = Math.min(...taskScores);
    return taskScores.indexOf(minScore);
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