const keys = ["VITE_API_URL"];

const env = keys.reduce(
  (acc, key) => {
    acc[key] = import.meta.env[key];
    return acc;
  },
  {} as Record<string, string>
);

export default env;
