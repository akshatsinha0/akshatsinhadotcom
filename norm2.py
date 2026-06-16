import re, glob, json
hexes=set(); rgbas=set()
files=glob.glob('src/**/*.css',recursive=True)+glob.glob('src/**/*.tsx',recursive=True)
for f in files:
    t=open(f,encoding='utf-8',errors='ignore').read()
    for m in re.findall(r'#[0-9a-fA-F]{3,8}\b',t):
        h=m.lower()
        if len(h)==4: h='#'+''.join(c*2 for c in h[1:])
        hexes.add(h)
    for m in re.findall(r'rgba?\([^)]*\)',t):
        if 'var(' in m: continue
        s=m.lower().replace(' ','')
        nums=re.findall(r'[0-9]*\.?[0-9]+',s)
        if s.startswith('rgb(') and len(nums)==3:
            r,g,b=nums[:3]; a='1'
        elif len(nums)==3:
            r,g,b=nums; a='1'
        else:
            r,g,b,a=nums[:4]
        def na(x):
            if x in ('0','0.0','.0'): return '0'
            if x in ('1','1.0'): return '1'
            if x.startswith('.'): x='0'+x
            return x
        rgbas.add(f'rgba({r},{g},{b},{na(a)})')
json.dump({'hex':sorted(hexes),'rgba':sorted(rgbas)},open('inv.json','w'),indent=0)
print("HEX",len(hexes),"RGBA",len(rgbas))
print('===HEX==='); print('\n'.join(sorted(hexes)))
print('===RGBA==='); print('\n'.join(sorted(rgbas)))
