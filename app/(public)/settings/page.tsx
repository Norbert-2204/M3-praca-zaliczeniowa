import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProtectPage from "@/components/ProtectPage";
import UserClient from "@/components/settings/UserClient";
import { UserPanelProvider } from "@/context/ProfileContext";
import { getUserId } from "../../lib/getId";
import { prisma } from "../../lib/prisma";

interface OrderItem {
  id: number;
  productName: string;
  quantity: number;
  priceAtPurchase: number;
  productProtection: boolean;
}

interface Order {
  id: number;
  orderNumber: string | null;
  createdAt: string;
  orderItems: OrderItem[];
}

interface UserWithOrders {
  id: number;
  name: string;
  email: string;
  orders: Order[];
}

const UserProfilePage = async () => {
  const userId = await getUserId();
  if (!userId) return <div>Please log in</div>;

  const rawUser = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      orders: {
        orderBy: { createdAt: "desc" },
        include: { orderItems: true },
      },
    },
  });

  if (!rawUser) return <div>User not found</div>;
  const user: UserWithOrders = {
    id: rawUser.id,
    name: `${rawUser.firstName ?? ""} ${rawUser.lastName ?? ""}`.trim(),
    email: rawUser.email,
    orders: rawUser.orders.map((order) => ({
      id: order.id,
      orderNumber: order.orderNumber,
      createdAt: order.createdAt.toISOString(),
      orderItems: order.orderItems.map((item) => ({
        id: item.id,
        productName: item.productName,
        quantity: item.quantity,
        priceAtPurchase: item.priceAtPurchase,
        productProtection: item.productProtection,
      })),
    })),
  };
  return (
    <>
      <ProtectPage>
        <Header />
        <UserPanelProvider>
          <UserClient user={user} />
        </UserPanelProvider>
        <Footer />
      </ProtectPage>
    </>
  );
};
export default UserProfilePage;
