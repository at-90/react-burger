import {RootState} from "../../constants/types";

export const selectIngredients = (store: RootState) => store.ingredients;
export const selectComponents = (store: RootState) => store.burgerConstructor.components;
export const selectBuns =  (store: RootState) => store.burgerConstructor.buns;
export const selectUser = (store: RootState) => store.user;
// export const selectIsEmailSend = (store: RootState) => store.user.isEmailSend;
// export const selectUserError = (store: RootState) => store.user.error;
export const selectAppMessage = (store: RootState) => store.app.message;

export const selectTotalSum = (store: RootState) => store.burgerConstructor.totalSum;
export const selectOrderDetails = (store: RootState) => store.orderDetails;