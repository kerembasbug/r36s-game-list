const fs = require('fs');
const path = require('path');

// Read HTML file
const htmlPath = '/Users/kerembasbug/Downloads/R36S Supported Game List – RGameConsole.html';
const html = fs.readFileSync(htmlPath, 'utf-8');

// Parse games
const games = [];
const consoleSections = [
  { name: 'PSP', id: 'playstation-portable-psp' },
  { name: 'Dreamcast', id: 'dreamcast' },
  { name: 'PlayStation 1', id: 'playstation-1' },
  { name: 'SFC', id: 'sfc-super-famicom' },
  { name: 'Famicom', id: 'famicom' },
  { name: 'SNES', id: 'super-nintendo-snes' },
  { name: 'Arcade', id: 'arcade-games' },
  { name: 'Capcom Play System I', id: 'capcom-play-system-i-cps1' },
  { name: 'Capcom Play System II', id: 'capcom-play-system-ii-cps2' },
  { name: 'Gameboy Advance', id: 'gameboy-advance' },
  { name: 'Gameboy Color', id: 'gameboy-color' },
  { name: 'Sega Genesis', id: 'sega-genesis' },
  { name: 'Mega Drive', id: 'mega-drive' },
  { name: 'Nintendo 64', id: 'nintendo-64' },
  { name: 'Sega NAOMI', id: 'sega-naomi' },
  { name: 'Nintendo DS', id: 'nintendo-ds' },
  { name: 'NeoGeo', id: 'neogeo' },
  { name: 'NeoGeo Pocket', id: 'neogeo-pocket' },
  { name: 'NeoGeo Pocket Color', id: 'neogeo-pocket-color' },
  { name: 'PC Engine', id: 'pc-engine' },
  { name: 'NES', id: 'nintendo-entertainment-system-nes' }
];

// Extract games for each console section
consoleSections.forEach(({ name, id }) => {
  // Find H2 heading
  const h2Regex = new RegExp(`<h2[^>]*id="${id}"[^>]*>([^<]+)</h2>`, 'i');
  const h2Match = html.match(h2Regex);
  
  if (h2Match) {
    const h2Index = html.indexOf(h2Match[0]);
    
    // Find next H2 (start of next section)
    const nextH2Regex = /<h2[^>]*id="[^"]*"[^>]*>/gi;
    nextH2Regex.lastIndex = h2Index + h2Match[0].length;
    const nextH2Match = nextH2Regex.exec(html);
    const sectionEnd = nextH2Match ? nextH2Match.index : html.length;
    
    // Find all <li> tags in this section
    const sectionHtml = html.substring(h2Index, sectionEnd);
    const liRegex = /<li[^>]*>([^<]+)<\/li>/gi;
    let liMatch;
    
    while ((liMatch = liRegex.exec(sectionHtml)) !== null) {
      const gameName = liMatch[1].trim();
      // Skip empty or invalid names
      if (gameName && gameName.length > 0 && !gameName.match(/^(downloaded_images|gamelist|gamelist\.xml|maxresdefault|CESHI|TDCFinal|pspikes|medlanes|topspeed|downloaded_videos|desktop)$/i)) {
        games.push({
          name: gameName,
          console: name,
          slug: gameName.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, ''),
          searchTerms: [
            gameName.toLowerCase(),
            `${gameName} ${name}`.toLowerCase(),
            `${name} ${gameName}`.toLowerCase()
          ]
        });
      }
    }
  }
});

// Save to JSON file
const outputPath = path.join(__dirname, 'src/data/games.json');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(games, null, 2), 'utf-8');

console.log(`✅ ${games.length} games successfully parsed and saved!`);
console.log(`📁 File: ${outputPath}`);

// Console-based statistics
const stats = {};
games.forEach(game => {
  stats[game.console] = (stats[game.console] || 0) + 1;
});
console.log('\n📊 Console-based statistics:');
Object.entries(stats).forEach(([consoleName, count]) => {
  console.log(`  ${consoleName}: ${count} games`);
});

