// Diagnóstico visual real em navegador móvel para localizar textos que se sobrepõem.
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });
  try {
    for (const width of [320,360,390]) {
      const page=await browser.newPage({viewport:{width,height:740},deviceScaleFactor:2,isMobile:true,hasTouch:true});
      page.on('pageerror',err=>console.log('PAGEERROR',width,err.message));
      await page.goto('http://127.0.0.1:4173/capitulo/sistemas/10.html',{waitUntil:'domcontentloaded',timeout:30000});
      await page.waitForTimeout(1800);
      const toggle=page.getByRole('button',{name:/M2V10 - VI:/});
      await toggle.scrollIntoViewIfNeeded();
      await toggle.click({force:true});
      await page.waitForTimeout(1400);
      const data=await page.evaluate(()=>{
        const regex=/Para o|passageiro|UK CAA: evitar voar|Depois, o cirurgião|NO BRASIL|No Brasil, para tripulantes|O tripulante é avaliado/;
        const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
        const found=[];
        while(walker.nextNode()){
          const n=walker.currentNode;
          const v=(n.textContent||'').trim();
          if(!regex.test(v)||!v||v.length>450)continue;
          const elem=n.parentElement;
          const range=document.createRange();range.selectNodeContents(n);
          const b=range.getBoundingClientRect();
          const e=elem.getBoundingClientRect();
          const p=elem.parentElement?.getBoundingClientRect();
          if(!b.width||!b.height)continue;
          found.push({text:v.slice(0,100),tag:elem.tagName,cls:(elem.className||'').toString().slice(0,80),
            box:{top:Math.round(b.top),bottom:Math.round(b.bottom),left:Math.round(b.left),right:Math.round(b.right),height:Math.round(b.height)},
            container:{top:Math.round(e.top),bottom:Math.round(e.bottom),height:Math.round(e.height)},
            parent:p?{top:Math.round(p.top),bottom:Math.round(p.bottom),height:Math.round(p.height)}:null,
            position:getComputedStyle(elem).position,display:getComputedStyle(elem).display,whiteSpace:getComputedStyle(elem).whiteSpace});
        }
        return {url:location.href,innerWidth:innerWidth,scrollWidth:document.documentElement.scrollWidth,
          found:found.slice(-24)};
      });
      console.log('LAYOUT',width,JSON.stringify(data));
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(e=>{console.error(e.stack||e);process.exit(1)});
