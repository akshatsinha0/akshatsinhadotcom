import json,re
inv=json.load(open('inv.json'))
op=[s for s in inv['rgba'] if re.findall(r'[0-9]*\.?[0-9]+',s)[3]=='1']
print("opaque rgba count:",len(op))
for s in op: print(s)
