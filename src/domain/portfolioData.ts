import type { PortfolioItem, ServiceDetail } from './types';

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'residencia-montana',
    title: 'Residencia Moderna La Montaña',
    category: 'fachadas',
    description: 'Diseño arquitectónico contemporáneo de 3 niveles con volumetría volada, iluminación LED integrada y acabados en piedra natural y madera tratada.',
    location: 'San Pedro / Monterrey, N.L.',
    m2: 380,
    year: '2024',
    mainImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    features: ['Fachada de doble altura', 'Iluminación cálida oculta', 'Volúmenes volados', 'Cochera triple'],
    is3dRender: false
  },
  {
    id: 'render-terrazas-alberca',
    title: 'Proyecto Render 3D: Terraza & Alberca Infinity',
    category: 'renders',
    description: 'Visualización fotorrealista 3D para complejo de entretenimiento exterior con alberca con caída de agua, asador de ladrillo refractario y pérgola.',
    location: 'Santiago, N.L.',
    m2: 210,
    year: '2024',
    mainImage: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    features: ['Recorrido 3D interactivo', 'Texturizado fotorrealista', 'Simulación lumínica de atardecer', 'Cascada ornamental'],
    is3dRender: true
  },
  {
    id: 'loft-interior-billar',
    title: 'Interiorismo & Game Room Luxury',
    category: 'interiores',
    description: 'Rediseño de área social interior con mezanina, ventanales de piso a techo, área de billar, cantina moderna y acabados en tono nogal y cuarzo negro.',
    location: 'Cumbres, N.L.',
    m2: 160,
    year: '2023',
    mainImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80'
    ],
    features: ['Estructura de acero vista', 'Ventanales térmicos duovent', 'Mobiliario custom', 'Bar y mezanina'],
    is3dRender: false
  },
  {
    id: 'palapa-asador-exterior',
    title: 'Palapa Social con Asador Tradicional & Alberca',
    category: 'albercas',
    description: 'Espacio exterior para convivios familiares integrando alberca con veneciano, jardinera perimetral y área de asador de campana abierta.',
    location: 'Apodaca, N.L.',
    m2: 180,
    year: '2024',
    mainImage: 'https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    ],
    features: ['Alberca con deck sintético', 'Asador integrado de ladrillo', 'Iluminación subacuática LED', 'Asoleadero elevado'],
    is3dRender: false
  },
  {
    id: 'cocina-minimalista-negra',
    title: 'Cocina Abierta Minimalista & Barra Desayunadora',
    category: 'interiores',
    description: 'Cocina integral de concepto abierto con gabinetes empotrados de melamina tacto madera y granito negro San Gabriel.',
    location: 'Guadalupe, N.L.',
    m2: 45,
    year: '2023',
    mainImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1200&q=80'
    ],
    features: ['Herrajes Cierre Lento Soft-Close', 'Barra isla de 3.20m', 'Pared en mármol con TV', 'Cava de vinos empotrada'],
    is3dRender: false
  },
  {
    id: 'obra-levantamiento-terreno',
    title: 'Desarrollo de Obra & Levantamiento en Terreno',
    category: 'terrenos',
    description: 'Levantamiento topográfico, nivelación de terreno y cimentación de Block Térmico para residencia unifamiliar.',
    location: 'Carretera Nacional, N.L.',
    m2: 500,
    year: '2024',
    mainImage: './media/obra_terreno_construccion.jpg',
    galleryImages: [
      './media/obra_terreno_construccion.jpg',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80'
    ],
    features: ['Muro de contención de piedra', 'Cimentación aislada reforzada', 'Estudio de mecánica de suelos', 'Dirección técnica de obra'],
    is3dRender: false
  }
];

export const SERVICES_LIST: ServiceDetail[] = [
  {
    id: 'diseno_arquitectonico',
    title: 'Diseño Arquitectónico',
    shortDesc: 'Conceptualización de espacios a medida, adaptando tus necesidades e idea al mejor diseño funcional y estético.',
    fullDesc: 'Desarrollamos el diseño integral de tu espacio (residencial, comercial o remodelación). Creamos distribuciones eficientes, aprovechando la iluminación natural, ventilación y orientación de tu terreno.',
    iconName: 'PenTool',
    deliverables: [
      'Planos de distribución arquitectónica',
      'Planos de fachadas y cortes longitudinales',
      'Propuestas de acabados y materiales',
      'Modelado inicial de espacio'
    ]
  },
  {
    id: 'proyecto_ejecutivo',
    title: 'Proyecto Ejecutivo Completo',
    shortDesc: 'Documentación técnica detallada y planos ingenieriles listos para construir sin contratiempos.',
    fullDesc: 'Todo el paquete de planos constructivos necesarios para que la obra se ejecute con precisión quirúrgica, optimizando costos de material y garantizando la seguridad estructural.',
    iconName: 'Compass',
    deliverables: [
      'Planos estructurales y de cimentación',
      'Instalaciones eléctricas, hidráulicas y sanitarias (Plomería/Luz)',
      'Catálogo de conceptos y cuantificación de materiales',
      'Detalles constructivos y especificaciones'
    ]
  },
  {
    id: 'visualizacion_3d',
    title: 'Visualización 3D & Renders HD',
    shortDesc: 'Visualiza tu proyecto antes de construir con imágenes fotorrealistas y recorridos virtuales 3D.',
    fullDesc: 'Elimina cualquier incertidumbre visualizando cada rincón de tu futuro hogar con tecnología de renderizado 3D de alta definición, iluminación diurna/nocturna y texturas reales.',
    iconName: 'Box',
    deliverables: [
      'Renders fotorrealistas de fachadas e interiores',
      'Recorridos en video HD de 360°',
      'Paleta de colores y acabados virtuales',
      'Vistas de día, noche y atardecer'
    ]
  },
  {
    id: 'remodelacion',
    title: 'Remodelaciones & Ampliaciones',
    shortDesc: 'Transformamos espacios existentes, modernizando fachadas, terrazas, cocinas y segundos niveles.',
    fullDesc: 'Le damos nueva vida a tu propiedad. Evaluamos la estructura existente para integrar áreas modernas como terrazas con asador, albercas, ampliaciones de recámaras o modernización total de fachada.',
    iconName: 'Home',
    deliverables: [
      'Levantamiento del estado actual',
      'Propuesta de redistribución y demoliciones',
      'Render 3D Antes vs Después',
      'Presupuesto de ejecución por etapas'
    ]
  },
  {
    id: 'direccion_obra',
    title: 'Dirección & Supervisión de Obra',
    shortDesc: 'Control de calidad, tiempos y presupuesto durante todo el proceso de construcción.',
    fullDesc: 'Nos aseguramos de que lo plasmado en los planos se ejecute fielmente en el campo. Supervisamos cuadrillas de albañilería, acabados e instalaciones.',
    iconName: 'HardHat',
    deliverables: [
      'Supervisión presencial periódica',
      'Reportes de avance de obra con fotografía',
      'Control de estimaciones y compras',
      'Entrega de obra llave en mano'
    ]
  }
];
