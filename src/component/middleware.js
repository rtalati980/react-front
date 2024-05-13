export const saveCartToSessionStorage = store => next => action => {
    const result = next(action);
    const { cart } = store.getState();
    sessionStorage.setItem('cart', JSON.stringify(cart));
    return result;
  };