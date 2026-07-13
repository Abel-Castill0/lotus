# Lotus Manga Store - Guia de Despliegue

## Requisitos previos

- Node.js 18+ y npm
- Cuenta en [Supabase](https://supabase.com) (gratuita)
- Cuenta en [Vercel](https://vercel.com) (gratuita, conecta con GitHub)

## 1. Configuracion local

```bash
# 1. Clonar el repositorio
git clone <tu-repo>
cd lotus-manga-store

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.local.example .env.local
```

Editar `.env.local` con tus credenciales de Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 2. Configurar Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com)
2. Ve a **SQL Editor** y ejecuta el contenido de `src/lib/supabase/schema.sql`
3. Ve a **Authentication > Providers** y habilita:
   - Email/Password
   - Google (configura OAuth con credenciales de Google Cloud Console)
   - Discord (opcional)
4. En **Authentication > Settings**, agrega URL de redireccion:
   - `http://localhost:3000/auth/callback`
   - `https://tu-dominio.vercel.app/auth/callback`
5. Copia las credenciales (`Project URL` y `anon key`) a `.env.local`

## 3. Ejecutar en desarrollo

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## 4. Desplegar en Vercel

### 4.1. Preparar el repositorio

```bash
git add .
git commit -m "Ready for production"
git push
```

### 4.2. Conectar con Vercel

1. Ve a [vercel.com/new](https://vercel.com/new)
2. Importa tu repositorio de GitHub
3. Configura las variables de entorno en Vercel:

| Variable | Valor |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL de tu proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key de Supabase |
| `NEXT_PUBLIC_SITE_URL` | URL de tu dominio (ej: `https://lotusmangastore.vercel.app`) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `51960599967` |

4. Haz clic en **Deploy**

### 4.3. Post-despliegue

- Configura un dominio personalizado en Vercel (Settings > Domains)
- Actualiza `NEXT_PUBLIC_SITE_URL` en Vercel con el dominio real
- Agrega la URL de produccion en Supabase > Authentication > Settings

## 5. Variables de entorno

| Variable | Requerido | Descripcion |
|----------|-----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Si | URL del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Si | Anon key publica de Supabase |
| `NEXT_PUBLIC_SITE_URL` | No | URL del sitio (para SEO y OG tags) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | No | Numero de WhatsApp (default: 51960599967) |

## 6. Comandos utiles

```bash
npm run dev      # Desarrollo en localhost:3000
npm run build    # Build de produccion
npm run lint     # Verificar errores ESLint
npm run start    # Servir build de produccion
```

## 7. Estructura del proyecto

```
src/
├── app/                    # Rutas y paginas (App Router)
│   ├── layout.tsx          # Layout raiz con SEO, JSON-LD, fuentes
│   ├── page.tsx            # Landing page
│   ├── loading.tsx         # Pantalla de carga
│   ├── error.tsx           # Pagina de error
│   ├── not-found.tsx       # Pagina 404
│   ├── catalogo/           # Catalogo de productos
│   ├── checkout/           # Formulario de compra
│   ├── carrito/            # Carrito de compras
│   ├── manga/[slug]/       # Detalle de producto
│   ├── wishlist/           # Lista de deseos
│   ├── perfil/             # Perfil de usuario
│   ├── blog/               # Blog / Noticias
│   └── api/                # API routes
├── components/
│   ├── 3d/                 # Componentes 3D (React Three Fiber)
│   ├── ui/                 # Componentes de interfaz
│   └── layout/             # Secciones de layout
├── lib/
│   ├── supabase/           # Clientes Supabase y schema SQL
│   ├── context/            # Contextos (Auth)
│   ├── hooks/              # Hooks custom (wishlist, reviews)
│   ├── store.ts            # Zustand stores
│   ├── products.ts         # Datos de productos
│   ├── types.ts            # Tipos TypeScript
│   └── utils.ts            # Utilidades
└── middleware.ts           # Next.js middleware (sesion Supabase)
```

## 8. PWA (Progressive Web App)

La aplicacion incluye soporte PWA:

- **Manifest**: `/public/manifest.webmanifest`
- **Service Worker**: Gestionado por Serwist (@serwist/next)
- **Iconos**: Colocar en `/public/icons/`:
  - `icon-192x192.png` (192x192)
  - `icon-512x512.png` (512x512)
  - `apple-touch-icon.png` (180x180)
  - `favicon.ico` (32x32)

## 9. SEO

- Sitemap generado automaticamente con `next-sitemap` (se ejecuta en `postbuild`)
- Open Graph tags en el layout raiz
- JSON-LD Structured Data para Schema.org Store y Product
- Meta tags dinamicos en rutas de producto, blog, catalogo

## 10. Notas de produccion

- Las imagenes de placeholder (`picsum.photos`) deben reemplazarse con imagenes reales
- El archivo `public/og-image.jpg` (1200x630) debe disenarse profesionalmente
- Los sonidos en `public/sounds/` son placeholder y deben agregarse (formato .mp3)
- Las politicas RLS de Supabase son esenciales para la seguridad
- Para migrar a Supabase Products: ejecutar script de seed en el SQL Editor
