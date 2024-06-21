# ParadoxWiki
Proiectul conține mai multe elemente, inclusiv jocuri dezvoltate cu Unity, o aplicație UI și o aplicație backend. Mai jos sunt detaliile pentru fiecare proiect, împreună cu instrucțiuni despre cum să le instalați, compilați și lansați.

## Table of Contents

- [Jocuri](#jocuri)
  - [MontyHall](#montyhall)
  - [SchrodingersCat](#schrodingerscat)
  - [ShipOfTheseus](#shipoftheseus)
- [Aplicație UI](#aplicație-ui)
- [Aplicație Backend](#aplicație-backend)
- [Instrucțiuni de Instalare și Lansare](#instrucțiuni-de-instalare-și-lansare)

## Repozitorii Github
#### Jocuri - [MontyHall](https://github.com/Zerg009/MontyHall) - [SchrodingersCat](https://github.com/Zerg009/SchrodingersCat) - [ShipOfTheseus](https://github.com/Zerg009/ShipOfTheseus) 
#### Aplicații - [Aplicație UI (ParadoxWiki)](https://github.com/Zerg009/ParadoxWiki) - [Aplicație Backend (ParadoxWikiBackend)](https://github.com/Zerg009/ParadoxWikiBackend)

## Instrucțiuni de Instalare și Lansare

### Jocuri (Unity)

Pentru fiecare joc (MontyHall, SchrodingersCat, ShipOfTheseus):

1. **Clonează repository-ul:**
   git clone <repository-url>
   Înlocuiește `<repository-url>` cu URL-ul repository-ului respectiv.

2. **Deschide proiectul în Unity:**
   - Lansează Unity Hub.
   - Click pe "Add" și navighează la directorul unde ai clonat repository-ul.
   - Selectează folderul pentru a deschide proiectul în Unity.

3. **Compilează și rulează:**
   - Odată ce proiectul este încărcat în Unity, click pe "File" -> "Build Settings".
   - Selectează platforma dorită (de ex., PC, Mac & Linux Standalone).
   - Click pe "Build and Run" pentru a compila și lansa jocul.

### Aplicație UI (Bootstrap, Angular, TailwindCSS)

1. **Clonează repository-ul:**
   git clone https://github.com/Zerg009/ParadoxWiki

2. **Navighează la directorul proiectului:**
   cd ParadoxWiki

3. **Instalează dependențele:**
   npm install

4. **Rulează aplicația:**
   ng serve
   Aplicația va fi disponibilă la `http://localhost:4200`.

### Aplicație Backend (Java Spring Boot)

1. **Clonează repository-ul:**
   git clone https://github.com/Zerg009/ParadoxWikiBackend

2. **Navighează la directorul proiectului:**
   cd ParadoxWikiBackend

3. **Construiește proiectul:**
   ./mvnw clean install

4. **Rulează aplicația:**
   ./mvnw spring-boot:run
   Serviciul backend va rula la `http://localhost:8080`.
