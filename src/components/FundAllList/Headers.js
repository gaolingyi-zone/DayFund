export default function randHeader() {
    const head_connection = ["Keep-Alive", "close"];
    const head_accept = ["text/html, application/xhtml+xml, */*"];
    const head_accept_language = [
        "zh-CN,fr-FR;q=0.5",
        "en-US,en;q=0.8,zh-Hans-CN;q=0.5,zh-Hans;q=0.3",
    ];
    const head_user_agent = [
        "Opera/8.0 (Macintosh; PPC Mac OS X; U; en)",
        "Opera/9.27 (Windows NT 5.2; U; zh-cn)",
        "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Win64; x64; Trident/4.0)",
        "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)",
        "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; InfoPath.2; .NET4.0C; .NET4.0E)",
        "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; InfoPath.2; .NET4.0C; .NET4.0E; QQBrowser/7.3.9825.400)",
        "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0; BIDUBrowser 2.x)",
        "Mozilla/5.0 (Windows; U; Windows NT 5.1) Gecko/20070309 Firefox/2.0.0.3",
        "Mozilla/5.0 (Windows; U; Windows NT 5.1) Gecko/20070803 Firefox/1.5.0.12",
        "Mozilla/5.0 (Windows; U; Windows NT 5.2) Gecko/2008070208 Firefox/3.0.1",
        "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.12) Gecko/20080219 Firefox/2.0.0.12 Navigator/9.0.0.6",
        "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.95 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; rv:11.0) like Gecko)",
        "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:21.0) Gecko/20100101 Firefox/21.0 ",
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Maxthon/4.0.6.2000 Chrome/26.0.1410.43 Safari/537.1 ",
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.92 Safari/537.1 LBBROWSER",
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.75 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.11 TaoBrowser/3.0 Safari/536.11",
        "Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko",
        "Mozilla/5.0 (Macintosh; PPC Mac OS X; U; en) Opera 8.0",
    ];
    return {
        Connection: head_connection[0],
        Accept: head_accept[0],
        "Accept-Language": head_accept_language[1],
        "User-Agent": head_user_agent[Math.floor(Math.random() * 10)],
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate',
        'Cookie': 'st_si=27826720206193; st_asi=delete; ASP.NET_SessionId=u4k2ez3z0wmuu2xtnlocqmqs; _adsame_fullscreen_18503=1; EMFUND0=01-23%2023%3A12%3A09@%23%24%u9E4F%u534E%u4E30%u7984%u503A%u5238@%23%24003547; EMFUND1=01-23%2023%3A17%3A21@%23%24%u5927%u6469%u53CC%u5229%u589E%u5F3A%u503A%u5238C@%23%24000025; EMFUND2=01-23%2023%3A20%3A41@%23%24%u56FD%u6295%u745E%u94F6%u4E2D%u9AD8%u7B49%u7EA7%u503A%u5238A@%23%24000069; EMFUND3=01-23%2023%3A24%3A43@%23%24%u534E%u5BCC%u5B89%u946B%u503A%u5238@%23%24000028; EMFUND4=01-23%2023%3A31%3A19@%23%24%u5357%u65B9%u53CC%u5143A@%23%24000997; EMFUND5=01-23%2023%3A31%3A48@%23%24%u957F%u4FE1%u7A33%u5065%u7EAF%u503A%u503A%u5238A@%23%24002996; EMFUND6=01-23%2023%3A33%3A18@%23%24%u5174%u5168%u6052%u76CA%u503A%u5238C@%23%24004953; EMFUND7=01-24%2000%3A25%3A38@%23%24%u6C47%u6DFB%u5BCC%u4E2D%u8BC1%u65B0%u80FD%u6E90%u6C7D%u8F66A@%23%24501057; EMFUND8=01-24%2000%3A26%3A43@%23%24%u5BCC%u8363%u6CAA%u6DF1300%u6307%u6570%u589E%u5F3AA@%23%24004788; EMFUND9=01-24 00:29:28@#$%u534E%u5B9D%u4E2D%u8BC1%u533B%u7597%u6307%u6570@%23%24162412; st_pvi=16115214238135; st_sp=2019-11-11%2009%3A38%3A03; st_inirUrl=https%3A%2F%2Fwww.baidu.com%2Flink; st_sn=18; st_psi=20210124002928331-0-4917090614',
        'Host': 'fund.eastmoney.com',
        'Referer': 'http://fund.eastmoney.com/data/fundranking.html',
    };
}