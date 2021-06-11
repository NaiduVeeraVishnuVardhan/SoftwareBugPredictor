const csvtojson = require('csvtojson')
const csvFilePath = 'public/files/predicted_data/PredictedBugs.csv'

csvtojson()
    .fromFile(csvFilePath)
    .then((json) => {
        console.log(json)
    })
