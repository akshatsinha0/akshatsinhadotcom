import re,glob,json
inv=json.load(open('inv.json'))
assigned=set()
for f in glob.glob('projects/portfolio/src/styles/tokens/_paints-*.scss'):
    t=open(f,encoding='utf-8').read()
    for m in re.findall(r'#[0-9a-fA-F]{3,8}\b',t):
        h=m.lower()
        if len(h)==4: h='#'+''.join(c*2 for c in h[1:])
        assigned.add(h)
inv_hex=set(inv['hex'])
print("INV hex:",len(inv_hex),"Assigned hex:",len(assigned))
print("MISSING (in inv, not assigned):",sorted(inv_hex-assigned))
print("EXTRA (assigned, not in inv):",sorted(assigned-inv_hex))
