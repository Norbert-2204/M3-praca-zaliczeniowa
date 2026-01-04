export const addToCart = async (productId: number, quantity: number = 1) => {
  const res = await fetch("/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId,
      quantity,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to add product to cart");
  }

  return res.json();
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
