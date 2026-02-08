#!/bin/bash
# ENZY Ultimate Toolkit Installer

echo "Installing ENZY Ultimate DDoS Toolkit..."

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Banner
echo -e "${BLUE}"
cat << "EOF"
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
EOF
echo -e "${NC}"

# Create directories
echo -e "${YELLOW}[*] Creating directories...${NC}"
mkdir -p methods

# Install Node.js dependencies
echo -e "${YELLOW}[*] Installing Node.js modules...${NC}"
npm install puppeteer puppeteer-extra puppeteer-extra-plugin-stealth gradient-string axios cheerio

# Download proxy lists
echo -e "${YELLOW}[*] Downloading proxy lists...${NC}"
curl -s "https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all" > proxy.txt
curl -s "https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt" >> proxy.txt

# Download user agents
echo -e "${YELLOW}[*] Downloading user agents...${NC}"
curl -s "https://gist.githubusercontent.com/pzb/b4b6f57144aea7827ae4/raw/cf847b76a142955b1410c8bcef3aabe221a63db1/user-agents.txt" > ua.txt

# Make executable
chmod +x enzy.js installer.sh
chmod +x methods/*.js 2>/dev/null

echo -e "${GREEN}"
echo "╔═══════════════════════════════════════════════════╗"
echo "║              Installation Complete!               ║"
echo "╚═══════════════════════════════════════════════════╝"
echo -e "${NC}"

echo -e "${YELLOW}[*] Usage:${NC}"
echo -e "  node enzy.js <URL> <TIME> <RPS> <THREADS>"
echo -e "  node enzy.js --help  # for more options"
echo ""
echo -e "${YELLOW}[*] Features:${NC}"
echo -e "  • Auto-method detection"
echo -e "  • 10+ attack methods"
echo -e "  • Steven Store 404.js included"
echo -e "  • Browser DDoS with puppeteer"
echo -e "  • Proxy support"
echo -e "  • Multi-threading"
echo ""
echo -e "${RED}[!] Legal Warning:${NC}"
echo -e "${RED}[!] For authorized testing only!${NC}"