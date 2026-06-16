import json
m=json.load(open('projects/portfolio/src/styles/tokens/color-map.json'))
for k in ['#fff','#ffffff','#000','#000000','rgba(0,0,0,1)','rgba(255,255,255,.06)','rgba(255,255,255,0.06)','rgba(0,0,0,.3)','rgba(0,0,0,0.3)','#ff6ad5','#ff89ee','#61dafb']:
    print(k,'->',m.get(k,'<<MISSING>>'))
