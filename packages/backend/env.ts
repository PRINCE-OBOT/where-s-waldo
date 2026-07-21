import "dotenv/config";
// const required = ["DATABASE_URL", "TEST_DATABASE_URL", "PORT"];
const required = ["DATABASE_URL", 'FRONTEND_URL'];

const errors = [];

for (const key of required) {
  if (!process.env[key]) {
    errors.push(key);
  }
}

if (errors.length !== 0)
  throw new Error(
    `Missing required environment variable: "${errors.join(",")}"`
  );

// export const env = {
//   DATABASE_URL: process.env.DATABASE_URL,
//   TEST_DATABASE_URL: process.env.TEST_DATABASE_URL,
//   PORT: process.env.PORT,
//   NODE_ENV: process.env.NODE_ENV
// };
export const env = {
  DATABASE_URL: process.env.DATABASE_URL,
  FRONTEND_URL: process.env.FRONTEND_URL,
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || '',
  PORT: process.env.PORT || '3000',
  NODE_ENV: process.env.NODE_ENV
};
