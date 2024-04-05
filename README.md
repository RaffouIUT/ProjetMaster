# Projet Master

## Projet de création d'un système d'émargement des étudiants

## Membres du groupe :
Doneau Rafaël <br />
Giraud Nicolas <br />
Guimbert Alexis <br />
Notelet Léo <br />

## Création et Lancement du service

Sur une machine linux, installer le service :
```bash
cp ProjetMaster/src/service/gestionnaire_presence.service_lock /etc/systemd/system/
mv /etc/systemd/system/gestionnaire_presence.service_lock /etc/systemd/system/gestionnaire_presence.service
```

Puis lancer le service :
```bash
systemctl enable gestionnaire_presence.service
systemctl daemon-reload
systemctl restart gestionnaire_presence.service
```

Il devrait mettre quelques minutes à se lancer (le npm install est long)
*Peut-être trouver une autre solution*

Puis vérifier que la commande qui s'éxecute est bien npm run dev avec
```bash
systemctl status gestionnaire_presence.service
```