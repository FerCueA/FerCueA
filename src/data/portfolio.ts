export interface Project {
	title: string;
	category: string;
	description: string;
	outcome: string;
	stack: string[];
	status: string;
	liveUrl: string;
	repoUrl: string;
}

export interface Certificate {
	title: string;
	category: 'Frontend' | 'JavaScript' | 'Java y Spring' | 'Bases de datos' | 'Herramientas';
	issuer?: string;
	year?: string;
	href: string;
}

export interface ContactLink {
	label: string;
	value: string;
	href: string;
}

export interface Service {
	title: string;
	description: string;
	icon: 'monitor' | 'server' | 'brand' | 'custom';
	cta: string;
	inquiry: string;
	featured?: boolean;
}

export interface SkillGroup {
	title: string;
	icon: 'code' | 'cloud' | 'database' | 'tool';
	description: string;
	items: string[];
}

export const profile = {
	name: 'Aleixo Fernandez Cuevas',
	role: 'Desarrollador web frontend y full stack',
	intro:
		'Creo webs y aplicaciones que no solo se ven bien: también ayudan a vender mejor, transmitir confianza y convertir visitas en contactos reales.',
};

export const navigationLinks = [
	{ label: 'Proyectos', href: '#proyectos' },
	{ label: 'Servicios', href: '#servicios' },
	{ label: 'Tecnologías', href: '#tecnologias' },
	{ label: 'Certificados', href: '#certificados' },
	{ label: 'Contacto', href: '#contacto' },
];

export const hubSections = [{ id: 'perfil', label: 'Perfil' }, ...navigationLinks.map((link) => ({ id: link.href.replace('#', ''), label: link.label }))];

export const heroStats = [
	{ value: '2', label: 'Proyectos publicados con demo y repositorio' },
	{ value: '4', label: 'Servicios listos para contratar' },
	{ value: '5', label: 'Canales de contacto y presencia profesional' },
];

export const projects: Project[] = [
	{
		title: 'Alvaro Garcia Osteopata',
		category: 'Web corporativa',
		description:
			'Web enfocada en captar clientes con una imagen profesional, estructura clara de servicios y una navegación pensada para facilitar el contacto.',
		outcome: 'Resultado: presencia seria, mejor percepción de marca y contacto directo más visible.',
		stack: ['Astro', 'Tailwind CSS'],
		status: 'Destacado',
		liveUrl: 'https://alvarogarciaosteopata.es/',
		repoUrl: 'https://github.com/FerCueA/AlvaroG',
	},
	{
		title: 'Duit App',
		category: 'Aplicación web',
		description:
			'Aplicación desarrollada con arquitectura MVC para mantener orden en el proyecto, facilitar escalabilidad y ofrecer una base backend robusta.',
		outcome: 'Resultado: estructura técnica sólida, lógica bien separada y despliegue funcional en producción.',
		stack: ['Spring Boot', 'Bootstrap', 'MVC'],
		status: 'Activo',
		liveUrl: 'https://duitapp.koyeb.app/',
		repoUrl: 'https://github.com/FerCueA/Duit',
	},
];

export const services: Service[] = [
	{
		title: 'Página web',
		description: 'Web profesional, responsive y optimizada para tu negocio o marca personal.',
		icon: 'monitor',
		cta: 'Solicitar web',
		inquiry: 'Hola Aleixo, me interesa una página web profesional para mi negocio o marca personal.',
		featured: true,
	},
	{
		title: 'Servidor + gestión',
		description: 'Incluye hosting, dominio y panel de gestión personalizado.',
		icon: 'server',
		cta: 'Ver gestión',
		inquiry: 'Hola Aleixo, quiero información sobre servidor, dominio y panel de gestión para mi proyecto.',
		featured: true,
	},
	{
		title: 'Redes sociales, logotipo y marca',
		description: 'Diseño de logotipo, branding y creación de perfiles sociales profesionales.',
		icon: 'brand',
		cta: 'Impulsar marca',
		inquiry: 'Hola Aleixo, me interesa mejorar mi marca, logotipo y presencia en redes sociales.',
	},
	{
		title: 'Otros / A medida',
		description: 'Soluciones personalizadas, consúltame sin compromiso.',
		icon: 'custom',
		cta: 'Consultar idea',
		inquiry: 'Hola Aleixo, tengo una idea o necesidad personalizada y me gustaría comentarla contigo.',
	},
];

export const skillGroups: SkillGroup[] = [
	{
		title: 'Tecnologías',
		icon: 'code',
		description: 'Herramientas con las que construyo interfaces rápidas, webs bien presentadas y soluciones funcionales para negocio o producto.',
		items: ['HTML', 'CSS', 'JavaScript', 'Astro', 'Tailwind CSS', 'Spring Boot', 'Bootstrap', 'MVC'],
	},
	{
		title: 'Plataformas',
		icon: 'cloud',
		description: 'Servicios que utilizo para organizar tareas, desplegar proyectos y mantener flujos de trabajo más sólidos.',
		items: ['Trello', 'Figma', 'Netlify', 'Supabase', 'Koyeb', 'Neon', 'GitHub'],
	},
	{
		title: 'Bases de datos',
		icon: 'database',
		description: 'Motores de base de datos con los que estructuro, consulto y mantengo información de forma ordenada.',
		items: ['MySQL', 'PostgreSQL'],
	},
	{
		title: 'Software',
		icon: 'tool',
		description: 'Software técnico que uso para programar, gestionar datos y trabajar mejor el desarrollo del día a día.',
		items: ['Visual Studio Code', 'DBeaver', 'Pentaho'],
	},
];

export const certificates: Certificate[] = [
	{
		title: 'Curso de Spring Boot y Spring MVC 5',
		category: 'Java y Spring',
		issuer: 'PDF de certificado',
		href: '/certificados/certificado_curso_de_spring_boot_y_spring_mvc_5__creando_una_aplicación_con_spring_boot_y_spring_mvc.pdf',
	},
	{
		title: 'Introducción a la administración de BBDD con MySQL',
		category: 'Bases de datos',
		issuer: 'PDF de certificado',
		href: '/certificados/certificado_introducción_a_la_administración_de_bbdd_con_mysql.pdf',
	},
	{
		title: 'Onboarding de becas OpenWebinars',
		category: 'Herramientas',
		issuer: 'PDF de certificado',
		href: '/certificados/certificado_onboarding_de_becas_openwebinars.pdf',
	},
	{
		title: 'Fundamentos de JavaScript',
		category: 'JavaScript',
		issuer: 'PDF de certificado',
		href: '/certificados/certificado_fundamentos_de_javascript.pdf',
	},
	{
		title: 'Introducción a Docker',
		category: 'Herramientas',
		issuer: 'PDF de certificado',
		href: '/certificados/certificado_introducción_a_docker.pdf',
	},
	{
		title: 'Manipulación del DOM desde JavaScript',
		category: 'JavaScript',
		issuer: 'PDF de certificado',
		href: '/certificados/certificado_curso_de_manipulación_del_dom_desde_javascript.pdf',
	},
	{
		title: 'Especialización en JavaScript: asincronía, prototipos y clases',
		category: 'JavaScript',
		issuer: 'PDF de certificado',
		href: '/certificados/certificado_especialización_en_javascript__asincronía_prototipos_y_clases.pdf',
	},
	{
		title: 'Transformaciones, transiciones y animaciones con CSS3',
		category: 'Frontend',
		issuer: 'PDF de certificado',
		href: '/certificados/certificado_transformaciones_transiciones_y_animaciones_con_css3.pdf',
	},
	{
		title: 'Curso de maquetación web con CSS',
		category: 'Frontend',
		issuer: 'PDF de certificado',
		href: '/certificados/certificado_curso_de_maquetación_web_con_css.pdf',
	},
	{
		title: 'Curso de Figma',
		category: 'Herramientas',
		issuer: 'PDF de certificado',
		href: '/certificados/certificado_curso_de_figma.pdf',
	},
	{
		title: 'Curso de Git',
		category: 'Herramientas',
		issuer: 'PDF de certificado',
		href: '/certificados/certificado_curso_de_git.pdf',
	},
	{
		title: 'Java desde 0: introducción',
		category: 'Java y Spring',
		issuer: 'PDF de certificado',
		href: '/certificados/certificado_java_desde_0__introducción.pdf',
	},
	{
		title: 'Programación asíncrona con Promises en JavaScript',
		category: 'JavaScript',
		issuer: 'PDF de certificado',
		href: '/certificados/certificado_programación_asíncrona_con_promises_en_javascript.pdf',
	},
	{
		title: 'Curso de SQL desde cero',
		category: 'Bases de datos',
		issuer: 'PDF de certificado',
		href: '/certificados/certificado_curso_de_sql_desde_cero.pdf',
	},
	{
		title: 'Java desde 0: orientación a objetos',
		category: 'Java y Spring',
		issuer: 'PDF de certificado',
		href: '/certificados/certificado_java_desde_0__orientación_a_objetos.pdf',
	},
	{
		title: 'Patrones de diseño con JavaScript',
		category: 'JavaScript',
		issuer: 'PDF de certificado',
		href: '/certificados/certificado_curso_de_patrones_de_diseño_con_javascript.pdf',
	},
	{
		title: 'Introducción a Spring Framework',
		category: 'Java y Spring',
		issuer: 'PDF de certificado',
		href: '/certificados/certificado_introducción_a_spring_framework.pdf',
	},
	{
		title: 'Responsive Web Design',
		category: 'Frontend',
		issuer: 'PDF de certificado',
		href: '/certificados/certificado_curso_de_responsive_web_design.pdf',
	},
	{
		title: 'Flexbox y CSS Grid',
		category: 'Frontend',
		issuer: 'PDF de certificado',
		href: '/certificados/certificado_curso_de_flexbox_y_css_grid.pdf',
	},
	{
		title: 'Gestión de documentación técnica con GitHub y Markdown',
		category: 'Herramientas',
		issuer: 'PDF de certificado',
		href: '/certificados/certificado_gestión_de_documentación_técnica_con_github_y_markdown.pdf',
	},
	{
		title: 'Dominando Bootstrap 5',
		category: 'Frontend',
		issuer: 'PDF de certificado',
		href: '/certificados/certificado_dominando_bootstrap_5__desarrollo_de_sitios_web_responsive.pdf',
	},
	{
		title: 'HTML5 y CSS3',
		category: 'Frontend',
		issuer: 'PDF de certificado',
		href: '/certificados/certificado_curso_de_html5_y_css3.pdf',
	},
];

export const contactLinks: ContactLink[] = [
	{
		label: 'Correo',
		value: 'fercuea90@protonmail.com',
		href: 'mailto:fercuea90@protonmail.com',
	},
	{
		label: 'LinkedIn',
		value: 'linkedin.com/in/aleixo-fernandez-cuevas-395a52367',
		href: 'https://www.linkedin.com/in/aleixo-fernandez-cuevas-395a52367/',
	},
	{
		label: 'GitHub',
		value: 'github.com/FerCueA',
		href: 'https://github.com/FerCueA',
	},
	{
		label: 'WhatsApp',
		value: '+34 628 23 07 16',
		href: 'https://wa.me/34628230716',
	},
	{
		label: 'Instagram',
		value: 'instagram.com/aleixofdezcuevas',
		href: 'https://www.instagram.com/aleixofdezcuevas/',
	},
];