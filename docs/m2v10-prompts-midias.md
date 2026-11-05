# M2V10 · Prompts de mídias (versão editorial 05/11/2026)

Os arquivos finais devem ser gerados e aprovados pelo autor. Somente depois entram em `assets/images/topicos` e `assets/videos`; não criar `require` sem arquivo real. Todos os personagens são fictícios, as cenas são civis e as imagens têm proporção 16:9.

## m2v10-1-cabine.jpg

```text
Photorealistic premium editorial photograph inside a modern civilian airliner cabin at cruising altitude. A fictional adult traveler discreetly resting a hand on the abdomen because of mild bloating, seated upright beside the window, warm natural window light, respectful non-dramatic atmosphere, accurate aircraft proportions, no identifiable airline, 16:9. No text, no logos, no badges, no insignia, no epaulettes, no name tags, no readable screens, no brands.
```

## m2v10-1-corredor.jpg

```text
Photorealistic cinematic civilian passenger cabin, fictional adult traveler walking slowly along the aisle when seat-belt signs are off, holding a clear unbranded water bottle, other fictional passengers seated, refined ambient lighting, realistic interiors, balanced composition, 16:9. No text, no logos, no badges, no insignia, no epaulettes, no name tags, no readable screens, no brands.
```

## m2v10-2-refeicao.jpg

```text
Cinematic close-up of a fictional adult airline passenger having a small unbranded light meal, setting aside a heavy dish and remaining seated upright, subtle storytelling about reflux prevention, warm cabin window light, contemporary premium editorial healthcare photography, 16:9. No text, no logos, no badges, no insignia, no epaulettes, no name tags, no readable screens, no brands.
```

## m2v10-2-consulta.jpg

```text
Premium healthcare editorial photograph: fictional middle-aged patient discussing stomach discomfort with a fictional physician in a modern discreet clinic, anatomical examination implied without visible writing, empathetic professional interaction, muted neutral interior, filmic natural light, no readable monitors, 16:9. No text, no logos, no badges, no insignia, no epaulettes, no name tags, no readable screens, no brands.
```

## m2v10-3-hidratacao.jpg

```text
Photorealistic cinematic close-up in a civilian aircraft cabin: fictional adult traveler holds a clear drinking glass and a transparent unbranded water bottle beside a simple snack, theme of careful hydration when recovering from bowel symptoms, realistic hands and materials, daylight, 16:9. No text, no logos, no badges, no insignia, no epaulettes, no name tags, no readable screens, no brands.
```

## m2v10-3-acompanhamento.jpg

```text
Premium editorial clinic photography with fictional gastroenterologist and fictional patient discussing stable inflammatory bowel disease, relaxed attentive body language, neutral office interior, no visible documents with writing, natural diffused light, medically credible, 16:9. No text, no logos, no badges, no insignia, no epaulettes, no name tags, no readable screens, no brands.
```

## m2v10-4-avaliacao.jpg

```text
Photorealistic premium medical documentary scene: fictional hepatologist examining the abdomen of a fictional adult patient on a clinical couch, quiet modern outpatient room, discreet emphasis on liver assessment, calm professional care, soft daylight, no readable medical interfaces, 16:9. No text, no logos, no badges, no insignia, no epaulettes, no name tags, no readable screens, no brands.
```

## m2v10-4-tratamento.jpg

```text
Cinematic healthcare editorial still life with fictional adult patient and physician reviewing a few completely unlabeled medicine containers and a plain glass of water, focus on medication planning for chronic liver disease, sophisticated deep neutral background, human hands in frame, 16:9. No text, no logos, no badges, no insignia, no epaulettes, no name tags, no readable screens, no brands.
```

## m2v10-5-vesicula.jpg

```text
Premium photorealistic clinical consultation: fictional physician and adult patient discussing recurrent discomfort near right upper abdomen, neutral medical examination room, fictional ultrasound transducer resting unused in background, unmarked and unreadable dark monitor, soft cinematic light, 16:9. No text, no logos, no badges, no insignia, no epaulettes, no name tags, no readable screens, no brands.
```

## m2v10-5-pancreas.jpg

```text
Respectful medically plausible cinematic hospital photograph: fictional adult with acute abdominal pain resting on a bed under observation by a fictional nurse in neutral unbranded scrubs, no gore, no graphic pathology, subtle urgency without sensationalism, moody controlled lighting, 16:9. No text, no logos, no badges, no insignia, no epaulettes, no name tags, no readable screens, no brands.
```

## m2v10-6-recuperacao.jpg

```text
Premium photorealistic hospital recovery scene: fictional adult patient resting comfortably after abdominal surgery, modest gown and covered abdomen, fictional clinician checks general recovery, no exposed wounds, a calm modern room, realistic gentle natural daylight, 16:9. No text, no logos, no badges, no insignia, no epaulettes, no name tags, no readable screens, no brands.
```

## m2v10-6-reabilitacao.jpg

```text
Cinematic healthcare editorial photograph: fictional adult patient recovering after abdominal surgery walking gently in a quiet bright hospital corridor with a fictional healthcare professional nearby, unbranded plain clothing and surroundings, confident cautious movement, visual emphasis on functional recovery, 16:9. No text, no logos, no badges, no insignia, no epaulettes, no name tags, no readable screens, no brands.
```

## m2v10-gas-cabine.mp4

```text
Eight-second silent photorealistic cinematic single continuous shot inside an unbranded modern civilian airline cabin during a smooth climb. Fictional adult passenger feels mild abdominal bloating, rests a hand lightly over the stomach, shifts to a more comfortable upright posture, and relaxes while looking toward the window. Slow subtle push-in; no transitions, no exaggerated distress, no anatomical effects, no audio, 16:9. No text, no logos, no badges, no insignia, no epaulettes, no name tags, no readable screens, no brands.
```

Tratamento após a chegada dos arquivos:

```bash
convert entrada.jpg -resize '1600x893^' -gravity center -extent 1600x893 -strip -interlace Plane -quality 82 assets/images/topicos/m2v10-1-cabine.jpg
ffmpeg -i entrada.mp4 -an -c:v libx264 -preset veryfast -crf 24 -pix_fmt yuv420p -movflags +faststart assets/videos/m2v10-gas-cabine.mp4
```

Se vier uma foto em vez do vídeo, montar 8 s com zoompan lento, sem áudio, na resolução 16:9. Conferir visualmente e desfocar com borda suave qualquer texto, insígnia, marca ou tela legível antes de integrar.
