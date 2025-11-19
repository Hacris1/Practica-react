# Examen Frontend - React Base

Aplicación web frontend desarrollada con **React + Vite** para practicar los conceptos del examen de "Computación en Internet II". Implementa autenticación, visualización de posts y gestión de comentarios usando APIs públicas (sin backend propio).

## 🎯 ¿Qué hace esta aplicación?

Esta app simula un sistema de publicaciones (posts) con las siguientes funcionalidades:

### 1. **Autenticación de usuarios**
- Login con email y password
- Generación de token de sesión
- Redirección automática al feed después del login
- Protección de rutas (requiere estar autenticado)
- Persistencia de sesión en `localStorage`
- Modo mock para redes que bloquean APIs externas

### 2. **Feed de publicaciones**
- Visualización de lista de posts desde JSONPlaceholder
- Creación simulada de nuevos posts (solo local)
- Búsqueda/filtrado de posts por título en tiempo real
- Navegación a detalles de cada post
- Modo oscuro/claro (toggle de tema)

### 3. **Detalles de publicación**
- Vista completa de un post específico
- Lista de comentarios asociados al post
- Creación simulada de nuevos comentarios (solo local)
- Información del usuario autenticado

### 4. **Características adicionales**
- Footer sticky (siempre al fondo)
- Componentes reutilizables
- Manejo de estados de carga y errores
- Formularios controlados con validación
- Context API para estado global (auth y tema)

## 🚀 Cómo ejecutar la aplicación

### Requisitos previos
- Node.js 16+ y npm instalados

### Instalación y ejecución
```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Abrir en el navegador
# Visita: http://localhost:5173
```

### Compilar para producción
```bash
npm run build
```

### Vista previa de producción
```bash
npm run preview
```

## 🔐 Credenciales de prueba

### Opción 1: API Real (ReqRes)
- Email: `eve.holt@reqres.in`
- Password: `cityslicka`

### Opción 2: Modo Mock (si tu red bloquea APIs)
- Email: `demo@local`
- Password: `demo123`

## 📁 Estructura del proyecto

```
ExamenFrontend/
├── index.html                 # Punto de entrada HTML
├── package.json              # Dependencias y scripts
├── vite.config.js           # Configuración de Vite
├── README.md                # Este archivo
│
├── src/
│   ├── main.jsx            # Punto de entrada React (monta la app)
│   ├── App.jsx             # Componente raíz con routing
│   ├── styles.css          # Estilos globales
│   │
│   ├── components/         # Componentes reutilizables
│   │   ├── AuthUser.jsx           # Info usuario + logout + toggle tema
│   │   ├── CommentList.jsx        # Lista de comentarios de un post
│   │   ├── Footer.jsx             # Pie de página sticky
│   │   ├── NewComment.jsx         # Formulario crear comentario
│   │   ├── NewPost.jsx            # Formulario crear post
│   │   ├── PostItem.jsx           # Card individual de post
│   │   └── PostList.jsx           # Lista de posts con filtrado
│   │
│   ├── pages/              # Páginas/vistas principales
│   │   ├── AboutPage.jsx          # Página "Acerca de"
│   │   ├── FeedPage.jsx           # Feed principal con posts
│   │   ├── LoginPage.jsx          # Pantalla de login
│   │   └── PostDetailPage.jsx     # Detalle de post + comentarios
│   │
│   ├── context/            # Estado global con Context API
│   │   ├── AuthContext.jsx        # Autenticación y sesión
│   │   └── ThemeContext.jsx       # Tema claro/oscuro
│   │
│   └── services/           # Lógica de comunicación con APIs
│       ├── authService.js         # Login con ReqRes + mock fallback
│       ├── commentService.js      # CRUD comentarios (JSONPlaceholder)
│       └── postService.js         # CRUD posts (JSONPlaceholder)
│
└── doc/                    # Documentación adicional (si existe)
```

## 🛠 Tecnologías utilizadas

- **React 18** - Librería UI con hooks
- **Vite 5** - Build tool y dev server ultrarrápido
- **React Router v6** - Navegación y rutas
- **Context API** - Manejo de estado global
- **Fetch API** - Peticiones HTTP
- **localStorage** - Persistencia de sesión y tema
- **CSS3** - Estilos con flexbox y animaciones

## 🌐 APIs públicas utilizadas

1. **ReqRes** (https://reqres.in)
   - Login y autenticación
   - Devuelve token válido

2. **JSONPlaceholder** (https://jsonplaceholder.typicode.com)
   - Posts (lectura y creación simulada)
   - Comentarios (lectura y creación simulada)


## 📦 Empaquetar la aplicación en un WAR para Tomcat

### 1) Generar la build de producción

```
npm install
npm run build
```

### 2) Preparar `WEB-INF/web.xml` para el despliegue (SPA)

Tomcat sirve archivos estáticos desde la raíz del WAR. Para que las rutas cliente (SPA) funcionen correctamente, añade un `web.xml` que use `index.html` como `welcome-file` y que redirija 404 a `index.html` (solución simple para client-side routing):

```
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
                                           http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
             version="3.1">
   <welcome-file-list>
      <welcome-file>index.html</welcome-file>
   </welcome-file-list>

   <error-page>
      <error-code>404</error-code>
      <location>/index.html</location>
   </error-page>
</web-app>
```

### 3) Empaquetar `dist/` en un WAR

Con JDK instalado (herramienta `jar`):

```
cd dist
jar cvf ../mi-app.war *
cd ..

```

### 4) Base path / assets

Si vas a desplegar bajo un contexto distinto a la raíz, compila la app con la opción `base` para que los assets apunten a la ruta correcta.

- Opción en `vite.config.js`:

```js
export default defineConfig({
   base: '/mi-app/',
   plugins: [react()],
});
```

- O pasar la base al build:

```bash
npm run build -- --base=/mi-app/
```
