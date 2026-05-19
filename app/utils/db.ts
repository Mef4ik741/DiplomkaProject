import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  const prisma = new PrismaClient();
  
  // Self-executing seeding routine
  prisma.tour.count().then(async (count) => {
    if (count === 0) {
      console.log("Seeding default tours into the SQLite database...");
      await prisma.tour.createMany({
        data: [
          {
            name: "Волшебный Бали: рисовые поля и храмы",
            location: "Бали, Индонезия",
            price: 156000,
            duration: "10 ночей",
            type: "Авиа + отель",
            badge: "Хит продаж",
            description: "Погрузитесь в мистическую атмосферу острова богов. Террасы Тегаллаланг, Убуд, пляжи Семиньяк и закат на Танах Лот.",
            image: "https://images.unsplash.com/photo-1499678329028-101435549a4e?w=700&q=80",
          },
          {
            name: "Стамбул: на стыке двух цивилизаций",
            location: "Стамбул",
            price: 78000,
            duration: "6 ночей",
            type: "All inclusive",
            badge: "Успей!",
            description: "Айя-София, Гранд-базар, круиз по Босфору. Город, где Восток встречает Запад — и оба проигрывают его магии.",
            image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=700&q=80",
          },
          {
            name: "Амальфитанское побережье: классика Италии",
            location: "Амальфи, Италия",
            price: 198000,
            duration: "12 ночей",
            type: "Авиа + отель",
            badge: null,
            description: "Позитано, Равелло, Капри — живописные деревушки на скалах, лимонные рощи и лазурное Тирренское море.",
            image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=700&q=80",
          }
        ]
      });
      console.log("Seeding default tours complete!");
    }
  }).catch((err) => {
    console.error("Error checking or seeding default tours:", err);
  });

  return prisma;
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const db = globalThis.prismaGlobal ?? prismaClientSingleton();

export default db;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = db;
