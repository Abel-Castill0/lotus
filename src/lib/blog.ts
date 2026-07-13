export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
  category: string;
}

import { fallbackImages } from "./animeImages";

export const blogPosts: BlogPost[] = [
  {
    slug: "jujutsu-kaisen-vol-24",
    title: "Jujutsu Kaisen Vol. 24 ya en preventa!",
    date: "2026-07-10",
    image: fallbackImages.about1,
    excerpt:
      "El nuevo volumen del exito de Gege Akutami llega con revelaciones impactantes.",
    content:
      "La batalla contra Kenjaku alcanza su punto culminante en este nuevo tomo que promete dejar a los lectores sin aliento. Yuji Itadori enfrenta decisiones imposibles mientras el destino de la humanidad pende de un hilo. Disponible en preventa con un 10% de descuento exclusivo para suscriptores.",
    category: "lanzamientos",
  },
  {
    slug: "one-piece-film-remake",
    title: "One Piece: El remake del arco de Fish-Man Island",
    date: "2026-07-05",
    image: fallbackImages.about2,
    excerpt:
      "Toei Animation anuncia un remake del arco de Fish-Man Island con animacion renovada.",
    content:
      "Para celebrar el 25 aniversario del anime, Toei Animation ha anunciado un remake completo del arco de Fish-Man Island con animacion de ultima generacion. El arco sera reimaginado con el estilo visual actual de la serie, prometiendo una experiencia renovada para los fans.",
    category: "noticias",
  },
  {
    slug: "ivrea-nuevas-licencias",
    title: "Ivrea anuncia 5 nuevas licencias para Peru",
    date: "2026-06-28",
    image: fallbackImages.about3,
    excerpt:
      "La editorial Ivrea trae nuevos titulos al mercado peruano, incluyendo esperados regresos.",
    content:
      "La editorial Ivrea ha confirmado la llegada de 5 nuevas series al mercado peruano, incluyendo 'Dandadan', 'Kaiju No. 8' y el esperado regreso de 'Vagabond' con una nueva edicion de lujo. Los lanzamientos comenzaran en septiembre de este ano.",
    category: "lanzamientos",
  },
  {
    slug: "evento-anime-lima-2026",
    title: "Anime Festival Lima 2026: Todo lo que debes saber",
    date: "2026-06-20",
    image: fallbackImages.about4,
    excerpt:
      "El evento de anime mas grande de Peru regresa con invitados internacionales.",
    content:
      "El Anime Festival Lima 2026 se celebrara del 15 al 17 de agosto en el Centro de Convenciones de Lima. Contara con invitados especiales de Japon, conciertos de opening en vivo, y areas dedicadas a cosplay, manga y gaming. Lotus Manga Store tendra un stand con descuentos exclusivos.",
    category: "eventos",
  },
  {
    slug: "chainsaw-man-parte-2",
    title: "Chainsaw Man Parte 2: Lo que sabemos hasta ahora",
    date: "2026-06-15",
    image: fallbackImages.hero,
    excerpt:
      "Tatsuki Fujimoto continua sorprendiendo con la segunda parte de Chainsaw Man.",
    content:
      "La segunda parte de Chainsaw Man, titulada 'Academy Saga', nos introduce a Asa Mitaka, una nueva protagonista que navega el caotico mundo de los demonios mientras Denji intenta llevar una vida universitaria normal. El arco actual promete ser el mas impredecible hasta la fecha.",
    category: "analisis",
  },
  {
    slug: "top-10-mas-vendidos-junio",
    title: "Top 10 mangas mas vendidos de Junio 2026",
    date: "2026-06-10",
    image: fallbackImages.about2,
    excerpt:
      "Descubre los mangas que estan arrasando en ventas este mes en Lotus Manga Store.",
    content:
      "Junio ha sido un mes increible para el mundo del manga. Encabezando la lista tenemos 'Jujutsu Kaisen Vol. 23', seguido de cerca por 'One Piece Vol. 108' y 'Chainsaw Man Vol. 16'. El genero shojo tambien ha visto un resurgimiento con 'Fruits Basket: Another' en el cuarto puesto.",
    category: "analisis",
  },
];
