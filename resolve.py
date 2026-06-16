import re,glob
defined=set()
for f in glob.glob('projects/portfolio/src/styles/tokens/_paints-*.scss')+['projects/portfolio/src/styles/tokens/_semantic.scss']:
    t=open(f,encoding='utf-8').read()
    for m in re.findall(r'(--ak-[\w-]+)\s*:',t):
        defined.add(m)
# references in semantic+components
refs=[]
for f in ['projects/portfolio/src/styles/tokens/_semantic.scss','projects/portfolio/src/styles/tokens/_components.scss']:
    t=open(f,encoding='utf-8').read()
    t='\n'.join(line.split('//')[0] for line in t.splitlines())
    for m in re.findall(r'var\((--ak-[\w-]+)\)',t):
        refs.append((f,m))
bad=[(f,r) for f,r in refs if r not in defined]
print("references:",len(refs),"unresolved:",len(bad))
for f,r in bad: print("UNRESOLVED",r,"in",f)
