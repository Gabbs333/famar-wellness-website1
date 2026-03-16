import { motion } from 'motion/react';
import { Sparkles, HandHeart, Dumbbell, Check, Zap } from 'lucide-react';

export default function Pricing() {
  const technologies = [
    {
      name: "Lipolaser + Andullation",
      price: "25 000",
      unit: "FCFA",
      period: "3 séances",
      description: "Traitement minceur combiné",
      features: [
        "Technologie Lipo-Laser",
        "Stimulation lymphatique",
        "Résultats visibles rapidement",
        "Évacuation des toxines"
      ],
      popular: false,
      color: "pink"
    },
    {
      name: "Lipolaser + Andullation",
      price: "45 000",
      unit: "FCFA",
      period: "6 séances",
      description: "Pack minceur complet",
      features: [
        "Technologie Lipo-Laser",
        "Stimulation lymphatique",
        "Résultats visibles rapidement",
        "Évacuation des toxines"
      ],
      popular: true,
      color: "pink"
    },
    {
      name: "Andumedic Pro",
      price: "15 000",
      unit: "FCFA",
      period: "1 séance",
      description: "Thérapie par vibrations",
      features: [
        "Vibrations mécaniques",
        "Chaleur infrarouge",
        "Relaxation profonde",
        "Soulagement douleurs"
      ],
      popular: false,
      color: "purple"
    },
    {
      name: "Andumedic Pro",
      price: "75 000",
      unit: "FCFA",
      period: "10 séances",
      description: "Pack thérapie complète",
      features: [
        "Vibrations mécaniques",
        "Chaleur infrarouge",
        "Relaxation profonde",
        "Soulagement douleurs"
      ],
      popular: false,
      color: "purple"
    },
    {
      name: "Scanner IDIAG",
      price: "25 000",
      unit: "FCFA",
      period: "1 analyse",
      description: "Analyse complète du dos",
      features: [
        "Évaluation posturale",
        "Analyse vertébrale 3D",
        "Plan thérapeutique",
        "Sans radiation"
      ],
      popular: false,
      color: "teal"
    }
  ];

  const massages = [
    {
      name: "Massage Relaxant",
      price: "10 000",
      unit: "FCFA",
      description: "Détente et bien-être",
      duration: "1 séance",
      features: [
        "Mouvements fluides",
        "Soulagement du stress",
        "Amélioration du sommeil"
      ],
      color: "teal"
    },
    {
      name: "Massage Sportif",
      price: "15 000",
      unit: "FCFA",
      description: "Performance et récupération",
      duration: "1 séance",
      features: [
        "Préparation musculaire",
        "Récupération après effort",
        "Élimination des toxines"
      ],
      color: "orange"
    },
    {
      name: "Massage Deep Tissue",
      price: "15 000",
      unit: "FCFA",
      description: "Tensions profondes",
      duration: "1 séance",
      features: [
        "Cible les nœuds profonds",
        "Soulagement chronique",
        "Mobilité améliorée"
      ],
      color: "blue"
    },
    {
      name: "Massage Femme Enceinte",
      price: "10 000",
      unit: "FCFA",
      description: "Douceur et sécurité",
      duration: "1 séance",
      features: [
        "Adapté à la grossesse",
        "Soulagement dos et jambes",
        "Moment de détente"
      ],
      color: "pink"
    },
    {
      name: "Drainage Lymphatique",
      price: "15 000",
      unit: "FCFA",
      description: "Circulation et détox",
      duration: "1 séance",
      features: [
        "Stimulation lymphatique",
        "Réduction des œdèmes",
        "Détoxification"
      ],
      color: "green"
    },
    {
      name: "Massage Pieds",
      price: "8 000",
      unit: "FCFA",
      description: "Réflexologie",
      duration: "1 séance",
      features: [
        "Relaxation extrémités",
        "Stimulation points réflexes",
        "Sensation de légèreté"
      ],
      color: "amber"
    }
  ];

  const coaching = [
    {
      name: "Coaching 1 Mois",
      price: "150 000",
      unit: "FCFA",
      description: "Sport + Nutrition",
      period: "1 mois",
      features: [
        "Programme sportif personnalisé",
        "Suivi nutritionnel",
        "Conseils quotidiens",
        "Bilan initial et final"
      ],
      popular: false,
      color: "lime"
    },
    {
      name: "Coaching 3 Mois",
      price: "350 000",
      unit: "FCFA",
      description: "Sport + Nutrition",
      period: "3 mois",
      features: [
        "Programme sportif personnalisé",
        "Suivi nutritionnel complet",
        "Conseils quotidiens",
        "Bilan régulier",
        "Prix avantageux"
      ],
      popular: true,
      color: "lime"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; accent: string; light: string }> = {
      pink: { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-600', accent: 'bg-pink-600', light: 'bg-pink-100' },
      purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', accent: 'bg-purple-600', light: 'bg-purple-100' },
      teal: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-600', accent: 'bg-teal-600', light: 'bg-teal-100' },
      orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600', accent: 'bg-orange-600', light: 'bg-orange-100' },
      blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', accent: 'bg-blue-600', light: 'bg-blue-100' },
      green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', accent: 'bg-green-600', light: 'bg-green-100' },
      amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-600', accent: 'bg-amber-600', light: 'bg-amber-100' },
      lime: { bg: 'bg-lime-50', border: 'border-lime-200', text: 'text-lime-600', accent: 'bg-lime-600', light: 'bg-lime-100' },
    };
    return colors[color] || colors.teal;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Zap size={16} />
            <span>Tarifs 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-lime-600">Tarifs</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Des tarifs transparents pour tous vos besoins. Choisissez le soin qui vous correspond.
          </p>
        </motion.div>

        {/* Technologies Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
              <Sparkles className="text-pink-600" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Technologies</h2>
              <p className="text-gray-500">Traitements high-tech</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {technologies.map((item, index) => {
              const colors = getColorClasses(item.color);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`relative ${colors.bg} rounded-2xl p-6 border ${colors.border} hover:shadow-xl transition-all ${item.popular ? 'ring-2 ring-pink-500 ring-offset-2' : ''}`}
                >
                  {item.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Populaire
                    </div>
                  )}
                  <h3 className="font-bold text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{item.description}</p>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-900">{item.price}</span>
                    <span className="text-gray-500"> {item.unit}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-600 mb-4">{item.period}</p>
                  <ul className="space-y-2">
                    {item.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <Check size={14} className={`${colors.text} mt-0.5 flex-shrink-0`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Massages Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
              <HandHeart className="text-teal-600" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Massages</h2>
              <p className="text-gray-500">Soins manuels</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {massages.map((item, index) => {
              const colors = getColorClasses(item.color);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`${colors.bg} rounded-2xl p-6 border ${colors.border} hover:shadow-lg transition-all`}
                >
                  <h3 className="font-bold text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{item.description}</p>
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-gray-900">{item.price}</span>
                    <span className="text-gray-500"> {item.unit}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-600 mb-4">{item.duration}</p>
                  <ul className="space-y-2">
                    {item.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <Check size={14} className={`${colors.text} mt-0.5 flex-shrink-0`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Coaching Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-lime-100 rounded-xl flex items-center justify-center">
              <Dumbbell className="text-lime-600" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Coaching</h2>
              <p className="text-gray-500">Sport + Nutrition</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {coaching.map((item, index) => {
              const colors = getColorClasses(item.color);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`relative ${colors.bg} rounded-2xl p-8 border ${colors.border} hover:shadow-xl transition-all ${item.popular ? 'ring-2 ring-lime-500 ring-offset-2' : ''}`}
                >
                  {item.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-lime-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Meilleure valeur
                    </div>
                  )}
                  <h3 className="font-bold text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{item.description}</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{item.price}</span>
                    <span className="text-gray-500"> {item.unit}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-600 mb-6">{item.period}</p>
                  <ul className="space-y-3">
                    {item.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700">
                        <Check size={16} className={`${colors.text} mt-0.5 flex-shrink-0`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-teal-600 to-lime-600 rounded-3xl p-8 md:p-12 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Prêt à commencer votre bien-être ?
            </h2>
            <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
              Réservez votre séance dès maintenant et prenez soin de votre corps avec nos technologies de pointe.
            </p>
            <a
              href="/reservation"
              className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-full font-bold hover:bg-teal-50 transition-colors shadow-lg"
            >
              Réserver une séance
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
