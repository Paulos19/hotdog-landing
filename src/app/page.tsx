"use client";

import React, { useState, useEffect } from "react";
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
  Award
} from "lucide-react";
import confetti from "canvas-confetti";
import gsap from "gsap";

// Carregar Three.js Hotdog apenas no client para evitar SSR mismatch
const Hotdog3D = dynamic(() => import("@/components/Hotdog3D"), { ssr: false });

interface MenuItem {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  price: number;
  oldPrice?: number;
  popular?: boolean;
  ingredients: string[];
  badge?: string;
  calories: string;
}

const menuItems: MenuItem[] = [
  {
    id: "classic-monster",
    name: "The Monster Trufado",
    tagline: "O campeão de vendas absoluto",
    desc: "Pão brioche selado na manteiga de garrafa, 2x salsichas artesanais bovinas defumadas na lenha de macieira, cheddar melt cremoso, bacon crocante em cubos e maionese trufada exclusiva.",
    price: 36.90,
    oldPrice: 44.90,
    popular: true,
    badge: "MAIS PEDIDO",
    calories: "780 kcal",
    ingredients: ["Pão Brioche Dourado", "Salsicha Defumada Applewood", "Cheddar Melt", "Crispy Bacon", "Maionese Trufada"]
  },
  {
    id: "vulcano-cheese",
    name: "Vulcano 4 Queijos",
    tagline: "Explosão de cremosidade inesquecível",
    desc: "Pão artesanal de parmesão, super salsicha recheada com provolone, cascata de catupiry original maçaricado, gorgonzola suave e crispy de cebola roxa crocante.",
    price: 39.90,
    oldPrice: 47.00,
    popular: true,
    badge: "RECEITA AUTORAL",
    calories: "820 kcal",
    ingredients: ["Pão Parmesão Crocante", "Salsicha com Provolone", "Catupiry Maçaricado", "Gorgonzola Cremoso", "Cebola Crispy"]
  },
  {
    id: "texas-smoke",
    name: "Texas BBQ Brisket Dog",
    tagline: "Sabor rústico defumado estilo sul dos EUA",
    desc: "Salsicha artesanal pura carne, desfiado suculento de brisket bovino cozido lentamente por 12h no molho barbecue com whisky Bourbon, picles caseiro e pimenta jalapeño suave.",
    price: 42.50,
    badge: "EDIÇÃO ESPECIAL",
    calories: "790 kcal",
    ingredients: ["Brisket 12h BBQ", "Salsicha Pura Carne", "Pickles Artesanal", "Jalapeño Agridoce", "Molho Bourbon"]
  },
  {
    id: "prensado-paulista",
    name: "Paulista Supremo Prensado",
    tagline: "A clássica tradição levada ao nível de alta gastronomia",
    desc: "Pão especial prensado até ficar ultra crocante, purê de batatas artesanal aveludado na manteiga noisette, milho doce fresco grelhado, vinagrete da casa e batata palha finíssima artesanal.",
    price: 29.90,
    calories: "690 kcal",
    ingredients: ["Purê Velouté Caseiro", "Batata Palha Especial", "Milho Fresco na Brasa", "Vinagrete Especial", "Prensado Perfeito"]
  }
];

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<MenuItem>(menuItems[0]);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [orderToast, setOrderToast] = useState(false);

  useEffect(() => {
    // Efeito sutil de entrada via GSAP
    gsap.fromTo(
      ".gsap-fade-in",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: "power3.out" }
    );
  }, []);

  const handleOrder = (item: MenuItem) => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.8 },
      colors: ["#ef4444", "#f59e0b", "#10b981", "#ffffff"]
    });

    const msg = `Olá! Gostaria de pedir *${orderQuantity}x ${item.name}* (R$ ${(item.price * orderQuantity).toFixed(2)}) visto na página oficial!`;
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(msg)}`;

    setOrderToast(true);
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setOrderToast(false);
    }, 900);
  };

  return (
    <main className="min-h-screen bg-[#090807] text-stone-100 selection:bg-orange-500 selection:text-white">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#090807]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-600/30">
              <Flame className="w-6 h-6 text-white animate-bounce" />
            </div>
            <div>
              <span className="text-xl font-black tracking-wider uppercase bg-gradient-to-r from-amber-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
                BURNING DOGS
              </span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-stone-400">
                Smoked & Craft Hotdogs
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-stone-300">
            <a href="#destaque" className="hover:text-amber-400 transition-colors">Destaque 3D</a>
            <a href="#cardapio" className="hover:text-amber-400 transition-colors">Cardápio Premium</a>
            <a href="#diferenciais" className="hover:text-amber-400 transition-colors">Por Que Nós?</a>
            <a href="#avaliacoes" className="hover:text-amber-400 transition-colors">Avaliações</a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#cardapio"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-red-600 to-amber-500 text-white font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-md shadow-orange-500/25 flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Pedir Agora
            </a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION COM THREE.JS */}
      <section id="destaque" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Glow de fundo */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-red-600/20 to-amber-500/20 rounded-full blur-[130px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Texto Hero */}
            <div className="lg:col-span-6 space-y-6 gsap-fade-in text-center lg:text-left">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold tracking-wide uppercase">
                <Sparkles className="w-4 h-4" />
                Alta Gastronomia em Hot Dog Artesanal
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08]">
                O HOTDOG MAIS <br />
                <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                  EXPLOSIVO & DEFUMADO
                </span> <br />
                QUE VOCÊ JÁ PROVOU.
              </h1>

              <p className="text-base sm:text-lg text-stone-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Esqueça o comum. Nossos hotdogs são preparados com pães brioche artesanais de fermentação natural, salsichas 100% de carnes nobres defumadas por horas e queijos derretidos no ponto de pura perfeição.
              </p>

              {/* Botões CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <button
                  onClick={() => handleOrder(selectedProduct)}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white font-extrabold text-base tracking-wide uppercase hover:scale-[1.03] transition-transform glow-btn flex items-center justify-center gap-3 cursor-pointer"
                >
                  <Flame className="w-5 h-5 fill-white" />
                  Garantir Meu Pedido Quentinho
                  <ArrowRight className="w-5 h-5" />
                </button>
                <a
                  href="#cardapio"
                  className="w-full sm:w-auto px-6 py-4 rounded-xl border border-stone-700 bg-stone-900/60 hover:bg-stone-800/80 text-stone-200 font-semibold text-center text-sm transition-colors flex items-center justify-center gap-2"
                >
                  Ver Cardápio Completo
                </a>
              </div>

              {/* Prova social rápida */}
              <div className="flex items-center justify-center lg:justify-start gap-6 pt-6 border-t border-stone-800/80">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-stone-900 bg-gradient-to-tr from-amber-500 to-red-600 flex items-center justify-center font-bold text-xs text-white shadow-inner"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                    <span className="font-bold text-sm text-stone-200 ml-1">4.9 / 5</span>
                  </div>
                  <p className="text-xs text-stone-400">Mais de 14.800 pedidos entregues com sucesso</p>
                </div>
              </div>
            </div>

            {/* Canvas 3D Three.js */}
            <div className="lg:col-span-6 relative flex justify-center gsap-fade-in">
              <div className="w-full max-w-[580px] bg-stone-900/30 rounded-3xl border border-stone-800/60 p-4 backdrop-blur-sm relative group overflow-hidden">
                <div className="absolute top-4 right-4 bg-red-600/90 text-white font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 fill-white" /> Em Brasa
                </div>
                <Hotdog3D />
                <div className="text-center pb-2">
                  <p className="text-xs font-semibold text-stone-400">
                    Salsicha defumada em lenha nobre, cheddar cremoso e pão brioche artesanal.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* BANNER DIFERENCIAIS RÁPIDOS */}
      <section className="py-8 bg-gradient-to-r from-orange-600/10 via-amber-500/10 to-red-600/10 border-y border-stone-800/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <Truck className="w-7 h-7 text-amber-400" />
              <span className="text-sm font-bold text-stone-200">Entrega Expressa</span>
              <span className="text-xs text-stone-400">Média de 32 min na sua porta</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Flame className="w-7 h-7 text-orange-500" />
              <span className="text-sm font-bold text-stone-200">100% Defumado Natural</span>
              <span className="text-xs text-stone-400">Lenhas frutíferas selecionadas</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Award className="w-7 h-7 text-yellow-400" />
              <span className="text-sm font-bold text-stone-200">Ingredientes Nobres</span>
              <span className="text-xs text-stone-400">Sem conservantes artificiais</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ShieldCheck className="w-7 h-7 text-emerald-400" />
              <span className="text-sm font-bold text-stone-200">Garantia Quentinho</span>
              <span className="text-xs text-stone-400">Embalagem térmica selada a vácuo</span>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO CARDÁPIO PREMIUM */}
      <section id="cardapio" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Menu Assinado por Chef
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              ESCOLHA O SEU <br />
              <span className="bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent">
                BURNING SPECIAL
              </span>
            </h2>
            <p className="text-stone-400 text-sm sm:text-base">
              Montados na hora do pedido para manter a crocância do pão e o queijo derretido no ponto perfeito.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="bg-stone-900/40 border border-stone-800 rounded-3xl p-6 sm:p-8 hover:border-orange-500/50 transition-all duration-300 relative group flex flex-col justify-between hover:shadow-2xl hover:shadow-orange-950/30"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      {item.badge && (
                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-red-600 text-white tracking-wider mb-2 inline-block">
                          {item.badge}
                        </span>
                      )}
                      <h3 className="text-2xl font-black text-white group-hover:text-amber-400 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs text-amber-500 font-semibold">{item.tagline}</p>
                    </div>

                    <div className="text-right">
                      {item.oldPrice && (
                        <span className="block text-xs line-through text-stone-500">
                          R$ {item.oldPrice.toFixed(2)}
                        </span>
                      )}
                      <span className="text-2xl font-black text-white bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                        R$ {item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-stone-300 mb-6 leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="mb-6">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-stone-400 mb-2 block">
                      Ingredientes Chave:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {item.ingredients.map((ing, i) => (
                        <span
                          key={i}
                          className="text-xs bg-stone-800/80 border border-stone-700/60 px-3 py-1 rounded-lg text-stone-300"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between gap-4">
                  <span className="text-xs text-stone-400 font-mono">
                    {item.calories}
                  </span>

                  <button
                    onClick={() => {
                      setSelectedProduct(item);
                      handleOrder(item);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-orange-600/20 active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Pedir via WhatsApp
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO DIFERENCIAIS E PROCESSO */}
      <section id="diferenciais" className="py-24 bg-stone-950/80 border-t border-stone-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="text-xs uppercase font-extrabold tracking-widest text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                Padrão Inegociável
              </span>
              <h2 className="text-3xl sm:text-5xl font-black leading-tight">
                POR QUE NOSSOS HOTDOGS <br />
                <span className="bg-gradient-to-r from-red-500 to-amber-400 bg-clip-text text-transparent">
                  VICIAM NA PRIMEIRA MORDIDA?
                </span>
              </h2>
              <p className="text-stone-300 text-base leading-relaxed">
                Não usamos ingredientes genéricos de atacado. Cada etapa da nossa cozinha foi planejada como um laboratório de sabor para que você tenha a melhor experiência gastronômica de street food premium.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-stone-900/40 border border-stone-800">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                    <Flame className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Defumação Lenta e Natural</h4>
                    <p className="text-xs sm:text-sm text-stone-400 mt-1">
                      Nossas salsichas passam por 6 horas em pit smoker artesanal alimentado com lenha de macieira e nós de pinho selecionados.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-stone-900/40 border border-stone-800">
                  <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400">
                    <Utensils className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Molhos Exclusivos & Autorais</h4>
                    <p className="text-xs sm:text-sm text-stone-400 mt-1">
                      Ketchup com especiarias tostadas na brasa, maionese trufada com gemas pasteurizadas e mostarda fermentada na cerveja IPA.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-stone-900/40 border border-stone-800">
                  <div className="p-2.5 rounded-xl bg-red-500/10 text-red-400">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Chega Estalando de Quente</h4>
                    <p className="text-xs sm:text-sm text-stone-400 mt-1">
                      Embalagem antivazamento com isolamento térmico de folha tripla que mantém a crocância sem amolecer o pão.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Imagem / Box Ilustrativo com Métricas */}
            <div className="relative">
              <div className="w-full rounded-3xl bg-gradient-to-br from-stone-900 via-stone-800 to-stone-950 border border-stone-700/60 p-8 shadow-2xl relative overflow-hidden">
                <div className="space-y-6">
                  <h3 className="text-2xl font-black text-white">Nosso Compromisso de Qualidade</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-stone-300">Carne Bovina Selecionada</span>
                      <span className="text-amber-400">100% Pura</span>
                    </div>
                    <div className="w-full h-2 bg-stone-700 rounded-full overflow-hidden">
                      <div className="w-[100%] h-full bg-gradient-to-r from-amber-500 to-orange-500"></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-stone-300">Tempo Médio de Preparo e Saída</span>
                      <span className="text-amber-400">11 Minutos</span>
                    </div>
                    <div className="w-full h-2 bg-stone-700 rounded-full overflow-hidden">
                      <div className="w-[90%] h-full bg-gradient-to-r from-amber-500 to-orange-500"></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-stone-300">Taxa de Clientes que Pedem Novamente</span>
                      <span className="text-amber-400">96.4%</span>
                    </div>
                    <div className="w-full h-2 bg-stone-700 rounded-full overflow-hidden">
                      <div className="w-[96%] h-full bg-gradient-to-r from-amber-500 to-orange-500"></div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-stone-700 flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-black text-white">+50.000</span>
                      <p className="text-xs text-stone-400 uppercase tracking-wider">Hotdogs Criados</p>
                    </div>
                    <div>
                      <span className="text-3xl font-black text-amber-400">4.9★</span>
                      <p className="text-xs text-stone-400 uppercase tracking-wider">Avaliação no Google</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE AVALIAÇÕES */}
      <section id="avaliacoes" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Opinião de Quem Provou
            </span>
            <h2 className="text-3xl sm:text-5xl font-black">
              QUEM EXPERIMENTA, <br />
              <span className="bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent">
                NÃO PEDE OUTRO DOG.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Rodrigo Mendonça",
                role: "Food Critic & Gastronomia SP",
                text: "O Monster Trufado é uma obra de arte. O pão não amolece com a maionese trufada e o sabor de defumação da salsicha é inacreditável. O melhor que comi em São Paulo.",
                rating: 5,
              },
              {
                name: "Beatriz Nogueira",
                role: "Cliente Frequente",
                text: "Chegou em 25 minutos super crocante e fumegando de quente! O queijo Vulcano escorre a cada mordida. Simplesmente impossível parar de comer.",
                rating: 5,
              },
              {
                name: "Carlos Eduardo",
                role: "Empresário",
                text: "Pedi para a galera do escritório em um happy hour na sexta. Todos ficaram boquiabertos com o tamanho e o sabor do Texas BBQ. Viramos clientes fiéis.",
                rating: 5,
              }
            ].map((review, i) => (
              <div
                key={i}
                className="bg-stone-900/30 border border-stone-800/80 rounded-2xl p-6 flex flex-col justify-between space-y-4"
              >
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(review.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-stone-300 text-sm italic leading-relaxed">
                  "{review.text}"
                </p>
                <div>
                  <h5 className="font-bold text-white text-sm">{review.name}</h5>
                  <p className="text-xs text-stone-500">{review.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO CTA FINAL */}
      <section className="py-20 relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="rounded-3xl bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 p-10 sm:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-orange-600/30">
            <div className="relative z-10 space-y-6">
              <span className="inline-block bg-black/30 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">
                🔥 OFERTA DE PRIMEIRA VIAGEM 🔥
              </span>
              <h2 className="text-3xl sm:text-5xl font-black leading-tight">
                SUA FOME NÃO ESPERA. <br />
                PEÇA AGORA E RECEBA COM REFRI GRÁTIS!
              </h2>
              <p className="max-w-xl mx-auto text-white/90 text-sm sm:text-base font-medium">
                Válido para pedidos efetuados hoje pelo WhatsApp. Clique no botão abaixo e fale direto com nossos atendentes.
              </p>
              <button
                onClick={() => handleOrder(menuItems[0])}
                className="px-10 py-5 rounded-2xl bg-stone-950 text-white font-extrabold text-base uppercase tracking-wider hover:bg-stone-900 transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center gap-3 mx-auto cursor-pointer"
              >
                <PhoneCall className="w-5 h-5 text-amber-400" />
                Quero Meu Hot Dog Agora
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-stone-800/80 py-12 bg-black text-stone-500 text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="font-bold text-stone-300 uppercase tracking-wider">
              BURNING DOGS BRASIL
            </span>
          </div>
          <p>© {new Date().getFullYear()} BURNING DOGS ALIMENTOS LTDA. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6 text-stone-400">
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-amber-400" /> Av. Paulista, 1000 - SP</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-400" /> Terça a Dom: 18h às 23h50</span>
          </div>
        </div>
      </footer>

      {/* TOAST FLUTUANTE DE PEDIDO */}
      {orderToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 border border-emerald-500/50 p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
          <div>
            <p className="text-xs font-bold text-white">Preparando seu pedido...</p>
            <p className="text-[11px] text-stone-400">Redirecionando para o WhatsApp oficial!</p>
          </div>
        </div>
      )}
    </main>
  );
}
