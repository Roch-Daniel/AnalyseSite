const express = require('express')
const puppeteer = require('puppeteer')

const app = express()
app.get('/analyse/:id', async (req, res)=>{
    let site = req.params.id
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://${site}`);
    //Saber se é HTML 5
    const infoHtml = await page.evaluate(()=>{
        const docLocation = document.location.href

        async function getPage(docLocation){
            const res = await fetch(docLocation)
            const html = await res.text()
            return html.indexOf('<!doctype html>') >= 0
        }
        return getPage(docLocation) ? 'HTML 5' : ' Não é HTML 5'
    })
    //pegando dados - Links site.
    const infoSite = await page.evaluate(()=>{
        const docLocation = document.location.host
        //links interno -> próprio site. internatLinks
        const internatLinks = [ ...document.links].filter(a => a['href'].indexOf(docLocation) >= 0).length
        //links externos -> sites diferentes externalLinks
        const externalLinks = [ ...document.links].filter(a => a['href'].indexOf(docLocation) < 0).length
        return {
            title : document.title,
            external_links: externalLinks,
            internal_links: internatLinks
        }
    })
    await browser.close();
    res.json({
        "title": infoSite.title,
        "html_version" : infoHtml,
        "external_links": infoSite.external_links,
        "internal_links": infoSite.internal_links
    })
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));