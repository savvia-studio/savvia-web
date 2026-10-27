# Igual que limpiar.py, para .astro: cadenas del código y texto del marcado; nunca comentarios ni <style>
import re, sys, importlib.util
spec = importlib.util.spec_from_file_location('l', 'tools/r307-slop/limpiar.py')
src = open('tools/r307-slop/limpiar.py').read().split('\nfor f in sys.argv[1:]:')[0]
ns = {}; exec(src, ns); limpia = ns['limpia']
LIT = re.compile(r"(')((?:[^'\\\n]|\\.)*)'|(\")((?:[^\"\\\n]|\\.)*)\"|(`)((?:[^`\\\n]|\\.)*)`")
def lits(cod, en):
    return LIT.sub(lambda m: (lambda q, b: q + (limpia(b, en) if re.search(r'[·—–]', b) else b) + q)(*((m.group(1), m.group(2)) if m.group(1) else (m.group(3), m.group(4)) if m.group(3) else (m.group(5), m.group(6)))), cod)
def trozo(t, en):
    # protege comentarios (/* */, //, <!-- -->, {/* */}) y <style>
    partes = re.split(r'(<style[\s\S]*?</style>|<!--[\s\S]*?-->|/\*[\s\S]*?\*/)', t)
    out = []
    for i, p in enumerate(partes):
        if i % 2: out.append(p); continue
        lineas = []
        for ln in p.split('\n'):
            cod, com = ln, ''
            mm = re.search(r'(^|[\s;{(])//(?!/)', ln)
            if mm and not re.search(r'https?:$', ln[:mm.end() - 2]) and ln.count("'", 0, mm.start()) % 2 == 0 and ln.count('`', 0, mm.start()) % 2 == 0 and ln.count('"', 0, mm.start()) % 2 == 0:
                cod, com = ln[:mm.start() + len(mm.group(1))], ln[mm.start() + len(mm.group(1)):]
            cod = lits(cod, en)
            # texto del marcado entre etiquetas
            cod = re.sub(r'>([^<>{}]*[·—–][^<>{}]*)<', lambda m: '>' + limpia(m.group(1), en) + '<', cod)
            # separadores pegados a expresiones: «} · {», «} · texto», «texto · {»
            cod = re.sub(r'\}\s·\s', '}, ', cod); cod = re.sub(r'(?<=[\wáéíóú»)])\s·\s\{', ', {', cod)
            lineas.append(cod + com)
        out.append('\n'.join(lineas))
    return ''.join(out)
for f in sys.argv[1:]:
    s = open(f, encoding='utf-8').read(); s2 = trozo(s, False)
    open(f, 'w', encoding='utf-8').write(s2); print(f, 'cambios' if s2 != s else 'igual')
