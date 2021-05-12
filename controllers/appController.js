
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

    if (!fs.existsSync("scripts")){
        require("fs").mkdirSync("scripts")
    }

    if(fs.existsSync("scripts/" + repoName)){
        shell.exec("rmdir scripts/" + repoName)
    }

    shell.cd(directory+"/scripts")
    shell.exec('git clone '+githubRepoLink)

    shell.cd(directory+"/scripts/"+repoName)
    shell.exec('git log --all --numstat --date=short --pretty=format:\'--%h--%ad--%aN\' --no-renames --after=2016-04-01 > logfile.log')
  
    shell.exec("sudo docker run -v " + directory+"/scripts/"+repoName + ":/data -i code-maat-app -l /data/logfile.log -c git2 >" + repoName + "_code_metrics_authors.csv")
    shell.exec("sudo docker run -v " + directory+"/scripts/"+repoName + ":/data -i code-maat-app -l /data/logfile.log -c git2 -a coupling >" + repoName + "_code_metrics_coupling.csv")
    shell.exec("sudo docker run -v " + directory+"/scripts/"+repoName + ":/data -i code-maat-app -l /data/logfile.log -c git2 -a age >" + repoName + "_code_metrics_age.csv")
    shell.cd(directory+"/scripts/")
    shell.exec("sudo python3 processAndCodemetrics.py --project "+repoName)
    shell.exec("sudo cp "+ repoName + "/ml_ready-process-metrics.csv ../")
    res.json({ status: repolink })
}



module.exports = {
    repoLink,
    resultPage,

}


