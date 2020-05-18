# AirportConnect

[![N|Solid](https://image.flaticon.com/icons/svg/2086/2086826.svg)](https://nodesource.com/products/nsolid)

AirportConnect est une application permettant d'interagir avec les différents voyageurs du terminal 1 situé à Nice.
Voici l'adresse → http://54.93.113.62:3000/client-page
Elle a été élaborée dans le cadre d'un projet universitaire pour le Master en méthode Informatique Appliquée A la gestion d'entreprise et plus précisément pour la matière Internet of things ou internet des objets en français.

### Résumé
Un simple objet connecté leur sera attribué lors de leurs check-ins. Cet objet aura plusieurs fonctionnalités.
Voici les différentes fonctionnalités de l'objet et de l'application qui permet de gérer les différents voyageurs.

# Fonctionnalités 
- ###  Application 
   * Ajouter un utilisateur 
   * Accéder à tous les utilisateurs inscrit
   * Supprimer un utilisateur
   * Envoyez différentes instructions au client via son objet :
        * Se rendre au comptoir le plus proche
        * Rejoindre les sorties de secours proches en cas d'urgence
   * Recevoir les accusés de réception du client lors de l'envoi des instructions
   * Voir la dernière position d'un client selon des zones définies
   * Afficher des statistiques (nombre de positions par zone)
   
- ### Objet
    * Envoyer un accusé de réception
    * Envoyer sa position 
    * Recevoir des instructions via un système de LED :
        * Led rouge continue : rejoindre le comptoir le plus proche
        * Led rouge clignotante : rejoindre la sortie de secours la plus proche
        * Led verte continue : commencer à rejoindre la porte d'embarquement
        * Led verte clignotante : rejoindre rapidement la porte d'embarquement

# Fonctionnalités futures 
- Amélioration de la partie statistique (temps passé en moyenne par zone, dans un but commercial par exemple)
- Amélioration de l'objet afin de pouvoir y installer un écran pour une communication plus aisée (et plein de pubs)
- Amélioration de l'application afin de permettre à un administrateur d'avoir plus de libertés au niveau des configurations (configurer ou ajouter des nouvelles zones par exemple)
- Voir le parcours effectué pour chaque client ainsi que le temps qui lui a été nécessaire, dans un but logistique. L'on pourrait également observer d'éventuelles difficultés à rejoindre un point précis de l'aéroport.

# Difficultés rencontrées 

- La limitation du matériel, on aurait aimé pouvoir faire plus avec plus de dispositifs. Actuellement on est limité à quatre combinaisons
- Le contexte actuel qui nous empêche de faire des tests en extérieur
- André a débuté avec Angular pour ce projet ce qui a rendu la tâche plus compliquée pour lui ainsi que pour Jeremy qui a passé beaucoup de temps à l'aider.
- Générer des données utilisables, aucune API ouverte trouvée pour récupérer des vols à venir. On a dû générer quelques documents à la main pour faire nos tests.
- La partie consommation d'énergie du projet : on a fait quelques recherches mais on a eu quelques difficultés à trouver des mesures vraiment déterminantes sur le sujet (à part désactiver le bluetooth).
En effet, on est dans un cas où, même si l'on ne veut pas nécessairement envoyer une position toutes les 5s, on souhaite cependant être à l'écoute la plupart du temps.
On a donc même songer au deep sleep tout en restant à l'écoute du serveur MQTT mais ce n'est pas vraiment faisable pour nous vu que nous n'attendons pas un message en particulier avant de plonger l'objet en deep sleep, autrement dit, nous n'avons pas de condition à la suite de laquelle nous pouvons endormir l'objet.
De plus, la plupart des instructions recevables sur l'objet ne doivent pas être manquées et d'un point de vue uniquement tourné vers l'autonomie, l'on est dans un cas où il est assez simple de faire un roulement entre les objets et de régulièrement les recharger. 

## Lancer l'application en local

Lancer `ng serve` pour lancer le serveur sur Localhost. Voici l'adresse exact `http://localhost:4200/`. L'application sera automatiquement chargée lors de changements effectués dans les fichiers.


*Fait par trois élèves du Master Miage en TD1*
**André Da Silva Goncalves**
**Jérémy Choisy**
**Maxime Millier**
