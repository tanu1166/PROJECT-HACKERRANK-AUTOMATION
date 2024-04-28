const puppeteer = require("puppeteer");
const loginLink = 'https://www.hackerrank.com/login'
const email = 'prachiaggarwal3838@gmail.com'
const password = 'Sss@123'
const codeObj=require('./code')
let browserOpen = puppeteer.launch({
    headless:false,
    args:['--start-maximized'],
    defaultViewport:null
})

let page


browserOpen.then(function(browserObj){
    let browserOpenPromise=browserObj.newPage()
    return browserOpenPromise;
}).then(function(newTab){
    page=newTab
    let hackerRankOpenPromise=newTab.goto(loginLink)
    return hackerRankOpenPromise
}).then(function(){
    let emailIsEntered=page.type("input[id='input-1']", email, {delay : 50 } )
    return emailIsEntered
}).then(function(){
    let passwordIsEntered=page.type("input[type='password']", password, {delay : 50 } )
    return passwordIsEntered
}).then(function(){
    let loginButtonClicked = page.click('button[data-analytics="LoginPassword"]',{delay : 50})
    return loginButtonClicked
}).then(function(){
    let clickOnAlgoPromise = waitAndClick('.topic-card a[data-attr1="algorithms"]',page)
   return clickOnAlgoPromise
}).then(function(){
    let getToWarmUp=waitAndClick('input[value="warmup"]',page)
    return getToWarmUp
}).then(function(){
    let waitfor3Seconds = page.waitFor(10000)
    return waitfor3Seconds
}).then(function(){
    let allChallengesPromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled')
    return allChallengesPromise;
}).then(function(questionsArry){
    console.log('number of questions',questionsArry.length)
    let questionWillBeSolved = questionSolver(page,questionsArry[0],codeObj.answers[0])
    return questionWillBeSolved

})


function questionSolver(page,question,answer){
    return new Promise(function(resolve,reject){
        let questionWillBeClicked =question.click()
        return questionWillBeClicked.then(function(){
            let editorInFocusPromise = waitAndClick('.hr-monaco-editor-parent',page)
            return editorInFocusPromise
        }).then(function(){
           return waitAndClick('.checkbox-input',page)
        }).then(function(){
            return page.waitForSelector('.input.text-area.custominput.auto-width',page)

        }).then(function(){
           
            return page.type('.input.text-area.custominput.auto-width',answer,{delay:10})
        }).then(function(){
            let ctrlIsPressed = page.keyboard.down('Control')
            return ctrlIsPressed
        }).then(function(){
            let AIspressed =  page.keyboard.press('A',{delay:100})
            return AIspressed
        }).then(function(){
            let XisPressed = page.keyboard.press('X',{delay:100})
            return XisPressed
        }).then(function(){
                  let ctrlIsunPressed = page.keyboard.up('Control')
            return ctrlIsunPressed
        }).then(function(){
            let mainEditorInFocus = waitAndClick('.hr-monaco-editor-parent',page)
            return mainEditorInFocus
        }).then(function(){
            let ctrlIsPressed = page.keyboard.down('Control')
            return ctrlIsPressed
        }).then(function(){
            let AIspressed =  page.keyboard.press('A',{delay:100})
            return AIspressed
        }).then(function(){
            let vIspressed =  page.keyboard.press('V',{delay:100})
            return vIspressed
        }).then(function(){
            let ctrlIsunpressed =  page.keyboard.up('Control',{delay:100})
            return ctrlIsunpressed
        }).then(function(){
            return page.click('.ui-btn.ui-btn-normal.ui-btn-secondary.pull-right.msR.hr-monaco-compile.hr-monaco__run-code.ui-btn-styled',{delay:50})
        }).then(function(){
            resolve()
        }).catch(function(err){
            reject();
        })
    })
}




function waitAndClick(selector,cpage){
    return new Promise(function(resolve,reject){
        let waitForModelPromise = cpage.waitForSelector(selector)
        waitForModelPromise.then(function(){
            let clickModal = cpage.click(selector)
            return clickModal
        }).then(function(){
            resolve()
        }).catch(function(err){
            reject()
        })

    })

}

