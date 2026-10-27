# RONDA 307, 23.ª · Andoni: «revisa toda la web en busca de puntos en medio y líneas largas para quitarlas, es muy AI slop».
# Reescribe SOLO el interior de las cadenas de los archivos de datos: « · » → coma; raya → dos puntos (tras una etiqueta corta) o coma (en una frase);
# rangos de números con raya → «a» (en inglés «to»); «2–3» → «2 o 3». Se respetan «N·m» y los patrones decorativos (cadenas casi sin letras).
import re, sys, json
def limpia(t, en):
    if re.fullmatch(r'[\W_x·~]+', t) or len(re.sub(r'[^A-Za-zÁÉÍÓÚáéíóúñÑ]', '', t)) < 2 and '·' in t: return t
    t = t.replace('N·m', 'N⁠m')  # protege la unidad
    # rangos numéricos: 2–3 líneas → 2 o 3; 55–65 % → 55 a 65 %
    t = re.sub(r'(\d)\s?[–—]\s?(\d+)(\s(?:líneas|lines))', lambda m: f"{m.group(1)} {'or' if en else 'o'} {m.group(2)}{m.group(3)}", t)
    t = re.sub(r'(\d+(?:[.,]\d+)?)\s?[–]\s?(\d)', lambda m: f"{m.group(1)} {'to' if en else 'a'} {m.group(2)}", t)
    # meses: diciembre – febrero → de diciembre a febrero
    t = re.sub(r'\b([a-záéíóú]+)\s[–—]\s([a-záéíóú]+)\b', lambda m: (f"{m.group(1)} to {m.group(2)}" if en else f"de {m.group(1)} a {m.group(2)}") if m.group(1) in MESES and m.group(2) in MESES else m.group(0), t)
    # incisos con raya pegada —así— → , así,
    t = re.sub(r'\s?—([^—]{1,80})—', r', \1,', t)
    # raya con espacios: tras etiqueta corta, dos puntos; si no, coma
    def raya(m):
        antes = t[:m.start()]
        cab = re.split(r'[.!?;:]\s', antes)[-1]
        return ': ' if len(cab) <= 28 else ', '
    t = re.sub(r'\s[—–]\s', raya, t)
    t = re.sub(r'(?<=\w)—(?=\w)', ', ', t)
    # puntos en medio: separador → coma (y «a·b·c» sin espacios → «a, b, c»)
    t = re.sub(r'\s·\s', ', ', t)
    t = re.sub(r'(?<=\d)·(?=\d)', ', ', t)
    t = t.replace(' ·', ',').replace('· ', '')
    t = t.replace('N⁠m', 'N·m')
    return re.sub(r',\s*,', ',', t)
MESES = {'enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre','january','february','march','april','may','june','july','august','september','october','november','december'}
for f in sys.argv[1:]:
    s = open(f, encoding='utf-8').read(); en = '.en.' in f or f.endswith('cms.json'); n = 0
    def sub(m):
        global n
        q, body = m.group(1), m.group(2)
        if not re.search(r'[·—–]', body): return m.group(0)
        nb = limpia(body, en)
        if nb != body: n += 1
        return q + nb + q
    if f.endswith('.json'):
        s2 = re.sub(r'(")((?:[^"\\\n]|\\.)*)(")', lambda m: '"' + (limpia(m.group(2), en) if re.search(r'[·—–]', m.group(2)) else m.group(2)) + '"', s)
    else:
        # cadenas '…', "…" y `…` de una línea, fuera de comentarios de línea
        out = []
        for ln in s.split('\n'):
            cod, com = ln, ''
            mm = re.search(r'(^|\s)//', ln)
            if mm and ln.count("'", 0, mm.start()) % 2 == 0 and ln.count('`', 0, mm.start()) % 2 == 0: cod, com = ln[:mm.start()], ln[mm.start():]
            cod = re.sub(r"(')((?:[^'\\\n]|\\.)*)'|(\")((?:[^\"\\\n]|\\.)*)\"|(`)((?:[^`\\\n]|\\.)*)`",
                         lambda m: (lambda q, b: q + (limpia(b, en) if re.search(r'[·—–]', b) else b) + q)(*( (m.group(1), m.group(2)) if m.group(1) else (m.group(3), m.group(4)) if m.group(3) else (m.group(5), m.group(6)) )), cod)
            out.append(cod + com)
        s2 = '\n'.join(out)
    open(f, 'w', encoding='utf-8').write(s2)
    print(f, 'cambios' if s2 != s else 'igual')
