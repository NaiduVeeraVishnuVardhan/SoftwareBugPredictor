const resultPage = (req,res) => {

    res.render('result', {title: 'Result Page'})
}

const repoLink = (req,res) => {
    
    const repolink = req.body

    const { exec } = require("child_process");
    console.log('echo'.concat('test') )
    exec("echo".concat(repolink) , (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });



    // const repolink = req.body
    console.log(repolink)
    res.json({ status: repolink })

}



module.exports = {
    repoLink,
    resultPage,
    
}



   
