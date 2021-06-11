const csvtojson = require('csvtojson')
const csvFilePath="public/files/predicted_data/PredictedBugs (2).csv"

csvtojson()
.fromFile(csvFilePath)
.then((json)=>{
    console.log(json)
   
})
