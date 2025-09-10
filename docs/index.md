# Guide du Développeur Devaito

Bienvenue dans le **Guide du Développeur Devaito** !  
Ce guide vous accompagne dans la création, le test et la publication d'applications pour l'écosystème Devaito, une plateforme qui transforme la création de sites web en une expérience puissante et personnalisable.

---

## Qu'est-ce que Devaito ?
Devaito est une plateforme qui évolue d'un marché de templates vers un écosystème d'applications.  

Avec Devaito, vous pouvez :  
- Créer des apps pour ajouter des fonctionnalités (ex. : e-commerce, analytique) aux sites web Devaito.  
- Monétiser vos apps avec des modèles de tarification flexibles (abonnements, paiements uniques).  
- Atteindre des milliers de propriétaires de sites via le **Devaito App Store**.  

---

## Pourquoi développer pour Devaito ?
En tant que développeur, Devaito vous offre :  

- **Des outils puissants** : CLI Devaito (basé sur *oclif*), SDKs (`@devaito/dev-kit` et `@devaito/app-bridge`), et APIs REST (avec GraphQL en perspective).  
- **Une intégration simplifiée** : Connectez vos apps aux sites Devaito avec OAuth 2.0 et intégrez-les dans le panneau d'administration via un iframe sécurisé.  
- **Un tableau de bord complet** : Gérez vos apps, suivez les performances, et configurez des webhooks sur `devaito-admin.redg.io`.  
- **Un démarrage rapide** : Utilisez des modèles d'apps préconfigurés (Laravel, Remix, Node.js) pour accélérer le développement.  

---

## Comment ce guide est organisé
Ce guide couvre tout ce dont vous avez besoin pour créer une app Devaito, étape par étape :  

1. **Getting Started** : Configurez votre environnement et créez un compte développeur.  
2. **APIs** : Apprenez à utiliser les APIs Devaito pour accéder aux données des sites.  
3. **CLI** : Maîtrisez le CLI Devaito pour automatiser la création et les tests.  
4. **App Bridge** : Intégrez votre interface dans le panneau d'administration Devaito.  
5. **OAuth** : Implémentez une authentification sécurisée avec OAuth 2.0.  
6. **Testing** : Testez vos apps localement et dans un environnement sandbox.  
7. **Publishing** : Soumettez votre app au Devaito App Store.  
8. **Resources** : Trouvez des références API, un support, et une communauté.  

---

## Premiers pas
Pour commencer :  

1. Créez un compte développeur sur **[devaito-admin.redg.io](https://devaito-admin.redg.io)**.  
2. Installez le CLI Devaito :  
   ```bash
   npm install -g @devaito/cli
   ```
3. Générez votre première app :  
   ```bash
   devaito app create --template=laravel
   ```

---

## Exemple rapide : Une app "Bonjour Devaito"
Voici un aperçu de ce que vous pouvez construire :  

```javascript
import { createApp } from '@devaito/app-bridge';

const app = createApp({ apiKey: 'votre-clé', host: window.location.host });

app.render({
  component: () => {
    const button = document.createElement('button');
    button.innerText = 'Bonjour, Devaito !';
    button.onclick = () => app.notify('Bouton cliqué !');
    return button;
  },
  target: '#devaito-app-container'
});
```

Cette app affiche un bouton dans le panneau d'administration Devaito. Consultez **App Bridge** pour plus de détails.  

---

## Support et communauté
- **Documentation API** : [devaito.redg.io/docs/api](https://devaito.redg.io/docs/api)  
- **Support** : Contactez [devsupport@devaito.redg.io](mailto:devsupport@devaito.redg.io)  
- **Forum** : Rejoignez la communauté sur [devaito.redg.io/community](https://devaito.redg.io/community)  

---

## Prêt à commencer ?
Plongez dans **Getting Started** et construisez votre première app Devaito dès aujourd'hui ! 🚀  

**Devaito Developer Guide, powered by passion and code.**
