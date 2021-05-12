const resultPage = (req,res) => {
    
    res.render('result', {title: 'Result Page'})
}

const repoLink = (req,res) => {
    const repolink = req.body
    console.log(repolink)
    res.json({ status: repolink })
}
const loginPage = (req,res) => {
    res.render('login' , {title:'Login Page'})
}
const signupPage = (req,res) => {
    res.render('signup' , {title:'Sign Up Page'})
}

module.exports = {
    repoLink,
    resultPage,
    loginPage,
    signupPage
    
}



   
