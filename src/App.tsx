/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ChevronRight, 
  Play, 
  Star, 
  ShieldCheck, 
  Clock, 
  Zap, 
  Target, 
  Users, 
  BookOpen, 
  Smartphone, 
  Monitor, 
  FileText, 
  ChevronDown, 
  ChevronUp,
  AlertCircle,
  TrendingUp,
  Layout,
  RefreshCw,
  Headphones,
  Layers,
  Check,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

const UpsellModal = ({ 
  isOpen, 
  onClose, 
  title, 
  message, 
  oldPrice, 
  newPrice, 
  upgradeLink, 
  basicLink, 
  upgradeText, 
  basicText 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  title: string; 
  message: string; 
  oldPrice: string; 
  newPrice: string; 
  upgradeLink: string; 
  basicLink: string; 
  upgradeText: string; 
  basicText: string; 
}) => {
  React.useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        zIndex: 1000,
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative overflow-hidden text-center space-y-6"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black text-[#001a33] leading-tight">
              {title}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {message}
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-2">
            <p className="text-gray-400 text-sm line-through font-bold">De {oldPrice}</p>
            <p className="text-3xl md:text-4xl font-black text-green-600">Por apenas {newPrice}</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">(Pagamento único)</p>
          </div>

          <div className="space-y-4">
            <a 
              href={upgradeLink}
              className="block w-full bg-green-600 hover:bg-green-700 text-white font-black py-5 px-6 rounded-2xl shadow-lg shadow-green-200 transition-all text-sm md:text-base uppercase tracking-tight"
            >
              {upgradeText}
            </a>
            <a 
              href={basicLink}
              className="block w-full text-gray-400 hover:text-gray-600 font-bold text-xs transition-colors underline underline-offset-4"
            >
              {basicText}
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left font-semibold text-gray-800"
      >
        <span>{question}</span>
        {isOpen ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="mt-2 text-gray-600 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TestimonialCard = ({ name, text, stars = 5 }: { name: string, text: string, stars?: number }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-3 h-full">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
        <img src={`https://picsum.photos/seed/${name}/100/100`} alt={name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </div>
      <div>
        <h4 className="font-bold text-gray-900 text-sm">{name}</h4>
        <div className="flex gap-0.5">
          {[...Array(stars)].map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      </div>
    </div>
    <p className="text-gray-600 text-xs italic leading-relaxed">"{text}"</p>
  </div>
);

export default function App() {
  const [currentMaterialIndex, setCurrentMaterialIndex] = useState(0);
  const [activeUpsell, setActiveUpsell] = useState<'simples' | 'essencial' | null>(null);
  const materialImages = [
    "https://i.ibb.co/QvnWcY1H/3.png",
    "https://i.ibb.co/q3Q0Bdk9/6.png",
    "https://i.ibb.co/0jBS9BWh/7.png",
    "https://i.ibb.co/4nRRmyKz/8.png",
    "https://i.ibb.co/qM7yqG3B/10.png"
  ];

  const nextMaterial = () => {
    setCurrentMaterialIndex((prev) => (prev + 1) % materialImages.length);
  };

  const prevMaterial = () => {
    setCurrentMaterialIndex((prev) => (prev - 1 + materialImages.length) % materialImages.length);
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-yellow-200 selection:text-yellow-900">
      {/* Top Bar */}
      <div className="bg-[#ff4444] text-white py-2 px-4 text-center text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2">
        <span>🔥 PROMOÇÃO VÁLIDA SOMENTE HOJE! 🔥</span>
      </div>

      {/* Hero Section */}
      <section className="bg-[#001a33] text-white pt-12 pb-20 px-4 md:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="inline-block bg-yellow-400 text-black text-[10px] font-black px-2 py-1 rounded uppercase">EDIÇÃO 2026 ATUALIZADA</span>
              <h1 className="text-3xl md:text-5xl font-black leading-tight">
                O próximo edital pode sair a <span className="text-yellow-400 underline decoration-2 underline-offset-4">qualquer momento.</span>
              </h1>
              <p className="text-xl md:text-2xl font-bold text-yellow-400 leading-snug">
                A maioria só começa depois do edital... quem começa antes sai na frente — e você ainda está no tempo certo
              </p>
            </div>

            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/MicJDcGWAD8" 
                title="YouTube video player" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-lg font-bold text-yellow-400">Salário Inicial de <span className="text-2xl">R$ 6.638,87</span></p>
                <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                  Garanta sua estabilidade financeira conquistando uma vaga no cargo de Agente Administrativo (Nível Médio). Comece sua preparação estratégica agora — enquanto a maioria ainda está esperando o edital sair
                </p>
              </div>

              <a href="#material-por-dentro" className="bg-yellow-400 hover:bg-yellow-500 text-black font-black py-4 px-8 rounded-lg shadow-[0_4px_0_0_#d97706] active:translate-y-1 active:shadow-none transition-all flex items-center gap-2 text-lg uppercase tracking-tight">
                VER MATERIAL POR DENTRO <ChevronRight className="w-6 h-6" />
              </a>

              <ul className="space-y-2">
                {[
                  "Conteúdo 100% alinhado ao último edital e às tendências para 2026",
                  "Mais de 1.500 questões gabaritadas e comentadas",
                  "Material esquematizado para estudo rápido e produtivo",
                  "Atualização gratuita imediata após publicação do edital"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center py-12">
            {/* 3D Book Mockup */}
            <div className="relative group" style={{ perspective: '1500px' }}>
              <div 
                className="relative w-[280px] md:w-[320px] aspect-[3/4] transition-transform duration-700 ease-out"
                style={{ 
                  transformStyle: 'preserve-3d',
                  transform: 'rotateY(-25deg) rotateX(5deg)',
                }}
              >
                {/* Book Spine */}
                <div 
                  className="absolute top-0 bottom-0 w-[40px] bg-[#001a33] border-r border-white/10 flex items-center justify-center overflow-hidden"
                  style={{ 
                    left: '-20px',
                    transform: 'rotateY(-90deg)',
                    transformOrigin: 'right',
                    boxShadow: 'inset -10px 0 20px rgba(0,0,0,0.5)'
                  }}
                >
                  <span className="text-[10px] font-black text-white/80 uppercase tracking-widest whitespace-nowrap rotate-180" style={{ writingMode: 'vertical-rl' }}>
                    POLÍCIA RODOVIÁRIA FEDERAL - AGENTE ADMINISTRATIVO
                  </span>
                </div>

                {/* Book Front Cover */}
                <div 
                  className="absolute inset-0 bg-white rounded-r-lg shadow-2xl overflow-hidden"
                  style={{ 
                    transform: 'translateZ(20px)',
                    boxShadow: '15px 15px 40px rgba(0,0,0,0.5)'
                  }}
                >
                  <img 
                    src="https://i.ibb.co/B5yLqdZ8/C-pia-de-Capa-de-Livro-Infantil-Ilustrado-Vibrante-PCD-Inclusivo-1.png" 
                    alt="PRF Agente Administrativo Cover" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Glossy effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/20 pointer-events-none"></div>
                </div>

                {/* Book Pages (Side) */}
                <div 
                  className="absolute top-0 bottom-0 right-0 w-[40px] bg-[#f5f5f5]"
                  style={{ 
                    transform: 'rotateY(90deg) translateZ(20px)',
                    transformOrigin: 'right',
                    backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.05) 50%, transparent 100%)',
                    backgroundSize: '4px 100%'
                  }}
                ></div>

                {/* Book Bottom */}
                <div 
                  className="absolute left-0 right-0 bottom-0 h-[40px] bg-[#e5e5e5]"
                  style={{ 
                    transform: 'rotateX(-90deg) translateZ(20px)',
                    transformOrigin: 'bottom',
                    backgroundImage: 'linear-gradient(0deg, transparent 0%, rgba(0,0,0,0.05) 50%, transparent 100%)',
                    backgroundSize: '100% 4px'
                  }}
                ></div>
              </div>

              {/* Shadow on the floor */}
              <div 
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[120%] h-10 bg-black/40 blur-2xl rounded-full -z-10"
                style={{ transform: 'rotateX(80deg)' }}
              ></div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400/20 blur-3xl rounded-full"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-400/20 blur-3xl rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Section 2: Tarde Demais */}
      <section className="bg-[#001a33] text-white py-20 px-4 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-black leading-tight">
              A maioria dos candidatos começa a estudar <span className="text-red-500">tarde demais.</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A maioria espera o edital sair para "ver o que cai". O problema é que o conteúdo de Agente Administrativo da PRF é extenso e exige base sólida.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="bg-[#002a4d] p-8 rounded-2xl border border-white/10 space-y-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl font-bold">O Risco da Desorganização</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Estudar por materiais aleatórios e desatualizados é o caminho mais rápido para a frustração. Você perde tempo com o que não cai e chega na prova sem confiança.
              </p>
            </div>
            <div className="bg-[#002a4d] p-8 rounded-2xl border border-white/10 space-y-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-xl font-bold">Vantagem Competitiva Real</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Quem começa agora já terá vencido o edital pelo menos uma vez quando ele for publicado. Enquanto outros estarão desesperados, você estará apenas revisando.
              </p>
            </div>
          </div>

          <p className="text-gray-400 italic text-sm">
            "A antecipação é a única estratégia que separa os aprovados dos eternos 'quase' concursados."
          </p>
        </div>
      </section>

      {/* Section 3: Veja como é por dentro */}
      <section id="material-por-dentro" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-[#001a33]">Veja como é por dentro</h2>
            <p className="text-gray-500">Qualidade visual e didática impecável.</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="aspect-[16/10] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 p-4">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentMaterialIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  src={materialImages[currentMaterialIndex]} 
                  alt={`Material Page ${currentMaterialIndex + 1}`} 
                  className="w-full h-full object-contain" 
                  referrerPolicy="no-referrer" 
                />
              </AnimatePresence>
            </div>
            <button 
              onClick={prevMaterial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-10"
            >
              <ChevronRight className="w-6 h-6 text-black rotate-180" />
            </button>
            <button 
              onClick={nextMaterial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-10"
            >
              <ChevronRight className="w-6 h-6 text-black" />
            </button>
            
            <div className="flex justify-center gap-2 mt-6">
              {materialImages.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setCurrentMaterialIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${currentMaterialIndex === i ? 'bg-yellow-400 w-4' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </div>
          
          <p className="text-gray-400 text-xs">Visualização de alta qualidade: leitura fluida em qualquer dispositivo.</p>
        </div>
      </section>

      {/* Section 4: Depoimentos Vídeo */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-black text-[#001a33]">Depoimentos de quem já usa nossos materiais</h2>
            <p className="text-gray-500 uppercase text-xs font-bold tracking-widest">APERTE O PLAY PARA VER O VÍDEO</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left: WhatsApp Print */}
            <div className="relative aspect-[9/16] bg-white rounded-3xl overflow-hidden shadow-xl border-4 border-gray-100">
              <img 
                src="https://i.ibb.co/9kG27vNX/Whats-App-Image-2026-03-19-at-23-40-12.jpg" 
                alt="WhatsApp Testimonial 1" 
                className="w-full h-full object-contain" 
                referrerPolicy="no-referrer" 
              />
            </div>

            {/* Middle: YouTube Short */}
            <div className="relative aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-xl border-4 border-gray-100 scale-105 z-10">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/Y4v26U2aoeQ" 
                title="YouTube video player" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>

            {/* Right: WhatsApp Print */}
            <div className="relative aspect-[9/16] bg-white rounded-3xl overflow-hidden shadow-xl border-4 border-gray-100">
              <img 
                src="https://i.ibb.co/G4zDkQ88/Whats-App-Image-2026-03-19-at-23-40-12-1.jpg" 
                alt="WhatsApp Testimonial 2" 
                className="w-full h-full object-contain" 
                referrerPolicy="no-referrer" 
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-4 pt-8">
            <img src="https://i.ibb.co/M3s7dF9/Whats-App-Image-2026-03-19-at-23-40-12-2.jpg" alt="WhatsApp Print 1" className="w-full max-w-[280px] rounded-2xl shadow-lg border border-gray-200" referrerPolicy="no-referrer" />
            <img src="https://i.ibb.co/whhTKng6/Whats-App-Image-2026-03-19-at-23-40-12-3.jpg" alt="WhatsApp Print 2" className="w-full max-w-[280px] rounded-2xl shadow-lg border border-gray-200" referrerPolicy="no-referrer" />
          </div>

          <a href="#planos" className="bg-yellow-400 hover:bg-yellow-500 text-black font-black py-4 px-12 rounded-lg shadow-[0_4px_0_0_#d97706] active:translate-y-1 active:shadow-none transition-all text-sm uppercase tracking-tight mx-auto inline-block">
            QUERO GARANTIR MINHA VAGA AGORA
          </a>
        </div>
      </section>

      {/* Section 5: O Caminho Mais Curto */}
      <section className="bg-[#001a33] text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-16">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-black">O Caminho Mais Curto Até a Sua Aprovação</h2>
            <p className="text-gray-400 text-sm">Desenvolvido por especialistas para quem busca objetividade máxima.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-8">
            {[
              { icon: Target, title: "Direto ao Ponto", desc: "Sem enrolação acadêmica. Focamos no que é cobrado no edital." },
              { icon: Users, title: "Iniciante Amigável", desc: "Ideal para quem está começando do absoluto zero." },
              { icon: Zap, title: "Atualizações 2026", desc: "Receba correções e novos temas sem custo adicional." },
              { icon: ShieldCheck, title: "Acesso Vitalício", desc: "Compre uma vez e estude até o dia da sua posse." },
              { icon: Smartphone, title: "100% Digital", desc: "Estude pelo celular, tablet, computador ou imprima." },
              { icon: BookOpen, title: "Matérias Organizadas", desc: "Cronograma lógico para você não se perder nos estudos." },
              { icon: Headphones, title: "Suporte ao Aluno", desc: "Dúvidas sobre o material ou sobre a plataforma? Nossa equipe está pronta para te ajudar dentro da área exclusiva." },
              { icon: RefreshCw, title: "Atualizações em Tempo Real", desc: "Qualquer alteração no edital ou novidade legislativa é atualizada automaticamente na sua área de membros." },
              { icon: Layers, title: "Material Complementar", desc: "Além das apostilas, tenha acesso a bônus e materiais extras que são liberados periodicamente para os alunos." }
            ].map((item, i) => (
              <div key={i} className="space-y-4 flex flex-col items-center">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                  <item.icon className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed max-w-[240px]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Sua Área de Estudos Premium */}
      <section className="bg-[#001a33] text-white py-20 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <h2 className="text-4xl font-black">Sua Área de Estudos <span className="text-yellow-400">Premium</span></h2>
          
          <div className="relative max-w-5xl mx-auto">
            <img src="https://i.ibb.co/TBVgxVfF/Whats-App-Image-2026-03-06-at-23-21-28.jpg" alt="Premium Area Mockup" className="w-full h-auto rounded-3xl shadow-2xl" referrerPolicy="no-referrer" />
          </div>

          <p className="text-gray-400 text-sm max-w-3xl mx-auto leading-relaxed">
            Ao adquirir nosso material, você não recebe apenas um PDF. Você ganha acesso a uma plataforma moderna, organizada e 100% focada na sua produtividade, projetada para que você não perca um segundo sequer.
          </p>

          <div className="pt-12 space-y-8">
            <p className="uppercase text-[10px] font-black tracking-[0.2em] text-gray-500">CONHEÇA A PLATAFORMA POR DENTRO</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              {/* Video 1 */}
              <div className="relative aspect-[9/16] bg-black rounded-[2rem] border-[6px] border-gray-800 shadow-2xl overflow-hidden">
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/LN-Fo76szQ8" 
                  title="YouTube video player" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                ></iframe>
              </div>
              {/* Video 2 */}
              <div className="relative aspect-[9/16] bg-black rounded-[2rem] border-[6px] border-gray-800 shadow-2xl overflow-hidden">
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/1KKZSckYASM" 
                  title="YouTube video player" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: WhatsApp Prints */}
      <section className="bg-[#001a33] py-20 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <h2 className="text-3xl md:text-4xl font-black text-white">Nossos alunos que imprimiram o material completo</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <img src="https://i.ibb.co/v2DKMSd/Whats-App-Image-2026-02-22-at-19-02-11.jpg" alt="Print 1" className="w-full rounded-2xl shadow-lg" referrerPolicy="no-referrer" />
            <img src="https://i.ibb.co/b5T3RgfF/Whats-App-Image-2026-02-22-at-19-02-11-1.jpg" alt="Print 2" className="w-full rounded-2xl shadow-lg" referrerPolicy="no-referrer" />
            <img src="https://i.ibb.co/8g4qYwsp/Whats-App-Image-2026-02-22-at-19-02-11-2.jpg" alt="Print 3" className="w-full rounded-2xl shadow-lg" referrerPolicy="no-referrer" />
          </div>
        </div>
      </section>

      {/* Section 9: Pricing */}
      <section id="planos" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center space-y-16">
          <h2 className="text-4xl font-black text-[#001a33]">Escolha o Melhor para Você</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
            {/* Plano Simples */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200 flex flex-col shadow-sm">
              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-black text-[#001a33]">Plano Simples</h3>
                <p className="text-gray-500 text-xs">Foco total na teoria completa do edital.</p>
                <div className="text-3xl font-black text-[#001a33]">R$ 10,00</div>
              </div>
              <ul className="space-y-4 mb-12 text-left flex-grow">
                <li className="flex items-center gap-2 text-xs text-gray-600"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Apostila teórica completa</li>
                <li className="flex items-center gap-2 text-xs text-gray-600"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Acesso vitalício</li>
                <li className="flex items-center gap-2 text-xs text-gray-300 line-through"><CheckCircle2 className="w-4 h-4" /> Questões Gabaritadas Inéditas</li>
                <li className="flex items-center gap-2 text-xs text-gray-300 line-through"><CheckCircle2 className="w-4 h-4" /> Mapas Mentais Esquematizados Exclusivos</li>
                <li className="flex items-center gap-2 text-xs text-gray-300 line-through"><CheckCircle2 className="w-4 h-4" /> Guia de planejamento de estudos</li>
                <li className="flex items-center gap-2 text-xs text-gray-300 line-through"><CheckCircle2 className="w-4 h-4" /> Atualizações constantes</li>
              </ul>
              <button 
                onClick={() => setActiveUpsell('simples')}
                className="w-full py-4 px-6 border-2 border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-colors uppercase text-xs text-center"
              >
                COMPRAR POR R$ 10,00
              </button>
            </div>

            {/* Plano Completo */}
            <div className="bg-white rounded-3xl p-8 border-4 border-blue-600 flex flex-col shadow-xl relative scale-105 z-10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase">O MAIS VENDIDO</div>
              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-black text-[#001a33]">Plano Completo</h3>
                <p className="text-gray-500 text-xs">A preparação definitiva com bônus exclusivos. <br /><span className="text-red-500 font-bold uppercase">PROMOÇÃO SEMANAL</span></p>
                <div className="text-3xl font-black text-[#001a33]">R$ 26,00</div>
              </div>
              <ul className="space-y-4 mb-12 text-left flex-grow">
                <li className="flex items-center gap-2 text-xs text-gray-600"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Apostila teórica completa</li>
                <li className="flex items-center gap-2 text-xs text-gray-600"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Questões Gabaritadas Inéditas</li>
                <li className="flex items-center gap-2 text-xs text-gray-600"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Mapas Mentais Esquematizados Exclusivos</li>
                <li className="flex items-center gap-2 text-xs text-gray-600"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Plataforma de Estudos Personalizada</li>
                <li className="flex items-center gap-2 text-xs text-gray-600"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Guia de planejamento de estudos</li>
                <li className="flex items-center gap-2 text-xs text-gray-600"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Atualizações constantes</li>
                <li className="flex items-center gap-2 text-xs text-gray-600"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Acesso vitalício</li>
              </ul>
              <a 
                href="https://pay.cakto.com.br/hu2i4dp_760079"
                className="w-full py-4 px-6 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors uppercase text-xs shadow-lg shadow-blue-200 text-center"
              >
                QUERO O PLANO COMPLETO
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 10: Testimonials */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center space-y-16">
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-[#001a33]">Quem já usa, aprova e recomenda</h2>
            <p className="text-gray-500">Junte-se a milhares de futuros agentes administrativos.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <TestimonialCard name="Carlos S64" text="Finalmente um material que não tem 500 páginas de enrolação teórica que não serve p nada." />
            <TestimonialCard name="paulo souza" text="Comprei hj cedo e já tô no módulo 2, bem fácil de ler e entender os conceitos." />
            <TestimonialCard name="Gabriela Steffy" text="Vale cada centavo, melhor q mt curso caro por aí q só tem vídeo aula interminável." />
            <TestimonialCard name="Helton gomes" text="Consegui imprimir aqui na firma e ficou top o layout, letra boa de ler e espaço p anotar." />
            <div className="md:col-start-2">
              <TestimonialCard name="bia garcia" text="Os mapas mentais são a melhor parte p revisar dps q termina a teoria, ajuda dms na memória." />
            </div>
          </div>
        </div>
      </section>

      {/* Section 11: FAQ */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto space-y-12">
          <h2 className="text-4xl font-black text-[#001a33] text-center">Dúvidas Frequentes</h2>
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
            <FAQItem 
              question="Quando sai o edital?" 
              answer="A previsão é que o edital seja publicado a qualquer momento, visto que a PRF já solicitou o preenchimento das vagas. Quem começa a estudar agora garante uma vantagem competitiva enorme." 
            />
            <FAQItem 
              question="O material é atualizado?" 
              answer="Sim! O material está 100% atualizado de acordo com o último edital e as tendências mais recentes. Além disso, você recebe atualizações gratuitas se o edital sair com novidades." 
            />
            <FAQItem 
              question="Tem garantia?" 
              answer="Sim, oferecemos 7 dias de garantia incondicional. Se você não gostar do material, devolvemos 100% do seu dinheiro sem burocracia." 
            />
            <FAQItem 
              question="É físico ou digital?" 
              answer="O material é 100% digital (PDF + Plataforma Online). Você recebe o acesso imediatamente após a compra e pode imprimir se desejar." 
            />
            <FAQItem 
              question="Como recebo acesso?" 
              answer="Imediatamente após a confirmação do pagamento, você receberá um e-mail com seus dados de acesso à nossa plataforma exclusiva e também os links via WhatsApp." 
            />
          </div>
        </div>
      </section>

      {/* Section 12: Final Guarantee */}
      <section className="py-20 px-4 bg-white text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-yellow-400 rounded-full flex flex-col items-center justify-center shadow-xl mx-auto border-4 border-white">
              <span className="text-2xl font-black leading-none">7</span>
              <span className="text-[10px] font-bold uppercase leading-none">DIAS DE</span>
              <span className="text-[10px] font-bold uppercase leading-none">GARANTIA</span>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-1 shadow-lg">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-black text-[#001a33]">Risco Zero: 7 Dias de Garantia Incondicional</h2>
            <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Se em até 7 dias você achar que o material não é para você ou não gostar da organização, devolvemos 100% do seu dinheiro. Sem perguntas, sem burocracia, sem enrolação.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-green-500" /> COMPRA SEGURA</div>
            <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-green-500" /> PRIVACIDADE GARANTIDA</div>
            <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-green-500" /> SATISFAÇÃO GARANTIDA</div>
          </div>

          <div className="font-black text-sm tracking-widest text-[#001a33]">
            🚀 ENVIO IMEDIATO POR EMAIL E WHATSAPP
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-[#001a33] text-white py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              Sua Estabilidade Começa Com Esta Decisão
            </h2>
            <p className="text-xl text-gray-400 italic">
              O edital pode sair a qualquer momento. Quem começa antes, chega preparado. <br />
              QUEM ESPERA O EDITAL SAIR, JÁ PERDEU.
            </p>
          </div>

          <a href="#planos" className="bg-yellow-400 hover:bg-yellow-500 text-black font-black py-5 px-16 rounded-xl shadow-[0_6px_0_0_#d97706] active:translate-y-1 active:shadow-none transition-all text-xl uppercase tracking-tight mx-auto inline-block">
            QUERO GARANTIR MINHA VAGA AGORA
          </a>

          <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4" /> Acesso imediato e vitalício ao material.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#000d1a] text-gray-500 py-12 px-4 text-center border-t border-white/5">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex justify-center gap-8 text-[10px] font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">TERMOS DE USO</a>
            <a href="#" className="hover:text-white transition-colors">POLÍTICA DE PRIVACIDADE</a>
          </div>
          <div className="space-y-2 text-[10px] leading-relaxed max-w-2xl mx-auto">
            <p>© 2026 Editora Guia Concurso. Todos os direitos reservados.</p>
            <p>Este produto não possui vínculo com a Polícia Rodoviária Federal ou qualquer órgão governamental. Trata-se de material independente para estudo.</p>
          </div>
        </div>
      </footer>

      {/* Upsell Modals */}
      <UpsellModal 
        isOpen={activeUpsell === 'simples'}
        onClose={() => setActiveUpsell(null)}
        title="🎉 Espere! Antes de finalizar sua compra..."
        message="Você está quase garantindo a versão básica. Mas neste momento foi liberada para você uma condição especial do Plano Completo PRF 2026."
        oldPrice="R$ 26,00"
        newPrice="R$ 18,90"
        upgradeLink="https://pay.cakto.com.br/3cvnueu"
        basicLink="https://pay.cakto.com.br/37jhkgf"
        upgradeText="Quero a promoção do Plano Completo por R$ 18,90"
        basicText="Continuar apenas com a versão básica de R$ 10,00"
      />
    </div>
  );
}
