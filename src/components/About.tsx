import { motion } from 'motion/react';
import { CheckCircle2, Heart, Shield, Sparkles } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden relative">
      {/* Modern Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-24 h-24 border-4 border-teal-50 rounded-full opacity-60" />
      <div className="absolute bottom-20 right-10 w-32 h-32 border-4 border-lime-50 rounded-full opacity-60" />
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-gray-50 rounded-full -z-10"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Uniqueness Section - NEW */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-10 h-[1px] bg-teal-600"></span>
              <span className="text-teal-600 font-bold tracking-wider uppercase text-xs">Ce qui nous distingue</span>
              <span className="w-10 h-[1px] bg-teal-600"></span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Un cabinet de <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-lime-600">santé</span> qui revolutionne
              <br />la massothérapie
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-to-br from-teal-50 to-white p-8 rounded-3xl border border-teal-100 shadow-sm hover:shadow-lg transition-all"
            >
              <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="text-teal-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Cabinet de Santé</h3>
              <p className="text-gray-600 leading-relaxed">
                Contrairement aux cabinets de massage classiques axés uniquement sur le bien-être, FamarWellness est <strong className="text-teal-700">prioritairement un cabinet de santé</strong>, puis de bien-être. Nous traitons les pathologies, soulageons les douleurs et thérapeutisons le corps.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-lime-50 to-white p-8 rounded-3xl border border-lime-100 shadow-sm hover:shadow-lg transition-all"
            >
              <div className="w-14 h-14 bg-lime-100 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="text-lime-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Protocole Exclusif</h3>
              <p className="text-gray-600 leading-relaxed">
                Nous avons développé un <strong className="text-lime-700">protocole unique qui combine plusieurs thérapies en une seule séance</strong>. Cette approche holistique de la santé et du bien-être est la signature de FamarWellness — une synergie thérapeutique que vous ne trouverez nulle part ailleurs.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-3xl border border-orange-100 shadow-sm hover:shadow-lg transition-all"
            >
              <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                <Heart className="text-orange-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Approche Holistique</h3>
              <p className="text-gray-600 leading-relaxed">
                Notre protocole intègre <strong className="text-orange-700">le Lipo-Laser</strong>, l'électrostimulation EMS, l'andullation, la tecarthérapie Winback, l'analyse scanner du dos, et la massothérapie manuelle. Chaque séance traite votre corps dans sa globalité — pas seulement les symptômes, mais la cause profonde.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-3xl p-8 md:p-12 text-white text-center shadow-2xl"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Voici ce qui rend FamarWellness véritablement unique
            </h3>
            <p className="text-teal-100 text-lg max-w-3xl mx-auto leading-relaxed">
              Nous ne sommes pas un simple centre de massage. Nous sommes un <strong className="text-white">centre de thérapeutique intégrée</strong> où la technologie de pointe rencontre l'expertise manuelle pour vous offrir des résultats durables. Chaque soin est une expérience personnalisée, chaque protocole une réponse adaptée à votre corps.
            </p>
          </motion.div>
        </motion.div>

        {/* Existing Approach Section */}
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-square z-10">
              <img 
                src="https://dvjzkijpcpdjbdbzkbfr.supabase.co/storage/v1/object/public/cms-images/uploads/1773016098070_WhatsApp%20Image%202026-03-05%20at%2012,34,28%20(1)-Picsart-BackgroundRemover%20(1).jpeg" 
                alt="Fabrice Marrel Epoh - Massothérapeute" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-white w-full">
                <div className="w-12 h-1 bg-lime-400 mb-4 rounded-full"></div>
                <h3 className="text-3xl font-bold mb-1">Fabrice Marrel Epoh</h3>
                <p className="text-lime-300 font-medium tracking-wide uppercase text-sm">Massothérapeute Certifié</p>
              </div>
            </div>
            
            {/* Decorative blob and elements */}
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 w-48 h-48 bg-lime-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 -z-10" 
            />
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -top-8 -right-8 w-48 h-48 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 -z-10" 
            />
            
            {/* Geometric accent */}
            <div className="absolute -z-20 top-10 -left-10 w-full h-full border border-gray-100 rounded-[2.5rem] transform -rotate-3"></div>
          </motion.div>

          {/* Content Section */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[1px] bg-teal-600"></span>
              <span className="text-teal-600 font-bold tracking-wider uppercase text-xs">À Propos de Nous</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              HHP Approche Globale : <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-lime-600">
                De l'analyse au traitement
              </span>
            </h2>
            
            <div className="prose prose-lg text-gray-600 mb-8">
              <p className="leading-relaxed mb-6">
                Après une analyse approfondie de la colonne vertébrale à l’aide du scanner <strong className="text-teal-700">IDIAG M360</strong>, un plan de traitement pour la relaxation et le renforcement musculaire est automatiquement établi.
              </p>
              
              <p className="leading-relaxed">
                Le tonus musculaire trop important est réduit grâce à la thérapie par <strong className="text-teal-700">Andullation</strong>. Les exercices de stabilité et de mobilité inclus dans le plan assurent l’activation des muscles laxes.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
              <div className="grid grid-cols-1 gap-4">
                {[
                  "Analyse de la posture et de la mobilité (Scanner IDIAG M360)",
                  "Plan thérapeutique généré automatiquement",
                  "Thérapie par l'exercice en cabinet",
                  "Traitements sur l'ANDUMEDIC Pro"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-full bg-lime-50 flex items-center justify-center group-hover:bg-lime-100 transition-colors">
                      <CheckCircle2 className="text-lime-600" size={18} />
                    </div>
                    <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative p-8 bg-gradient-to-br from-teal-50 to-white rounded-2xl border border-teal-100 shadow-sm">
              <div className="absolute top-0 left-0 w-2 h-full bg-teal-500 rounded-l-2xl"></div>
              <p className="italic text-gray-700 font-medium relative z-10">
                "Je pratique également La TECARTHERAPIE WINBACK, utilisée dans tous les grands clubs de football et sportifs en général, très pratique pour soulager, guérir et prévenir tout type de blessures."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
