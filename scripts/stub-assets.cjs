// Stub para rodar os dados fora do Metro: require de imagem/vídeo devolve o nome do arquivo.
for (const e of ['.jpg', '.jpeg', '.png', '.webp', '.mp4']) require.extensions[e] = (m, f) => { m.exports = f.split('/').pop(); };
