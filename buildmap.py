import re,glob,json
# value -> token name from paint files
val2tok={}
for f in glob.glob('projects/portfolio/src/styles/tokens/_paints-*.scss'):
    for line in open(f,encoding='utf-8'):
        code=line.split('//')[0]
        m=re.match(r'\s*(--ak-paint-[\w-]+)\s*:\s*([^;]+);',code)
        if not m: continue
        name,val=m.group(1),m.group(2).strip()
        val2tok[val.lower().replace(' ','')]=name
# normalize a value to canonical key
def norm_hex(h):
    h=h.lower()
    if len(h)==4: h='#'+''.join(c*2 for c in h[1:])
    return h
def norm_rgba(s):
    nums=re.findall(r'[0-9]*\.?[0-9]+',s.replace(' ',''))
    if len(nums)==3: nums+=['1']
    r,g,b,a=nums[:4]
    def na(x):
        if x in('0','0.0'):return '0'
        if x in('1','1.0'):return '1'
        if x.startswith('.'):x='0'+x
        return x
    return f'rgba({r},{g},{b},{na(a)})'

# token lookup keyed by canonical value
canon2tok={}
for v,name in val2tok.items():
    if v.startswith('#'): canon2tok[norm_hex(v)]=name
    elif v.startswith('rgb'): canon2tok[norm_rgba(v)]=name
# black collapse
canon2tok['rgba(0,0,0,1)']=canon2tok['#000000']

# Now scan source for EVERY raw literal occurrence (original spelling) and map
mapping={}
files=glob.glob('src/**/*.css',recursive=True)+glob.glob('src/**/*.tsx',recursive=True)
seen_orig=set()
for f in files:
    t=open(f,encoding='utf-8',errors='ignore').read()
    for m in re.findall(r'#[0-9a-fA-F]{3,8}\b',t):
        canon=norm_hex(m)
        tok=canon2tok.get(canon)
        if tok:
            mapping[m.lower()]=f'var({tok})'  # store lowercased original spelling
    for m in re.findall(r'rgba?\([^)]*\)',t):
        if 'var(' in m: continue
        canon=norm_rgba(m)
        tok=canon2tok.get(canon)
        if tok:
            key=m.lower().replace(' ','')  # original spelling, spaces removed
            mapping[key]=f'var({tok})'

# Also add canonical-key variants and both .3 / 0.3 styles
extra={}
for k,v in list(mapping.items()):
    if k.startswith('rgba') or k.startswith('rgb'):
        # add canonical
        extra[norm_rgba(k)]=v
        # add .NN style and 0.NN style for the alpha
        nums=re.findall(r'[0-9]*\.?[0-9]+',k)
        if len(nums)==4:
            r,g,b,a=nums
            for av in ({a, a.lstrip('0') if a.startswith('0.') else a, '0'+a if a.startswith('.') else a}):
                extra[f'rgba({r},{g},{b},{av})']=v
    if k.startswith('#'):
        extra[norm_hex(k)]=v
mapping.update(extra)
mapping=dict(sorted(mapping.items()))
json.dump(mapping,open('projects/portfolio/src/styles/tokens/color-map.json','w'),indent=2)
print("map entries:",len(mapping))
# coverage of canonical distinct
inv=json.load(open('inv.json'))
canon_keys=set(norm_hex(h) for h in inv['hex'])|set(norm_rgba(r) for r in inv['rgba'])
missing=[k for k in canon_keys if k not in mapping]
print("distinct canonical:",len(canon_keys),"missing from map:",len(missing))
for m in missing: print("MISS",m)
