const resultPage = (req,res) => {

    res.render('result', {title: 'Result Page'})
}

const repoLink = (req,res) => {
    
    const repolink = req.body

    directory = process.cwd()
    fs = require("fs")
    if (!fs.existsSync("datacollection")){
        require("fs").mkdirSync("datacollection")
    }
    const shell = require('shelljs')
    const path = directory
    shell.cd(directory+"/datacollection")
    shell.exec('git clone '+repolink)

    res.json({ status: repolink })

}



module.exports = {
    repoLink,
    resultPage,
    
}



   
