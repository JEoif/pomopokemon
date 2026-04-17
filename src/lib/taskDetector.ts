import type { CategoryId } from '../types';

// Keyword pools for detecting task category from free text (FR + EN)
const KEYWORD_MAP: Record<CategoryId, string[]> = {
  sport: [
    // FR
    'sport', 'muscu', 'musculation', 'gym', 'salle', 'entrainement', 'entraine',
    'cardio', 'course', 'courir', 'run', 'velo', 'vélo', 'nager', 'natation',
    'yoga', 'etirement', 'stretch', 'abdos', 'pompes', 'squats', 'training',
    'hiit', 'boxe', 'foot', 'football', 'basket', 'tennis', 'martial', 'karate',
    'judo', 'escalade', 'rando', 'randonnee', 'marche', 'fitness', 'crossfit',
    'gainage', 'méditation', 'meditation', 'santé', 'sante', 'docteur', 'médecin',
    'medecin', 'kiné', 'kine', 'diététique', 'dietetique', 'nutrition', 'regime',
    'sommeil', 'dormir', 'relaxation', 'detente', 'bien-etre', 'bienetre',
    'planche', 'tractions', 'haltere', 'poids', 'endurance', 'souplesse',
    'rugby', 'volley', 'handball', 'ping-pong', 'badminton', 'surf', 'ski',
    'danse', 'danser', 'pilates', 'tai chi',
    // EN
    'workout', 'exercise', 'gym', 'running', 'cycling', 'swimming',
    'training', 'fitness', 'lifting', 'sports', 'stretching', 'health',
    'meditation', 'wellness', 'nutrition', 'diet',
  ],
  admin: [
    // FR
    'admin', 'administratif', 'facture', 'impot', 'impôt', 'taxe', 'banque',
    'assurance', 'mutuelle', 'paperasse', 'dossier', 'formulaire', 'courrier',
    'lettre recommandée', 'recommande', 'comptabilité', 'comptabilite', 'compta',
    'budget', 'devis', 'contrat', 'bail', 'loyer', 'proprio', 'caf', 'cpam',
    'secu', 'securite sociale', 'pole emploi', 'france travail', 'urssaf',
    'rib', 'virement', 'prelevement', 'relance', 'declaration', 'cerfa',
    'planning', 'agenda', 'rendez-vous', 'rdv', 'reunion', 'réunion',
    'organiser', 'tri', 'trier', 'classer', 'archiver', 'scanner',
    'mail', 'email', 'repondre', 'répondre', 'appel', 'telephone', 'téléphone',
    'candidature', 'cv', 'lettre de motivation', 'entretien', 'embauche',
    'code', 'coder', 'dev', 'développ', 'developp', 'program', 'debug',
    'frontend', 'backend', 'api', 'base de données', 'bdd', 'script',
    'deploy', 'css', 'html', 'javascript', 'typescript', 'python', 'react',
    'node', 'docker', 'git', 'commit', 'merge', 'pull request', 'sprint',
    'ticket', 'jira', 'feature', 'test', 'refacto', 'software',
    'étudi', 'etudi', 'révis', 'revis', 'cours', 'exam', 'apprendre',
    'formation', 'maths', 'physique', 'chimie', 'histoire', 'philo',
    'économie', 'droit', 'université', 'fac', 'master', 'thèse', 'these',
    'mémoire', 'partiel', 'devoir', 'homework', 'lecon', 'chapitre',
    'recherche', 'research', 'study', 'studying', 'learn', 'learning',
    // EN
    'admin', 'invoice', 'tax', 'bank', 'insurance', 'budget', 'contract',
    'meeting', 'appointment', 'schedule', 'organize', 'planning', 'email',
    'paperwork', 'filing', 'accounting', 'office', 'job', 'application',
    'interview', 'coding', 'programming', 'database', 'server',
  ],
  writing: [
    // FR
    'écrire', 'ecrire', 'écriture', 'ecriture', 'rédac', 'redac',
    'rédiger', 'rediger', 'article', 'blog', 'post', 'newsletter',
    'roman', 'nouvelle', 'poème', 'poeme', 'scénario', 'scenario',
    'contenu', 'copywriting', 'texte', 'rapport', 'compte rendu',
    'note', 'documentation', 'doc', 'dissertation', 'essai', 'journal intime',
    'carnet', 'chronique', 'critique', 'résumé', 'resume', 'synthèse',
    'synthese', 'traduction', 'traduire', 'sous-titre', 'sous-titrage',
    'relecture', 'correction', 'orthographe', 'grammaire', 'style',
    'plume', 'chapitre', 'manuscrit', 'brouillon', 'ébauche',
    'lire', 'lecture', 'livre', 'bouquin', 'manga', 'bd', 'bande dessinée',
    'ebook', 'audiobook', 'podcast',
    // EN
    'write', 'writing', 'draft', 'essay', 'blog', 'article', 'story',
    'novel', 'script', 'content', 'copy', 'report', 'paper', 'translate',
    'translation', 'proofread', 'edit', 'manuscript', 'read', 'reading', 'book',
  ],
  creative: [
    // FR
    'design', 'designer', 'maquette', 'mockup', 'wireframe', 'proto',
    'figma', 'sketch', 'illustr', 'logo', 'charte', 'graphi',
    'visuel', 'affiche', 'poster', 'bannière', 'banniere', 'icone',
    'icône', 'ui', 'ux', 'interface', 'palette', 'typo', 'typographie',
    'mise en page', 'layout', 'photo', 'retouche', 'photoshop',
    'canva', 'créatif', 'creatif', 'artistique', 'dessin', 'dessiner',
    'peindre', 'peinture', 'animation', 'motion', '3d', 'modéli',
    'video', 'vidéo', 'montage', 'musique', 'composer', 'composition',
    'guitare', 'piano', 'batterie', 'chanter', 'chanson', 'son', 'mix',
    'mixage', 'mastering', 'beat', 'prod', 'production', 'clip',
    'cinema', 'cinéma', 'film', 'court-métrage', 'court metrage',
    'theatre', 'théâtre', 'impro', 'improvisation', 'sculpture',
    'poterie', 'couture', 'tricot', 'crochet', 'broderie', 'diy',
    'bricolage creatif', 'scrapbooking', 'aquarelle', 'acrylique',
    'huile', 'pastel', 'fusain', 'encre', 'calligraphie',
    // EN
    'design', 'illustration', 'graphic', 'branding', 'visual',
    'artwork', 'drawing', 'painting', 'animation', 'editing',
    'music', 'compose', 'guitar', 'piano', 'sing', 'song', 'film',
    'creative', 'art', 'craft', 'photography',
  ],
  housework: [
    // FR
    'ménage', 'menage', 'nettoy', 'nettoyer', 'aspirateur', 'aspirer',
    'balai', 'balayer', 'serpillère', 'serpillere', 'laver', 'vaisselle',
    'cuisine', 'cuisiner', 'repas', 'diner', 'dîner', 'dejeuner', 'déjeuner',
    'gouter', 'goûter', 'recette', 'courses', 'supermarché', 'supermarche',
    'magasin', 'commission', 'lessive', 'linge', 'repassage', 'repasser',
    'plier', 'ranger', 'rangement', 'tri', 'trier', 'poubelle', 'déchet',
    'recycler', 'recyclage', 'jardin', 'jardiner', 'plante', 'arroser',
    'tondre', 'pelouse', 'bricolage', 'bricoler', 'réparer', 'reparer',
    'monter', 'assembler', 'ikea', 'meuble', 'peindre mur', 'travaux',
    'déménager', 'demenager', 'carton', 'emballer', 'vitres', 'fenêtre',
    'fenetre', 'poussière', 'poussiere', 'dépoussiérer', 'lit', 'draps',
    'salle de bain', 'toilettes', 'wc', 'four', 'frigo', 'congélateur',
    'animal', 'chien', 'chat', 'promenade', 'litière', 'litiere',
    // EN
    'cleaning', 'clean', 'vacuum', 'mop', 'dishes', 'laundry', 'cooking',
    'cook', 'grocery', 'groceries', 'garden', 'gardening', 'repair',
    'organize', 'declutter', 'tidy', 'housework', 'chores',
  ],
  craft: [
    // FR
    'artisanat', 'artisan', 'menuisier', 'menuiserie', 'charpente', 'maçon', 'maconnerie',
    'plombier', 'plomberie', 'electricien', 'electricite', 'peintre en batiment',
    'carrelage', 'carreleur', 'couvreur', 'toiture', 'serrurerie', 'serrurier',
    'soudure', 'souder', 'forgeron', 'forge', 'ceramique', 'poterie',
    'couture', 'coudre', 'tricot', 'tricoter', 'crochet', 'broderie',
    'bijouterie', 'bijou', 'joaillerie', 'orfèvrerie', 'orfevrerie',
    'sculpture', 'graver', 'gravure', 'lutherie', 'luthier',
    'reliure', 'relier', 'tapisserie', 'tapissier', 'vannerie', 'osier',
    'bois', 'boiserie', 'ébénisterie', 'ebenisterie', 'ébéniste', 'ebeniste',
    'tourneur', 'tournage', 'tissage', 'tisser', 'weave', 'papier mache',
    'origami', 'macramé', 'macrame', 'resin', 'résine', 'cire', 'bougie',
    'savon', 'savonnerie', 'cuir', 'maroquinerie', 'sellerie',
    'imprimerie', 'impression', 'sérigraphie', 'serigraphie', 'linogravure',
    'vitrail', 'mosaique', 'mosaïque',
    // EN
    'craft', 'crafting', 'woodwork', 'woodworking', 'carpentry', 'sewing',
    'knitting', 'crocheting', 'embroidery', 'jewelry', 'pottery', 'ceramics',
    'sculpting', 'leatherwork', 'glasswork', 'candle', 'soap', 'weaving',
    'blacksmith', 'metalwork', 'printmaking',
  ],
  business: [
    // FR
    'business', 'entreprise', 'entrepreneuriat', 'entrepreneur', 'startup',
    'stratégie', 'strategie', 'marketing', 'communication', 'branding',
    'vente', 'vendre', 'client', 'prospect', 'démarche', 'pitch',
    'business plan', 'businessplan', 'levée de fonds', 'investisseur',
    'financement', 'bilan', 'resultat', 'chiffre d\'affaire', 'ca',
    'marge', 'trésorerie', 'tresorerie', 'comptabilite', 'comptabilité',
    'gestion', 'management', 'manager', 'equipe', 'équipe', 'recrutement',
    'recruter', 'embaucher', 'rh', 'ressources humaines', 'onboarding',
    'product', 'produit', 'service', 'offre', 'proposition de valeur',
    'mvp', 'roadmap', 'backlog', 'kpi', 'objectif', 'okr', 'metrique',
    'analytique', 'analytics', 'dashboard', 'reporting', 'rapport',
    'partenariat', 'negociation', 'negocier', 'contrat', 'deal',
    'reseau', 'réseau', 'networking', 'linkedin', 'conference', 'salon',
    'lancement', 'launch', 'campagne', 'publicité', 'publicite', 'ads',
    'seo', 'sem', 'reseaux sociaux', 'social media', 'communauté',
    'ecommerce', 'e-commerce', 'boutique', 'shop', 'dropshipping',
    'freelance', 'mission', 'devis', 'facturation', 'facture client',
    // EN
    'business', 'startup', 'strategy', 'marketing', 'sales', 'revenue',
    'client', 'customer', 'pitch', 'investor', 'funding', 'growth',
    'management', 'team', 'hiring', 'product', 'launch', 'campaign',
    'networking', 'partnership', 'negotiation', 'freelance', 'invoice',
  ],
  other: [
    // Catch-all: no keywords needed, this is the fallback
  ],
};

// Score each category based on keyword matches
export function detectCategory(taskText: string): CategoryId {
  const text = taskText.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  let bestCategory: CategoryId = 'other';
  let bestScore = 0;

  for (const [category, keywords] of Object.entries(KEYWORD_MAP)) {
    let score = 0;
    for (const keyword of keywords) {
      const normalizedKeyword = keyword.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (text.includes(normalizedKeyword)) {
        score += normalizedKeyword.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestCategory = category as CategoryId;
    }
  }

  return bestCategory;
}

// Category metadata for display
export const CATEGORY_META: Record<CategoryId, { emoji: string; label: string; gradient: string }> = {
  sport:     { emoji: '🏃', label: 'Sport / Sante',    gradient: 'linear-gradient(135deg, #ef4444, #f97316)' },
  admin:     { emoji: '📋', label: 'Administratif',    gradient: 'linear-gradient(135deg, #3b82f6, #6366f1)' },
  writing:   { emoji: '✍️', label: 'Ecriture',         gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)' },
  creative:  { emoji: '🎨', label: 'Creativite',       gradient: 'linear-gradient(135deg, #f472b6, #f59e0b)' },
  housework: { emoji: '🏠', label: 'Menage',           gradient: 'linear-gradient(135deg, #10b981, #06b6d4)' },
  craft:     { emoji: '🔨', label: 'Artisanat',        gradient: 'linear-gradient(135deg, #d97706, #92400e)' },
  business:  { emoji: '💼', label: 'Business',         gradient: 'linear-gradient(135deg, #0ea5e9, #6366f1)' },
  other:     { emoji: '⭐', label: 'Autres',           gradient: 'linear-gradient(135deg, #64748b, #94a3b8)' },
};

// PokeAPI type IDs associated with each category (for 50% type influence)
export const CATEGORY_TYPE_MAP: Record<CategoryId, { primary: number[]; secondary: number[] }> = {
  sport: {
    primary: [2, 6],     // Fighting, Rock
    secondary: [5, 10],  // Ground, Fire
  },
  admin: {
    primary: [13, 9],    // Electric, Steel
    secondary: [14, 1],  // Psychic, Normal
  },
  writing: {
    primary: [14, 8],    // Psychic, Ghost
    secondary: [18, 17], // Fairy, Dark
  },
  creative: {
    primary: [18, 10],   // Fairy, Fire
    secondary: [12, 3],  // Grass, Poison
  },
  housework: {
    primary: [12, 11],   // Grass, Water
    secondary: [1, 5],   // Normal, Ground
  },
  craft: {
    primary: [6, 9],     // Rock, Steel
    secondary: [10, 5],  // Fire, Ground
  },
  business: {
    primary: [13, 14],   // Electric, Psychic
    secondary: [1, 9],   // Normal, Steel
  },
  other: {
    primary: [1, 14],    // Normal, Psychic
    secondary: [18, 11], // Fairy, Water
  },
};
