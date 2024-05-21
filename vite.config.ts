import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const serverUrl = "http://154.201.90.189:8080"

  return {
    appType: 'mpa',
    plugins: [
      vue(),
      svgLoader({
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeViewBox: false
                }
              }
            }
          ]
        }
      })
    ],
    server: {
      proxy: serverUrl ? {
        '/api': serverUrl,
        '/detail': serverUrl,
        '/i': serverUrl,
        '/json/stats.json': serverUrl,
        '/map': serverUrl
      } : undefined
    }
  }
})
