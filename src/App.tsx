import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Menu, X, ArrowRight, MapPin, Mail, Phone,
  MessageCircle, Send, Minimize2, Award, Truck, Users, Shield,
  Package, Lock, Grip, CircleDot, Settings, Star, BookOpen,
  Download, MessageSquare, DollarSign, Handshake, Boxes
} from 'lucide-react';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

// Chatbot Component with Full Flow
function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Welcome to Virma International! How can I assist you today?' }
  ]);
  const [currentFlow, setCurrentFlow] = useState<'menu' | 'products' | 'quote' | 'distributor' | 'bulk' | 'form'>('menu');
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (type: 'bot' | 'user', text: string) => {
    setMessages(prev => [...prev, { type, text }]);
  };

  const handleMenuClick = (option: string) => {
    switch(option) {
      case 'products':
        addMessage('bot', 'We manufacture 500+ premium stainless steel hardware products including aldrops, hinges, door kits, handle sets, and accessories.\n\nTo share relevant product details, please provide:\n• Company Name\n• Email Address\n• Phone Number');
        setCurrentFlow('form');
        break;
      case 'quote':
        addMessage('bot', 'Prices depend on product type, finish, size, and quantity.\n\nPlease share your details so we can send you an accurate quotation:\n• Company Name\n• Email Address\n• Phone Number\n• (Optional) Product code or requirement');
        setCurrentFlow('form');
        break;
      case 'distributor':
        addMessage('bot', 'We are always open to expanding our distributor network across India.\n\nPlease share your business details:\n• Company Name\n• Contact Person Name\n• Email Address\n• Phone Number\n• City / State');
        setCurrentFlow('form');
        break;
      case 'bulk':
        addMessage('bot', 'We specialize in bulk and wholesale orders for projects and dealers.\n\nKindly share your details:\n• Company Name\n• Email Address\n• Phone Number\n• (Optional) Estimated quantity or product type');
        setCurrentFlow('form');
        break;
      case 'contact':
        addMessage('bot', 'You can contact Virma International directly:\n\n📧 Email: hello@virmahardware.com\n📞 Phone: +91-XXXXXXXXXX\n⏱️ We respond within 24 hours on business days.\n\nOr fill out the Contact Us form on our website!');
        break;
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    addMessage('user', input);
    
    // Check if it's a menu selection
    const lowerInput = input.toLowerCase();
    
    if (currentFlow === 'menu') {
      if (lowerInput.includes('product') || lowerInput.includes('view')) {
        handleMenuClick('products');
      } else if (lowerInput.includes('price') || lowerInput.includes('quote') || lowerInput.includes('cost')) {
        handleMenuClick('quote');
      } else if (lowerInput.includes('distributor') || lowerInput.includes('partner') || lowerInput.includes('deal')) {
        handleMenuClick('distributor');
      } else if (lowerInput.includes('bulk') || lowerInput.includes('order') || lowerInput.includes('wholesale')) {
        handleMenuClick('bulk');
      } else if (lowerInput.includes('contact') || lowerInput.includes('support') || lowerInput.includes('call')) {
        handleMenuClick('contact');
      } else {
        // FAQ responses
        if (lowerInput.includes('manufacture') || lowerInput.includes('make')) {
          addMessage('bot', 'We manufacture premium stainless steel door hardware including aldrops, hinges, door kits, handle sets, tower bolts, and accessories in multiple finishes.');
        } else if (lowerInput.includes('finish') || lowerInput.includes('color')) {
          addMessage('bot', 'Our products are available in finishes like Full Polish, Matte, Antique Brass, Copper, Gold, Black, and custom decorative finishes.');
        } else if (lowerInput.includes('price') || lowerInput.includes('moq') || lowerInput.includes('minimum')) {
          addMessage('bot', 'Prices and MOQ vary based on product type, size, finish, and quantity. Please select "Get Price / Quote" for detailed pricing.');
        } else if (lowerInput.includes('since') || lowerInput.includes('established') || lowerInput.includes('year')) {
          addMessage('bot', 'Virma International has been serving the hardware industry since 2007 - over 18 years of excellence!');
        } else if (lowerInput.includes('catalog') || lowerInput.includes('catalogue')) {
          addMessage('bot', 'Yes, we provide product catalogs! Please select "View Products" or contact us at hello@virmahardware.com to request one.');
        } else if (lowerInput.includes('india') || lowerInput.includes('supply') || lowerInput.includes('deliver')) {
          addMessage('bot', 'Yes, we distribute our products across India through our network of 20+ wholesalers and 40+ retailers.');
        } else {
          addMessage('bot', 'Thank you for reaching out.\n\nFor detailed or specific queries, please contact us at:\n📧 hello@virmahardware.com\n\nOur team will assist you within 24 hours.');
        }
      }
    } else if (currentFlow === 'form') {
      // Simple form completion simulation
      addMessage('bot', 'Thank you for your details! Our team will contact you within 24 hours.\n\nIs there anything else I can help you with?');
      setCurrentFlow('menu');
    }
    
    setInput('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} className="btn-gold flex items-center gap-2 shadow-xl">
          <MessageCircle size={20} />
          <span>Chat with us</span>
        </button>
      ) : (
        <div className="w-96 h-[32rem] bg-white rounded-2xl flex flex-col shadow-2xl overflow-hidden border border-gray-100">
          <div className="flex items-center justify-between p-4 bg-[#C9A962]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle size={16} className="text-white" />
              </div>
              <span className="font-semibold text-white">Virma Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
              <Minimize2 size={18} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] p-3 rounded-2xl text-sm whitespace-pre-line ${
                  msg.type === 'user' 
                    ? 'bg-[#C9A962] text-white rounded-br-md' 
                    : 'bg-white text-gray-700 rounded-bl-md shadow-sm border border-gray-100'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {currentFlow === 'menu' && (
              <div className="grid grid-cols-2 gap-2 mt-2">
                <button onClick={() => handleMenuClick('products')} className="flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-200 hover:border-[#C9A962] hover:bg-[#C9A962]/5 transition-all text-sm">
                  <BookOpen size={16} className="text-[#C9A962]" /> View Products
                </button>
                <button onClick={() => handleMenuClick('quote')} className="flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-200 hover:border-[#C9A962] hover:bg-[#C9A962]/5 transition-all text-sm">
                  <DollarSign size={16} className="text-[#C9A962]" /> Get Quote
                </button>
                <button onClick={() => handleMenuClick('distributor')} className="flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-200 hover:border-[#C9A962] hover:bg-[#C9A962]/5 transition-all text-sm">
                  <Handshake size={16} className="text-[#C9A962]" /> Distributor
                </button>
                <button onClick={() => handleMenuClick('bulk')} className="flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-200 hover:border-[#C9A962] hover:bg-[#C9A962]/5 transition-all text-sm">
                  <Boxes size={16} className="text-[#C9A962]" /> Bulk Order
                </button>
                <button onClick={() => handleMenuClick('contact')} className="col-span-2 flex items-center justify-center gap-2 p-2 bg-white rounded-lg border border-gray-200 hover:border-[#C9A962] hover:bg-[#C9A962]/5 transition-all text-sm">
                  <MessageSquare size={16} className="text-[#C9A962]" /> Contact Support
                </button>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-3 bg-white border-t border-gray-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#C9A962]"
              />
              <button onClick={handleSend} className="btn-gold p-2.5">
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Navigation
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 nav-blur shadow-sm' : 'bg-transparent'
    }`}>
      <div className="section-container">
        <div className="flex items-center justify-between py-4">
          <div className="text-2xl font-bold tracking-tight text-[#C9A962]" style={{ fontFamily: 'Playfair Display' }}>
            Virma International
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollTo('about')} className="text-sm text-[var(--brand-yellow)] hover:text-[#1A1A2E] transition-colors">About</button>
            <button onClick={() => scrollTo('products')} className="text-sm text-[var(--brand-yellow)] hover:text-[#1A1A2E] transition-colors">Products</button>
            <button onClick={() => scrollTo('categories')} className="text-sm text-[var(--brand-yellow)] hover:text-[#1A1A2E] transition-colors">Categories</button>
            <button onClick={() => scrollTo('network')} className="text-sm text-[var(--brand-yellow)] hover:text-[#1A1A2E] transition-colors">Network</button>
            <button onClick={() => scrollTo('contact')} className="btn-gold text-sm py-2.5">Contact Us</button>
          </div>
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-4">
          <button onClick={() => scrollTo('about')} className="block w-full text-left text-[var(--brand-yellow)] font-medium">About</button>
          <button onClick={() => scrollTo('products')} className="block w-full text-left text-[var(--brand-yellow)] font-medium">Products</button>
          <button onClick={() => scrollTo('categories')} className="block w-full text-left text-[var(--brand-yellow)] font-medium">Categories</button>
          <button onClick={() => scrollTo('network')} className="block w-full text-left text-[var(--brand-yellow)] font-medium">Network</button>
          <button onClick={() => scrollTo('contact')} className="btn-gold w-full text-center">Contact Us</button>
        </div>
      )}
    </nav>
  );
}

// Hero Section with Background Slideshow
function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    '/images/slide_1.jpg',
    '/images/slide_2.jpg',
    '/images/slide_3.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    if (!section || !text) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(text.children, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out', delay: 0.3 }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slideshow */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img src={slide} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 section-container py-32">
        <div ref={textRef} className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
            <Star size={14} className="text-[#C9A962]" />
            <span className="text-sm text-white/90 font-medium">Since 2007</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-white mb-6" style={{ fontFamily: 'Playfair Display' }}>
            Premium Hardware<br />
            <span className="text-[#C9A962]">Solutions</span>
          </h1>
          <p className="text-lg text-white/80 max-w-xl leading-relaxed mb-8">
            Crafting excellence in every piece. We manufacture and distribute premium door hardware, 
            cabinet handles, and accessories across India.
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={scrollToProducts} className="btn-gold flex items-center gap-2">
              Explore Products <ArrowRight size={18} />
            </button>
            <button onClick={scrollToContact} className="px-8 py-3.5 rounded-full font-medium text-white border-2 border-white/30 hover:bg-white/10 transition-all duration-300">
              Contact Us
            </button>
          </div>
          
          {/* Slide Indicators */}
          <div className="flex gap-2 mt-12">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-12 h-1 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-[#C9A962]' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// About/Stats Section
function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stats = statsRef.current;
    if (!section || !stats) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(stats.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: '18+', label: 'Years Experience', icon: Award },
    { value: '20+', label: 'Wholesalers', icon: Users },
    { value: '40+', label: 'Retailers', icon: MapPin },
    { value: '500+', label: 'Products', icon: Package },
    { value: '100K+', label: 'Units Sold', icon: Truck },
    { value: '98%', label: 'Satisfaction', icon: Star },
  ];

  return (
    <section ref={sectionRef} id="about" className="py-24 bg-white">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="gold-line" />
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'Playfair Display' }}>
              A Legacy of<br />Excellence
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Founded in 2007, Virma International has grown from a small workshop in Aligarh to one of 
              India's most trusted names in premium hardware. Our commitment to quality craftsmanship 
              and customer satisfaction has earned us a network of 20+ wholesalers and 40+ retailers 
              across the nation.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Every product that bears the Virma name undergoes rigorous quality testing, ensuring 
              durability, elegance, and performance that exceeds expectations.
            </p>
          </div>
          <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="stat-card group hover:bg-[#C9A962] hover:text-white transition-all duration-300">
                <stat.icon size={24} className="mx-auto mb-3 text-[#C9A962] group-hover:text-white transition-colors" />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500 group-hover:text-white/80 transition-colors">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Featured Products Section
function ProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(cards.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

 

  const products = [
    {
      name: 'S.S. Premium Aldrops',
      description: 'Engineered in stainless steel with smooth glide mechanism. Available in multiple sizes and finishes.',
      image: '/images/aldrop_1.jpg',
      sizes: '6″ / 8″ / 10″ / 12″'
    },
    {
      name: 'Door Hardware Kits',
      description: 'Complete sets including aldrop, handle, stopper, and tower bolt with coordinated finishes.',
      image: '/images/door_kit_1.jpg',
      sizes: 'Standard & Premium'
    },
    {
      name: 'Cabinet Handles',
      description: 'Minimal profile with maximum grip. Perfect for modern and traditional interiors.',
      image: '/images/handle_1.jpg',
      sizes: '4″ / 6″ / 8″ / 10″'
    }
  ];

  return (
    <section ref={sectionRef} id="products" className="py-24 bg-gray-50">
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="gold-line mx-auto mb-6" />
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: 'Playfair Display' }}>
            Our Products
          </h2>
          <p className="text-gray-600">
            Discover our range of premium hardware solutions, crafted with precision and designed to last.
          </p>
        </div>
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <div key={i} className="card-elegant group">
              <div className="img-zoom aspect-square">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#1A1A2E] mb-2" style={{ fontFamily: 'Playfair Display' }}>
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#C9A962] font-medium bg-[#C9A962]/10 px-3 py-1 rounded-full">
                    {product.sizes}
                  </span>
                 <a
  href="/virma-catalogue.pdf"
  download
  className="text-sm font-medium text-[#1A1A2E] flex items-center gap-1 group-hover:text-[var(--brand-yellow)] transition-colors"
>
  <Download size={14} /> Download Catalogue
</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Categories Section
function CategoriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(grid.children,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const categories = [
    { name: 'Aldrops', count: '50+ variants', icon: Lock },
    { name: 'Door Kits', count: '20+ sets', icon: Package },
    { name: 'Cabinet Handles', count: '100+ designs', icon: Grip },
    { name: 'Tower Bolts', count: '30+ styles', icon: CircleDot },
    { name: 'Stoppers', count: '15+ types', icon: Settings },
    { name: 'Accessories', count: '200+ items', icon: Award },
  ];

  return (
    <section ref={sectionRef} id="categories" className="py-24 bg-white">
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="gold-line mx-auto mb-6" />
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: 'Playfair Display' }}>
            Product Categories
          </h2>
          <p className="text-gray-600">
            Explore our comprehensive range of hardware solutions for every need.
          </p>
        </div>
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, i) => (
            <div key={i} className="category-card">
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-[#C9A962]/10 flex items-center justify-center mb-4">
                  <category.icon size={28} className="text-[#C9A962]" />
                </div>
                <h3 className="text-xl font-semibold text-[#1A1A2E] mb-1" style={{ fontFamily: 'Playfair Display' }}>
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">{category.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Why Choose Us Section
function WhyChooseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(cards.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: Shield,
      title: 'Premium Quality',
      description: 'Every product undergoes rigorous quality testing to ensure durability and performance.'
    },
    {
      icon: Package,
      title: 'Wide Range',
      description: '500+ products across multiple categories to meet all your hardware needs.'
    },
    {
      icon: Award,
      title: 'Competitive Pricing',
      description: 'Best value for money with bulk discounts and flexible pricing options.'
    },
    {
      icon: Truck,
      title: 'Pan-India Delivery',
      description: 'Fast and secure delivery to all major cities across India.'
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-gray-50">
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="gold-line mx-auto mb-6" />
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: 'Playfair Display' }}>
            Why Choose Virma
          </h2>
          <p className="text-gray-600">
            We combine traditional craftsmanship with modern manufacturing to deliver excellence.
          </p>
        </div>
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 rounded-full bg-[#C9A962]/10 flex items-center justify-center mx-auto mb-4">
                <feature.icon size={32} className="text-[#C9A962]" />
              </div>
              <h3 className="text-lg font-semibold text-[#1A1A2E] mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Network Section
function NetworkSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(section.querySelectorAll('.animate-in'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const cities = ['Delhi', 'Mumbai', 'Pune', 'Hyderabad', 'Bangalore', 'Chennai', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow'];

  return (
    <section ref={sectionRef} id="network" className="py-24 bg-white">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-in">
            <div className="gold-line mb-6" />
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1A1A2E] mb-6" style={{ fontFamily: 'Playfair Display' }}>
              Our Distribution<br />Network
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              With 20+ wholesalers and 40+ retail partners across India, we ensure our products 
              reach every corner of the country. Our efficient logistics network guarantees 
              timely delivery and excellent service.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {cities.map((city, i) => (
                <span key={i} className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-[#C9A962] hover:text-white transition-colors cursor-default">
                  {city}
                </span>
              ))}
            </div>
            <button className="btn-gold">Become a Distributor</button>
          </div>
          <div className="animate-in relative">
            <div className="aspect-square bg-gradient-to-br from-[#C9A962]/10 to-[#8B7355]/10 rounded-3xl flex items-center justify-center">
              <img 
                src="/images/product_collection.jpg" 
                alt="Product Collection" 
                className="w-4/5 h-4/5 object-contain rounded-2xl shadow-xl"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#C9A962] flex items-center justify-center">
                  <MapPin size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#1A1A2E]">60+</div>
                  <div className="text-sm text-gray-500">Cities Covered</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(section.querySelectorAll('.animate-in'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your inquiry! We will get back to you within 24 hours.');
  };

  return (
    <section ref={sectionRef} id="contact" className="py-24 bg-gray-50">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="animate-in">
            <div className="gold-line mb-6" />
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1A1A2E] mb-6" style={{ fontFamily: 'Playfair Display' }}>
              Get in Touch
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Have a question or need a quote? We'd love to hear from you. 
              Fill out the form and our team will respond within 24 hours.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#C9A962]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-[#C9A962]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A1A2E] mb-1">Address</h4>
                  <p className="text-gray-600 text-sm">D-97 Sector 1, Tala Nagri<br />Aligarh-202001, Uttar Pradesh, India</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#C9A962]/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={20} className="text-[#C9A962]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A1A2E] mb-1">Email</h4>
                  <p className="text-gray-600 text-sm">hello@virmahardware.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#C9A962]/10 flex items-center justify-center flex-shrink-0">
                  <Phone size={20} className="text-[#C9A962]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A1A2E] mb-1">Phone</h4>
                  <p className="text-gray-600 text-sm">+91-XXXXXXXXXX</p>
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="animate-in bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input type="text" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business</label>
                <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input type="email" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="tel" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Interest</label>
                <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm">
                  <option>Select a product</option>
                  <option>Aldrops</option>
                  <option>Door Kits</option>
                  <option>Cabinet Handles</option>
                  <option>Tower Bolts</option>
                  <option>Stoppers</option>
                  <option>Multiple Products</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input type="text" placeholder="e.g., 100 sets" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea rows={4} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm resize-none"></textarea>
            </div>
            <button type="submit" className="btn-gold w-full">Send Inquiry</button>
          </form>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-[#1A1A2E] text-white py-16">
      <div className="section-container">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display' }}>
              Virma International
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Premium hardware solutions since 2007. Crafting excellence in every piece.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Products</a></li>
              <li><a href="#categories" className="hover:text-white transition-colors">Categories</a></li>
              <li><a href="#network" className="hover:text-white transition-colors">Network</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Aldrops</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Door Kits</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cabinet Handles</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tower Bolts</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>D-97 Sector 1, Tala Nagri</li>
              <li>Aligarh-202001, UP, India</li>
              <li>hello@virmahardware.com</li>
              <li>+91-XXXXXXXXXX</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-400">
            © 2024 Virma International. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main App
function App() {
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ProductsSection />
        <CategoriesSection />
        <WhyChooseSection />
        <NetworkSection />
        <ContactSection />
        <Footer />
      </main>
      <Chatbot />
    </div>
  );
}

export default App;
