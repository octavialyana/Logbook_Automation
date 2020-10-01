require('dotenv').config();

const readline = require("readline");
const puppeteer = require('puppeteer');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

(async()=>{
    console.log("Wait login in ...");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://industry.socs.binus.ac.id/learning-plan/auth/login');
    await page.type('input[type="text"]',process.env.nim,{delay:20});
    await page.type('input[type="password"]',process.env.pass,{delay:30});
    await page.click('input[type="submit"]');
    await page.waitForNavigation({
        waitUntil:"networkidle0"
    })
    await page.goto('https://industry.socs.binus.ac.id/learning-plan/student/log-book');
   
    rl.question("Jumat ? (jawaban dengan ya atau ga)\n", function(jumat) {
        rl.question("Logbook Activity: \n",function (Activity) {
            rl.question("Logbook Description: \n",async function (description) {
                if(jumat.trim().toLowerCase() === "ya"){
                await page.type('input[name="clock-in"]',"08.00");
                await page.type('input[name="clock-out"]',"17.30");
                }
                else {
                    await page.type('input[name="clock-in"]',"08.00");
                    await page.type('input[name="clock-out"]',"17.00");
                }
                await page.type('input[name="activity"]',Activity);
                await page.type('textarea[name="description"]',description);
                await page.click('.ui.primary.large.button');
                console.log(`\n\n\Logbook Berhasil Masuk Dengan\nactivty: ${Activity}.\nDescription: ${description}`)
                await browser.close();
                rl.close();
            });
        });
    });

})();