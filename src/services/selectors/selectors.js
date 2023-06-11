export const selectIngredients = store => store.ingredients;
export const selectComponents = store => store.burgerConstructor.components;
export const selectBuns =   store => store.burgerConstructor.buns;
export const selectUser = store => store.user.user;
export const selectIsEmailSend = store => store.user.isEmailSend;
export const selectUserError = store => store.user.error;
export const selectAppMessage = store => store.app.message;