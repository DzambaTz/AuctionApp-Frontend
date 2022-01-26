import api from "../Helpers/api";

const createCheckoutSession = (itemPaymentData) => {
  return api.post("v1/payment/create-checkout-session", itemPaymentData);
};

export default {
  createCheckoutSession,
};
