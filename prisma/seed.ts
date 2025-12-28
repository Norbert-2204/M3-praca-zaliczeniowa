import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.category.createMany({
      data: [
        {
          name: "Mouse",
          description: "Computer mice",
          image: "https://i.ibb.co/cK2dFPQC/Frame-6467.png",
          exploreInfo:
            "Discover a wide range of computer mice designed for precision and comfort. From ergonomic office models to high-performance gaming mice, we have options for every need. Enjoy smooth tracking, durable design, and modern technology. Upgrade your everyday experience today.",
        },
        {
          name: "Monitor",
          description: "Monitors",
          image: "https://i.ibb.co/7Jn2n4Ym/Frame-6468.png",
          exploreInfo:
            "Explore high-quality monitors built for work, gaming, and entertainment. Experience sharp resolution, vivid colors, and smooth refresh rates. Our monitors improve productivity and visual comfort. Choose the perfect screen for your setup.",
        },
        {
          name: "Headphone",
          description: "Headphones",
          image: "https://i.ibb.co/zVm6p7cr/Frame-6470.png",
          exploreInfo:
            "Immerse yourself in premium sound with our headphone collection. Enjoy clear audio, deep bass, and comfortable designs for long sessions. Perfect for music, gaming, and calls. Elevate your listening experience.",
        },
        {
          name: "Keyboard",
          description: "keyboards",
          image: "https://i.ibb.co/DPKs9Q3k/Frame-6472.png",
          exploreInfo:
            "Find keyboards that combine speed, comfort, and durability. Whether you prefer mechanical or classic designs, we have the right fit. Improve your typing accuracy and gaming performance. Designed for everyday efficiency.",
        },
        {
          name: "Webcam",
          description: "Webcams",
          image: "https://i.ibb.co/zTSDy2H3/Frame-6475.png",
          exploreInfo:
            "Upgrade your video communication with high-quality webcams. Enjoy sharp image quality and smooth video performance. Perfect for meetings, streaming, and online learning. Look professional in every call.",
        },
      ],
    });

    console.log(`✅ Categories seeded`);

    await prisma.brand.createMany({
      data: [
        { name: "ROG", imageUrl: "https://i.ibb.co/HfDs42Pv/ROG-Logo.png" },
        {
          name: "Logitech",
          imageUrl: "https://i.ibb.co/sdN7xZLL/Logitech-Logo.png",
        },
        { name: "JBL", imageUrl: "https://i.ibb.co/RpBkjc56/JBL-Logo.png" },
        { name: "AOC", imageUrl: "https://i.ibb.co/DgQVsNqz/AOC-Logo.png" },
        { name: "Razer", imageUrl: "https://i.ibb.co/tMvxmw9k/Razer-Logo.png" },
        { name: "Rexus", imageUrl: "https://i.ibb.co/jcSXgmY/Rexus-Logo.png" },
        { name: "no-brand", imageUrl: "" },
      ],
    });

    console.log("✅ Brands seeded");

    const hashedPassword = await bcrypt.hash("test1234", 10);

    await prisma.user.create({
      data: {
        firstName: "Test",
        lastName: "User",
        email: "test@example.com",
        address: "some street 45/32",
        password: hashedPassword,
        avatar: "https://i.ibb.co/0jjGpHKz/indian-5154773.png",
      },
    });

    console.log("✅ User seeded");

    await prisma.product.createMany({
      data: [
        // ---------------------
        // MOUSE (categoryId: 1)
        // ---------------------
        {
          name: "ROG Keris Wireless",
          description: "Lightweight gaming mouse with precision tracking.",
          price: 79.99,
          stock: 50,
          imageUrl: "https://i.ibb.co/wrpj4kCS/Nice-Png-razer-png-2157462.png",
          categoryId: 1,
          brandId: 1, // ROG
        },
        {
          name: "Logitech G305",
          description: "Wireless gaming mouse with HERO sensor.",
          price: 59.99,
          stock: 80,
          imageUrl: "https://i.ibb.co/gFBYZqXz/Image-2.png",
          categoryId: 1,
          brandId: 2, // Logitech
        },
        {
          name: "Razer Viper Mini",
          description: "Ultra-lightweight wired gaming mouse.",
          price: 39.99,
          stock: 120,
          imageUrl: "https://i.ibb.co/KcfYQ8bC/pngaaa-com-5347470.png",
          categoryId: 1,
          brandId: 5, // Razer
        },
        {
          name: "Razer GM500",
          description: "Ergonomic gaming mouse with RGB.",
          price: 49.99,
          stock: 60,
          imageUrl: "https://i.ibb.co/gZrffcgH/pngaaa-com-2910757.png",
          categoryId: 1,
          brandId: 5, // Razer
        },
        {
          name: "Rexus Daxa Pro",
          description: "High-speed mouse with adjustable DPI.",
          price: 34.99,
          stock: 75,
          imageUrl: "https://i.ibb.co/Nd46VMdr/Image.png",
          categoryId: 1,
          brandId: 6, // Rexus
        },

        // ---------------------
        // MONITOR (categoryId: 2)
        // ---------------------
        {
          name: "AOC 24G2U",
          description: "24-inch 144Hz IPS gaming monitor.",
          price: 209.99,
          stock: 40,
          imageUrl: "https://i.ibb.co/sdF5yKZw/pngaaa-com-1241714.png",
          categoryId: 2,
          brandId: 4, // AOC
        },
        {
          name: "ROG Strix XG27AQ",
          description: "27-inch 1440p gaming monitor with HDR.",
          price: 499.99,
          stock: 20,
          imageUrl: "https://i.ibb.co/wFDtNQ6W/Image-3.png",
          categoryId: 2,
          brandId: 1, // ROG
        },
        {
          name: "ROG Display 24",
          description: "Full HD productivity monitor.",
          price: 149.99,
          stock: 70,
          imageUrl: "https://i.ibb.co/bRJpbYDv/Image-5.png",
          categoryId: 2,
          brandId: 1, // Logitech
        },
        {
          name: "Razer Raptor 27",
          description: "Premium 144Hz gaming display.",
          price: 699.99,
          stock: 15,
          imageUrl: "https://i.ibb.co/67Q8DBPq/pngaaa-com-1241817.png",
          categoryId: 2,
          brandId: 5, // Razer
        },
        {
          name: "Rexus Vision 27",
          description: "High-refresh monitor for smooth gameplay.",
          price: 189.99,
          stock: 30,
          imageUrl: "https://i.ibb.co/PG0n8y7M/pngaaa-com-8043265.png",
          categoryId: 2,
          brandId: 6, // Rexus
        },

        // ---------------------
        // HEADPHONE (categoryId: 3)
        // ---------------------
        {
          name: "JBL Quantum 400",
          description: "Immersive gaming headset with surround sound.",
          price: 99.99,
          stock: 50,
          imageUrl: "https://i.ibb.co/JF2SDDMS/Image-6.png",
          categoryId: 3,
          brandId: 3, // JBL
        },
        {
          name: "ROG Delta",
          description: "High-resolution quad DAC gaming headset.",
          price: 169.99,
          stock: 40,
          imageUrl: "https://i.ibb.co/MxjgZX4g/pngaaa-com-4181478.png",
          categoryId: 3,
          brandId: 1, // ROG
        },
        {
          name: "Logitech G Pro X",
          description: "Pro-grade microphone and sound tuning.",
          price: 129.99,
          stock: 65,
          imageUrl: "https://i.ibb.co/4n1fwtyZ/pngaaa-com-904170.png",
          categoryId: 3,
          brandId: 2, // Logitech
        },
        {
          name: "JBL mini portable headset",
          description: "Cooling-gel cushions for long running sessions.",
          price: 79.99,
          stock: 15,
          imageUrl: "https://i.ibb.co/sdZbR6td/pngaaa-com-2434521.png",
          categoryId: 3,
          brandId: 3, // JBL
        },
        {
          name: "Rexus Thundervox",
          description: "RGB gaming headset with powerful bass.",
          price: 49.99,
          stock: 100,
          imageUrl: "https://i.ibb.co/jvK5KXkS/pngaaa-com-904062.png",
          categoryId: 3,
          brandId: 6, // Rexus
        },

        // ---------------------
        // KEYBOARD (categoryId: 4)
        // ---------------------
        {
          name: "Logitech Strix Scope RX",
          description: "Mechanical gaming keyboard.",
          price: 40.99,
          stock: 40,
          imageUrl: "https://i.ibb.co/35JxBc7M/Image-1.png",
          categoryId: 4,
          brandId: 2,
        },
        {
          name: "Logitech G213",
          description: "Durable membrane keyboard with lighting zones.",
          price: 151.99,
          stock: 70,
          imageUrl: "https://i.ibb.co/kVFq6yFb/pngaaa-com-3429402.png",
          categoryId: 4,
          brandId: 2,
        },
        {
          name: "Razer BlackWidow V3",
          description: "Iconic mechanical switches and RGB.",
          price: 139.99,
          stock: 50,
          imageUrl: "https://i.ibb.co/PvhRC7Qr/Image-4.png",
          categoryId: 4,
          brandId: 5,
        },
        {
          name: "AOC Legionare MX5",
          description: "Affordable mechanical keyboard with metal plate.",
          price: 49.99,
          stock: 80,
          imageUrl: "https://i.ibb.co/KcSVkJ9n/pngaaa-com-3429346.png",
          categoryId: 4,
          brandId: 4,
        },
        {
          name: "REDRAGON Typing Pro",
          description: "High quality typing keyboard for gaming.",
          price: 59.99,
          stock: 26,
          imageUrl: "https://i.ibb.co/v4kkZ7d3/pngaaa-com-3026601.png",
          categoryId: 4,
          brandId: 7, // Brandless
        },

        // ---------------------
        // WEBCAM (categoryId: 5)
        // ---------------------
        {
          name: "Logitech C920",
          description: "Full HD webcam with autofocus.",
          price: 69.99,
          stock: 100,
          imageUrl: "https://i.ibb.co/jPjq6vXq/pngaaa-com-2946152.png",
          categoryId: 5,
          brandId: 2,
        },
        {
          name: "AOC Kiyo",
          description: "Webcam with built-in ring light.",
          price: 99.99,
          stock: 40,
          imageUrl: "https://i.ibb.co/FbhyN2Kp/pngaaa-com-4839457.png",
          categoryId: 5,
          brandId: 4,
        },
        {
          name: "Rexus VisionCam",
          description: "HD webcam designed for remote work.",
          price: 49.99,
          stock: 75,
          imageUrl: "https://i.ibb.co/FkJzbsGs/pngaaa-com-4839386.png",
          categoryId: 5,
          brandId: 6,
        },
        {
          name: "JBL StreamCam",
          description: "Camera optimized for streaming and calls.",
          price: 89.99,
          stock: 30,
          imageUrl: "https://i.ibb.co/DPbBycxW/pngaaa-com-8297129.png",
          categoryId: 5,
          brandId: 3,
        },
        {
          name: "Rexus EyeX",
          description: "Affordable webcam with noise reduction.",
          price: 39.99,
          stock: 120,
          imageUrl: "https://i.ibb.co/1fH1t4Wt/pngaaa-com-2946337.png",
          categoryId: 5,
          brandId: 6,
        },
      ],
    });
    console.log("✅ Products seeded");

    console.log("🎉 Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
