
import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  BarChart3, 
  FileCheck, 
  Search, 
  Settings, 
  Building2, 
  UserCheck, 
  Menu, 
  X,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Scale,
  Target,
  Users,
  Award,
  ArrowLeft,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { ServiceCard, AuditItem, SectionId } from './types';

// Componente Isotype optimizado para mostrar solo la imagen (sin fondo cuadrado)
const Isotype = ({ className, style, isWatermark = false }: { className?: string, style?: React.CSSProperties, isWatermark?: boolean }) => {
  // Usando el formato lh3.googleusercontent.com que es más compatible para etiquetas img
  const imageUrl = "https://lh3.googleusercontent.com/d/1HSGb62sZUs7sN8X5gx4MvyBvLO93PAOB";
  
  if (isWatermark) {
    return (
      <div className={`${className} flex items-center justify-center`} style={style}>
        <img 
          src={imageUrl} 
          alt="" 
          className="w-full h-full object-contain scale-[1.6]" 
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div 
      className={`relative flex items-center justify-center ${className}`} 
      style={style}
    >
      <img 
        src={imageUrl} 
        alt="Verantis Isotype" 
        className="w-full h-full object-contain scale-[1.7]" 
        loading="eager"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

// Barra de Navegación
const Navbar = ({ onViewChange, currentView }: { onViewChange: (view: 'home' | 'about' | 'reglamento' | 'politicas') => void, currentView: string }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: `#${SectionId.HERO}`, action: () => onViewChange('home') },
    { name: 'SERVICIOS', href: `#${SectionId.SERVICES}`, action: () => onViewChange('home') },
    { name: 'Auditorías', href: `#${SectionId.AUDITS}`, action: () => onViewChange('home') },
    { name: 'Sobre Nosotros', action: () => onViewChange('about') },
    { name: 'REGLAMENTO', action: () => onViewChange('reglamento') },
    { name: 'POLÍTICAS', action: () => onViewChange('politicas') },
  ];

  const handleLogoClick = () => {
    onViewChange('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled || currentView !== 'home' ? 'bg-slate-900/70 backdrop-blur-md shadow-lg py-3 border-b border-white/10' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-4 cursor-pointer group" onClick={handleLogoClick}>
          <div className="relative">
            <Isotype className="w-14 h-14 transition-transform duration-500 group-hover:scale-105" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tight leading-none text-white">VERANTIS</span>
            <span className={`text-[9px] uppercase tracking-[0.25em] font-bold mt-1.5 ${isScrolled || currentView !== 'home' ? 'text-emerald' : 'text-slate-300'}`}>AUDITORIA Y CONSULTORÍA</span>
          </div>
        </div>

        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href || '#'} 
              onClick={(e) => {
                if (!link.href) e.preventDefault();
                link.action();
                setIsMenuOpen(false);
              }}
              className="text-xs font-bold uppercase tracking-widest transition-colors hover:text-gold text-white"
            >
              {link.name}
            </a>
          ))}
          <a href={`#${SectionId.CONTACT}`} onClick={() => onViewChange('home')} className="bg-gold hover:bg-[#b08e42] text-white px-6 py-2.5 rounded-full font-bold transition-transform hover:scale-105 shadow-xl shadow-gold/20">
            Cotizar
          </a>
        </div>

        <button className="md:hidden text-gold" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-md border-b border-white/10 absolute top-full left-0 w-full flex flex-col p-6 space-y-4 shadow-xl">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href || '#'} 
              onClick={(e) => {
                if (!link.href) e.preventDefault();
                link.action();
                setIsMenuOpen(false);
              }} 
              className="text-white font-bold text-lg hover:text-gold transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

// Sección Hero
const Hero = ({ onAboutClick }: { onAboutClick: () => void }) => (
  <section id={SectionId.HERO} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
        className="w-full h-full object-cover filter brightness-[0.2]" 
        alt="Verantis Background" 
      />
      <div className="absolute inset-0 gradient-navy-emerald opacity-70"></div>
    </div>
    
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-3xl">
        <h2 className="text-gold font-bold uppercase tracking-[0.3em] mb-4 flex items-center">
          <span className="w-12 h-[2px] bg-gold mr-4"></span> Precisión y Excelencia
        </h2>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
          Guiamos a su organización, para afrontar desafíos de alta exigencia
        </h1>
        <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl">
          Especialistas en auditoría, consultoría y gestión estratégica. Proveemos claridad en sus estados financieros y optimización en sus procesos internos.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <a href={`#${SectionId.SERVICES}`} className="bg-gold hover:bg-[#b08e42] text-white px-10 py-4 rounded-lg text-lg font-bold transition-all shadow-xl shadow-gold/20 flex items-center justify-center">
            Nuestros Servicios <ChevronRight className="ml-2" />
          </a>
          <button 
            onClick={onAboutClick}
            className="border-2 border-white/30 hover:bg-white/10 text-white px-10 py-4 rounded-lg text-lg font-bold transition-all backdrop-blur-sm"
          >
            Sobre Nosotros
          </button>
        </div>
      </div>
    </div>
    
    <div className="absolute -bottom-20 -right-20 opacity-[0.25] pointer-events-none select-none scale-150 rotate-12 z-0">
      <Isotype isWatermark className="w-[800px] h-[800px]" />
    </div>
  </section>
);

// Sección de Servicios
const Services = () => {
  const services: ServiceCard[] = [
    {
      title: "Control Interno",
      description: "Diseño e implementación de sistemas de control para mitigar riesgos y proteger activos institucionales.",
      icon: <ShieldCheck className="w-12 h-12 text-emerald" />
    },
    {
      title: "Contabilidad & Finanzas",
      description: "Gestión contable integral, elaboración de informes financieros y proyecciones estratégicas.",
      icon: <BarChart3 className="w-12 h-12 text-emerald" />
    },
    {
      title: "Optimización de Procesos",
      description: "Análisis profundo de flujos de trabajo para maximizar la eficiencia operativa y reducir costos innecesarios.",
      icon: <Settings className="w-12 h-12 text-emerald" />
    },
    {
      title: "Asesoría Tributaria",
      description: "Planificación fiscal estratégica y cumplimiento normativo para optimizar su carga impositiva.",
      icon: <FileCheck className="w-12 h-12 text-emerald" />
    }
  ];

  return (
    <section id={SectionId.SERVICES} className="py-24 bg-slate-50 scroll-mt-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h3 className="text-navy font-bold uppercase tracking-widest text-sm mb-4">Soluciones Integrales</h3>
          <h2 className="text-4xl font-extrabold text-navy">Servicios Profesionales de Consultoría</h2>
          <div className="w-20 h-1 bg-gold mx-auto mt-6"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow group">
              <div className="mb-6 p-4 bg-emerald/5 rounded-2xl inline-block group-hover:bg-emerald/10 transition-colors">
                {s.icon}
              </div>
              <h4 className="text-xl font-bold text-navy mb-3">{s.title}</h4>
              <p className="text-slate-600 leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-[0.05] pointer-events-none select-none scale-[2]">
        <Isotype isWatermark className="w-[600px] h-[600px]" />
      </div>
    </section>
  );
};

// Sección de Auditorías - GRÁFICA MEJORADA
const AuditSection = () => {
  const audits: AuditItem[] = [
    { name: "Estados Financieros", description: "Revisión objetiva y técnica de la salud contable." },
    { name: "Compliance", description: "Aseguramiento del cumplimiento normativo y legal." },
    { name: "Fraude y Forense", description: "Detección y prevención de irregularidades financieras." },
    { name: "Gestión de Riesgos", description: "Identificación de vulnerabilidades operativas." },
    { name: "Auditoría de Procesos", description: "Evaluación de la eficiencia de los flujos internos." },
    { name: "Condominios", description: "Auditorías especializadas en gestión de comunidades y edificios." }
  ];

  return (
    <section id={SectionId.AUDITS} className="py-24 bg-white scroll-mt-24 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-15%] opacity-[0.12] pointer-events-none select-none -rotate-12">
        <Isotype isWatermark className="w-[700px] h-[700px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16 relative z-10">
        
        {/* GRÁFICA MEJORADA - LADO IZQUIERDO */}
        <div className="lg:w-1/2 w-full">
          <div className="relative h-[550px] w-full max-w-[500px] mx-auto group">
            
            {/* Fondo Decorativo - Líneas de Red Técnica */}
            <div className="absolute inset-0 border-[1px] border-slate-100 rounded-[3rem] -rotate-3 transition-transform duration-700 group-hover:rotate-0"></div>
            
            {/* Imagen Principal */}
            <div className="absolute inset-4 overflow-hidden rounded-[2.5rem] shadow-2xl z-10">
              <img 
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                alt="Auditoría Profesional" 
              />
              <div className="absolute inset-0 bg-navy/20 mix-blend-multiply"></div>
            </div>

            {/* Sello de Certificación Flotante (Líneas doradas) */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-white rounded-full p-2 shadow-2xl z-20 border-[6px] border-gold/20 flex items-center justify-center animate-pulse">
               <div className="w-full h-full border-2 border-gold border-dashed rounded-full flex items-center justify-center p-2">
                  <Isotype className="w-16 h-16" />
               </div>
            </div>

            {/* Badge: Integridad Técnica */}
            <div className="absolute bottom-12 -left-8 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl z-30 border-l-4 border-gold w-56 transform transition-all duration-500 group-hover:translate-x-4">
              <div className="flex items-center space-x-3 mb-2">
                <CheckCircle2 className="w-5 h-5 text-emerald" />
                <span className="text-navy font-extrabold text-sm uppercase tracking-tighter">Rigurosidad</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-tight">Cumplimiento estricto de estándares internacionales IFRS y auditoría forense.</p>
            </div>

            {/* Tarjeta de Datos Flotante */}
            <div className="absolute top-1/4 -right-12 bg-navy text-white p-6 rounded-3xl shadow-2xl z-30 w-48 border border-white/10 transform transition-all duration-500 group-hover:-translate-x-4">
               <Award className="w-8 h-8 text-gold mb-3" />
               <h5 className="text-2xl font-black text-gold">100%</h5>
               <p className="text-[10px] uppercase tracking-widest font-bold text-slate-300">Trazabilidad</p>
               <div className="w-full h-1 bg-white/10 mt-3 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-gold rounded-full"></div>
               </div>
            </div>

            {/* Decoración de bordes dorados */}
            <div className="absolute -bottom-8 -right-8 w-40 h-40 border-b-8 border-r-8 border-gold/30 rounded-br-[4rem] z-0"></div>
          </div>
        </div>

        {/* CONTENIDO DERECHO */}
        <div className="lg:w-1/2">
          <h3 className="text-emerald font-bold uppercase tracking-widest text-sm mb-4">Especialización de Alto Nivel</h3>
          <h2 className="text-4xl font-extrabold text-navy mb-8">Auditorías Profesionales Certificadas</h2>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {audits.map((item, idx) => (
              <div key={idx} className="flex items-start space-x-4 group/item">
                <div className="mt-1 bg-gold/10 p-1 rounded-full transition-colors group-hover/item:bg-gold">
                  <div className="w-2 h-2 bg-gold rounded-full transition-colors group-hover/item:bg-white"></div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-navy transition-colors group-hover/item:text-gold">{item.name}</h4>
                  <p className="text-sm text-slate-500">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 p-6 bg-navy rounded-3xl flex items-center justify-between border border-white/5 shadow-2xl relative overflow-hidden group/condo">
            <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover/condo:opacity-100 transition-opacity"></div>
            <div className="flex items-center space-x-4 relative z-10">
              <div className="w-12 h-12 bg-gold/20 rounded-2xl flex items-center justify-center text-gold">
                <Building2 className="w-7 h-7" />
              </div>
              <div>
                <p className="text-white font-bold text-lg">Especialidad Condominios</p>
                <p className="text-slate-400 text-xs">Gestión legal, financiera y patrimonial.</p>
              </div>
            </div>
            <button className="relative z-10 text-gold border border-gold/50 hover:bg-gold hover:text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105">
              Saber Más
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Sección de Contacto
const Contact = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    consultoria: 'Auditoría de Estados Financieros'
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error en la solicitud');
      }

      setStatus('success');
      setFormData({
        nombre: '',
        correo: '',
        consultoria: 'Auditoría de Estados Financieros'
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error: any) {
      console.error('Error:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Hubo un error al enviar la solicitud.');
      setTimeout(() => {
        setStatus('idle');
        setErrorMessage('');
      }, 8000);
    }
  };

  return (
    <section id={SectionId.CONTACT} className="py-24 bg-navy text-white relative overflow-hidden scroll-mt-24">
       <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald/5 -skew-x-12 transform translate-x-1/2"></div>
       <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gold/5 rounded-full blur-3xl"></div>
       
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
         <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-extrabold mb-8">¿Listo para dar el siguiente paso?</h2>
              <p className="text-xl text-slate-300 mb-12">Nuestro equipo de consultores expertos está listo para analizar sus necesidades y proponer una estrategia ganadora.</p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-gold">
                    <Phone />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Llámanos</p>
                    <p className="text-xl font-bold">+56 9 9325 4396</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-gold">
                    <Mail />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Escríbenos</p>
                    <p className="text-xl font-bold">contacto@verantis.cl</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl">
              <h3 className="text-2xl font-bold text-navy mb-8">Contáctanos</h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Nombre Completo</label>
                    <input 
                      type="text" 
                      required
                      value={formData.nombre}
                      onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                      className="w-full bg-slate-100 border-none rounded-xl p-4 focus:ring-2 focus:ring-emerald text-navy" 
                      placeholder="Ej. Juan Pérez" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Correo Corporativo</label>
                    <input 
                      type="email" 
                      required
                      value={formData.correo}
                      onChange={(e) => setFormData({...formData, correo: e.target.value})}
                      className="w-full bg-slate-100 border-none rounded-xl p-4 focus:ring-2 focus:ring-emerald text-navy" 
                      placeholder="email@empresa.cl" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Servicio de Interés</label>
                  <select 
                    value={formData.consultoria}
                    onChange={(e) => setFormData({...formData, consultoria: e.target.value})}
                    className="w-full bg-slate-100 border-none rounded-xl p-4 focus:ring-2 focus:ring-emerald text-navy"
                  >
                    <option>Auditoría de Estados Financieros</option>
                    <option>Consultoría de Control Interno</option>
                    <option>Gestión de Procesos</option>
                    <option>Auditoría de Condominios</option>
                    <option>Otro</option>
                  </select>
                </div>
                
                {status === 'success' && (
                  <div className="p-4 bg-emerald/10 text-emerald rounded-xl border border-emerald/20 flex items-center">
                    <CheckCircle2 className="w-5 h-5 mr-2 flex-shrink-0" />
                    <span>¡Solicitud enviada con éxito! Nos pondremos en contacto pronto.</span>
                  </div>
                )}
                
                {status === 'error' && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex flex-col">
                    <span className="font-bold mb-1">Error al enviar:</span>
                    <span className="text-sm">{errorMessage}</span>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="w-full bg-emerald hover:bg-emerald/90 disabled:bg-emerald/50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.02] flex justify-center items-center"
                >
                  {status === 'submitting' ? (
                    <span className="animate-pulse">Enviando...</span>
                  ) : (
                    'Enviar Solicitud'
                  )}
                </button>
              </form>
            </div>
         </div>
       </div>
    </section>
  );
};

// Página Sobre Nosotros
const AboutPage = ({ onBack }: { onBack: () => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-20 animate-in fade-in duration-700 bg-white relative overflow-hidden">
      <div className="absolute top-[5%] right-[-20%] opacity-[0.15] pointer-events-none select-none rotate-45">
        <Isotype isWatermark className="w-[800px] h-[800px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <button onClick={onBack} className="flex items-center text-navy font-bold mb-12 group">
          <div className="w-10 h-10 bg-navy/5 rounded-full flex items-center justify-center mr-3 group-hover:bg-gold group-hover:text-white transition-all">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="group-hover:text-gold transition-colors">Volver al Inicio</span>
        </button>

        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32 relative">
          <div className="lg:w-1/2 z-10">
            <h1 className="text-5xl md:text-7xl font-extrabold text-navy mb-8 leading-tight">
              Sinergia de <br /> Experiencia <br /> para su <span className="text-emerald">Seguridad</span>
            </h1>
            <div className="relative pl-8 border-l-4 border-gold py-2">
              <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-lg">
                VERANTIS nace de la unión de tres visiones fundamentales para el éxito corporativo: la investigación técnica, el control estratégico y el rigor legal-tributario.
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
             <div className="relative z-10 overflow-hidden rounded-[2.5rem] shadow-2xl border-[12px] border-white">
               <img 
                 src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                 className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" 
                 alt="Equipo Verantis" 
               />
             </div>
          </div>
        </div>

        <div className="mb-32">
          <div className="text-center mb-20">
            <span className="text-gold font-bold uppercase tracking-[0.4em] text-xs mb-4 block">Nuestro Liderazgo</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-navy mb-6">Socios Fundadores</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            <div className="group">
              <div className="relative mb-8 aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute bottom-6 right-6 w-20 h-20 bg-emerald rounded-2xl flex items-center justify-center shadow-xl z-20 transform group-hover:-rotate-12 transition-transform border-4 border-white">
                     <ShieldCheck className="w-10 h-10 text-white" />
                  </div>
              </div>
              <h3 className="text-2xl font-bold text-navy mb-2">Control & Riesgos</h3>
              <p className="text-slate-600">Gestión estratégica y cumplimiento normativo.</p>
            </div>
            <div className="group">
              <div className="relative mb-8 aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute bottom-6 right-6 w-20 h-20 bg-gold rounded-2xl flex items-center justify-center shadow-xl z-20 transform group-hover:rotate-12 transition-transform border-4 border-white">
                     <Search className="w-10 h-10 text-white" />
                  </div>
              </div>
              <h3 className="text-2xl font-bold text-navy mb-2">Investigación Técnica</h3>
              <p className="text-slate-600">Metodologías de auditoría forense y control interno.</p>
            </div>
            <div className="group">
              <div className="relative mb-8 aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute bottom-6 right-6 w-20 h-20 bg-navy rounded-2xl flex items-center justify-center shadow-xl z-20 transform group-hover:scale-110 transition-transform border-4 border-white">
                     <FileCheck className="w-10 h-10 text-gold" />
                  </div>
              </div>
              <h3 className="text-2xl font-bold text-navy mb-2">Impuestos & Legalidad</h3>
              <p className="text-slate-600">Planificación fiscal y soporte corporativo.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Página de Reglamento
const ReglamentoPage = ({ onBack }: { onBack: () => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const highlights = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-emerald" />,
      title: "Transparencia Total",
      desc: "Garantizamos el acceso a la información financiera y operativa de manera clara y oportuna para todos los involucrados."
    },
    {
      icon: <Lock className="w-8 h-8 text-emerald" />,
      title: "Confidencialidad",
      desc: "Manejo estricto y seguro de los datos sensibles de su organización, protegiendo su integridad en todo momento."
    },
    {
      icon: <Scale className="w-8 h-8 text-emerald" />,
      title: "Cumplimiento Normativo",
      desc: "Alineación absoluta con las leyes vigentes y estándares internacionales de auditoría y contabilidad."
    },
    {
      icon: <UserCheck className="w-8 h-8 text-emerald" />,
      title: "Ética Profesional",
      desc: "Actuamos bajo los más altos estándares de integridad, objetividad e independencia en cada proceso."
    }
  ];

  return (
    <div className="pt-32 pb-20 animate-in fade-in duration-700 bg-slate-50 relative overflow-hidden min-h-screen">
      <div className="absolute top-[5%] right-[-20%] opacity-[0.05] pointer-events-none select-none rotate-45">
        <Isotype isWatermark className="w-[800px] h-[800px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <button onClick={onBack} className="flex items-center text-navy font-bold mb-12 group">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3 shadow-sm group-hover:bg-gold group-hover:text-white transition-all border border-slate-200">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="group-hover:text-gold transition-colors">Volver al Inicio</span>
        </button>

        <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 p-8 md:p-16 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
            <div className="lg:w-1/2">
              <span className="text-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Documento Oficial</span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-navy mb-6 leading-tight">
                Reglamento <span className="text-emerald">Interno</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Conozca los lineamientos, derechos y deberes que rigen nuestra relación profesional. Este documento establece el marco de confianza y excelencia bajo el cual operamos.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#" 
                  className="bg-navy hover:bg-navy/90 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center group"
                >
                  <FileCheck className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  Descargar PDF Completo
                </a>
              </div>
            </div>
            
            <div className="lg:w-1/2 w-full">
               <div className="relative bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-inner">
                 <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold/10 rounded-full blur-xl"></div>
                 <h3 className="text-xl font-bold text-navy mb-6 flex items-center">
                   <Target className="w-6 h-6 text-gold mr-3" />
                   Puntos Clave del Reglamento
                 </h3>
                 
                 <div className="space-y-6">
                   {highlights.map((item, idx) => (
                     <div key={idx} className="flex gap-4">
                       <div className="flex-shrink-0 mt-1">
                         {item.icon}
                       </div>
                       <div>
                         <h4 className="font-bold text-navy text-lg">{item.title}</h4>
                         <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Página de Políticas
const PoliticasPage = ({ onBack }: { onBack: () => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const highlights = [
    {
      icon: <Lock className="w-8 h-8 text-emerald" />,
      title: "Protección de Datos",
      desc: "Garantizamos la máxima seguridad y privacidad en el manejo de la información de nuestros clientes."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-emerald" />,
      title: "Calidad Garantizada",
      desc: "Nuestros procesos están diseñados bajo estrictos controles de calidad para asegurar resultados precisos y confiables."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-emerald" />,
      title: "Mejora Continua",
      desc: "Nos comprometemos a la actualización constante de nuestras metodologías y conocimientos técnicos."
    },
    {
      icon: <Users className="w-8 h-8 text-emerald" />,
      title: "Enfoque al Cliente",
      desc: "Priorizamos las necesidades específicas de cada organización para brindar soluciones a medida y de alto impacto."
    }
  ];

  return (
    <div className="pt-32 pb-20 animate-in fade-in duration-700 bg-slate-50 relative overflow-hidden min-h-screen">
      <div className="absolute top-[5%] right-[-20%] opacity-[0.05] pointer-events-none select-none rotate-45">
        <Isotype isWatermark className="w-[800px] h-[800px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <button onClick={onBack} className="flex items-center text-navy font-bold mb-12 group">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3 shadow-sm group-hover:bg-gold group-hover:text-white transition-all border border-slate-200">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="group-hover:text-gold transition-colors">Volver al Inicio</span>
        </button>

        <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 p-8 md:p-16 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
            <div className="lg:w-1/2">
              <span className="text-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Documento Oficial</span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-navy mb-6 leading-tight">
                Políticas de <br /> <span className="text-emerald">Privacidad y Servicio</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Nuestras políticas definen el compromiso inquebrantable de Verantis con la seguridad de su información, la calidad de nuestros procesos y la excelencia en cada interacción.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#" 
                  className="bg-navy hover:bg-navy/90 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center group"
                >
                  <FileCheck className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  Descargar Política en PDF
                </a>
              </div>
            </div>
            
            <div className="lg:w-1/2 w-full">
               <div className="relative bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-inner">
                 <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold/10 rounded-full blur-xl"></div>
                 <h3 className="text-xl font-bold text-navy mb-6 flex items-center">
                   <Target className="w-6 h-6 text-gold mr-3" />
                   Pilares de Nuestras Políticas
                 </h3>
                 
                 <div className="space-y-6">
                   {highlights.map((item, idx) => (
                     <div key={idx} className="flex gap-4">
                       <div className="flex-shrink-0 mt-1">
                         {item.icon}
                       </div>
                       <div>
                         <h4 className="font-bold text-navy text-lg">{item.title}</h4>
                         <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Footer
const Footer = ({ onHomeClick, onViewChange }: { onHomeClick: () => void, onViewChange: (view: 'home' | 'about' | 'reglamento' | 'politicas') => void }) => (
  <footer className="bg-white pt-20 pb-10 border-t border-slate-100 relative overflow-hidden">
    <div className="absolute -bottom-10 -left-10 opacity-[0.15] pointer-events-none select-none">
      <Isotype isWatermark className="w-[400px] h-[400px]" />
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center space-x-4 mb-6 cursor-pointer" onClick={onHomeClick}>
            <div className="relative">
              <Isotype className="w-12 h-12" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-navy">VERANTIS</span>
            </div>
          </div>
          <p className="text-slate-500 mb-6 italic">"Auditoría y Consultoría Limitada: Marcando el rumbo de su éxito."</p>
        </div>

        <div>
          <h4 className="font-bold text-navy mb-6">Servicios</h4>
          <ul className="space-y-4 text-slate-500 text-sm">
            <li><a href={`#${SectionId.SERVICES}`} onClick={onHomeClick} className="hover:text-emerald">Auditoría Financiera</a></li>
            <li><a href={`#${SectionId.AUDITS}`} onClick={onHomeClick} className="hover:text-emerald">Compliance Corporativo</a></li>
            <li><a href={`#${SectionId.SERVICES}`} onClick={onHomeClick} className="hover:text-emerald">Control Interno</a></li>
            <li><a href={`#${SectionId.SERVICES}`} onClick={onHomeClick} className="hover:text-emerald">Optimización Operativa</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-navy mb-6">Verantis</h4>
          <ul className="space-y-4 text-slate-500 text-sm">
            <li><button onClick={onHomeClick} className="hover:text-emerald text-left">Inicio</button></li>
            <li><button onClick={() => onViewChange('reglamento')} className="hover:text-emerald text-left">Reglamento Interno</button></li>
            <li><button onClick={() => onViewChange('politicas')} className="hover:text-emerald text-left">Políticas de Privacidad</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-navy mb-6">Certificaciones</h4>
          <div className="flex space-x-4 opacity-50 grayscale hover:grayscale-0 transition-all">
            <ShieldCheck className="w-10 h-10" />
            <BarChart3 className="w-10 h-10" />
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
        <p>&copy; {new Date().getFullYear()} Verantis Auditoría y Consultoría Limitada. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
);

// App Principal
const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'about' | 'reglamento' | 'politicas'>('home');

  return (
    <div className="min-h-screen bg-white">
      <Navbar onViewChange={setCurrentView} currentView={currentView} />
      
      {currentView === 'home' ? (
        <>
          <Hero onAboutClick={() => setCurrentView('about')} />
          <Services />
          <AuditSection />
          
          <section className="py-24 bg-emerald relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-[0.3] pointer-events-none select-none scale-[3]">
              <Isotype isWatermark className="w-[600px] h-[600px]" />
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Excelencia en cada Informe</h2>
              <p className="text-emerald-100 text-xl max-w-2xl mx-auto mb-10">
                Nuestro objetivo es proveer auditorías de alto valor que transformen sus desafíos en oportunidades de crecimiento real.
              </p>
              <a href={`#${SectionId.CONTACT}`} className="bg-white text-emerald font-bold px-10 py-4 rounded-full hover:bg-gold hover:text-white transition-all shadow-xl">
                Comience hoy su transformación
              </a>
            </div>
          </section>

          <Contact />
        </>
      ) : currentView === 'about' ? (
        <AboutPage onBack={() => setCurrentView('home')} />
      ) : currentView === 'reglamento' ? (
        <ReglamentoPage onBack={() => setCurrentView('home')} />
      ) : (
        <PoliticasPage onBack={() => setCurrentView('home')} />
      )}

      <Footer onHomeClick={() => setCurrentView('home')} onViewChange={setCurrentView} />
    </div>
  );
};

export default App;
