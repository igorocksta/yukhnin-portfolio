import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  RotateCcw, 
  Repeat, 
  Download, 
  ExternalLink, 
  Copy, 
  Check, 
  Maximize2, 
  Pause, 
  Layers, 
  Grid,
  FileImage,
  Sparkles,
  X
} from 'lucide-react';
import SplashLogo from '../components/SplashLogo';

export default function SplashPreview() {
  const [key, setKey] = useState(0);
  const [isLoop, setIsLoop] = useState(false);
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [isFrozenOrange, setIsFrozenOrange] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleRestart = (loopMode: boolean) => {
    setIsFrozenOrange(false);
    setIsLoop(loopMode);
    setIsSplashVisible(true);
    setKey((prev) => prev + 1);
  };

  const handleFreezeOrange = () => {
    setIsSplashVisible(false);
    setIsFrozenOrange(true);
  };

  const handleCopySvg = async (url: string, type: string) => {
    try {
      const res = await fetch(url);
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2500);
    } catch {
      // Fallback
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2500);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#080808] flex flex-col items-center justify-center overflow-hidden select-none">
      
      {/* Background showing website mockup underneath when curtain drops */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-0">
        <p className="text-white/40 font-mono text-xs uppercase tracking-widest mb-4">
          Фон основного сайта
        </p>
        <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
          Анимация Frame_3 завершилась — сайт открыт
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => handleRestart(false)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FF6900] text-black font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer shadow-lg"
          >
            <RotateCcw className="w-4 h-4" />
            Воспроизвести (1 раз)
          </button>
          <button
            onClick={() => handleRestart(true)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 text-white font-semibold text-xs uppercase tracking-wider hover:bg-white/20 transition-colors cursor-pointer border border-white/10"
          >
            <Repeat className="w-4 h-4" />
            Зациклить (Loop)
          </button>
          <button
            onClick={handleFreezeOrange}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FF6900]/20 text-[#FF6900] border border-[#FF6900]/40 font-semibold text-xs uppercase tracking-wider hover:bg-[#FF6900]/30 transition-colors cursor-pointer"
          >
            <Pause className="w-4 h-4" />
            Зафиксировать оранжевый фон
          </button>
        </div>
      </div>

      {/* Top Floating Control Bar */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[110] flex flex-wrap items-center justify-center gap-2 bg-[#080808]/90 backdrop-blur-md border border-white/15 rounded-full px-4 py-2 shadow-2xl max-w-[95vw]">
        <Link
          to="/"
          className="flex items-center gap-1.5 text-white/60 hover:text-white text-xs font-mono tracking-wider transition-colors pr-3 border-r border-white/10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>НА САЙТ</span>
        </Link>

        <button
          onClick={() => handleRestart(false)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
            !isLoop && !isFrozenOrange
              ? 'bg-[#FF6900] text-black font-semibold shadow-sm'
              : 'text-white/70 hover:text-white'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">1 раз (как на сайте)</span>
          <span className="sm:hidden">1 раз</span>
        </button>

        <button
          onClick={() => handleRestart(true)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
            isLoop && !isFrozenOrange
              ? 'bg-[#FF6900] text-black font-semibold shadow-sm'
              : 'text-white/70 hover:text-white'
          }`}
        >
          <Repeat className="w-3.5 h-3.5" />
          <span>Loop</span>
        </button>

        <button
          onClick={handleFreezeOrange}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
            isFrozenOrange
              ? 'bg-[#FF6900] text-black font-semibold shadow-sm'
              : 'text-white/70 hover:text-white'
          }`}
        >
          <Pause className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Зафиксировать фон</span>
          <span className="sm:hidden">Фон</span>
        </button>

        <button
          onClick={() => setIsExportModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider bg-white/10 hover:bg-[#FF6900] hover:text-black text-white transition-all cursor-pointer border border-white/15"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Исходники 1800×1800</span>
        </button>
      </div>

      {/* Frozen Full-Screen Orange Blueprint Background Mode */}
      {isFrozenOrange && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#FF6900] overflow-hidden select-none">
          {/* Blueprint Grid pattern matching the animation exactly */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="blueprint_frozen_pattern"
                width="124"
                height="124"
                x="32"
                y="32"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0 0h124v124H0z"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="0.75"
                  strokeOpacity="0.08"
                />
                <path
                  d="M0 -5v10 M-5 0h10"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                  strokeOpacity="0.32"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M62 58v8 M58 62h8"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                  strokeOpacity="0.32"
                  strokeLinecap="round"
                  fill="none"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blueprint_frozen_pattern)" />
          </svg>

          {/* Centered Circular Badge from the Splash Logo */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#080808] flex items-center justify-center shadow-2xl border border-black/20">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#FF6900">
                <path d="M10.8948 0C10.3149 0 9.84401 0.468638 9.84375 1.04839V9.84313H1.05105C0.471183 9.84313 0.0002625 10.3118 0 10.8915V12.7294C0.0002625 13.3092 0.471183 13.7804 1.05105 13.7804H9.84375V22.5726C9.84401 23.1524 10.3149 23.6236 10.8948 23.6236H12.7302C13.31 23.6236 13.7812 23.1524 13.7812 22.5726V13.7804H22.5739C23.1538 13.7804 23.625 13.3092 23.625 12.7294V10.8915C23.625 10.3118 23.1538 9.84313 22.5739 9.84313H13.7812V1.04839C13.7812 0.468638 13.31 0 12.7302 0H10.8948Z" />
              </svg>
            </div>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-black/60 bg-white/40 px-3 py-1 rounded-full backdrop-blur-sm">
              Оранжевый Blueprint Фон (Frame_3)
            </p>
          </div>

          {/* Quick Floating Action to Download 1800x1800 */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
            <a
              href="/orange-blueprint-pattern-1800x1800.png"
              download="orange-blueprint-pattern-1800x1800.png"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-black/80 transition-all shadow-xl"
            >
              <Download className="w-4 h-4 text-[#FF6900]" />
              <span>Скачать чистый паттерн (1800×1800 PNG)</span>
            </a>
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-xs font-mono uppercase tracking-wider hover:bg-white/90 transition-all shadow-xl"
            >
              <Layers className="w-4 h-4" />
              <span>Все исходники</span>
            </button>
          </div>
        </div>
      )}

      {/* Exact SVG Animation Running */}
      {isSplashVisible && (
        <SplashLogo
          key={`splash-${key}-${isLoop}`}
          isAnimated={true}
          loop={isLoop}
          onComplete={() => {
            if (!isLoop) {
              setIsSplashVisible(false);
            }
          }}
        />
      )}

      {/* Dedicated Export / Source Assets Modal (1800×1800) */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-lg animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#101012] border border-white/15 rounded-3xl p-6 sm:p-8 overflow-y-auto text-left shadow-2xl">
            
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6900]/15 text-[#FF6900] text-[11px] font-mono uppercase tracking-wider mb-2 border border-[#FF6900]/30">
                  <Grid className="w-3.5 h-3.5" />
                  <span>Исходные графические ассеты • 1800 × 1800 px</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Оранжевый Blueprint-фон с текстурой
                </h3>
                <p className="text-sm text-white/60 mt-1">
                  Паттерн сетки (#FF6900 + архитектурные метки и перекрестия) из вашей заставки загрузки в высоком разрешении 1800×1800.
                </p>
              </div>

              <button
                onClick={() => setIsExportModalOpen(false)}
                className="p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Asset Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
              
              {/* Asset 1: Pure Seamless Pattern (1800x1800) */}
              <div className="p-5 rounded-2xl border border-white/10 bg-[#161619] flex flex-col justify-between hover:border-white/20 transition-all">
                <div>
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-4 border border-white/10 bg-[#FF6900]">
                    <img
                      src="/orange-blueprint-pattern-1800x1800.png"
                      alt="Чистый оранжевый паттерн blueprint 1800x1800"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-white/90">
                      1800 × 1800 PNG
                    </div>
                  </div>
                  <h4 className="text-base font-semibold text-white">
                    Чистый паттерн (Seamless Grid)
                  </h4>
                  <p className="text-xs text-white/50 mt-1 leading-relaxed">
                    Сплошной оранжевый фон с центрированной blueprint-сеткой (размер ячейки 124px, перекрестия и направляющие). Идеально для подложек, секций и плашек.
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-5 pt-4 border-t border-white/5">
                  <a
                    href="/orange-blueprint-pattern-1800x1800.png"
                    download="orange-blueprint-pattern-1800x1800.png"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#FF6900] text-black font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity"
                  >
                    <Download className="w-4 h-4" />
                    <span>Скачать PNG</span>
                  </a>
                  <a
                    href="/orange-blueprint-pattern-1800x1800.png"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                    title="Открыть в полном размере"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => handleCopySvg('/orange-blueprint-pattern.svg', 'pattern')}
                    className="p-2.5 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                    title="Копировать векторный SVG"
                  >
                    {copiedType === 'pattern' ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Asset 2: Pattern with Center Badge Splash Mark (1800x1800) */}
              <div className="p-5 rounded-2xl border border-white/10 bg-[#161619] flex flex-col justify-between hover:border-white/20 transition-all">
                <div>
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-4 border border-white/10 bg-[#FF6900]">
                    <img
                      src="/orange-blueprint-splash-1800x1800.png"
                      alt="Оранжевый паттерн со значком 1800x1800"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-white/90">
                      1800 × 1800 PNG
                    </div>
                  </div>
                  <h4 className="text-base font-semibold text-white">
                    С логотипом / Бэйджем по центру
                  </h4>
                  <p className="text-xs text-white/50 mt-1 leading-relaxed">
                    Точный стоп-кадр из прелоадера: оранжевый blueprint-фон со строгим круглым знаком и оранжевым крестом в центре.
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-5 pt-4 border-t border-white/5">
                  <a
                    href="/orange-blueprint-splash-1800x1800.png"
                    download="orange-blueprint-splash-1800x1800.png"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-white/90 transition-opacity"
                  >
                    <Download className="w-4 h-4" />
                    <span>Скачать PNG</span>
                  </a>
                  <a
                    href="/orange-blueprint-splash-1800x1800.png"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                    title="Открыть в полном размере"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => handleCopySvg('/orange-blueprint-splash.svg', 'splash')}
                    className="p-2.5 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                    title="Копировать векторный SVG"
                  >
                    {copiedType === 'splash' ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

            </div>

            {/* Vector SVG Source Links */}
            <div className="mt-6 p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF6900]/10 border border-[#FF6900]/30 flex items-center justify-center text-[#FF6900]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">
                    Векторные исходники (.SVG) для Figma и кода
                  </p>
                  <p className="text-[11px] text-white/40">
                    Бесконечное масштабирование, можно напрямую вставить в Figma или Illustrator
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href="/orange-blueprint-pattern.svg"
                  download="orange-blueprint-pattern.svg"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-mono text-white/90 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Паттерн SVG</span>
                </a>
                <a
                  href="/orange-blueprint-splash.svg"
                  download="orange-blueprint-splash.svg"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-mono text-white/90 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Логотип SVG</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
