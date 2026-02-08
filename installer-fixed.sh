#!/bin/bash
# ENZY ULTIMATE - FIXED INSTALLER FOR TERMUX

echo "========================================"
echo "   ENZY DDoS Toolkit - Termux Edition   "
echo "========================================"

# Colors
RED='\033[1;31m'
GREEN='\033[1;32m'
YELLOW='\033[1;33m'
BLUE='\033[1;34m'
NC='\033[0m'

# Update packages
echo -e "${YELLOW}[*] Updating packages...${NC}"
pkg update -y && pkg upgrade -y

# Install basic dependencies
echo -e "${YELLOW}[*] Installing dependencies...${NC}"
pkg install -y nodejs python git curl wget

# Install Node.js modules (TANPA puppeteer dulu)
echo -e "${YELLOW}[*] Installing Node.js modules...${NC}"
npm install gradient-string axios cheerio

# Skip puppeteer installation for Termux
echo -e "${YELLOW}[*] Skipping puppeteer (not supported on Termux)...${NC}"
echo -e "${YELLOW}[*] Browser DDoS method will not work on Termux${NC}"

# Download proxy lists
echo -e "${YELLOW}[*] Downloading proxy lists...${NC}"
curl -s "https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all" > proxy.txt
curl -s "https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt" >> proxy.txt
curl -s "https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/http.txt" >> proxy.txt

echo -e "${GREEN}[+] Total proxies: $(wc -l < proxy.txt)${NC}"

# Download user agents
echo -e "${YELLOW}[*] Downloading user agents...${NC}"
curl -s "https://gist.githubusercontent.com/pzb/b4b6f57144aea7827ae4/raw/cf847b76a142955b1410c8bcef3aabe221a63db1/user-agents.txt" > ua.txt
curl -s "https://raw.githubusercontent.com/tamimibrahim17/List-of-user-agents/master/Chrome.txt" >> ua.txt

echo -e "${GREEN}[+] Total user agents: $(wc -l < ua.txt)${NC}"

# Check if main files exist
echo -e "${YELLOW}[*] Checking files...${NC}"
if [ ! -f "enzy.js" ]; then
    echo -e "${RED}[!] enzy.js not found! Did you clone correctly?${NC}"
    echo -e "${YELLOW}[*] Make sure you ran: git clone https://github.com/endirenaldi110-sketch/Enzy.git${NC}"
    exit 1
fi

# Make files executable
chmod +x enzy.js
chmod +x installer-fixed.sh

# Create methods directory if not exists
mkdir -p methods

echo -e "${GREEN}"
echo "╔═══════════════════════════════════════════════════╗"
echo "║          INSTALLATION COMPLETE! (TERMUX)          ║"
echo "╚═══════════════════════════════════════════════════╝"
echo -e "${NC}"

echo -e "${YELLOW}[*] IMPORTANT NOTES FOR TERMUX:${NC}"
echo -e "1. Puppeteer/Browser DDoS TIDAK bekerja di Termux"
echo -e "2. Gunakan method lain: HTTP, MIX, TCP, UDP, etc."
echo -e "3. Method yang tersedia: 404, HTTP, MIX, TCP, UDP, ICMP"

echo -e "\n${YELLOW}[*] USAGE:${NC}"
echo -e "  node enzy.js https://target.com 60 1000 50"
echo -e "  node enzy.js https://target.com 60 1000 50 HTTP"
echo -e "  node enzy.js https://target.com 60 1000 50 MIX"
echo -e "  node enzy.js https://target.com 60 1000 50 404 proxy.txt"

echo -e "\n${YELLOW}[*] TEST QUICK ATTACK:${NC}"
echo -e "  node enzy.js https://example.com 10 100 10"

echo -e "\n${RED}[!] WARNING: For authorized testing only!${NC}"
