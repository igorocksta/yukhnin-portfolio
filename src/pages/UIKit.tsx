import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Sparkles, 
  Layers, 
  Palette, 
  Type, 
  Layout, 
  Send, 
  ChevronDown, 
  Copy, 
  CheckCheck,
  MousePointerClick,
  Sliders,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { EyebrowReveal } from '../components/TextReveal';

const TOPIC_OPTIONS = [
  'A job opportunity',
  'A freelance or consulting project',
  'A potential collaboration',
  'A question',
  'Something else',
];

export default function UIKit() {
  const [activeTab, setActiveTab] = useState<'contact' | 'typography' | 'controls' | 'tokens'>('contact');
  const [activeCallout, setActiveCallout] = useState(true);
  
  // Interactive Contact Sandbox State
  const [sandboxStep, setSandboxStep] = useState(1);
  const [sandboxName, setSandboxName] = useState('');
  const [sandboxTopic, setSandboxTopic] = useState('');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(label);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  return (
    <div className="pt-32 pb-32 container-custom text-white min-h-screen">
      {/* Page Title & Context */}
      <div className="mb-12">
        <div className="flex items-center gap-6 mb-4">
          <span className="text-[10px] uppercase tracking-[0.14em] text-[#ff6900] font-medium">
            DESIGN SYSTEM & FIGMA EXPORT KIT
          </span>
          <div className="h-[1px] bg-white/[0.12] flex-grow" />
        </div>
        <h1 className="text-[44px] md:text-[56px] leading-[48px] md:leading-[56px] font-dm-sans font-extrabold tracking-[-2px] text-white mb-4">
          Design System & Component States
        </h1>
        <p className="text-white/60 text-base max-w-3xl font-light font-sans leading-relaxed">
          Интерактивная карта компонентов со всеми состояниями (<span className="text-white">Default</span>, <span className="text-[#ff6900]">Hover</span>, <span className="text-[#ff6900]">Focus / Active</span>, <span className="text-emerald-400">Completed</span>, <span className="text-rose-400">Error</span>, <span className="text-white/40">Disabled</span>), созданная для переноса дизайн-системы в Figma.
        </p>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-8 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] w-fit">
          {[
            { id: 'contact', label: 'Contact Form System & States', icon: Sliders },
            { id: 'controls', label: 'Interactive Controls (32px & Badges)', icon: Sparkles },
            { id: 'typography', label: 'Typography Scale', icon: Type },
            { id: 'tokens', label: 'Color Tokens & Spacing', icon: Palette },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2 transition-all cursor-pointer select-none ${
                  isActive
                    ? 'bg-[#ff6900] text-white shadow-[0_0_16px_rgba(255,105,0,0.35)]'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: CONTACT FORM SYSTEM & ALL COMPONENT STATES */}
      {activeTab === 'contact' && (
        <div className="space-y-16">

          {/* SECTION A: LIVE INTERACTIVE CONTACT CARD PLAYGROUND */}
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/[0.12] pb-4">
              <div className="flex items-center gap-3">
                <Sliders className="w-5 h-5 text-[#ff6900]" />
                <h2 className="text-[24px] md:text-[28px] leading-[32px] font-dm-sans font-bold tracking-tight">
                  1. Live Interactive Multi-Step Sandbox
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/50">
                <span>Current Step:</span>
                <span className="font-mono text-[#ff6900] font-bold">0{sandboxStep} / 05</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Live Card */}
              <div className="lg:col-span-7 flex justify-center">
                <div className="w-full max-w-[580px] rounded-2xl p-[4px] relative overflow-hidden shadow-2xl">
                  {/* Rotating Conic Glow Border */}
                  <motion.div 
                    animate={{ rotate: (sandboxStep - 1) * 72 }}
                    transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
                    className="absolute -inset-[100%] m-auto w-[300%] h-[300%] pointer-events-none"
                    style={{
                      background: 'conic-gradient(from 0deg, #ff6900 0deg, #ff9e42 60deg, #155dfc 180deg, #155dfc 240deg, #ff6900 360deg)',
                    }}
                  />

                  {/* Inner Form Card */}
                  <div className="bg-[#080808] w-full min-h-[420px] rounded-xl px-6 sm:px-8 pt-8 sm:pt-10 pb-8 relative z-10 flex flex-col justify-between text-left">
                    <div>
                      {/* Eyebrow & Title */}
                      <div className="mb-8">
                        <span className="text-[10px] leading-[15px] font-light tracking-[0.14em] uppercase text-[#ff6900] block mb-2 font-sans">
                          GET IN TOUCH
                        </span>
                        <h3 className="text-3xl sm:text-[34px] font-dm-sans font-extrabold tracking-normal text-[#f5f5f5] leading-tight">
                          Contact Me
                        </h3>
                      </div>

                      {/* Stepper Dots 1 to 5 */}
                      <div className="flex items-center justify-between w-full mb-8 pt-1">
                        {[1, 2, 3, 4, 5].map((stepNum, idx) => {
                          const isActive = sandboxStep === stepNum;
                          const isCompleted = sandboxStep > stepNum;
                          return (
                            <React.Fragment key={stepNum}>
                              <button
                                onClick={() => setSandboxStep(stepNum)}
                                className={`w-8 h-8 rounded-full border-[1.5px] flex items-center justify-center text-xs font-medium select-none transition-all duration-300 cursor-pointer ${
                                  isActive
                                    ? 'bg-white/[0.08] border-[#f5f5f5] text-[#f5f5f5] shadow-[0_0_16px_rgba(245,245,245,0.2)]'
                                    : isCompleted
                                    ? 'bg-[#2a2a2a] border-transparent text-white/90'
                                    : 'bg-white/[0.02] border-white/25 text-white/25 hover:border-white/50 hover:text-white/60'
                                }`}
                              >
                                {stepNum}
                              </button>
                              {idx < 4 && (
                                <div className="flex-1 mx-2 h-[1px] bg-white/10 relative overflow-hidden">
                                  <div 
                                    className={`absolute inset-0 bg-white/45 transition-transform duration-500 origin-left ${
                                      isCompleted ? 'scale-x-100' : 'scale-x-0'
                                    }`} 
                                  />
                                </div>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </div>

                      {/* Step Question */}
                      <div className="mb-6">
                        <h4 className="text-2xl font-dm-sans font-extrabold tracking-normal text-[#f5f5f5] mb-4 leading-tight">
                          {sandboxStep === 1 && 'How should I address you?'}
                          {sandboxStep === 2 && 'What would you like to discuss?'}
                          {sandboxStep === 3 && 'Tell me about your company'}
                          {sandboxStep === 4 && 'How can I help with this?'}
                          {sandboxStep === 5 && 'Where should I send my response?'}
                        </h4>

                        {sandboxStep === 1 && (
                          <input
                            type="text"
                            value={sandboxName}
                            onChange={(e) => setSandboxName(e.target.value)}
                            placeholder="Your name"
                            className="w-full bg-white/[0.04] border border-white/[0.12] focus:border-[#ff6900] rounded-lg px-4 py-4 text-[#f5f5f5] placeholder-white/20 text-[16px] leading-[24px] font-light outline-none transition-all focus:shadow-[0_0_16px_rgba(255,105,0,0.15)]"
                          />
                        )}

                        {sandboxStep === 2 && (
                          <div className="relative">
                            <select
                              value={sandboxTopic}
                              onChange={(e) => setSandboxTopic(e.target.value)}
                              className={`w-full appearance-none bg-white/[0.04] border border-white/[0.12] focus:border-[#ff6900] rounded-lg pl-4 pr-12 py-4 text-[16px] leading-[24px] font-light outline-none transition-all cursor-pointer ${
                                sandboxTopic ? 'text-[#f5f5f5]' : 'text-white/40'
                              }`}
                            >
                              <option value="" disabled className="bg-[#161616] text-white/40">Select a topic</option>
                              {TOPIC_OPTIONS.map((opt) => (
                                <option key={opt} value={opt} className="bg-[#161616] text-[#f5f5f5] py-2">{opt}</option>
                              ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50 flex items-center justify-center">
                              <ChevronDown size={16} strokeWidth={1.8} />
                            </div>
                          </div>
                        )}

                        {sandboxStep >= 3 && (
                          <input
                            type="text"
                            placeholder="Type response here..."
                            className="w-full bg-white/[0.04] border border-white/[0.12] focus:border-[#ff6900] rounded-lg px-4 py-4 text-[#f5f5f5] placeholder-white/20 text-[16px] leading-[24px] font-light outline-none transition-all focus:shadow-[0_0_16px_rgba(255,105,0,0.15)]"
                          />
                        )}
                      </div>
                    </div>

                    {/* Footer Nav Controls */}
                    <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between mt-4">
                      <button
                        onClick={() => setSandboxStep(Math.max(1, sandboxStep - 1))}
                        disabled={sandboxStep === 1}
                        className={`text-xs flex items-center gap-1.5 transition-colors ${
                          sandboxStep === 1 ? 'opacity-0 pointer-events-none' : 'text-white/40 hover:text-white cursor-pointer'
                        }`}
                      >
                        <ArrowLeft size={14} /> Back
                      </button>

                      <button
                        onClick={() => setSandboxStep(Math.min(5, sandboxStep + 1))}
                        className="px-6 py-3 rounded-full text-xs font-medium tracking-[0.02em] flex items-center gap-2 transition-all duration-300 bg-[#ff6900] text-white hover:shadow-[0_0_20px_rgba(255,105,0,0.4)] cursor-pointer"
                      >
                        <span>{sandboxStep === 5 ? 'Submit' : 'Continue'}</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Step & State Controls for Testing */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0a0a0a] border border-white/[0.12] space-y-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.14em] text-[#ff6900] font-mono">FIGMA SPEC // ANATOMY</span>
                  <h3 className="text-lg font-bold text-white mt-1">Multi-Step Card Specifications</h3>
                  <p className="text-xs text-white/50 mt-1 font-light leading-relaxed">
                    Карточка построена по принципу двух вложенных контейнеров с математически выверенным радиусом: внешний `rounded-2xl` (16px) с padding `4px` и внутренний `rounded-xl` (12px = 16px - 4px).
                  </p>
                </div>

                {/* Quick Step Switcher */}
                <div className="space-y-2">
                  <span className="text-xs font-mono text-white/60">Switch Active Step:</span>
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        onClick={() => setSandboxStep(s)}
                        className={`py-2 rounded-lg text-xs font-mono font-medium border transition-all cursor-pointer ${
                          sandboxStep === s
                            ? 'bg-[#ff6900] border-[#ff6900] text-white shadow-[0_0_12px_rgba(255,105,0,0.3)]'
                            : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                        }`}
                      >
                        Step {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Copy CSS Tokens for Figma */}
                <div className="space-y-3 pt-4 border-t border-white/[0.08]">
                  <span className="text-xs font-mono text-white/60">Figma Design System Tokens:</span>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.08]">
                      <span className="text-white/50">Outer Border Gradient:</span>
                      <button
                        onClick={() => copyToClipboard('conic-gradient(from 0deg, #ff6900 0deg, #ff9e42 60deg, #155dfc 180deg, #155dfc 240deg, #ff6900 360deg)', 'conic')}
                        className="text-[#ff6900] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        {copiedToken === 'conic' ? <CheckCheck size={12} /> : <Copy size={12} />}
                        <span>Conic Angle Spec</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.08]">
                      <span className="text-white/50">Active Focus Glow:</span>
                      <button
                        onClick={() => copyToClipboard('0 0 16px rgba(255, 105, 0, 0.15)', 'glow')}
                        className="text-[#ff6900] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        {copiedToken === 'glow' ? <CheckCheck size={12} /> : <Copy size={12} />}
                        <span>0 0 16px #ff6900 15%</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.08]">
                      <span className="text-white/50">Input Corner Radius:</span>
                      <button
                        onClick={() => copyToClipboard('16px (rounded-2xl)', 'radius')}
                        className="text-[#ff6900] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        {copiedToken === 'radius' ? <CheckCheck size={12} /> : <Copy size={12} />}
                        <span>16px (rounded-2xl)</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>


          {/* SECTION B: COMPLETE STATE MATRIX FOR FIGMA (INPUTS, BUTTONS, STEPS) */}
          <section className="space-y-12">
            <div className="border-b border-white/[0.12] pb-4">
              <h2 className="text-[24px] md:text-[28px] font-dm-sans font-bold tracking-tight text-white">
                2. Component State Matrix (All UI Variants)
              </h2>
              <p className="text-xs text-white/50 mt-1 font-light">
                Все варианты состояний компонентов для прямой вставки и настройки вариантов в Figma (Component Variants & Properties).
              </p>
            </div>

            {/* 1. INPUT FIELD STATES MATRIX */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ff6900]" />
                  A. Text Input Fields (States & Edge Cases)
                </h3>
                <span className="text-xs font-mono text-white/40">Height: 52px (py-4 px-4) · Radius: 16px</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* State: Default / Idle */}
                <div className="p-5 rounded-2xl bg-[#0a0a0a] border border-white/[0.08] space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-white/80 font-medium">1. Default / Idle</span>
                    <span className="text-white/40">border-white/[0.12]</span>
                  </div>
                  <input
                    type="text"
                    readOnly
                    placeholder="Your name"
                    className="w-full bg-white/[0.04] border border-white/[0.12] rounded-lg px-4 py-3.5 text-[#f5f5f5] placeholder-white/20 text-[16px] leading-[24px] font-light outline-none"
                  />
                  <p className="text-[11px] text-white/40 font-light">Фон `rgba(255,255,255,0.04)`, бордер `white/12`, плейсхолдер `white/20`.</p>
                </div>

                {/* State: Hover */}
                <div className="p-5 rounded-2xl bg-[#0a0a0a] border border-white/[0.08] space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-white/80 font-medium">2. Hover State</span>
                    <span className="text-white/60">border-white/30</span>
                  </div>
                  <input
                    type="text"
                    readOnly
                    placeholder="Your name"
                    className="w-full bg-white/[0.06] border border-white/30 rounded-lg px-4 py-3.5 text-[#f5f5f5] placeholder-white/30 text-[16px] leading-[24px] font-light outline-none"
                  />
                  <p className="text-[11px] text-white/40 font-light">Усиление бордера до `white/30` и мягкое осветление фона до `white/06`.</p>
                </div>

                {/* State: Focused / Active (Orange Border) */}
                <div className="p-5 rounded-2xl bg-[#0a0a0a] border border-[#ff6900]/30 space-y-3 shadow-[0_0_24px_rgba(255,105,0,0.06)]">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-[#ff6900] font-medium">3. Focus / Active</span>
                    <span className="text-[#ff6900]">border-[#ff6900]</span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      readOnly
                      value="Alex Rivers"
                      className="w-full bg-white/[0.04] border border-[#ff6900] rounded-lg px-4 py-3.5 text-[#f5f5f5] text-[16px] leading-[24px] font-light outline-none shadow-[0_0_16px_rgba(255,105,0,0.18)]"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-4 bg-[#ff6900] animate-pulse rounded-full" />
                  </div>
                  <p className="text-[11px] text-white/40 font-light">Активный оранжевый бордер `#ff6900` + мягкое свечение `0 0 16px rgba(255,105,0,0.18)`.</p>
                </div>

                {/* State: Filled (Value entered) */}
                <div className="p-5 rounded-2xl bg-[#0a0a0a] border border-white/[0.08] space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-white/80 font-medium">4. Filled State</span>
                    <span className="text-emerald-400">Valid</span>
                  </div>
                  <input
                    type="text"
                    readOnly
                    value="alex.rivers@enterprise.com"
                    className="w-full bg-white/[0.04] border border-white/[0.18] rounded-lg px-4 py-3.5 text-white font-light text-[16px] leading-[24px] outline-none"
                  />
                  <p className="text-[11px] text-white/40 font-light">Введенный текст `text-white` со 100% контрастностью для максимальной читаемости.</p>
                </div>

                {/* State: Error / Invalid */}
                <div className="p-5 rounded-2xl bg-[#0a0a0a] border border-rose-500/30 space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-rose-400 font-medium">5. Error / Invalid</span>
                    <span className="text-rose-400">border-rose-500</span>
                  </div>
                  <input
                    type="text"
                    readOnly
                    value="invalid-email@"
                    className="w-full bg-rose-500/[0.05] border border-rose-500/80 rounded-lg px-4 py-3.5 text-rose-200 text-[16px] leading-[24px] font-light outline-none shadow-[0_0_12px_rgba(244,63,94,0.15)]"
                  />
                  <p className="text-[11px] text-rose-400/80 font-light">Подсветка ошибки бордером `rose-500` и тонированным фоном `rose-500/05`.</p>
                </div>

                {/* State: Disabled */}
                <div className="p-5 rounded-2xl bg-[#0a0a0a] border border-white/[0.08] space-y-3 opacity-60">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-white/50 font-medium">6. Disabled</span>
                    <span className="text-white/30">cursor-not-allowed</span>
                  </div>
                  <input
                    type="text"
                    disabled
                    placeholder="Field locked"
                    className="w-full bg-white/[0.01] border border-white/5 rounded-lg px-4 py-3.5 text-white/20 placeholder-white/10 text-sm outline-none cursor-not-allowed"
                  />
                  <p className="text-[11px] text-white/40 font-light">Неактивное поле: сниженная прозрачность `opacity-60` и `cursor-not-allowed`.</p>
                </div>

              </div>
            </div>


            {/* 2. BUTTON STATES MATRIX (CONTINUE / SUBMIT / BACK) */}
            <div className="space-y-6 pt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ff6900]" />
                  B. Action Buttons & Navigation Controls
                </h3>
                <span className="text-xs font-mono text-white/40">Height: 44px · Radius: 9999px (Pill)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Button State: Disabled / Initial Empty Step */}
                <div className="p-5 rounded-2xl bg-[#0a0a0a] border border-white/[0.08] flex flex-col justify-between h-[180px]">
                  <div className="text-xs font-mono text-white/50">
                    <p className="text-white font-medium">1. Disabled Button</p>
                    <p className="text-[10px] text-white/30">Когда поле не заполнено</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      disabled
                      className="px-6 py-3 rounded-full text-xs font-medium tracking-[0.02em] flex items-center gap-2 bg-white/5 text-white/20 border border-white/5 cursor-not-allowed"
                    >
                      <span>Continue</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                  <span className="text-[10px] font-mono text-white/30 text-center">bg-white/5 text-white/20</span>
                </div>

                {/* Button State: Default Active / Ready */}
                <div className="p-5 rounded-2xl bg-[#0a0a0a] border border-white/[0.08] flex flex-col justify-between h-[180px]">
                  <div className="text-xs font-mono text-white/50">
                    <p className="text-white font-medium">2. Ready / Active</p>
                    <p className="text-[10px] text-white/30">Поле заполнено</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      className="px-6 py-3 rounded-full text-xs font-medium tracking-[0.02em] flex items-center gap-2 bg-[#ff6900] text-white cursor-pointer"
                    >
                      <span>Continue</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                  <span className="text-[10px] font-mono text-[#ff6900] text-center">bg-[#ff6900]</span>
                </div>

                {/* Button State: Hover / Glow */}
                <div className="p-5 rounded-2xl bg-[#0a0a0a] border border-[#ff6900]/30 flex flex-col justify-between h-[180px] shadow-[0_0_20px_rgba(255,105,0,0.08)]">
                  <div className="text-xs font-mono text-white/50">
                    <p className="text-[#ff6900] font-medium">3. Hover + Glow</p>
                    <p className="text-[10px] text-white/30">При наведении мыши</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      className="px-6 py-3 rounded-full text-xs font-medium tracking-[0.02em] flex items-center gap-2 bg-[#ff6900] text-white shadow-[0_0_20px_rgba(255,105,0,0.5)] cursor-pointer"
                    >
                      <span>Continue</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                  <span className="text-[10px] font-mono text-[#ff6900] text-center">shadow-[0_0_20px_rgba(255,105,0,0.5)]</span>
                </div>

                {/* Button State: Secondary Back Button */}
                <div className="p-5 rounded-2xl bg-[#0a0a0a] border border-white/[0.08] flex flex-col justify-between h-[180px]">
                  <div className="text-xs font-mono text-white/50">
                    <p className="text-white font-medium">4. Back / Secondary</p>
                    <p className="text-[10px] text-white/30">Кнопка «Назад»</p>
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <button className="text-xs text-white/40 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer">
                      <ArrowLeft size={14} /> Back
                    </button>
                    <button className="text-xs text-white flex items-center gap-1.5 transition-colors underline cursor-pointer">
                      <ArrowLeft size={14} /> (Hovered)
                    </button>
                  </div>
                  <span className="text-[10px] font-mono text-white/40 text-center">text-white/40 → text-white</span>
                </div>

              </div>
            </div>


            {/* 3. STEPPER INDICATOR CHIPS (1 to 5) */}
            <div className="space-y-6 pt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ff6900]" />
                  C. Stepper Indicators (32x32px Circular Indicators)
                </h3>
                <span className="text-xs font-mono text-white/40">Size: 32x32px · Border: 1.5px</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Inactive / Upcoming */}
                <div className="p-5 rounded-2xl bg-[#0a0a0a] border border-white/[0.08] space-y-4">
                  <div className="text-xs font-mono text-white/50">
                    <p className="text-white font-medium">1. Upcoming / Inactive</p>
                    <p className="text-[10px] text-white/30">Предстоящие шаги</p>
                  </div>
                  <div className="flex items-center justify-center py-4">
                    <div className="w-8 h-8 rounded-full border-[1.5px] border-white/25 bg-white/[0.02] text-white/25 flex items-center justify-center text-xs font-medium">
                      3
                    </div>
                  </div>
                  <p className="text-[10px] font-mono text-white/30 text-center">border-white/25 text-white/25</p>
                </div>

                {/* Active / Current Step */}
                <div className="p-5 rounded-2xl bg-[#0a0a0a] border border-white/[0.18] space-y-4 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                  <div className="text-xs font-mono text-white/50">
                    <p className="text-white font-medium">2. Active / Current</p>
                    <p className="text-[10px] text-white/30">Текущий открытый шаг</p>
                  </div>
                  <div className="flex items-center justify-center py-4">
                    <div className="w-8 h-8 rounded-full border-[1.5px] border-[#f5f5f5] bg-white/[0.08] text-[#f5f5f5] shadow-[0_0_16px_rgba(245,245,245,0.2)] flex items-center justify-center text-xs font-medium">
                      1
                    </div>
                  </div>
                  <p className="text-[10px] font-mono text-white/70 text-center">border-[#f5f5f5] shadow-[0_0_16px]</p>
                </div>

                {/* Completed Step */}
                <div className="p-5 rounded-2xl bg-[#0a0a0a] border border-white/[0.08] space-y-4">
                  <div className="text-xs font-mono text-white/50">
                    <p className="text-white font-medium">3. Completed Step</p>
                    <p className="text-[10px] text-white/30">Уже пройденный шаг</p>
                  </div>
                  <div className="flex items-center justify-center py-4">
                    <div className="w-8 h-8 rounded-full border-[1.5px] border-transparent bg-[#2a2a2a] text-white/90 flex items-center justify-center text-xs font-medium">
                      ✓
                    </div>
                  </div>
                  <p className="text-[10px] font-mono text-white/50 text-center">bg-[#2a2a2a] text-white/90</p>
                </div>

                {/* Connector Line States */}
                <div className="p-5 rounded-2xl bg-[#0a0a0a] border border-white/[0.08] space-y-4">
                  <div className="text-xs font-mono text-white/50">
                    <p className="text-white font-medium">4. Connecting Line</p>
                    <p className="text-[10px] text-white/30">Линия между шагами</p>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-4 py-4">
                    <div className="w-full flex items-center gap-2">
                      <span className="text-[10px] font-mono text-white/40">Incomplete:</span>
                      <div className="flex-1 h-[1px] bg-white/10" />
                    </div>
                    <div className="w-full flex items-center gap-2">
                      <span className="text-[10px] font-mono text-white/40">Completed:</span>
                      <div className="flex-1 h-[1px] bg-white/45" />
                    </div>
                  </div>
                  <p className="text-[10px] font-mono text-white/40 text-center">h-[1px] bg-white/10 vs bg-white/45</p>
                </div>

              </div>
            </div>

          </section>

        </div>
      )}

      {/* TAB 2: INTERACTIVE CONTROLS (32x32px Callouts & Badges) */}
      {activeTab === 'controls' && (
        <div className="space-y-12">
          <div className="border-b border-white/[0.12] pb-4">
            <h2 className="text-[28px] leading-[32px] font-dm-sans font-bold tracking-tight">
              Interactive 32x32px Callout Controls
            </h2>
            <p className="text-xs text-white/50 mt-1 font-light">
              Интерактивные маркеры для кейсов: анатомия состояний и плавающий бейдж с описанием.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/[0.12] grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-[0.14em] text-white/40">Анатомия контрола 32x32px</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-[32px] h-[32px] rounded-full bg-white border border-white/60 flex items-center justify-center text-black">
                      <Plus size={16} strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white">1. Default State</p>
                      <p className="text-[10px] text-white/40">Белый круг w-[32px] h-[32px]</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-white/40">bg-white</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-[32px] h-[32px] rounded-full bg-[#ff6900] flex items-center justify-center text-white shadow-[0_0_15px_rgba(255,105,0,0.5)]">
                      <Plus size={16} strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white">2. Hover State</p>
                      <p className="text-[10px] text-white/40">Оранжевый оттенок + оранжевый glow</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#ff6900]">#ff6900</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-[32px] h-[32px] rounded-full bg-[#ff6900] flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,105,0,0.6)]">
                      <Plus size={16} strokeWidth={1.75} className="rotate-45" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white">3. Active State</p>
                      <p className="text-[10px] text-white/40">Контрол на месте, иконка +45°, плашка слева</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#ff6900]">rotate-45</span>
                </div>
              </div>
            </div>

            {/* Right: Live Interactive Demo */}
            <div className="p-6 rounded-xl bg-[#080808] border border-white/10 flex flex-col justify-between relative min-h-[220px]">
              <div>
                <span className="text-[10px] uppercase tracking-[0.14em] text-[#ff6900] block mb-1">Live Interactive Demo</span>
                <p className="text-xs text-white/50">Нажмите на плюс — контрол останется неподвижным, плашка покажется слева:</p>
              </div>

              <div className="relative flex items-center justify-end h-[100px] w-full pr-8">
                <div className="relative flex items-center h-[32px]">
                  <button
                    onClick={() => setActiveCallout(!activeCallout)}
                    className={`w-[32px] h-[32px] rounded-full flex items-center justify-center shadow-xl transition-all duration-300 flex-shrink-0 focus:outline-none cursor-pointer group z-10 ${
                      activeCallout
                        ? 'bg-[#ff6900] border border-transparent text-white shadow-[0_0_20px_rgba(255,105,0,0.6)]'
                        : 'bg-white border border-white/60 hover:bg-[#ff6900] hover:border-transparent text-black hover:text-white'
                    }`}
                  >
                    <motion.div
                      animate={{ rotate: activeCallout ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <Plus size={16} strokeWidth={1.75} className={activeCallout ? 'text-white' : 'text-black group-hover:text-white transition-colors duration-300'} />
                    </motion.div>
                  </button>

                  {activeCallout && (
                    <motion.div
                      initial={{ opacity: 0, x: 12, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-3 text-white shadow-xl w-[260px] sm:w-[320px]"
                    >
                      <p className="text-xs leading-[18px] text-white/95 font-light font-sans">
                        Created reusable, customizable components so teams could scale product improvements more efficiently.
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>

              <span className="text-[10px] text-white/30 font-mono text-center">
                32x32px Fixed Anchor Control
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: TYPOGRAPHY SCALE */}
      {activeTab === 'typography' && (
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/[0.12] pb-4 gap-4">
            <div className="flex items-center gap-3">
              <Type className="w-5 h-5 text-[#ff6900]" />
              <div>
                <h2 className="text-[28px] leading-[32px] font-dm-sans font-bold tracking-tight">Typography Hierarchy & 7 Font Families</h2>
                <p className="text-xs text-white/50 font-light mt-0.5">Все используемые в проекте шрифты и уровни шкалы</p>
              </div>
            </div>

            <Link
              to="/typography"
              className="px-4 py-2 rounded-xl bg-[#ff6900] hover:bg-[#ff7a1a] text-white text-xs font-medium flex items-center gap-2 transition-all shadow-[0_0_16px_rgba(255,105,0,0.3)] self-start sm:self-auto cursor-pointer"
            >
              <span>Open Dedicated Typography Page</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* All 7 Font Families Chips */}
          <div className="p-5 rounded-2xl bg-[#0a0a0c] border border-white/[0.10] space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#ff6900] block">
              7 ACTIVE FONT FAMILIES IN DESIGN SYSTEM
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-[10px] font-mono text-[#ff6900] block">DISPLAY & HEADINGS</span>
                <p className="text-base font-bold font-dm-sans text-white">DM Sans</p>
                <p className="text-[11px] text-white/40">H0–H4, stats, card titles</p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-[10px] font-mono text-[#ff6900] block">INTERFACE & BODY</span>
                <p className="text-base font-medium font-inter text-white">Inter</p>
                <p className="text-[11px] text-white/40">Subtitles, paragraphs, inputs, CTAs</p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-[10px] font-mono text-[#ff6900] block">EDITORIAL ACCENT</span>
                <p className="text-base font-light italic font-serif text-[#ff6900]">Playfair Display</p>
                <p className="text-[11px] text-white/40">Hero "experiences", serif accents</p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-[10px] font-mono text-[#ff6900] block">EDITORIAL QUOTES</span>
                <p className="text-base font-light italic font-hanken text-white">Hanken Grotesk</p>
                <p className="text-[11px] text-white/40">Testimonials, recommendations</p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-[10px] font-mono text-[#ff6900] block">TECHNICAL SPECS</span>
                <p className="text-sm font-normal font-space-mono text-white">Space Mono</p>
                <p className="text-[11px] text-white/40">Step counters 01/05, time, specs</p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-[10px] font-mono text-[#ff6900] block">TECH BADGES</span>
                <p className="text-sm font-medium font-space-grotesk text-white">Space Grotesk</p>
                <p className="text-[11px] text-white/40">Digital metrics, feature chips</p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 sm:col-span-2">
                <span className="text-[10px] font-mono text-[#ff6900] block">HEAVY DISPLAY NUMERALS</span>
                <p className="text-sm font-extrabold font-archivo text-white">Archivo (700-900)</p>
                <p className="text-[11px] text-white/40">Industrial stats, dense high-impact metrics</p>
              </div>
            </div>
          </div>

          {/* Master Visual Hierarchy Scale Box */}
          <div className="p-8 md:p-10 rounded-2xl bg-[#0a0a0c] border border-white/[0.12] space-y-10">
            {/* H0 Display Heading */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono text-white/40">
                <span className="text-[#ff6900] uppercase font-bold">H0 Display — DM Sans + Playfair</span>
                <span>88px / 80px (Mobile: 44px / 44px) — ExtraBold</span>
              </div>
              <div className="text-[40px] sm:text-[64px] md:text-[88px] leading-[1.0] md:leading-[80px] font-dm-sans font-extrabold tracking-[-0.5px] md:tracking-[-3.5px] text-white relative isolate">
                <span className="relative z-20 text-white">Systems that feel </span><span className="font-serif italic font-light text-[#ff6900] tracking-[-1px] xl:tracking-[-2px] glow-orange-italic relative z-[1]">alive.</span>
              </div>
            </div>

            <div className="h-[1px] bg-white/[0.10]" />

            {/* H1 Heading */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono text-white/40">
                <span className="text-[#ff6900] uppercase font-bold">H1 Page Heading — DM Sans</span>
                <span>72px / 72px (Mobile: 44px / 44px) — ExtraBold</span>
              </div>
              <div className="text-[34px] sm:text-[52px] md:text-[72px] leading-[1.0] md:leading-[72px] font-dm-sans font-extrabold tracking-[-0.5px] md:tracking-[-2px] text-white">
                Contact Me
              </div>
            </div>

            <div className="h-[1px] bg-white/[0.10]" />

            {/* H2 Heading */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono text-white/40">
                <span className="text-[#ff6900] uppercase font-bold">H2 Section Heading — DM Sans</span>
                <span>56px / 56px (Mobile: 36px / 40px) — ExtraBold</span>
              </div>
              <div className="text-[28px] sm:text-[40px] md:text-[56px] leading-[1.0] md:leading-[56px] font-dm-sans font-extrabold tracking-[-0.5px] md:tracking-[-2px] text-white">
                A precise dialogue
              </div>
            </div>

            <div className="h-[1px] bg-white/[0.10]" />

            {/* H3 Card Heading */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono text-white/40">
                <span className="text-[#ff6900] uppercase font-bold">H3 Card & Form Question — DM Sans</span>
                <span>32px / 38px (Mobile: 24px / 32px) — Bold</span>
              </div>
              <div className="text-[24px] sm:text-[32px] leading-[32px] sm:leading-[38px] font-dm-sans font-bold tracking-[-0.2px] sm:tracking-[-1px] text-white">
                Erwin Data Modeler by Quest
              </div>
            </div>

            <div className="h-[1px] bg-white/[0.10]" />

            {/* H4 Subsection / FAQ Heading */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono text-white/40">
                <span className="text-[#ff6900] uppercase font-bold">H4 Accordion / Subsection — DM Sans</span>
                <span>20px / 28px (Mobile: 18px / 22px) — SemiBold</span>
              </div>
              <div className="text-[18px] md:text-[20px] leading-[22px] md:leading-[28px] font-dm-sans font-semibold text-[#f5f5f5]">
                How should I address you?
              </div>
            </div>

            <div className="h-[1px] bg-white/[0.10]" />

            {/* Subtitle / Main Description */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono text-white/40">
                <span className="text-[#ff6900] uppercase font-bold">Hero Subtitle & Case Description — Inter</span>
                <span>20px / 28px — Light</span>
              </div>
              <p className="text-[20px] leading-[28px] font-inter font-light text-white/60 max-w-3xl">
                Tell me what you are building, and where you want it to go.
              </p>
            </div>

            <div className="h-[1px] bg-white/[0.10]" />

            {/* Quote / Testimonial (Hanken Grotesk) */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono text-white/40">
                <span className="text-[#ff6900] uppercase font-bold">Quote & Testimonial — Hanken Grotesk</span>
                <span>20px / 28px (Mobile: 18px / 26px) — Italic Light</span>
              </div>
              <p className="font-hanken text-[18px] sm:text-[20px] leading-[26px] sm:leading-[28px] italic font-light text-white/90 max-w-3xl">
                “Igor brought deep systems thinking to our enterprise platform, cutting delivery time by 30–40%.”
              </p>
            </div>

            <div className="h-[1px] bg-white/[0.10]" />

            {/* Bottom Row (Eyebrow, Body, Mono Spec) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-white/40 uppercase">EYEBROW / INTER 11</span>
                <span className="text-[11px] leading-[15px] font-light tracking-[0.14em] uppercase text-[#ff6900] block">
                  GET IN TOUCH
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-white/40 uppercase">BODY / INTER 15</span>
                <p className="text-[15px] leading-[24px] text-white/80 font-light font-inter">
                  Interface copy is calm, direct and built for long-form clarity across dark surfaces.
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-white/40 uppercase">MONO SPEC / SPACE MONO 11</span>
                <p className="font-space-mono text-[11px] leading-[16px] text-white/70 uppercase tracking-[0.14em]">
                  HEIGHT 52 · RADIUS 16 · GAP 08
                </p>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* TAB 4: COLOR TOKENS & PALETTE (FULL FIGMA SYSTEM) */}
      {activeTab === 'tokens' && (
        <div className="space-y-16">
          <div className="border-b border-white/[0.12] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-[28px] leading-[32px] font-dm-sans font-bold tracking-tight">
                Full Color Tokens & Palette System
              </h2>
              <p className="text-xs text-white/50 mt-1 font-light">
                Все используемые в проекте градации серого, тёмные поверхности, уровни прозрачности стекла, оранжевая и синяя акцентные шкалы. Нажмите на любой цвет, чтобы скопировать HEX или токен.
              </p>
            </div>
            {copiedToken && (
              <span className="text-xs font-mono text-[#ff6900] bg-[#ff6900]/10 border border-[#ff6900]/30 px-3 py-1.5 rounded-full animate-pulse self-start sm:self-auto">
                ✓ Copied: {copiedToken}
              </span>
            )}
          </div>

          {/* 1. DARK SURFACES & BACKGROUND GRAYSCALE */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ff6900]" />
                1. Dark Surfaces & Canvas Grayscale (Тёмные поверхности и подложки)
              </h3>
              <span className="text-xs font-mono text-white/40">Z-Index Elevation & Contrast</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { hex: '#080808', name: 'Canvas Background', desc: 'Базовый фон всей страницы', border: 'border-white/10' },
                { hex: '#0a0a0a', name: 'Card Surface', desc: 'Основная поверхность карточек', border: 'border-white/20' },
                { hex: '#0a0a0c', name: 'Floating Navbar', desc: 'Плавающее меню и капсулы', border: 'border-white/20' },
                { hex: '#0d0d0d', name: 'Elevated Surface', desc: 'Кнопки в футере и поп-апы', border: 'border-white/20' },
                { hex: '#141414', name: 'Modal Background', desc: 'Модальные окна и оверлеи', border: 'border-white/20' },
                { hex: '#161616', name: 'Dropdown Menu', desc: 'Выпадающие списки (select)', border: 'border-white/20' },
                { hex: '#18181b', name: 'Zinc Surface', desc: 'Тёмный чип и плашки', border: 'border-white/20' },
                { hex: '#262626', name: 'Secondary Fill', desc: 'Вторичные контейнеры', border: 'border-white/20' },
                { hex: '#2a2a2a', name: 'Stepper Completed', desc: 'Пройденный шаг в форме', border: 'border-white/20' },
                { hex: '#000000', name: 'Pure Black', desc: 'Абсолютный чёрный', border: 'border-white/15' },
              ].map((c) => (
                <button
                  key={c.hex + c.name}
                  onClick={() => copyToClipboard(c.hex, `${c.name} (${c.hex})`)}
                  className="p-3.5 rounded-xl bg-[#0a0a0a] border border-white/10 hover:border-[#ff6900]/50 flex flex-col gap-2.5 text-left transition-all group cursor-pointer"
                >
                  <div 
                    className={`w-full h-12 rounded-lg ${c.border}`} 
                    style={{ backgroundColor: c.hex }} 
                  />
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-white group-hover:text-[#ff6900] transition-colors">{c.hex}</span>
                      <Copy size={11} className="text-white/30 group-hover:text-[#ff6900] opacity-0 group-hover:opacity-100 transition-all" />
                    </div>
                    <p className="text-[11px] font-medium text-white/90 truncate">{c.name}</p>
                    <p className="text-[10px] text-white/40 leading-tight line-clamp-2">{c.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>


          {/* 2. TEXT & TYPOGRAPHY GRAYSCALE HIERARCHY */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ff6900]" />
                2. Text Hierarchy & Typography Grays (Градации серого для текста)
              </h3>
              <span className="text-xs font-mono text-white/40">WCAG AA Contrast Compliant</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { hex: '#ffffff', token: 'text-white (100%)', name: 'Display Headings', desc: 'Заголовки H0–H2, активный ввод' },
                { hex: '#f9f9f9', token: 'text-[#f9f9f9]', name: 'Off-White Accent', desc: 'Контрастные акценты' },
                { hex: '#f5f5f5', token: 'text-[#f5f5f5]', name: 'Primary Text', desc: 'Заголовки секций DM Sans' },
                { hex: '#cccccc', token: 'text-white/80 (80%)', name: 'Body Text', desc: 'Основной текст описаний Inter 15px' },
                { hex: '#999999', token: 'text-white/60 (60%)', name: 'Subtitles & Intro', desc: 'Подзаголовки 20px / 28px' },
                { hex: '#9F9F9F', token: 'text-[#9F9F9F]', name: 'Nav Icons & Meta', desc: 'Иконки меню и мета-данные' },
                { hex: '#666666', token: 'text-white/40 (40%)', name: 'Muted Labels', desc: 'Подписи, таймштампы, FAQ' },
                { hex: '#404040', token: 'text-white/25 (25%)', name: 'Inactive Step & Line', desc: 'Неактивные шаги и рамки' },
                { hex: '#333333', token: 'text-white/20 (20%)', name: 'Placeholder Text', desc: 'Плейсхолдеры в инпутах' },
                { hex: '#1a1a1a', token: 'text-white/10 (10%)', name: 'Disabled State', desc: 'Заблокированный текст' },
              ].map((c) => (
                <button
                  key={c.hex + c.name}
                  onClick={() => copyToClipboard(c.hex, `${c.name} (${c.hex})`)}
                  className="p-3.5 rounded-xl bg-[#0a0a0a] border border-white/10 hover:border-[#ff6900]/50 flex flex-col gap-2.5 text-left transition-all group cursor-pointer"
                >
                  <div 
                    className="w-full h-12 rounded-lg border border-white/10 flex items-center justify-center font-bold text-xs" 
                    style={{ backgroundColor: '#080808', color: c.hex }} 
                  >
                    Aa {c.hex}
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-white group-hover:text-[#ff6900] transition-colors">{c.hex}</span>
                      <Copy size={11} className="text-white/30 group-hover:text-[#ff6900] opacity-0 group-hover:opacity-100 transition-all" />
                    </div>
                    <p className="text-[11px] font-medium text-white/90 truncate">{c.name}</p>
                    <span className="text-[10px] font-mono text-[#ff6900]/80 block">{c.token}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>


          {/* 3. GLASS BORDERS & ALPHA CHANNELS */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ff6900]" />
                3. Glass Borders, Dividers & Overlays (Прозрачности и обводки)
              </h3>
              <span className="text-xs font-mono text-white/40">Alpha Transparency System</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {[
                { token: 'white/[0.04]', rgba: 'rgba(255,255,255,0.04)', name: 'Input Fill', desc: 'Фон полей ввода' },
                { token: 'white/[0.08]', rgba: 'rgba(255,255,255,0.08)', name: 'Subtle Border', desc: 'Контейнеры и бейджи' },
                { token: 'white/[0.12]', rgba: 'rgba(255,255,255,0.12)', name: 'Standard Divider', desc: 'Разделительные линии' },
                { token: 'white/[0.18]', rgba: 'rgba(255,255,255,0.18)', name: 'Card Outline', desc: 'Обводка активных блоков' },
                { token: 'white/[0.30]', rgba: 'rgba(255,255,255,0.30)', name: 'Hover Border', desc: 'Состояние наведения' },
                { token: 'white/[0.45]', rgba: 'rgba(255,255,255,0.45)', name: 'Progress Connector', desc: 'Заполненная линия шагов' },
              ].map((c) => (
                <button
                  key={c.token}
                  onClick={() => copyToClipboard(c.rgba, `${c.name} (${c.token})`)}
                  className="p-3.5 rounded-xl bg-[#0a0a0a] border border-white/10 hover:border-[#ff6900]/50 flex flex-col gap-2.5 text-left transition-all group cursor-pointer"
                >
                  <div 
                    className="w-full h-12 rounded-lg border border-white/20 flex items-center justify-center text-[10px] font-mono text-white/70" 
                    style={{ backgroundColor: c.rgba }} 
                  >
                    {c.token}
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-xs font-mono font-bold text-white group-hover:text-[#ff6900] transition-colors">{c.token}</span>
                    <p className="text-[11px] font-medium text-white/90 truncate">{c.name}</p>
                    <p className="text-[10px] text-white/40">{c.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>


          {/* 4. BRAND ACCENTS (ORANGE & ELECTRIC BLUE SCALES) */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ff6900]" />
                4. Primary & Secondary Accents (Оранжевая и синяя палитры)
              </h3>
              <span className="text-xs font-mono text-white/40">Brand Accent Matrix</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {[
                { hex: '#ff9e42', name: 'Light Orange Glow', desc: 'Градиентный старт и ореол', tag: 'Orange 400' },
                { hex: '#ff851a', name: 'Bright Orange', desc: 'Яркий акцент', tag: 'Orange 500' },
                { hex: '#ff6900', name: 'Primary Brand Core', desc: 'Основной цвет кнопок, тегов и фокуса', tag: 'Primary #ff6900' },
                { hex: '#e05d00', name: 'Pressed Orange', desc: 'Активное нажатие кнопок', tag: 'Orange 700' },
                { hex: '#3b82f6', name: 'Bright Blue Highlight', desc: 'Свечение синего спектра', tag: 'Blue 500' },
                { hex: '#155dfc', name: 'Primary Electric Blue', desc: 'Конический градиент и ссылки', tag: 'Blue 600' },
              ].map((c) => (
                <button
                  key={c.hex + c.name}
                  onClick={() => copyToClipboard(c.hex, `${c.name} (${c.hex})`)}
                  className="p-3.5 rounded-xl bg-[#0a0a0a] border border-white/10 hover:border-white/40 flex flex-col gap-2.5 text-left transition-all group cursor-pointer"
                >
                  <div 
                    className="w-full h-12 rounded-lg shadow-md" 
                    style={{ backgroundColor: c.hex }} 
                  />
                  <div className="space-y-0.5">
                    <span className="text-xs font-mono font-bold text-white group-hover:text-white transition-colors">{c.hex}</span>
                    <p className="text-[11px] font-medium text-white/90 truncate">{c.name}</p>
                    <span className="text-[10px] font-mono text-white/50 block">{c.tag}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>


          {/* 5. FUNCTIONAL STATUS & GRADIENT SPEC */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ff6900]" />
                5. Functional Status & Conic Angle Gradient
              </h3>
              <span className="text-xs font-mono text-white/40">Feedback & System Gradients</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Success Token */}
              <div className="p-4 rounded-xl bg-[#0a0a0a] border border-emerald-500/30 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400 font-bold shrink-0">
                  ✓
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-400">#34d399 / emerald-400</span>
                  <p className="text-xs font-medium text-white">Success / Valid State</p>
                  <p className="text-[10px] text-white/40">Подтверждение отправки и валидные поля</p>
                </div>
              </div>

              {/* Error Token */}
              <div className="p-4 rounded-xl bg-[#0a0a0a] border border-rose-500/30 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-rose-500/20 border border-rose-500 flex items-center justify-center text-rose-400 font-bold shrink-0">
                  ✕
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-rose-400">#f43f5e / rose-500</span>
                  <p className="text-xs font-medium text-white">Error / Invalid State</p>
                  <p className="text-[10px] text-white/40">Ошибки валидации email и формы</p>
                </div>
              </div>

              {/* Conic Gradient Card */}
              <div className="p-4 rounded-xl bg-[#0a0a0a] border border-white/10 flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-lg shrink-0 border border-white/20" 
                  style={{ background: 'conic-gradient(from 0deg, #ff6900 0deg, #ff9e42 60deg, #155dfc 180deg, #155dfc 240deg, #ff6900 360deg)' }} 
                />
                <div className="overflow-hidden">
                  <span className="text-xs font-mono font-bold text-[#ff6900]">Brand Conic Gradient</span>
                  <p className="text-xs font-medium text-white">360° Rotating Border Glow</p>
                  <p className="text-[10px] text-white/40 truncate">#ff6900 → #ff9e42 → #155dfc</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
