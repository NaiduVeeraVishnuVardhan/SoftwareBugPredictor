const resultPage = (req,res) => {

    res.render('result', {title: 'Result Page'})
}

const repoLink = (req,res) => {
    const shell = require('shelljs')
    let fs = require("fs")

    const repolink = req.body
    //Converting json body to string to access the json data.
    const string = JSON.stringify(repolink);
    const obj = JSON.parse(string);
    const githubRepoLink = obj.repolink;
    const repoName = githubRepoLink.split("/").pop().split(".").shift()

    console.log(repoName)


    directory = process.cwd()

    if (!fs.existsSync("datacollection")){
        require("fs").mkdirSync("datacollection")
    }

    if(fs.existsSync("datacollection/" + repoName)){
        console.log("I am here")
        shell.exec("rmdir datacollection/" + repoName)
    }

    shell.cd(directory+"/datacollection")
    shell.exec('git clone '+githubRepoLink)

    shell.cd(directory+"/datacollection/"+repoName)
    shell.exec('git log --all --numstat --date=short --pretty=format:\'--%h--%ad--%aN\' --no-renames --after=2016-04-01 > logfile.log')

    shell.exec("docker run -v " + directory+"/datacollection/"+repoName + ":/data code-maat-app -l /data/logfile.log -c git2 >" + repoName + "_code_metrics_authors.csv")
    shell.exec("docker run -v " + directory+"/datacollection/"+repoName + ":/data code-maat-app -l /data/logfile.log -c git2 -a coupling >" + repoName + "_code_metrics_coupling.csv")
    shell.exec("docker run -v " + directory+"/datacollection/"+repoName + ":/data code-maat-app -l /data/logfile.log -c git2 -a age >" + repoName + "_code_metrics_age.csv")

    console.log("End of the program")

    res.json({ status: repolink })

}



module.exports = {
    repoLink,
    resultPage,
    
}



   
