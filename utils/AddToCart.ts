export const addToCart = async (productId: number, quantity: number = 1) => {
  const res = await fetch("/api/cart/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, quantity }),
  });

  const data = await res.json();
  return { ...data, status: res.status };
};

export const updateQuantity = async (cartItemId: number, delta: number) => {
  const res = await fetch(`/api/cart/quantity`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cartItemId, delta }),
  });
  if (!res.ok) throw new Error("Failed to update quantity");
  return res.json();
};
