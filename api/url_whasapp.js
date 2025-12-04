const url_whasapp =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL_WHATSAPP_PROD
    : process.env.NEXT_PUBLIC_API_URL_WHATSAPP_DEV;

export default url_whasapp;
