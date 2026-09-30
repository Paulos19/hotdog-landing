"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import {
  Flame,
  Sparkles,
  ShoppingBag,
  Star,
  Clock,
  MapPin,
  PhoneCall,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Utensils,
  Heart,
  ArrowRight,
  Truck,
  Award,
  Zap,
  AtSign,
  
  Timer,
  BadgeCheck,
} from "lucide-react";
import confetti from "canvas-confetti";

const Hotdog3D = dynamic(() => import("@/components/Hotdog3D"), { ssr: false });

/* ═══════════════════════════════════════════ */
/*  TYPES                                     */
/* ═══════════════════════════════════════════ */
interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  calories: string;
  tag?: string;
  ingredients: string[];
}

/* ═══════════════════════════════════════════ */
/*  DATA                                      */
/* ═══════════════════════════════════════════ */
const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Dog Clássico",
    description: "A receita original que conquistou a cidade. Salsicha premium grelhada na brasa com molhos artesanais.",
    tag: "MAIS VENDIDO",
    price: 18.90,
    calories: "420 kcal",
    ingredients: ["Salsicha Premium", "Molho Especial da Casa", "Mostarda Dijon", "Ketchup Artesanal", "Batata Palha Crocante"],
  },
  {
    id: 2,
    name: "Dog Supremo",
    description: "Para quem não aceita menos que o extraordinário. Camadas de sabor com bacon crocante e cheddar derretido.",
    tag: "FAVORITO",
    price: 24.90,
    calories: "580 kcal",
    ingredients: ["Salsicha Dupla", "Bacon Crocante", "Cheddar Derretido", "Cebola Caramelizada", "Molho Barbecue Defumado"],
  },
  {
    id: 3,
    name: "Dog Gourmet",
    description: "A experiência gastronômica definitiva. Ingredientes selecionados e técnica de prensagem perfeita.",
    tag: "CHEF'S CHOICE",
    price: 29.90,
    calories: "690 kcal",
    ingredients: ["Purê Velouté Caseiro", "Batata Palha Especial", "Milho Fresco na Brasa", "Vinagrete Especial", "Prensado Perfeito"],
  },
];

const stats = [
  { value: "12K+", label: "Clientes Felizes", icon: Heart },
  { value: "4.9", label: "Avaliação Média", icon: Star },
  { value: "32min", label: "Entrega Média", icon: Timer },
  { value: "100%", label: "Ingredientes Frescos", icon: BadgeCheck },
];

const testimonials = [
  { name: "Ana C.", text: "Melhor hot dog que já comi na vida! O Dog Gourmet é uma experiência.", rating: 5, avatar: "AC" },
  { name: "Rafael M.", text: "Entrega super rápida e o sabor é incrível. Virei cliente fiel!", rating: 5, avatar: "RM" },
  { name: "Juliana S.", text: "O Dog Supremo com bacon crocante... simplesmente perfeito! 🔥", rating: 5, avatar: "JS" },
];

/* ═══════════════════════════════════════════ */
/*  COMPONENTS                                */
/* ═══════════════════════════════════════════ */

function SectionBadge({ children, icon: Icon }: { children: React.ReactNode; icon?: React.ElementType }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-warm text-amber-400 text-xs font-semibold tracking-widest uppercase mb-6 animate-fade-in-up">
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {children}
    </div>
  );
}

function GlowOrb({ className }: { className?: string }) {
  return (
    <div className={`absolute rounded-full blur-3xl pointer-events-none ${className}`} />
  );
}

/* ═══════════════════════════════════════════ */
/*  MAIN PAGE                                 */
/* ═══════════════════════════════════════════ */
export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<MenuItem>(menuItems[0]);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleOrder = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.7 },
      colors: ["#f59e0b", "#f97316", "#ef4444", "#fbbf24"],
    });
    setOrderPlaced(true);
    setTimeout(() => setOrderPlaced(false), 4000);
  };

  return (
    <main className="relative min-h-screen bg-[#0a0a0a] overflow-hidden">
      {/* ══════════ AMBIENT GLOW ORBS ══════════ */}
      <GlowOrb className="w-[600px] h-[600px] bg-amber-500/8 top-[-200px] left-[-200px]" />
      <GlowOrb className="w-[500px] h-[500px] bg-orange-500/6 top-[20%] right-[-150px]" />
      <GlowOrb className="w-[400px] h-[400px] bg-red-500/5 bottom-[30%] left-[-100px]" />
      <GlowOrb className="w-[600px] h-[600px] bg-amber-500/5 bottom-[-200px] right-[-200px]" />

      {/* ══════════ NAVBAR ══════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between glass-strong rounded-2xl px-6 py-3">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Flame className="w-5 h-5 text-white" />
                <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0a0a0a]">
                  <div className="w-full h-full bg-green-400 rounded-full animate-ping opacity-75" />
                </div>
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-white">HOT<span className="text-gradient-amber">DOG</span></span>
                <span className="block text-[10px] text-stone-500 tracking-[0.2em] uppercase -mt-1">Artesanal</span>
              </div>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {["Cardápio", "Sobre", "Avaliações", "Contato"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="px-4 py-2 text-sm text-stone-400 hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/5"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => document.getElementById("cardápio")?.scrollIntoView({ behavior: "smooth" })}
              className="group flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl text-sm font-semibold text-black hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Pedir Agora</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </nav>

      {/* ══════════ HERO SECTION ══════════ */}
      <section className="relative min-h-screen flex items-center pt-28 pb-20">
        <div className="relative z-10 mx-auto max-w-7xl px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div className={`space-y-8 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-warm animate-border-glow">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-amber-400 tracking-widest uppercase">Aberto Agora • Delivery Ativo</span>
              </div>

              {/* Headline */}
              <div className="space-y-3">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.9]">
                  <span className="block text-white">Hot Dogs</span>
                  <span className="block text-gradient-amber">Artesanais</span>
                  <span className="block text-white/60 text-3xl sm:text-4xl lg:text-5xl font-bold mt-2">que marcam.</span>
                </h1>
              </div>

              {/* Subtitle */}
              <p className="text-lg text-stone-400 max-w-md leading-relaxed">
                Ingredientes selecionados, receitas exclusivas e aquele sabor que só quem prova entende. 
                <span className="text-amber-400 font-medium"> Feito com paixão desde 2019.</span>
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => document.getElementById("cardápio")?.scrollIntoView({ behavior: "smooth" })}
                  className="group relative flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 bg-[length:200%_100%] animate-gradient rounded-2xl text-base font-bold text-black hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-500 hover:-translate-y-1 active:scale-95"
                >
                  <Flame className="w-5 h-5" />
                  <span>Ver Cardápio</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                </button>

                <button className="group flex items-center gap-3 px-8 py-4 glass rounded-2xl text-base font-medium text-stone-300 hover:text-white hover:bg-white/8 transition-all duration-300 hover:-translate-y-1">
                  <PhoneCall className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform" />
                  <span>(11) 99999-9999</span>
                </button>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                {stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`text-center p-3 rounded-xl glass hover:glass-warm transition-all duration-500 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
                    style={{ animationDelay: `${400 + i * 100}ms` }}
                  >
                    <stat.icon className="w-4 h-4 text-amber-400 mx-auto mb-1.5" />
                    <div className="text-xl font-black text-white">{stat.value}</div>
                    <div className="text-[10px] text-stone-500 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - 3D Hot Dog */}
            <div className={`relative ${isVisible ? "animate-fade-in-scale delay-300" : "opacity-0"}`}>
              {/* Glow behind 3D */}
              <div className="absolute inset-0 bg-gradient-radial from-amber-500/15 via-orange-500/5 to-transparent rounded-full blur-3xl scale-110" />
              
              <div className="relative w-full aspect-square max-w-lg mx-auto animate-float">
                <Hotdog3D />
              </div>

              {/* Floating badges */}
              <div className="absolute top-8 right-4 glass-warm rounded-2xl px-4 py-3 animate-float-slow">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                    <Award className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Nº 1 da Cidade</div>
                    <div className="text-[10px] text-stone-400">2024 • Best Hot Dog</div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-12 left-0 glass-warm rounded-2xl px-4 py-3 animate-float" style={{ animationDelay: "2s" }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <Truck className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Entrega Grátis</div>
                    <div className="text-[10px] text-stone-400">Pedidos acima de R$40</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in-up delay-800">
          <span className="text-[10px] text-stone-600 uppercase tracking-widest">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-stone-700 flex items-start justify-center p-1.5">
            <div className="w-1 h-2 bg-amber-500 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ══════════ MARQUEE STRIP ══════════ */}
      <div className="relative py-4 border-y border-white/5 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 mx-4">
              {["🌭 HOT DOG ARTESANAL", "🔥 FEITO NA BRASA", "⭐ 4.9 ESTRELAS", "🚀 ENTREGA EXPRESSA", "🏆 Nº1 DA CIDADE", "❤️ +12K CLIENTES", "✨ INGREDIENTES PREMIUM", "🌭 HOT DOG ARTESANAL", "🔥 FEITO NA BRASA", "⭐ 4.9 ESTRELAS"].map((text, j) => (
                <span key={j} className="text-xs font-bold text-stone-600 tracking-widest uppercase">{text}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ══════════ MENU / CARDÁPIO ══════════ */}
      <section id="cardápio" className="relative py-28">
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <SectionBadge icon={Utensils}>Cardápio</SectionBadge>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white mb-4">
              Escolha seu <span className="text-gradient-amber">favorito</span>
            </h2>
            <p className="text-stone-400 text-lg max-w-2xl mx-auto">
              Cada hot dog é uma obra de arte. Ingredientes frescos, preparo artesanal e sabor incomparável.
            </p>
          </div>

          {/* Bento Grid Menu */}
          <div className="grid lg:grid-cols-3 gap-6">
            {menuItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setSelectedProduct(item)}
                className={`group relative rounded-3xl p-6 cursor-pointer transition-all duration-500 hover:-translate-y-2 ${
                  selectedProduct.id === item.id
                    ? "glass-warm shadow-2xl shadow-amber-500/10 ring-1 ring-amber-500/30"
                    : "glass hover:glass-warm"
                }`}
              >
                {/* Tag */}
                {item.tag && (
                  <div className="absolute -top-3 left-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-[10px] font-bold text-black uppercase tracking-wider shadow-lg shadow-amber-500/30">
                      <Sparkles className="w-3 h-3" />
                      {item.tag}
                    </span>
                  </div>
                )}

                {/* Card Content */}
                <div className="space-y-4 pt-2">
                  {/* Icon + Name */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors duration-300">
                        {item.name}
                      </h3>
                      <p className="text-sm text-stone-500 mt-1">{item.calories}</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">🌭</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-stone-400 leading-relaxed">{item.description}</p>

                  {/* Ingredients */}
                  <div className="flex flex-wrap gap-1.5">
                    {item.ingredients.map((ing) => (
                      <span key={ing} className="px-2.5 py-1 rounded-lg bg-white/5 text-[11px] text-stone-400 border border-white/5">
                        {ing}
                      </span>
                    ))}
                  </div>

                  {/* Price + Action */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <div>
                      <span className="text-sm text-stone-500">a partir de</span>
                      <div className="text-2xl font-black text-gradient-amber">
                        R$ {item.price.toFixed(2).replace(".", ",")}
                      </div>
                    </div>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      selectedProduct.id === item.id
                        ? "bg-amber-500 text-black"
                        : "bg-white/5 text-stone-400 group-hover:bg-amber-500/20 group-hover:text-amber-400"
                    }`}>
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ══════════ ORDER PANEL ══════════ */}
          <div className="mt-12 glass-warm rounded-3xl p-8 lg:p-10">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Left - Product Details */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">🌭</span>
                    <div>
                      <h3 className="text-2xl font-black text-white">{selectedProduct.name}</h3>
                      <p className="text-sm text-stone-400">{selectedProduct.calories}</p>
                    </div>
                  </div>
                  <p className="text-stone-400 mt-3 leading-relaxed">{selectedProduct.description}</p>
                </div>

                {/* Quality Bars */}
                <div className="space-y-3">
                  {[
                    { label: "Sabor", value: 98, color: "from-amber-500 to-orange-500" },
                    { label: "Frescor", value: 100, color: "from-green-500 to-emerald-500" },
                    { label: "Crocância", value: 95, color: "from-yellow-500 to-amber-500" },
                  ].map((bar) => (
                    <div key={bar.label} className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span className="text-stone-400">{bar.label}</span>
                        <span className="text-amber-400 font-bold">{bar.value}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${bar.color} rounded-full transition-all duration-1000`}
                          style={{ width: `${bar.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right - Order Action */}
              <div className="space-y-6">
                {/* Quantity */}
                <div className="flex items-center justify-between glass rounded-2xl p-4">
                  <span className="text-sm text-stone-400">Quantidade</span>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setOrderQuantity(Math.max(1, orderQuantity - 1))}
                      className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white font-bold transition-all active:scale-90"
                    >
                      −
                    </button>
                    <span className="text-2xl font-black text-white w-8 text-center">{orderQuantity}</span>
                    <button
                      onClick={() => setOrderQuantity(orderQuantity + 1)}
                      className="w-10 h-10 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 flex items-center justify-center text-amber-400 font-bold transition-all active:scale-90"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="glass rounded-2xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-stone-400">Total</span>
                    <div className="text-right">
                      <div className="text-3xl font-black text-gradient-amber">
                        R$ {(selectedProduct.price * orderQuantity).toFixed(2).replace(".", ",")}
                      </div>
                      <span className="text-xs text-stone-500">Frete grátis acima de R$40</span>
                    </div>
                  </div>
                </div>

                {/* Order Button */}
                <button
                  onClick={handleOrder}
                  disabled={orderPlaced}
                  className={`group w-full flex items-center justify-center gap-3 py-5 rounded-2xl text-lg font-bold transition-all duration-500 active:scale-95 ${
                    orderPlaced
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 bg-[length:200%_100%] animate-gradient text-black hover:shadow-2xl hover:shadow-amber-500/30 hover:-translate-y-1"
                  }`}
                >
                  {orderPlaced ? (
                    <>
                      <CheckCircle2 className="w-6 h-6" />
                      <span>Pedido Confirmado! 🎉</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      <span>Fazer Pedido</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                    </>
                  )}
                </button>

                {/* Trust badges */}
                <div className="flex items-center justify-center gap-6 text-stone-600">
                  <div className="flex items-center gap-1.5 text-xs">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Pagamento Seguro</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <Truck className="w-3.5 h-3.5" />
                    <span>Entrega Rastreada</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ ABOUT / DIFERENCIAIS ══════════ */}
      <section id="sobre" className="relative py-28">
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <SectionBadge icon={Utensils}>Nossa Essência</SectionBadge>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white mb-4">
              Por que somos <span className="text-gradient-amber">diferentes</span>
            </h2>
            <p className="text-stone-400 text-lg max-w-2xl mx-auto">
              Não é só um hot dog. É uma experiência gastronômica pensada em cada detalhe.
            </p>
          </div>

          {/* Bento Grid Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Flame,
                title: "Grelhado na Brasa",
                desc: "Cada salsicha é grelhada lentamente na brasa para garantir aquele sabor defumado único e irresistível.",
                gradient: "from-red-500/20 to-orange-500/10",
                iconColor: "text-red-400",
                span: "lg:col-span-1",
              },
              {
                icon: Sparkles,
                title: "Ingredientes Premium",
                desc: "Selecionamos os melhores fornecedores. Sem conservantes artificiais, sem atalhos. Qualidade que você sente no primeiro mordida.",
                gradient: "from-amber-500/20 to-yellow-500/10",
                iconColor: "text-amber-400",
                span: "lg:col-span-2",
              },
              {
                icon: Zap,
                title: "Entrega Expressa",
                desc: "Média de 32 minutos. Seu hot dog chega quentinho, crocante e perfeito como se tivesse acabado de sair da chapa.",
                gradient: "from-blue-500/20 to-cyan-500/10",
                iconColor: "text-blue-400",
                span: "lg:col-span-2",
              },
              {
                icon: Heart,
                title: "Feito com Amor",
                desc: "Cada pedido é preparado com carinho e atenção. Porque comida boa é comida feita com paixão.",
                gradient: "from-pink-500/20 to-rose-500/10",
                iconColor: "text-pink-400",
                span: "lg:col-span-1",
              },
            ].map((feature, i) => (
              <div
                key={feature.title}
                className={`group relative glass rounded-3xl p-8 hover:glass-warm transition-all duration-500 hover:-translate-y-1 overflow-hidden ${feature.span}`}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />
                
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-stone-400 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section id="avaliações" className="relative py-28">
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <SectionBadge icon={Star}>Avaliações</SectionBadge>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white mb-4">
              O que dizem <span className="text-gradient-amber">nossos clientes</span>
            </h2>
            <p className="text-stone-400 text-lg max-w-2xl mx-auto">
              Mais de 12 mil clientes satisfeitos. Veja o que eles falam sobre nós.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className="group glass rounded-3xl p-8 hover:glass-warm transition-all duration-500 hover:-translate-y-2"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-stone-300 leading-relaxed mb-6 text-sm">&ldquo;{t.text}&rdquo;</p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-sm font-bold text-black">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-stone-500">Cliente verificado</div>
                  </div>
                  <BadgeCheck className="w-4 h-4 text-amber-400 ml-auto" />
                </div>
              </div>
            ))}
          </div>

          {/* Overall Rating */}
          <div className="mt-12 glass-warm rounded-3xl p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <div className="text-4xl font-black text-white mb-1">4.9 / 5.0</div>
            <p className="text-stone-400">Baseado em mais de 2.400 avaliações verificadas</p>
          </div>
        </div>
      </section>

      {/* ══════════ CTA SECTION ══════════ */}
      <section className="relative py-28">
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <div className="glass-warm rounded-[40px] p-12 lg:p-16 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-orange-500/10 rounded-[40px]" />
            
            <div className="relative z-10">
              <span className="text-6xl mb-6 block">🌭</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-white mb-4">
                Bateu a fome?
              </h2>
              <p className="text-stone-400 text-lg max-w-lg mx-auto mb-8">
                Peça agora e receba em até 32 minutos. Seu hot dog artesanal está a um clique de distância.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => document.getElementById("cardápio")?.scrollIntoView({ behavior: "smooth" })}
                  className="group flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 bg-[length:200%_100%] animate-gradient rounded-2xl text-lg font-bold text-black hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-500 hover:-translate-y-1 active:scale-95"
                >
                  <Flame className="w-5 h-5" />
                  <span>Pedir Agora</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </button>
                <a
                  href="tel:+5511999999999"
                  className="group flex items-center gap-3 px-10 py-5 glass rounded-2xl text-lg font-medium text-stone-300 hover:text-white hover:bg-white/8 transition-all duration-300 hover:-translate-y-1"
                >
                  <PhoneCall className="w-5 h-5 text-amber-400" />
                  <span>Ligar</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer id="contato" className="relative border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-lg font-bold text-white">HOT<span className="text-gradient-amber">DOG</span></span>
                  <span className="block text-[10px] text-stone-500 tracking-[0.2em] uppercase -mt-1">Artesanal</span>
                </div>
              </div>
              <p className="text-sm text-stone-500 leading-relaxed max-w-xs">
                Hot dogs artesanais feitos com paixão e ingredientes premium desde 2019.
              </p>
            </div>

            {/* Hours */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Horário</h4>
              <div className="space-y-2 text-sm text-stone-400">
                <div className="flex justify-between">
                  <span>Seg - Sex</span>
                  <span className="text-stone-300">17h - 23h</span>
                </div>
                <div className="flex justify-between">
                  <span>Sáb - Dom</span>
                  <span className="text-stone-300">16h - 00h</span>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Contato</h4>
              <div className="space-y-3">
                <a href="tel:+5511999999999" className="flex items-center gap-3 text-sm text-stone-400 hover:text-amber-400 transition-colors">
                  <PhoneCall className="w-4 h-4" />
                  <span>(11) 99999-9999</span>
                </a>
                <div className="flex items-center gap-3 text-sm text-stone-400">
                  <MapPin className="w-4 h-4" />
                  <span>Rua dos Sabores, 420 - Centro</span>
                </div>
                <a href="#" className="flex items-center gap-3 text-sm text-stone-400 hover:text-amber-400 transition-colors">
                  <AtSign className="w-4 h-4" />
                  <span>@hotdog.artesanal</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-stone-600">
              © 2024 HotDog Artesanal. Todos os direitos reservados.
            </p>
            <p className="text-xs text-stone-700">
              Feito com 🧡 e muita mostarda
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
