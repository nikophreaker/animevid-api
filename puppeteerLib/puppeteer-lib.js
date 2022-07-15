const puppeteer = require("puppeteer");
const ProxyChain = require("proxy-chain");

const proxies = [
    'http://154833:gm7tSt88F96@196.51.20.34:8800',
    'http://154833:gm7tSt88F96@104.227.130.247:8800',
    'http://154833:gm7tSt88F96@23.254.103.89:8800',
    'http://154833:gm7tSt88F96@23.254.103.221:8800',
    'http://154833:gm7tSt88F96@104.206.32.110:8800',
    'http://154833:gm7tSt88F96@81.16.130.59:8800',
    'http://154833:gm7tSt88F96@196.51.17.74:8800',
    'http://154833:gm7tSt88F96@23.254.103.193:8800',
    'http://154833:gm7tSt88F96@81.16.130.5:8800',
    'http://154833:gm7tSt88F96@81.16.130.173:8800',
]

// const proxies = [
//     'https://196.51.20.34:8800@154833:gm7tSt88F96',
//     'https://104.227.130.247:8800@154833:gm7tSt88F96',
//     'https://23.254.103.89:8800@154833:gm7tSt88F96',
//     'https://23.254.103.221:8800@154833:gm7tSt88F96',
//     'https://104.206.32.110:8800@154833:gm7tSt88F96',
//     'https://81.16.130.59:8800@154833:gm7tSt88F96',
//     'https://196.51.17.74:8800@154833:gm7tSt88F96',
//     'https://23.254.103.193:8800@154833:gm7tSt88F96',
//     'https://81.16.130.5:8800@154833:gm7tSt88F96',
//     'https://81.16.130.173:8800@154833:gm7tSt88F96'
// ]

// const server = new ProxyChain.Server({
//     port: 8800,
//     prepareRequestFunction: ({
//         request
//     }) => {
//         let randomProxy = proxies[proxies.length * Math.random() | 0];
//         return {
//             upstreamProxyUrl: randomProxy,
//         };
//     }
// });

// server.listen(() => console.log('Proxy server started on 127.0.0.1:8000'));

exports.fetch = async function run(url, reject, resolve) {

    // First, we must launch a browser instance
    const browser = await puppeteer.launch({
        // Headless option allows us to disable visible GUI, so the browser runs in the "background"
        // for development lets keep this to true so we can see what's going on but in
        // on a server we must set this to true
        headless: true,
        // This setting allows us to scrape non-https websites easier
        ignoreHTTPSErrors: true,

        // avoid bot
        // args: [
        // '--no-sandbox',
        // '--disable-setuid-sandbox',
        //     `--proxy-server=${server}`
        // ]
    })

    // we can block by resrouce type like fonts, images etc.
    const blockResourceType = [
        'beacon',
        'csp_report',
        'font',
        'image',
        'imageset',
        'media',
        'object',
        'texttrack',
    ];
    // we can also block by domains, like google-analytics etc.
    const blockResourceName = [
        'adition',
        'adzerk',
        'analytics',
        'cdn.api.twitter',
        'clicksor',
        'clicktale',
        'doubleclick',
        'exelator',
        'facebook',
        'fontawesome',
        'google',
        'google-analytics',
        'googletagmanager',
        'mixpanel',
        'optimizely',
        'quantserve',
        'sharethrough',
        'tiqcdn',
        'zedo',
    ];

    // then we need to start a browser tab
    let page = await browser.newPage();

    // and tell it to go to some URL
    await page.goto(url, {
        waitUntil: 'domcontentloaded',
    });

    // we need to enable interception feature
    await page.setRequestInterception(true);
    // then we can add a call back which inspects every
    // outgoing request browser makes and decides whether to allow it
    page.on('request', request => {
        const requestUrl = url.split('?')[0];
        if (
            (request.resourceType() in blockResourceType) ||
            blockResourceName.some(resource => requestUrl.includes(resource))
        ) {
            request.abort();
        } else {
            request.continue();
        }
    });

    // print html content of the website
    // console.log(await page.content());
    // reject(await page.content());
    resolve(await page.content());
    await page.close();
    await browser.close();
}