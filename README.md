# 🎵 Arquitecto de Rúbricas de Música

**Generador profesional de rúbricas de evaluación para las Enseñanzas Profesionales de Música en Extremadura, España.**

![Vite](https://img.shields.io/badge/Vite-6.4-purple)
![React](https://img.shields.io/badge/React-19-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-cyan)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## 📋 Descripción

Herramienta web diseñada para facilitar la creación de instrumentos de evaluación por competencias en el contexto de las Enseñanzas Profesionales de Música en Extremadura, basada en la **Programación Didáctica 2026/2027**.

### Materias soportadas

| Materia | Cursos |
|---------|--------|
| Música de Cámara | 4.º, 5.º y 6.º |
| Banda | 1.º a 6.º |
| Orquesta | 1.º a 6.º |

### Características

- ✅ **12 Criterios de Evaluación** (CO-01 a CO-12)
- ✅ **7 Competencias Musicales** (CM-1 a CM-7)
- ✅ **4 Niveles de Logro** (Inicial, En desarrollo, Adecuado, Consolidado)
- ✅ Descriptores progresivos adaptados a cada curso
- ✅ Sistema de puntuación matemático
- ✅ Exportación a PDF / Impresión
- ✅ Notas pedagógicas por materia
- ✅ Interfaz profesional en español

## 🚀 Despliegue

### Opción 1: Despliegue directo en Vercel (recomendado)

1. Haz clic en el botón de abajo:

   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=YOUR_GITHUB_REPO_URL)

2. O sigue estos pasos manualmente:

```bash
# Instala Vercel CLI
npm install -g vercel

# Inicia sesión
vercel login

# Despliega
vercel
```

### Opción 2: Despliegue manual

```bash
# 1. Clona el repositorio
git clone https://github.com/TU_USUARIO/rubricas-musica.git
cd rubricas-musica

# 2. Instala dependencias
npm install

# 3. Ejecuta en desarrollo
npm run dev

# 4. Construye para producción
npm run build

# 5. Previsualiza la build
npm run preview
```

## 🛠️ Tecnologías

- **Vite 6** — Build tool ultrarrápido
- **React 19** — Biblioteca UI
- **TypeScript 5** — Tipado estático
- **Tailwind CSS 4** — Framework CSS utility-first

## 📁 Estructura del proyecto

```
├── src/
│   ├── App.tsx          # Componente principal
│   ├── data.ts          # Datos de rúbricas y criterios
│   ├── main.tsx         # Punto de entrada
│   └── index.css        # Estilos globales
├── index.html           # HTML base
├── vercel.json          # Configuración Vercel
├── package.json         # Dependencias
└── vite.config.ts       # Configuración Vite
```

## 📄 Licencia

Proyecto educativo para uso en centros de enseñanzas profesionales de música.

---

Desarrollado como herramienta de apoyo para la evaluación por competencias en Música de Cámara, Banda y Orquesta.
