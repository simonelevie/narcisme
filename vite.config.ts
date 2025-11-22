import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Laad environment variabelen zodat we ze kunnen gebruiken in de define
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Dit zorgt ervoor dat process.env.API_KEY werkt in je browser code
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
      // We geven ActiveCampaign keys NIET door aan de browser voor veiligheid,
      // die worden alleen door de serverless functions (api folder) gebruikt.
    }
  }
})