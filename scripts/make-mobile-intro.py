"""Build a portrait (mobile) version of merangkai.json by re-laying out the top-level layers.

Usage: python3 scripts/make-mobile-intro.py <in.json> <out.json> [curtain_scale] [logo_y] [text_y] [text_scale]
"""
import json, sys

src, out = sys.argv[1], sys.argv[2]
W, H = 720, 1560
d = json.load(open(src))
OW, OH = d['w'], d['h']

args = [float(a) for a in sys.argv[3:]]
CURTAIN_K = args[0] if len(args) > 0 else W / 2 / 355   # two 355px curtains fill the width
LOGO_Y = args[1] if len(args) > 1 else 990
TEXT_Y = args[2] if len(args) > 2 else 1213
TEXT_K = args[3] if len(args) > 3 else 1.0
LOGO_K = args[4] if len(args) > 4 else 1.25
BAND_H = 156

d['w'], d['h'] = W, H
d['nm'] = 'Main Scene (Mobile)'
L = {l['ind']: l for l in d['layers']}


def setk(layer, prop, val):
    layer['ks'][prop] = {'a': 0, 'k': val}


def rect_path(w, h):
    return {'c': True,
            'i': [[0, -0.01], [0, 0], [0.01, 0], [0, 0], [0, 0.01], [0, 0], [-0.01, 0], [0, 0]],
            'o': [[0, 0], [0, 0.01], [0, 0], [-0.01, 0], [0, 0], [0, -0.01], [0, 0], [0.01, 0]],
            'v': [[w, 0.01], [w, h - 0.01], [w - 0.01, h], [0.01, h], [0, h - 0.01], [0, 0.01], [0.01, 0], [w - 0.01, 0]]}


# --- Background (ind 8): resize the red rect to the new canvas
bg = L[8]
setk(bg, 'a', [W / 2, H / 2]); setk(bg, 'p', [W / 2, H / 2])
bg['shapes'][0]['ks']['k'] = rect_path(W, H)

# --- Curtains: hang side by side across the top. Left = ind 4, right (mirrored) = ind 3
k = CURTAIN_K
cw = 355 * k
cx_left = W / 2 - cw / 2
cx_right = W / 2 + cw / 2
CURTAIN_SHIFT = args[5] if len(args) > 5 else 40 # push curtains up, cropping their top
cy = 367.5 * k - CURTAIN_SHIFT
setk(L[4], 'p', [cx_left, cy]); setk(L[4], 's', [100 * k, 100 * k])
setk(L[3], 'p', [cx_right, cy]); setk(L[3], 's', [100 * k, -100 * k])

# --- Logo (ind 2) and its track matte (ind 1)
logo_s = 50 * LOGO_K
setk(L[2], 'p', [W / 2, LOGO_Y]); setk(L[2], 's', [logo_s, logo_s])
tr = L[1]['shapes'][0]['it'][-1]
tr['p'] = {'a': 0, 'k': [W / 2, LOGO_Y]}
tr['s'] = {'a': 0, 'k': [100 * LOGO_K, 100 * LOGO_K]}

# --- Text lines (ind 5, 6): keep the original 57px line spacing, scaled
gap = 57 * TEXT_K
setk(L[5], 'p', [W / 2, TEXT_Y]); setk(L[5], 's', [100 * TEXT_K, 100 * TEXT_K])
setk(L[6], 'p', [W / 2, TEXT_Y + gap]); setk(L[6], 's', [100 * TEXT_K, 100 * TEXT_K])

# --- Bottom cream band (ind 7): full width, pinned to bottom
band = L[7]
setk(band, 'a', [W / 2, BAND_H / 2]); setk(band, 'p', [W / 2, H - BAND_H / 2])
for sh in band['shapes']:
    if sh['ty'] == 'rc':
        sh['p'] = {'a': 0, 'k': [W / 2, BAND_H / 2]}
        sh['s'] = {'a': 0, 'k': [W, BAND_H]}
    if sh['ty'] == 'gf':
        fx = W / OW
        sh['s']['k'] = [sh['s']['k'][0] * fx, sh['s']['k'][1]]
        sh['e']['k'] = [sh['e']['k'][0] * fx, sh['e']['k'][1]]

json.dump(d, open(out, 'w'), separators=(',', ':'))
print('wrote', out, 'curtain bottom ~', 735 * k)
