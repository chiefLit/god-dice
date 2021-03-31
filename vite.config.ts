import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import vitePluginImp from "vite-plugin-imp";
import { existsSync } from "fs";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'pages': path.resolve(__dirname, 'src/pages'),
    }
  },
  plugins: [
    reactRefresh(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd-mobile',
          style(name) {
            const path = `antd-mobile/lib/${name}/style/index.css`
            const exists = existsSync(__dirname + '/node_modules/' + path)
            return path
          }
        }
      ]
    })
  ]
})
