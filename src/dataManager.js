export const requestBody = {
    "aggregateBy": [{
        "dataTypeName": "com.google.heart_rate.bpm",
    }],
    "bucketByTime": {"durationMillis": 86400000},
    "startTimeMillis": 1684833728507,
    "endTimeMillis": 1684833766309
}


var start = new Date().setUTCHours(0,0,0,0);
var end = new Date().setUTCHours(23,59,59,999);
