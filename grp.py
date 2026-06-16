import json,re
inv=json.load(open('inv.json'))
from collections import defaultdict
d=defaultdict(list)
for s in inv['rgba']:
    nums=re.findall(r'[0-9]*\.?[0-9]+',s)
    r,g,b,a=nums
    if a=='1': continue  # opaque -> in surface
    d[(r,g,b)].append(a)
for k in sorted(d, key=lambda x:(int(x[0]),int(x[1]),int(x[2]))):
    print(f"({k[0]},{k[1]},{k[2]}):", ' '.join(sorted(d[k],key=float)))
print("translucent count:", sum(len(v) for v in d.values()))
