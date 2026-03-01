# Guide d'Administration Famar Wellness

## Accès au Panel Admin

### URL d'accès
- **Local**: `http://localhost:3000/admin/login`
- **Production**: `https://votre-domaine.vercel.app/admin/login`

### Identifiants par défaut
- **Username**: `admin`
- **Password**: `admin`

**Important**: Changez ces identifiants en production!

## Fonctionnalités du Panel Admin

### 1. Dashboard
- Vue d'ensemble des statistiques
- Nombre de nouveaux contacts
- Nombre de réservations à venir
- Nombre d'abonnés newsletter

### 2. Gestion des Réservations
- Liste de toutes les réservations
- Filtrage par date
- Mise à jour du statut (confirmé/annulé)
- Informations client: nom, email, téléphone, service, date, heure

### 3. Gestion des Contacts
- Liste de tous les messages de contact
- Marquer comme lu/non lu
- Informations: nom, email, téléphone, message, date

### 4. Gestion des Articles (CMS)
- Création, édition, suppression d'articles
- Gestion du statut (publié/brouillon)
- Champs: titre, slug, contenu, extrait, image
- Publication sur le blog public

## Configuration Requise

### 1. Tables Supabase
Assurez-vous que les tables suivantes existent dans Supabase:
- `users` (pour l'authentification admin)
- `contacts` (messages de contact)
- `subscribers` (abonnés newsletter)
- `bookings` (réservations)
- `posts` (articles du blog)

Exécutez le script `supabase-schema.sql` dans l'éditeur SQL de Supabase.

### 2. Variables d'Environnement
Configurez ces variables dans Vercel ou dans le fichier `.env`:

```env
# Supabase
SUPABASE_URL=https://votre-project.supabase.co
SUPABASE_ANON_KEY=votre-cle-anon
SUPABASE_SERVICE_ROLE_KEY=votre-cle-service-role

# Admin
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin  # À changer!
JWT_SECRET=votre-secret-jwt

# Server
PORT=3000
NODE_ENV=production
```

## Développement Local

### 1. Installation
```bash
npm install
```

### 2. Configuration
```bash
cp .env.example .env
# Éditez .env avec vos credentials Supabase
```

### 3. Lancement
```bash
npm run dev
```

### 4. Test des API
```bash
node test-admin-api.js
```

## API Endpoints

### Public
- `GET /api/health` - Vérification de santé
- `POST /api/book` - Soumission de réservation
- `POST /api/contact` - Soumission de contact
- `POST /api/newsletter` - Inscription newsletter

### Admin (authentification requise)
- `POST /api/auth/login` - Connexion admin
- `POST /api/auth/logout` - Déconnexion
- `GET /api/admin/stats` - Statistiques dashboard
- `GET /api/admin/bookings` - Liste des réservations
- `PATCH /api/admin/bookings/:id` - Mettre à jour une réservation
- `GET /api/admin/contacts` - Liste des contacts
- `PATCH /api/admin/contacts/:id` - Mettre à jour un contact
- `GET /api/admin/posts` - Liste des articles
- `POST /api/admin/posts` - Créer un article
- `PUT /api/admin/posts/:id` - Mettre à jour un article
- `DELETE /api/admin/posts/:id` - Supprimer un article

## Sécurité

### À faire en production:
1. **Changer les identifiants admin** par défaut
2. **Implémenter une authentification JWT** complète
3. **Utiliser HTTPS** en production
4. **Configurer les politiques RLS** dans Supabase
5. **Limiter les tentatives de connexion**
6. **Journaliser les activités admin**

### Politiques RLS recommandées:
- Les tables `contacts`, `subscribers`, `bookings` doivent permettre l'insertion anonyme
- Seuls les utilisateurs authentifiés peuvent lire/mettre à jour
- La table `users` doit être restreinte aux admins

## Dépannage

### Problème: "Unauthorized" sur les endpoints admin
**Solution**: Vérifiez que:
1. Vous êtes connecté avec un token valide
2. Le token est inclus dans le header `Authorization: Bearer <token>`
3. Les variables d'environnement sont correctement configurées

### Problème: Les données ne s'affichent pas
**Solution**: Vérifiez que:
1. Les tables Supabase existent
2. Les politiques RLS permettent l'accès
3. La clé service role est utilisée pour les opérations admin

### Problème: Le login échoue
**Solution**: Vérifiez que:
1. Les identifiants sont corrects
2. La table `users` contient un utilisateur admin
3. L'API peut se connecter à Supabase

## Support
Pour toute question ou problème, consultez:
1. Les logs du serveur (`npm run dev`)
2. La console du navigateur (F12)
3. Les logs Vercel (en production)
4. Les logs Supabase