import re,glob,json
inv=json.load(open('inv.json'))
def norm(s):
    nums=re.findall(r'[0-9]*\.?[0-9]+',s.replace(' ',''))
    if len(nums)==3: nums=nums+['1']
    r,g,b,a=nums[:4]
    def na(x):
        if x in('0','0.0'):return '0'
        if x in('1','1.0'):return '1'
        if x.startswith('.'):x='0'+x
        return x
    return f'rgba({r},{g},{b},{na(a)})'
assigned=set()
for f in glob.glob('projects/portfolio/src/styles/tokens/_paints-*.scss'):
    t=open(f,encoding='utf-8').read()
    # only match value side (after a colon), avoid comments: strip // comments
    t='\n'.join(line.split('//')[0] for line in t.splitlines())
    for m in re.findall(r'rgba?\([^)]*\)',t):
        assigned.add(norm(m))
assigned.add('rgba(0,0,0,1)')
inv_rgba=set(inv['rgba'])
print("INV rgba:",len(inv_rgba),"Assigned:",len(assigned))
print("MISSING:",sorted(inv_rgba-assigned))
print("EXTRA:",sorted(assigned-inv_rgba))
