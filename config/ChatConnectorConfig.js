export default process.env.NODE_ENV === 'development'
  ? {
      appId: '',
      appPassword: '',
    }
  : {
      appId: process.env.MICROSOFT_APP_ID,
      appPassword: process.env.MICROSOFT_APP_PASSWORD,
    };
