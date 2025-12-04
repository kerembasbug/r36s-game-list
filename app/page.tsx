'use client';

import { useState, useMemo, useEffect } from 'react';
import gamesData from '../src/data/games.json';
import { useLanguage } from '../lib/i18n/LanguageContext';
import LanguageSelector from './components/LanguageSelector';

interface Game {
  name: string;
  console: string;
  slug: string;
  searchTerms: string[];
}

export default function Home() {
  const { t, locale } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConsole, setSelectedConsole] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'console'>('name');
  const [displayedCount, setDisplayedCount] = useState(50);

  const games = gamesData as Game[];

  // Konsol logoları için fonksiyon
  const getConsoleIcon = (consoleName: string): string => {
    const iconMap: { [key: string]: string } = {
      'PSP': '🎮',
      'Dreamcast': '💿',
      'PlayStation 1': '🎯',
      'SFC': '🕹️',
      'Famicom': '🎮',
      'SNES': '🎮',
      'Arcade': '🕹️',
      'Capcom Play System I': '⚔️',
      'Capcom Play System II': '⚔️',
      'Gameboy Advance': '📱',
      'Gameboy Color': '📱',
      'Sega Genesis': '🌊',
      'Mega Drive': '🌊',
      'Nintendo 64': '🎮',
      'Sega NAOMI': '💎',
      'Nintendo DS': '📱',
      'NeoGeo': '🔥',
      'NeoGeo Pocket': '📱',
      'NeoGeo Pocket Color': '📱',
      'PC Engine': '🖥️',
      'NES': '🎮'
    };
    return iconMap[consoleName] || '🎮';
  };

  // Konsolları unique olarak al
  const consoles = useMemo(() => {
    const uniqueConsoles = Array.from(new Set(games.map(g => g.console)));
    return uniqueConsoles.sort();
  }, [games]);

  // Filtrelenmiş ve sıralanmış oyunlar
  const filteredGames = useMemo(() => {
    let filtered = games;

    // Konsol filtresi
    if (selectedConsole !== 'all') {
      filtered = filtered.filter(game => game.console === selectedConsole);
    }

    // Arama filtresi
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(game => {
        return (
          game.name.toLowerCase().includes(query) ||
          game.console.toLowerCase().includes(query) ||
          game.searchTerms.some(term => term.includes(query))
        );
      });
    }

    // Sıralama
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else {
        return a.console.localeCompare(b.console) || a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [games, searchQuery, selectedConsole, sortBy]);

  // Filter değiştiğinde displayedCount'u resetle
  useEffect(() => {
    setDisplayedCount(50);
  }, [searchQuery, selectedConsole, sortBy]);

  // Görüntülenecek oyunlar
  const displayedGames = filteredGames.slice(0, displayedCount);
  const hasMore = filteredGames.length > displayedCount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-900 via-blue-900 to-cyan-900 sticky top-0 z-50 shadow-2xl border-b-2 border-cyan-500/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1"></div>
            <h1 className="flex-1 text-5xl md:text-6xl font-black text-center bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(0,255,255,0.5)] tracking-tight">
              {t.title}
            </h1>
            <div className="flex-1 flex justify-end">
              <LanguageSelector />
            </div>
          </div>
          <div className="flex justify-center mb-2">
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
          </div>
          <p className="text-center text-cyan-200 text-lg font-medium drop-shadow-[0_0_10px_rgba(0,255,255,0.3)]">
            {t.subtitle} <span className="text-cyan-400 font-bold">{games.length.toLocaleString()}</span> {t.gamesCount}
          </p>
        </div>
      </header>

      {/* CTA Bar */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 border-b-2 border-purple-500/50 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-center items-center gap-4">
            <span className="text-white font-semibold text-sm md:text-base">{t.shopConsole}</span>
            <a
              href="https://r36s.com.au"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-sm md:text-base"
            >
              <span>🇦🇺</span>
              <span>{t.australia}</span>
            </a>
            <a
              href="https://r36shandheld.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-lg shadow-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-sm md:text-base"
            >
              <span>🌍</span>
              <span>{t.global}</span>
            </a>
            <a
              href="https://r36h.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-lg shadow-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-sm md:text-base"
            >
              <span>🛒</span>
              <span>R36H.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.searchGames}
              </label>
              <input
                id="search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.enterGameName}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            {/* Console Filter */}
            <div>
              <label htmlFor="console" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.selectConsole}
              </label>
                  <select
                    id="console"
                    value={selectedConsole}
                    onChange={(e) => setSelectedConsole(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="all">🎮 {t.allConsoles}</option>
                    {consoles.map(console => (
                      <option key={console} value={console}>
                        {getConsoleIcon(console)} {console}
                      </option>
                    ))}
                  </select>
            </div>

            {/* Sort */}
            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.sortBy}
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'console')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="name">{t.byName}</option>
                <option value="console">{t.byConsole}</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            <strong>{filteredGames.length.toLocaleString()}</strong> {t.gamesFound}
            {selectedConsole !== 'all' && ` (${selectedConsole})`}
            {searchQuery && ` - ${t.searchFor} "${searchQuery}"`}
          </div>
        </div>

        {/* Games List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          {filteredGames.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {t.noGamesFound}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {displayedGames.map((game, index) => (
                  <div
                    key={`${game.slug}-${index}`}
                    className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-4 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-shadow"
                  >
                    <a href={`/game/${game.slug}`} className="block">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 dark:text-white text-sm mb-2 line-clamp-2">
                            {game.name}
                          </div>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 text-blue-800 dark:text-blue-200 text-xs rounded-full font-medium">
                            <span className="text-base">{getConsoleIcon(game.console)}</span>
                            <span>{game.console}</span>
                          </span>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
              
              {/* Load More Button */}
              {hasMore && (
                <div className="mt-8 text-center">
                  <button
                    onClick={() => setDisplayedCount(prev => Math.min(prev + 50, filteredGames.length))}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                  >
                    {t.loadMore} ({displayedCount.toLocaleString()} / {filteredGames.length.toLocaleString()})
                  </button>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {t.showing} {displayedCount.toLocaleString()} {t.of} {filteredGames.length.toLocaleString()} {t.games}
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* SEO Content */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t.seoTitle}
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {t.seoDescription1}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {t.seoDescription2}
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              {consoles.map(console => {
                const count = games.filter(g => g.console === console).length;
                return (
                  <li key={console} className="flex items-center gap-2">
                    <span className="text-xl">{getConsoleIcon(console)}</span>
                    <strong>{console}</strong>: {count.toLocaleString()} {t.games}
                  </li>
                );
              })}
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              {t.seoConclusion}
            </p>
          </div>
        </div>
      </div>

      {/* Detailed R36S Description Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 mt-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
              {t.detailedTitle}
            </h2>
            
            {/* Hero Image */}
            <div className="mb-12 rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=1200&h=600&fit=crop" 
                alt="R36S Retro Gaming Console" 
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 md:p-12 space-y-6 text-gray-700 dark:text-gray-300">
              <p className="text-lg leading-relaxed">
                {t.seoDescription1}
              </p>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                {t.whatMakesSpecial}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-gray-700 dark:to-gray-600 rounded-lg p-6">
                  <img 
                    src="https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&h=400&fit=crop" 
                    alt="R36S Console Design" 
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t.ergonomicDesign}</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    {t.ergonomicText}
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-gray-700 dark:to-gray-600 rounded-lg p-6">
                  <img 
                    src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop" 
                    alt="R36S Display Quality" 
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t.crystalDisplay}</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    {t.crystalText}
                  </p>
                </div>
              </div>

              <p className="text-lg leading-relaxed">
                {t.seoDescription1}
              </p>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                {t.supportedConsoles}
              </h3>

              <p className="text-lg leading-relaxed">
                {t.comprehensiveSupportText}
              </p>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-6 my-8">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t.seoListTitle}</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2">8-Bit & 16-Bit Era</h5>
                    <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                      <li>• NES (4,073 games)</li>
                      <li>• Famicom (1,540 games)</li>
                      <li>• SNES (837 games)</li>
                      <li>• Sega Genesis (892 games)</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Handheld Systems</h5>
                    <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                      <li>• Game Boy Advance (1,083 games)</li>
                      <li>• Game Boy Color (552 games)</li>
                      <li>• Nintendo DS (139 games)</li>
                      <li>• NeoGeo Pocket (92 games)</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Modern Classics</h5>
                    <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                      <li>• PlayStation Portable (50 games)</li>
                      <li>• Dreamcast (18 games)</li>
                      <li>• PlayStation 1 (85 games)</li>
                      <li>• Nintendo 64 (192 games)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                {t.arcadeExcellence}
              </h3>

              <p className="text-lg leading-relaxed">
                {t.arcadeText}
              </p>

              <div className="my-8 rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=600&fit=crop" 
                  alt="Arcade Gaming on R36S" 
                  className="w-full h-auto object-cover"
                />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                {t.technicalSpecs}
              </h3>

              <p className="text-lg leading-relaxed">
                {t.technicalText}
              </p>

              <p className="text-lg leading-relaxed">
                {t.batteryText}
              </p>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                {t.userExperience}
              </h3>

              <p className="text-lg leading-relaxed">
                {t.userExperienceText}
              </p>

              <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-6 my-8">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t.keyFeatures}</h4>
                <ul className="grid md:grid-cols-2 gap-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{t.preloaded}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{t.saveStates}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{t.hdmiOutput}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{t.expandableStorage}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{t.displayScaling}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{t.customizableControls}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{t.fastBoot}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{t.firmwareUpdates}</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                {t.perfectGift}
              </h3>

              <p className="text-lg leading-relaxed">
                {t.perfectGiftText}
              </p>

              <div className="my-8 rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=600&fit=crop" 
                  alt="R36S Gaming Experience" 
                  className="w-full h-auto object-cover"
                />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                {t.whyChoose}
              </h3>

              <p className="text-lg leading-relaxed">
                {t.whyChooseText1}
              </p>

              <p className="text-lg leading-relaxed">
                {t.whyChooseText2}
              </p>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                {t.gettingStarted}
              </h3>

              <p className="text-lg leading-relaxed">
                {t.gettingStartedText1}
              </p>

              <p className="text-lg leading-relaxed">
                {t.gettingStartedText2}
              </p>

              {/* CTA Section */}
              <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-4">
                  {t.readyToStart}
                </h2>
                <p className="text-xl text-blue-100 mb-8">
                  {t.readyToStartSubtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://r36shandheld.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    {t.shopAt} R36S Handheld
                  </a>
                  <a
                    href="https://r36s.com.au"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    {t.shopAt} R36S Australia
                  </a>
                </div>
                <p className="text-blue-100 mt-6 text-sm">
                  {t.freeShipping}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            R36S Game List - {new Date().getFullYear()} | {t.footerText}
          </p>
        </div>
      </footer>
    </div>
  );
}

