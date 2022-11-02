export const configuration = () => ({
  environment: process.env.NODE_ENV,
  port: parseInt(process.env.PORT || "3000", 10),
  dbName: process.env.NX_DB_NAME,
  connectionString: process.env.NX_CONNECTION_STRING
});
