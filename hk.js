const puppeteer=require("puppeteer");
const codesObj=require("./codes.js");

console.log("before");

const loginUrl="https://www.hackerrank.com/auth/login";
const email="wakot86820@tebyy.com";
const passWord="ABcd@123";


async function waitAndClick(selector,page){
    try{
        await page.waitForSelector(selector,{visible:true});
        await page.click(selector);
        await page.waitForTimeout(3000);
    }
    catch(err){
        console.log(err);
    }
} 

async function waitAndType(selector,page,str){
    try{
        await page.waitForSelector(selector,{visible:true});
        await page.type(selector,str,{delay:30});
        await page.waitForTimeout(3000);
    }
    catch(err){
        console.log(err);
    }
}

async function loginPage(email,passWord,newTabOpned){
    try{
        await newTabOpned.goto(loginUrl);

        await waitAndType("input[type=text]",newTabOpned,email);
        await waitAndType("input[type=password]",newTabOpned,passWord);
        await waitAndClick(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled",newTabOpned); 
    }
    catch(err){
        console.log(err);
    }
}

async function goToAlgoSecAndFetchAllWarmUpQuestions(newTabOpned){
    try{
        await waitAndClick(".topic-card a[data-attr1=algorithms]",newTabOpned);
        await waitAndClick(".checkbox-wrap input[value=warmup]",newTabOpned);

        let  allWarmUpProblemArr=await newTabOpned.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled")

        return allWarmUpProblemArr;
    }
    catch(err){
        console.log(err);
    }
}



async function typeCutPasteTheCode(newTabOpned,answer){
    try{
        await newTabOpned.type("textarea.custominput",answer);
        await newTabOpned.keyboard.down("Control");
        await newTabOpned.keyboard.press("A",{delay:30});
        await newTabOpned.keyboard.press("X",{delay:30});
        await newTabOpned.keyboard.up("Control");
        
        await waitAndClick(".monaco-editor.no-user-select.vs",newTabOpned);
        
        await newTabOpned.keyboard.down("Control");
        await newTabOpned.keyboard.press("A",{delay:30});
        await newTabOpned.keyboard.press("V",{delay:30});
        await newTabOpned.keyboard.up("Control");
        await newTabOpned.click(".hr-monaco-submit",{delay:30});
    }
    catch(err){
        console.log(err);
    }


}

async function questionSolver(newTabOpned,question,answer){
    try{
        await question.click();
        await newTabOpned.waitForTimeout(10000);

        await waitAndClick(".checkbox-input",newTabOpned);
        
        await typeCutPasteTheCode(newTabOpned,answer);
    }
    catch(err){
        console.log(err);
    }
}


(async function start(){
    try{
        let browserOpened=await puppeteer.launch({headless:false,defaultViewport:null,args:["--start-maximized"]});
        
        let newTabOpned=await browserOpened.newPage();

        await loginPage(email,passWord,newTabOpned);
        
        let allWarmUpProblemArr=await goToAlgoSecAndFetchAllWarmUpQuestions(newTabOpned);

        await questionSolver(newTabOpned,allWarmUpProblemArr[0],codesObj[0])

    }
    catch(err){
        console.log(err);
    }
}
)();


console.log("after");