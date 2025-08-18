# 🌟 Neon Led Publicidad - Frontend

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> Aplicación web moderna para servicios de publicidad LED, diseño web y marketing digital.

## 📋 Tabla de Contenidos

- [🚀 Inicio Rápido](#-inicio-rápido)
- [⚙️ Configuración Inicial](#️-configuración-inicial)
- [🔧 Configuración de Git](#-configuración-de-git)
- [🌿 Gestión de Ramas](#-gestión-de-ramas)
- [💻 Desarrollo Local](#-desarrollo-local)
- [📤 Subir Cambios](#-subir-cambios)
- [📥 Sincronizar Cambios](#-sincronizar-cambios)
- [🆘 Comandos de Emergencia](#-comandos-de-emergencia)
- [🔍 Troubleshooting](#-troubleshooting)

---

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 18+ instalado
- Git instalado
- Editor de código (VS Code recomendado)

### Setup Completo (30 segundos)
```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/neonledpublicidad_frontend.git
cd neonledpublicidad_frontend

# 2. Instalar dependencias
npm install

# 3. Ejecutar en desarrollo
npm run dev
```

✅ **Abre [http://localhost:3000](http://localhost:3000) y ya tienes el proyecto corriendo!**

---

## ⚙️ Configuración Inicial

### Si eres nuevo con Node.js:
```bash
# Verificar instalación
node --version
npm --version

# Si no tienes Node.js, descárgalo desde: https://nodejs.org/
```

### Comandos de ejecución disponibles:
```bash
npm run dev      # Servidor de desarrollo (localhost:3000)
npm run build    # Construir para producción
npm run start    # Ejecutar build de producción
npm run lint     # Revisar código con ESLint
```

---

## 🔧 Configuración de Git

### 🆕 Primera vez usando Git?

#### 1. Configurar tu identidad:
```bash
# Configurar nombre y email (requerido)
git config --global user.name "Tu Nombre Completo"
git config --global user.email "tu.email@ejemplo.com"

# Verificar configuración
git config --list
```

#### 2. Configurar SSH (Recomendado):
```bash
# Generar clave SSH
ssh-keygen -t ed25519 -C "tu.email@ejemplo.com"

# Agregar a ssh-agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Copiar clave pública (pegar en GitHub)
cat ~/.ssh/id_ed25519.pub
```

#### 3. Clonar con SSH:
```bash
git clone git@github.com:tu-usuario/neonledpublicidad_frontend.git
```

### 🔄 Ya tienes Git configurado?
```bash
# Verificar configuración actual
git config user.name
git config user.email

# Clonar directamente
git clone https://github.com/tu-usuario/neonledpublicidad_frontend.git
```

---

## 🌿 Gestión de Ramas

### Estructura de Ramas
```
main/master     ← Producción (solo código estable)
develop         ← Desarrollo principal
feature/xxx     ← Nuevas características
bugfix/xxx      ← Corrección de errores
hotfix/xxx      ← Correcciones urgentes
```

### Comandos Principales

#### Crear y cambiar a nueva rama:
```bash
# Desde main/develop
git checkout main
git pull origin main

# Crear nueva rama
git checkout -b feature/nueva-funcionalidad
# o
git checkout -b bugfix/corregir-error
```

#### Listar y cambiar ramas:
```bash
# Ver todas las ramas
git branch -a

# Cambiar a rama existente
git checkout nombre-rama

# Cambiar a develop
git checkout develop
```

#### Eliminar ramas:
```bash
# Eliminar rama local (después de merge)
git branch -d feature/mi-rama

# Eliminar rama remota
git push origin --delete feature/mi-rama
```

---

## 💻 Desarrollo Local

### Flujo de Trabajo Recomendado

#### 1. Antes de empezar:
```bash
# Asegurarte de tener lo último
git checkout develop
git pull origin develop

# Crear tu rama
git checkout -b feature/mi-nueva-funcionalidad
```

#### 2. Durante el desarrollo:
```bash
# Ver estado de archivos
git status

# Agregar archivos modificados
git add .
# o archivos específicos
git add archivo1.js archivo2.css

# Hacer commit con mensaje descriptivo
git commit -m "feat: agregar componente de galería de imágenes"
```

#### 3. Commits siguiendo convenciones:
```bash
git commit -m "feat: nueva funcionalidad"
git commit -m "fix: corregir bug en formulario"
git commit -m "docs: actualizar README"
git commit -m "style: mejorar CSS del header"
git commit -m "refactor: optimizar componente Blog"
```

---

## 📤 Subir Cambios

### Primera vez subiendo tu rama:
```bash
# Subir rama nueva
git push -u origin feature/mi-nueva-funcionalidad
```

### Subidas posteriores:
```bash
# Subir cambios
git push
```

### Crear Pull Request:
1. Ve a GitHub
2. Verás un botón "Compare & pull request"
3. Describe tus cambios
4. Asigna reviewers
5. Crea el Pull Request

---

## 📥 Sincronizar Cambios

### Traer cambios de otras ramas:

#### Actualizar tu rama con develop:
```bash
# Opción 1: Merge (recomendado para equipos)
git checkout develop
git pull origin develop
git checkout tu-rama
git merge develop

# Opción 2: Rebase (para commits más limpios)
git checkout tu-rama
git rebase develop
```

#### Traer cambios específicos de otra rama:
```bash
# Cherry-pick de un commit específico
git cherry-pick abc1234

# Merge de otra rama
git merge origin/otra-rama
```

#### Sincronizar con main/producción:
```bash
git checkout main
git pull origin main
git checkout tu-rama
git merge main
```

---

## 🆘 Comandos de Emergencia

### 🔥 "¡Rompí algo!"

#### Deshacer último commit (manteniendo cambios):
```bash
git reset --soft HEAD~1
```

#### Deshacer cambios no commiteados:
```bash
# Descartar todos los cambios
git checkout .

# Descartar archivo específico
git checkout -- archivo.js
```

#### Volver a un commit anterior:
```bash
# Ver historial
git log --oneline

# Volver a commit específico (¡CUIDADO!)
git reset --hard abc1234
```

#### "¡Necesito los cambios de main AHORA!"
```bash
git stash                    # Guardar trabajo actual
git checkout main           
git pull origin main        
git checkout tu-rama        
git merge main              
git stash pop               # Recuperar trabajo
```

### 🔄 Resolver Conflictos

#### Cuando hay conflictos en merge:
```bash
# 1. Git te dirá que hay conflictos
git status

# 2. Abrir archivos con conflictos y resolverlos manualmente
# Buscar: <<<<<<< HEAD, =======, >>>>>>> 

# 3. Después de resolver:
git add .
git commit -m "resolve: conflictos de merge con develop"
```

---

## 🔍 Troubleshooting

### Problemas Comunes

#### ❌ "Permission denied (publickey)"
```bash
# Verificar SSH
ssh -T git@github.com

# Re-agregar clave SSH
ssh-add ~/.ssh/id_ed25519
```

#### ❌ "Your branch is behind 'origin/main'"
```bash
git pull origin main
```

#### ❌ "Changes not staged for commit"
```bash
git add .
git commit -m "tu mensaje"
```

#### ❌ Puerto 3000 ya en uso
```bash
# Matar proceso en puerto 3000
npx kill-port 3000

# O usar puerto diferente
npm run dev -- -p 3001
```

#### ❌ "Module not found"
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

---

## 🎨 Estructura del Proyecto

```
neonledpublicidad_frontend/
├── app/                    # App Router de Next.js 14
│   ├── (client)/          # Rutas del cliente
│   │   ├── reclamaciones/ # Formulario de reclamaciones
│   │   └── blog/          # Páginas del blog
│   ├── globals.css        # Estilos globales
│   └── layout.js          # Layout principal
├── components/            # Componentes reutilizables
├── public/               # Archivos estáticos
└── tailwind.config.js    # Configuración de Tailwind
```

---

## 📚 Recursos Adicionales

- [📖 Documentación de Next.js](https://nextjs.org/docs)
- [🎨 Tailwind CSS Docs](https://tailwindcss.com/docs)
- [📘 Git Handbook](https://guides.github.com/introduction/git-handbook/)
- [🔧 VS Code Extensions Recomendadas](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

---

## 🤝 Contribución

1. Fork el proyecto
2. Crea tu rama (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'feat: add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

