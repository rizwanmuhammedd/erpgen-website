export interface ServiceCapability {
  name: string;
  description: string;
}

export interface ServiceBenefit {
  title: string;
  description: string;
}

export interface ServiceProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface ServiceSpec {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  category: string;
  eyebrow: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  capabilities: ServiceCapability[];
  benefits: ServiceBenefit[];
  process: ServiceProcessStep[];
  technologies: string[];
  useCases: string[];
  relatedServices: string[];
  seoTitle: string;
  seoDescription: string;
}

export const ERPGEN_SERVICES: ServiceSpec[] = [
  {
    id: 'ai-software-development',
    slug: 'ai-software-development',
    title: 'AI Software Development',
    shortTitle: 'AI Development',
    subtitle: 'Intelligent Automation & Predictive Analytics',
    category: 'Software & Intelligence',
    eyebrow: 'ERPGEN TECHNOLOGY SERVICE',
    shortDescription: 'Next-generation artificial intelligence applications designed to automate operations and drive enterprise growth.',
    fullDescription: 'Custom artificial intelligence solutions tailored to automate enterprise workflows, optimize operations, and leverage predictive machine learning models.',
    iconName: 'BrainCircuit',
    capabilities: [
      { name: 'Machine Learning Models', description: 'Custom trained models for business intelligence, pattern recognition, and decision automation.' },
      { name: 'Predictive Analytics', description: 'Data-driven forecasting tools to optimize inventory, customer demand, and operational planning.' },
      { name: 'Intelligent Automation', description: 'Robotic process automation to reduce manual data entry, processing bottlenecks, and operational errors.' },
    ],
    benefits: [
      { title: 'Operational Efficiency', description: 'Automate repetitive workflows and data processing to increase output speed.' },
      { title: 'Data-Driven Insights', description: 'Transform raw enterprise data into actionable predictive insights.' },
      { title: 'Scalable Automation', description: 'Deploy intelligent models that grow seamlessly alongside enterprise volume.' },
    ],
    process: [
      { step: '01', title: 'Data & Workflow Assessment', description: 'Analyze business workflows and identify high-impact automation opportunities.' },
      { step: '02', title: 'Model Architecture Design', description: 'Design custom machine learning architectures and data pipeline integrations.' },
      { step: '03', title: 'Development & Training', description: 'Train and validate predictive models using enterprise data sets.' },
      { step: '04', title: 'Deployment & Monitoring', description: 'Integrate AI models into production environments with continuous accuracy tracking.' },
    ],
    technologies: ['Machine Learning', 'Predictive Modeling', 'Process Automation', 'Python & PyTorch', 'Cloud AI Pipelines'],
    useCases: [
      'Inventory & Stock Demand Forecasting',
      'Automated Document & Invoice Data Processing',
      'Customer Behavior & Sales Analytics',
    ],
    relatedServices: ['web-app-development', 'managed-it-support'],
    seoTitle: 'AI Software Development | ERPGen Enterprise Solutions',
    seoDescription: 'Next-generation AI software development by ERPGen. Machine learning models, predictive analytics, and intelligent automation for enterprise growth.',
  },
  {
    id: 'web-app-development',
    slug: 'web-app-development',
    title: 'Web & App Development',
    shortTitle: 'Web & App Dev',
    subtitle: 'High-Performance & Scalable Digital Systems',
    category: 'Software Engineering',
    eyebrow: 'ERPGEN TECHNOLOGY SERVICE',
    shortDescription: 'High-performance, responsive websites and scalable applications built with modern architectures.',
    fullDescription: 'Enterprise-grade web applications and progressive mobile platforms engineered for speed, security, and exceptional user experiences.',
    iconName: 'Globe',
    capabilities: [
      { name: 'Progressive Web Apps', description: 'Offline-capable, mobile-responsive web applications optimized for cross-platform performance.' },
      { name: 'High-Performance SPAs', description: 'Lightning-fast single-page React and modern frontend systems built for complex user interfaces.' },
      { name: 'Secure Backend Systems', description: 'Robust, cloud-native API backends with encrypted data pipelines and multi-tenant architectures.' },
    ],
    benefits: [
      { title: 'Sub-Second Load Times', description: 'Engineered for speed to maximize user conversion and operational workflow speed.' },
      { title: 'Cross-Device Responsiveness', description: 'Flawless presentation across desktop, tablet, and mobile displays.' },
      { title: 'Enterprise Security', description: 'Hardened backend APIs and secure database pipelines protecting enterprise data.' },
    ],
    process: [
      { step: '01', title: 'Requirements & Architecture', description: 'Define core functional specs, UX wireframes, and backend database schemas.' },
      { step: '02', title: 'Agile Frontend & API Sprints', description: 'Develop modular component libraries and RESTful/GraphQL web APIs.' },
      { step: '03', title: 'Security & Quality Testing', description: 'Rigorous end-to-end testing, vulnerability scans, and performance audits.' },
      { step: '04', title: 'Cloud Deployment', description: 'Automated CI/CD deployment to secure cloud hosting infrastructure.' },
    ],
    technologies: ['React 19 & TypeScript', 'Node.js & Python APIs', 'Tailwind CSS', 'Cloud Infrastructure', 'Progressive Web Apps'],
    useCases: [
      'Custom B2B SaaS Platforms & Customer Portals',
      'High-Speed Internal Enterprise Management Tools',
      'Mobile-First Responsive Web Applications',
    ],
    relatedServices: ['ai-software-development', 'cybersecurity'],
    seoTitle: 'Web & App Development | ERPGen Technology Solutions',
    seoDescription: 'Enterprise web and app development services by ERPGen. High-performance SPAs, PWAs, and secure cloud API backends.',
  },
  {
    id: 'ip-telephony-voip',
    slug: 'ip-telephony-voip',
    title: 'IP Telephony & VoIP',
    shortTitle: 'IP Telephony',
    subtitle: 'Corporate Telecommunications & Voice Networks',
    category: 'Telecommunications',
    eyebrow: 'ERPGEN TECHNOLOGY SERVICE',
    shortDescription: 'Crystal clear, reliable, and corporate-level VoIP and IP telephony infrastructure deployment.',
    fullDescription: 'Unified voice communications and cloud PBX infrastructure connecting office branches, call centers, and remote teams securely.',
    iconName: 'PhoneCall',
    capabilities: [
      { name: 'Global Branch Integration', description: 'Seamless voice routing and extension dialing between multi-location corporate offices.' },
      { name: 'Encrypted Voice Traffic', description: 'End-to-end security protocols (TLS/SRTP) protecting corporate telephone conversations.' },
      { name: 'PBX System Upgrades', description: 'Modern cloud PBX migration replacing legacy hardware with scalable IP infrastructure.' },
    ],
    benefits: [
      { title: 'Reduced Telecom Costs', description: 'Dramatically lower inter-office and international calling expenses via IP routing.' },
      { title: 'Crystal-Clear Audio Quality', description: 'High-definition voice codecs ensuring professional corporate telecommunications.' },
      { title: 'Centralized Administration', description: 'Manage extensions, call forwarding, and IVR routing from a unified admin portal.' },
    ],
    process: [
      { step: '01', title: 'Telecom Audit', description: 'Evaluate existing voice lines, bandwidth capacity, and branch requirements.' },
      { step: '02', title: 'Network QoS Configuration', description: 'Configure router Quality-of-Service to prioritize voice traffic without lag.' },
      { step: '03', title: 'Cloud PBX Setup', description: 'Deploy extensions, automated attendants, call queues, and voicemail-to-email.' },
      { step: '04', title: 'Hardware & Softphone Launch', description: 'Deploy IP desk phones and mobile softphones across enterprise staff.' },
    ],
    technologies: ['Cloud PBX', 'SIP Trunking', 'SRTP Encryption', 'IVR Call Routing', 'VoIP Gateways'],
    useCases: [
      'Multi-Branch Corporate Voice Networks',
      'Remote & Hybrid Team Extension Mobility',
      'Call Center Queue & Interactive Voice Response',
    ],
    relatedServices: ['managed-it-support', 'cybersecurity'],
    seoTitle: 'IP Telephony & VoIP Services | ERPGen Telecommunications',
    seoDescription: 'Corporate IP Telephony and VoIP solutions by ERPGen. Cloud PBX, branch voice integration, and encrypted voice infrastructure.',
  },
  {
    id: 'cybersecurity',
    slug: 'cybersecurity',
    title: 'Cybersecurity Services',
    shortTitle: 'Cybersecurity',
    subtitle: 'Threat Defense & Infrastructure Hardening',
    category: 'Security & Compliance',
    eyebrow: 'ERPGEN TECHNOLOGY SERVICE',
    shortDescription: 'Industry-best security practices protecting networks from digital threats and vulnerabilities.',
    fullDescription: 'Comprehensive cybersecurity assessments, threat monitoring, and network hardening protecting critical business data.',
    iconName: 'ShieldCheck',
    capabilities: [
      { name: 'Threat Assessment & Mitigation', description: 'Continuous vulnerability scanning, penetration testing, and proactive risk remediation.' },
      { name: 'Network Perimeter Security', description: 'Next-gen firewalls, zero-trust access control, and encrypted network VPN tunnels.' },
      { name: '24/7 Security Operations Center', description: 'Real-time security incident monitoring, threat detection, and emergency response.' },
    ],
    benefits: [
      { title: 'Zero Data Compromise', description: 'Proactive defense mechanisms mitigating ransomware, phishing, and intrusion attempts.' },
      { title: 'Regulatory Compliance', description: 'Align IT infrastructure with international data security and privacy standards.' },
      { title: 'Continuous Incident Readiness', description: '24/7 active threat monitoring ensuring immediate incident response.' },
    ],
    process: [
      { step: '01', title: 'Vulnerability Audit', description: 'Perform deep network scanning and penetration tests to isolate security gaps.' },
      { step: '02', title: 'Security Architecture Hardening', description: 'Implement firewalls, multi-factor authentication, and zero-trust policies.' },
      { step: '03', title: 'Data Encryption Setup', description: 'Enforce end-to-end encryption for data-at-rest and data-in-transit.' },
      { step: '04', title: '24/7 SOC Monitoring', description: 'Connect network logs to ERPGen Security Operations Center for continuous protection.' },
    ],
    technologies: ['Next-Gen Firewalls', 'Zero-Trust Architecture', 'SIEM Log Monitoring', 'TLS Encryption', '24/7 SOC'],
    useCases: [
      'Enterprise Network Threat Defense & Firewall Management',
      'Secure Remote Access Tunnels & VPN Infrastructure',
      'Data Loss Prevention & Ransomware Mitigation',
    ],
    relatedServices: ['enterprise-email', 'managed-it-support'],
    seoTitle: 'Cybersecurity Services | ERPGen Threat Protection',
    seoDescription: 'Enterprise cybersecurity services by ERPGen. Threat mitigation, network perimeter security, and 24/7 SOC monitoring.',
  },
  {
    id: 'enterprise-email',
    slug: 'enterprise-email',
    title: 'Enterprise Email Hosting',
    shortTitle: 'Enterprise Email',
    subtitle: 'Branded Corporate Email & Active Management',
    category: 'Communication & Cloud',
    eyebrow: 'ERPGEN TECHNOLOGY SERVICE',
    shortDescription: 'Secure, branded corporate email hosting and active management for seamless communication.',
    fullDescription: 'High-uptime corporate email hosting featuring domain branding, anti-spam filters, and secure cloud storage.',
    iconName: 'Mail',
    capabilities: [
      { name: 'Advanced Threat Protection', description: 'AI-driven anti-phishing, spam filtering, and automated malware prevention.' },
      { name: 'Secure File Attachments', description: 'Encrypted attachment transmission and seamless cloud backup integration.' },
      { name: 'High Uptime Guarantee', description: '99.9% availability SLAs for mission-critical corporate communications.' },
    ],
    benefits: [
      { title: 'Corporate Brand Authority', description: 'Professional custom domain email addresses for all enterprise team members.' },
      { title: 'Phishing & Spam Protection', description: 'Filter malicious attachments and spam before reaching user inboxes.' },
      { title: 'Cross-Device Sync', description: 'Seamless email, calendar, and contacts synchronization across desktop and mobile.' },
    ],
    process: [
      { step: '01', title: 'Domain & DNS Setup', description: 'Configure DKIM, SPF, and DMARC DNS security records for domain authenticity.' },
      { step: '02', title: 'Mailbox Migration', description: 'Migrate existing enterprise mailboxes without email downtime or data loss.' },
      { step: '03', title: 'Anti-Spam Filter Configuration', description: 'Enable advanced threat protection and automated attachment scanning.' },
      { step: '04', title: 'Mobile & Client Setup', description: 'Provision secure IMAP/Exchange profiles across executive and staff devices.' },
    ],
    technologies: ['DKIM & SPF Authentication', 'DMARC Enforcement', 'Anti-Phishing Filters', 'Cloud Storage Sync', '99.9% SLA'],
    useCases: [
      'Branded Corporate Email Hosting for Multi-Department Teams',
      'Secure Executive Communication & Encrypted Attachments',
      'Zero-Downtime Email Migration from Legacy Servers',
    ],
    relatedServices: ['cybersecurity', 'managed-it-support'],
    seoTitle: 'Enterprise Email Hosting | ERPGen Corporate Email',
    seoDescription: 'Branded corporate email hosting services by ERPGen. Advanced threat protection, DMARC security, and 99.9% uptime guarantee.',
  },
  {
    id: 'managed-it-support',
    slug: 'managed-it-support',
    title: 'Managed IT Support',
    shortTitle: 'Managed IT Support',
    subtitle: 'Strategic Infrastructure & Cloud Consulting',
    category: 'Infrastructure & Support',
    eyebrow: 'ERPGEN TECHNOLOGY SERVICE',
    shortDescription: 'Comprehensive managed IT support, cloud computing, and strategic consulting services.',
    fullDescription: 'Proactive managed IT administration, continuous network monitoring, cloud infrastructure migration, and helpdesk support.',
    iconName: 'Server',
    capabilities: [
      { name: '24/7 Dedicated Helpdesk', description: 'Round-the-clock technical assistance for business hardware, software, and network issues.' },
      { name: 'Remote Monitoring & Management', description: 'Automated system health tracking, security patch management, and preventive maintenance.' },
      { name: 'Cloud Migration Services', description: 'Seamless cloud infrastructure transition for on-premise databases and applications.' },
    ],
    benefits: [
      { title: 'Zero IT Downtime', description: 'Proactive remote monitoring isolates network bottlenecks before service disruption occurs.' },
      { title: 'Predictable IT Management', description: 'Consolidate tech operations under unified managed IT support agreements.' },
      { title: 'Strategic IT Consulting', description: 'Expert guidance on software upgrades, hardware procurement, and cloud expansion.' },
    ],
    process: [
      { step: '01', title: 'Infrastructure Discovery', description: 'Comprehensive audit of servers, workstations, network hardware, and software.' },
      { step: '02', title: 'Monitoring Agent Deployment', description: 'Install automated health monitoring and security patch management agents.' },
      { step: '03', title: 'Helpdesk Onboarding', description: 'Establish 24/7 helpdesk ticketing, phone support, and remote access channels.' },
      { step: '04', title: 'Continuous Review', description: 'Quarterly technology roadmap evaluations and performance optimization.' },
    ],
    technologies: ['RMM Automated Monitoring', '24/7 Helpdesk Ticketing', 'Cloud Server Migration', 'Network Administration', 'Patch Management'],
    useCases: [
      'Complete Managed IT Outsource for Growing Enterprises',
      'On-Premise to Cloud Server Infrastructure Migration',
      '24/7 Emergency Technical Support & Helpdesk Desk Routing',
    ],
    relatedServices: ['cybersecurity', 'ip-telephony-voip'],
    seoTitle: 'Managed IT Support Services | ERPGen Cloud & IT Consulting',
    seoDescription: 'Comprehensive managed IT support and cloud migration by ERPGen. 24/7 dedicated helpdesk, remote monitoring, and server administration.',
  },
];


