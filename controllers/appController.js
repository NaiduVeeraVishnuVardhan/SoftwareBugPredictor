const resultPage = (req,res) => {

    res.render('result', {title: 'Result Page'})
}

const repoLink = (req,res) => {
    
    const repolink = req.body
    //Converting json body to string to access the json data.
    var string = JSON.stringify(repolink)
    var obj = JSON.parse(string);
    var repoLinkk = obj.repolink;

    directory = process.cwd()
    fs = require("fs")
    if (!fs.existsSync("datacollection")){
        require("fs").mkdirSync("datacollection")
    }

    const shell = require('shelljs')
    shell.cd(directory+"/datacollection")
    shell.exec('git clone '+repoLinkk)
    console.log(repoLinkk)

    res.json({ status: repolink })

}



module.exports = {
    repoLink,
    resultPage,
    
}



   
