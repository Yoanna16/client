
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
    return {
        thresholdUpper,
        thresholdLower
    }

}

export function getMeasuredStress(hrv, baseline) {

    let measuredStress;

    const [lowBaseline, avg, highBaseline] = baseline;

    if ( hrv > lowBaseline) {
        measuredStress = 0;
    } else if ( hrv < highBaseline) {
        measuredStress = 2
    } else {
        measuredStress = 1;
    }

    return measuredStress;
}

export function getIdealDifficulty(measuredStress) {
    let idealDiff = -50*measuredStress+100;
    return idealDiff
}

export function test (taskDiff, listofPrios, idealDiff) {

}