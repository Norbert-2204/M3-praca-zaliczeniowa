import "dotenv/config";
import { PrismaClient } from "@prisma/client";
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
        { name: "Other", imageUrl: "" },
      ],
    });

    console.log("✅ Brands seeded");

    const hashedPassword = await bcrypt.hash("test1234", 10);

    await prisma.user.create({
      data: {
        firstName: "Jan",
        lastName: "Kowalski",
        email: "test@example.com",
        address: "some street 45/32",
        password: hashedPassword,
        phone: "123456789",
        region: "PL",
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
          description:
            "The ROG Keris Wireless is a high-performance gaming mouse designed for precision and speed. Its lightweight build allows effortless control, while the advanced sensor ensures accurate tracking in fast-paced games. Ergonomic shape and customizable buttons make it perfect for extended gaming sessions.",
          price: 79.99,
          stock: 50,
          imageUrl: "https://i.ibb.co/wrpj4kCS/Nice-Png-razer-png-2157462.png",
          categoryId: 1,
          brandId: 1, // ROG
        },
        {
          name: "Logitech G305",
          description:
            "Logitech G305 is a wireless gaming mouse featuring the HERO sensor for exceptional accuracy and speed. Its compact and lightweight design ensures comfort for long gaming sessions. The responsive buttons and reliable wireless connection give you the competitive edge in every match.",
          price: 59.99,
          stock: 80,
          imageUrl: "https://i.ibb.co/gFBYZqXz/Image-2.png",
          categoryId: 1,
          brandId: 2, // Logitech
        },
        {
          name: "Razer Viper Mini",
          description:
            "The Razer Viper Mini is an ultra-lightweight wired gaming mouse designed for swift and precise movements. Its ambidextrous design accommodates all grip styles, while the high-precision sensor ensures flawless tracking, making it ideal for gamers seeking speed, accuracy, and comfort in one device.",
          price: 39.99,
          stock: 120,
          imageUrl: "https://i.ibb.co/KcfYQ8bC/pngaaa-com-5347470.png",
          categoryId: 1,
          brandId: 5, // Razer
        },
        {
          name: "Razer GM500",
          description:
            "The Razer GM500 combines ergonomic comfort with advanced RGB lighting to enhance gaming performance. Its smooth tracking sensor delivers precise movements, while the durable buttons withstand intense gameplay. Perfect for competitive gamers who demand accuracy, style, and reliability in one mouse.",
          price: 49.99,
          stock: 60,
          imageUrl: "https://i.ibb.co/gZrffcgH/pngaaa-com-2910757.png",
          categoryId: 1,
          brandId: 5, // Razer
        },
        {
          name: "Rexus Daxa Pro",
          description:
            "Rexus Daxa Pro is a high-speed gaming mouse built for gamers seeking precision and control. With adjustable DPI settings, ergonomic design, and responsive buttons, it ensures comfort during marathon gaming sessions. Its durable construction and smooth sensor make it a reliable companion for competitive play.",
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
          description:
            "The AOC 24G2U is a 24-inch IPS gaming monitor delivering a smooth 144Hz refresh rate for competitive gameplay. Its wide viewing angles, vivid colors, and low input lag make every frame crisp and responsive. Designed for extended sessions, it combines ergonomic adjustments and a sleek, gamer-friendly aesthetic.",
          price: 209.99,
          stock: 40,
          imageUrl: "https://i.ibb.co/sdF5yKZw/pngaaa-com-1241714.png",
          categoryId: 2,
          brandId: 4, // AOC
        },
        {
          name: "ROG Strix XG27AQ",
          description:
            "ROG Strix XG27AQ is a 27-inch 1440p gaming monitor with HDR support, providing stunning visuals and vibrant colors. Its high refresh rate ensures smooth motion, while adaptive sync eliminates screen tearing. The adjustable stand and customizable RGB lighting make it ideal for immersive and comfortable gaming setups.",
          price: 499.99,
          stock: 20,
          imageUrl: "https://i.ibb.co/wFDtNQ6W/Image-3.png",
          categoryId: 2,
          brandId: 1, // ROG
        },
        {
          name: "ROG Display 24",
          description:
            "The ROG Display 24 is a Full HD monitor designed for productivity and casual gaming. With a clear IPS panel, fast response time, and adjustable ergonomics, it offers excellent color accuracy and comfortable viewing angles. Ideal for multitasking, content creation, or enjoying games with crisp visuals and smooth performance.",
          price: 149.99,
          stock: 70,
          imageUrl: "https://i.ibb.co/bRJpbYDv/Image-5.png",
          categoryId: 2,
          brandId: 1, // ROG
        },
        {
          name: "Razer Raptor 27",
          description:
            "Razer Raptor 27 is a premium 144Hz gaming monitor delivering ultra-smooth performance with vivid, high-contrast visuals. Its sleek, slim design and customizable RGB lighting enhance any gaming setup. Equipped with adaptive sync technology and ergonomic adjustments, it ensures responsive gameplay and a comfortable, immersive experience.",
          price: 699.99,
          stock: 15,
          imageUrl: "https://i.ibb.co/67Q8DBPq/pngaaa-com-1241817.png",
          categoryId: 2,
          brandId: 5, // Razer
        },
        {
          name: "Rexus Vision 27",
          description:
            "The Rexus Vision 27 is a high-refresh monitor optimized for smooth gameplay and productivity. Its 27-inch panel delivers vibrant colors and sharp details, while ergonomic features provide comfortable viewing. Designed for gamers and multitaskers alike, it offers precise tracking, minimal motion blur, and a reliable, visually immersive experience.",
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
          description:
            "JBL Quantum 400 delivers immersive gaming sound with precise directional audio for competitive advantage. Its comfortable over-ear design and adjustable headband allow long gaming sessions without fatigue. Equipped with a detachable boom mic and customizable audio profiles, it ensures crystal-clear communication and rich, powerful sound.",
          price: 99.99,
          stock: 50,
          imageUrl: "https://i.ibb.co/JF2SDDMS/Image-6.png",
          categoryId: 3,
          brandId: 3, // JBL
        },
        {
          name: "ROG Delta",
          description:
            "ROG Delta is a high-resolution gaming headset featuring a quad DAC for unmatched audio fidelity. With customizable RGB lighting and an ergonomic design, it provides long-lasting comfort. Its advanced microphone ensures clear communication, making it perfect for competitive gaming and immersive audio experiences across every game and media.",
          price: 169.99,
          stock: 40,
          imageUrl: "https://i.ibb.co/MxjgZX4g/pngaaa-com-4181478.png",
          categoryId: 3,
          brandId: 1, // ROG
        },
        {
          name: "Logitech G Pro X",
          description:
            "Logitech G Pro X headset delivers pro-grade audio with finely tuned sound profiles. Its durable construction and memory foam ear pads offer long-term comfort for extended sessions. Equipped with a detachable Blue VO!CE microphone, it provides studio-quality voice clarity, making it ideal for gamers and content creators who demand precision and immersive sound.",
          price: 129.99,
          stock: 65,
          imageUrl: "https://i.ibb.co/4n1fwtyZ/pngaaa-com-904170.png",
          categoryId: 3,
          brandId: 2, // Logitech
        },
        {
          name: "JBL mini portable headset",
          description:
            "JBL Mini Portable Headset offers lightweight, on-the-go audio with cooling-gel cushions for maximum comfort. Perfect for mobile gaming or commuting, it delivers clear sound and balanced bass. Its compact design ensures easy portability, while its durable build and intuitive controls provide an effortless and enjoyable listening experience wherever you are.",
          price: 79.99,
          stock: 15,
          imageUrl: "https://i.ibb.co/sdZbR6td/pngaaa-com-2434521.png",
          categoryId: 3,
          brandId: 3, // JBL
        },
        {
          name: "Rexus Thundervox",
          description:
            "Rexus Thundervox RGB gaming headset provides powerful bass and immersive sound for intense gaming sessions. Its vibrant RGB lighting enhances your setup, while soft ear cushions and adjustable headband offer long-term comfort. Designed for precision and style, it ensures clear communication and deep audio, making it perfect for both casual and competitive players.",
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
          description:
            "The Logitech Strix Scope RX is a mechanical gaming keyboard designed for precision and durability. Featuring responsive switches, customizable RGB lighting, and a comfortable typing experience, it allows gamers to execute commands quickly while maintaining long-term comfort, making it ideal for intense gaming sessions and daily use.",
          price: 40.99,
          stock: 40,
          imageUrl: "https://i.ibb.co/35JxBc7M/Image-1.png",
          categoryId: 4,
          brandId: 2,
        },
        {
          name: "Logitech G213",
          description:
            "Logitech G213 is a durable membrane keyboard with dedicated lighting zones that enhance the gaming experience. It offers quiet keystrokes, spill resistance, and programmable keys, allowing gamers to customize controls while enjoying consistent performance during extended gaming sessions or everyday typing tasks.",
          price: 151.99,
          stock: 70,
          imageUrl: "https://i.ibb.co/kVFq6yFb/pngaaa-com-3429402.png",
          categoryId: 4,
          brandId: 2,
        },
        {
          name: "Razer BlackWidow V3",
          description:
            "Razer BlackWidow V3 is a legendary mechanical keyboard equipped with Razer Green switches for tactile feedback and speed. Featuring customizable RGB lighting, durable keycaps, and ergonomic design, it is perfect for professional gamers seeking fast response, reliability, and a visually immersive setup for every gaming scenario.",
          price: 139.99,
          stock: 50,
          imageUrl: "https://i.ibb.co/PvhRC7Qr/Image-4.png",
          categoryId: 4,
          brandId: 5,
        },
        {
          name: "AOC Legionare MX5",
          description:
            "AOC Legionare MX5 is an affordable mechanical keyboard with a solid metal plate and responsive switches. It offers reliable performance for gaming and typing, combined with backlit keys for enhanced visibility in low-light conditions, making it a versatile and sturdy option for both beginners and competitive players.",
          price: 49.99,
          stock: 80,
          imageUrl: "https://i.ibb.co/KcSVkJ9n/pngaaa-com-3429346.png",
          categoryId: 4,
          brandId: 4,
        },
        {
          name: "REDRAGON Typing Pro",
          description:
            "REDRAGON Typing Pro is a high-quality keyboard built for gaming and productivity. Featuring tactile mechanical switches, customizable backlighting, and ergonomic key layout, it delivers precision and comfort for long typing or gaming sessions. Its robust construction ensures durability while enhancing the overall desktop setup.",
          price: 59.99,
          stock: 26,
          imageUrl: "https://i.ibb.co/v4kkZ7d3/pngaaa-com-3026601.png",
          categoryId: 4,
          brandId: 7,
        },

        // ---------------------
        // WEBCAM (categoryId: 5)
        // ---------------------
        {
          name: "Logitech C920",
          description:
            "The Logitech C920 is a Full HD webcam with autofocus, designed for clear video calls, streaming, and content creation. It delivers crisp image quality, accurate colors, and smooth performance in various lighting conditions, making it perfect for professional meetings, online classes, and high-quality streaming setups.",
          price: 69.99,
          stock: 100,
          imageUrl: "https://i.ibb.co/jPjq6vXq/pngaaa-com-2946152.png",
          categoryId: 5,
          brandId: 2,
        },
        {
          name: "AOC Kiyo",
          description:
            "AOC Kiyo is a webcam featuring a built-in ring light that evenly illuminates your face for video calls and streaming. Offering high-definition video, adjustable brightness, and easy setup, it ensures professional-quality visuals for streaming, online meetings, and content creation even in low-light environments.",
          price: 99.99,
          stock: 40,
          imageUrl: "https://i.ibb.co/FbhyN2Kp/pngaaa-com-4839457.png",
          categoryId: 5,
          brandId: 4,
        },
        {
          name: "Rexus VisionCam",
          description:
            "Rexus VisionCam is a high-definition webcam designed for remote work, video conferencing, and online streaming. It provides clear, detailed images and accurate color reproduction, ensuring professional-looking video for work meetings or casual streaming. Its compact design makes it easy to mount and transport.",
          price: 49.99,
          stock: 75,
          imageUrl: "https://i.ibb.co/FkJzbsGs/pngaaa-com-4839386.png",
          categoryId: 5,
          brandId: 6,
        },
        {
          name: "JBL StreamCam",
          description:
            "JBL StreamCam is optimized for streaming and video calls, delivering high-resolution video with natural colors. With an integrated microphone and plug-and-play setup, it offers convenience and quality for content creators, online meetings, and live streaming, ensuring your audience sees and hears you clearly every time.",
          price: 89.99,
          stock: 30,
          imageUrl: "https://i.ibb.co/DPbBycxW/pngaaa-com-8297129.png",
          categoryId: 5,
          brandId: 3,
        },
        {
          name: "Rexus EyeX",
          description:
            "Rexus EyeX is an affordable webcam with HD resolution and noise reduction, ideal for online meetings, streaming, and remote learning. Its compact design ensures easy placement, while providing clear video and smooth performance, making it a reliable option for users looking for quality and convenience at a budget-friendly price.",
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
