interface Config {
  api: string;
}

export default {
  api: import.meta.env.VITE_API || '',
} as Config;
