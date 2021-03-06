const ResultModel = require('../models/result')

const resultPage = (req, res) => {
    res.render('result', { title: 'Predictions' })
}

const repoLink = (req, res) => {
    const shell = require('shelljs')
    let fs = require('fs')

    const repolink = req.body
    console.log(repolink)

    //Converting json body to string to access the json data.
    const string = JSON.stringify(repolink)
    const obj = JSON.parse(string)
    const githubRepoLink = obj.repolink
    const repoName = githubRepoLink.split('/').pop().split('.').shift()

    console.log(repoName)

    var path = require('path')
    var directory = path.dirname(require.main.filename)

    if (!fs.existsSync('scripts')) {
        require('fs').mkdirSync('scripts', { recursive: true }, (err) => {})
    }
    if (!fs.existsSync('public/files')) {
        require('fs').mkdirSync(
            'public/files',
            { recursive: true },
            (err) => {}
        )
    }
    if (!fs.existsSync('public/files/predicted_data')) {
        require('fs').mkdirSync(
            'public/files/predicted_data',
            { recursive: true },
            (err) => {}
        )
    }
    if (!fs.existsSync('public/files/test_data')) {
        require('fs').mkdirSync(
            'public/files/test_data',
            { recursive: true },
            (err) => {}
        )
    }
    if (fs.existsSync('scripts/' + repoName)) {
        shell.exec('rmdir scripts/' + repoName)
    }

    shell.cd(directory + '/scripts')
    shell.exec('git clone ' + githubRepoLink)

    shell.cd(directory + '/scripts/' + repoName)
    shell.exec(
        "git log --all --numstat --date=short --pretty=format:'--%h--%ad--%aN' --no-renames --after=2016-04-01 > logfile.log"
    )
    console.log('Created git log for code maat app')
    shell.exec('sudo systemctl start docker')
    shell.exec(
        'sudo docker run -v ' +
            directory +
            '/scripts/' +
            repoName +
            ':/data -i code-maat-app -l /data/logfile.log -c git2 >' +
            repoName +
            '_code_metrics_authors.csv'
    )
    shell.exec(
        'sudo docker run -v ' +
            directory +
            '/scripts/' +
            repoName +
            ':/data -i code-maat-app -l /data/logfile.log -c git2 -a coupling >' +
            repoName +
            '_code_metrics_coupling.csv'
    )
    shell.exec(
        'sudo docker run -v ' +
            directory +
            '/scripts/' +
            repoName +
            ':/data -i code-maat-app -l /data/logfile.log -c git2 -a age >' +
            repoName +
            '_code_metrics_age.csv'
    )
    console.log('Created process metrics csv files')
    shell.cd(directory + '/scripts/')
    shell.exec('sudo python3 processAndCodemetrics.py --project ' + repoName)
    shell.exec(
        'sudo python3 loadedmachinelearningmodel.py --project ' + repoName
    )
    shell.exec('sudo rm -rf ' + repoName)

    res.json({ status: repolink })
}

const loginPage = (req, res) => {
    res.render('login', { title: 'Login Page' })
}
const signupPage = (req, res) => {
    res.render('signup', { title: 'Sign Up Page' })
}
const forgotPasswordPage = (req, res) => {
    res.render('forgot',
        {
            title: 'Resset Pasword  Page',
            info: false,
            error: false
        }
    )
}

const addResult = (req, res) => {
    const result = new ResultModel({
        name: req.body.name,
        date: Date.now(),
        ownerId: req.user.id
    });

    result
        .save()
        .then((savedItem) => {
            res.json({ savedItem })
        })
        .catch((err) => {
            console.error(err);
        });
}

module.exports = {
    repoLink,
    resultPage,
    loginPage,
    signupPage,
    forgotPasswordPage,
    addResult
}
