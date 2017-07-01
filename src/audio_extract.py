import glob
import json

audios = []
for f in glob.glob('../public/audios/*'):
    audios.append(f.split('/')[3])

with open('audios.json', 'w', encoding='utf-8') as out:
    json.dump(audios, out, ensure_ascii=False)
