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
      await page.goto('http://127.0.0.1:4173/app.book.med.aeroespacial/capitulo/sistemas/10.html?topico=10.6',{waitUntil:'domcontentloaded',timeout:30000});
      await page.waitForTimeout(1800);
      await page.waitForTimeout(2200);
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
        const avail=document.documentElement.clientWidth;
        const overflows=Array.from(document.querySelectorAll('body *')).map(e=>{
          const r=e.getBoundingClientRect();return {e,r}
        }).filter(o=>o.r.width>40&&o.r.right>avail+5).sort((a,b)=>b.r.right-a.r.right).slice(0,12).map(({e,r})=>({
          tag:e.tagName,cls:String(e.className).slice(0,90),right:Math.round(r.right),width:Math.round(r.width),txt:(e.textContent||'').slice(0,65)
        }));
        return {url:location.href,innerWidth:innerWidth,clientWidth:avail,visualWidth:visualViewport.width,scrollWidth:document.documentElement.scrollWidth,
          viewport:document.querySelector('meta[name="viewport"]')?.content,overflows,
          textLength:document.body.innerText.length,hasTopic:document.body.innerText.includes('Depois de'),found:found.slice(-40)};
      });
      console.log('LAYOUT',width,JSON.stringify(data));
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(e=>{console.error(e.stack||e);process.exit(1)});
