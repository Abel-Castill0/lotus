# Lotus Manga Store 🎋

Tienda virtual de mangas, figuras y merchandising de anime con experiencia 3D inmersiva.

## Stack Tecnologico

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Estilos**: Tailwind CSS, Framer Motion
- **3D**: React Three Fiber, Drei, Postprocessing
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Estado**: Zustand con persistencia localStorage
- **PWA**: Serwist (Service Worker)
- **SEO**: next-sitemap, Open Graph, JSON-LD
- **Validacion**: React Hook Form + Zod

## Inicio rapido

```bash
npm install
cp .env.local.example .env.local  # Configurar Supabase
npm run dev                        # http://localhost:3000
```

## Scripts

| Comando | Descripcion |
|---------|-------------|
| `npm run dev` | Desarrollo |
| `npm run build` | Build produccion |
| `npm run lint` | ESLint |
| `npm run start` | Servir produccion |
| `npm run postbuild` | Generar sitemap |

## Funcionalidades

- Escena 3D interactiva en Hero con libros flotantes y particulas
- Catalogo con portadas 3D y filtros (genero, precio, busqueda)
- Carrito persistente con cupones de descuento (LOTUS10, MANGA20)
- Checkout con formulario validado y envio por WhatsApp
- Autenticacion (email/Google/Discord)
- Wishlist sincronizada con Supabase
- Resenas con estrellas kawaii
- Lector de muestras 3D tipo flipbook
- Perfil de usuario con datos de envio
- Blog de noticias y lanzamientos
- Modo oscuro/claro
- PWA instalable
- Easter eggs: Konami Code, personaje guia, confeti

## Despliegue

Ver [DEPLOY.md](./DEPLOY.md) para instrucciones detalladas.

---

### Desarrollado por

**Abel Castillo**

🌐 [Portafolio profesional](https://portafolio-abelcastillo.vercel.app/)
