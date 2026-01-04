const deleteFromCart = async (id: number) => {
  const res = await fetch(`/api/cart/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to remove product from cart");

  return true;
};
export default deleteFromCart;
