module.exports = {
    // Proxy settings
    proxySources: [
        'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all',
        'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt',
        'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/http.txt'
    ],
    
    // User agent sources
    userAgentSources: [
        'https://gist.githubusercontent.com/pzb/b4b6f57144aea7827ae4/raw/cf847b76a142955b1410c8bcef3aabe221a63db1/user-agents.txt',
        'https://raw.githubusercontent.com/tamimibrahim17/List-of-user-agents/master/Chrome.txt'
    ],
    
    // Attack configurations
    defaults: {
        time: 60,
        rps: 1000,
        threads: 50,
        method: 'MIX'
    },
    
    // Method configurations
    methods: {
        '404': {
            requiresProxy: true,
            proxyFile: 'proxy.txt',
            requiresUA: true
        },
        'BROWSER': {
            requiresProxy: true,
            headless: false,
            stealth: true
        },
        'MIX': {
            requiresProxy: false,
            http2: true,
            ssl: true
        },
        'ICMP': {
            payloadSize: 65500,
            packetsPerSecond: 1000
        }
    }
};