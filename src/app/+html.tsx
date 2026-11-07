import { ScrollViewStyleReset, useServerDocumentContext } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

// Molde HTML da versão web (só no navegador). Transforma o site em app instalável (PWA):
// manifesto, ícones, tela cheia no iPhone (Adicionar à Tela de Início) e o service worker que guarda o
// conteúdo para uso sem internet. O caminho base acompanha experiments.baseUrl do app.json.
const BASE = '/app.book.med.aeroespacial';

// SDK 58: headNodes e bodyNodes trazem os estilos e os scripts do app; sem eles a página não carrega.
export default function Root({ children }: PropsWithChildren) {
  const { bodyAttributes, bodyNodes, htmlAttributes, headNodes } = useServerDocumentContext();
  return (
    <html lang="pt-BR" {...htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover" />
        <meta name="description" content="App-book de medicina aeroespacial: como o corpo humano reage à altitude, à aviação e ao espaço." />
        <meta name="theme-color" content="#03050A" />
        <link rel="manifest" href={`${BASE}/manifest.webmanifest`} />
        <link rel="apple-touch-icon" href={`${BASE}/icones/apple-touch-icon.png`} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Papos de Altitude" />
        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: 'body{background-color:#03050A;}html,body,#root{max-width:100%;overflow-x:hidden;overflow-x:clip;}' }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator&&location.hostname!=='localhost'&&location.hostname!=='127.0.0.1'){addEventListener('load',function(){navigator.serviceWorker.register('${BASE}/sw.js',{scope:'${BASE}/'}).catch(function(){})})}`,
          }}
        />
        {headNodes}
      </head>
      <body {...bodyAttributes}>
        {children}
        {bodyNodes}
      </body>
    </html>
  );
}
