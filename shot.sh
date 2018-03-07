#!/bin/bash
i=1
j=400
URL="http://192.168.0.104:8888"
# GOOGLE="www.google.com"
response=$(curl --write-out %{http_code} --silent --output /dev/null $URL)
while :
do
	if [[ $response -le $j ]]; then
		# firefox --screenshot $i.jpg http://192.168.0.104:8888 --window-size=550,900
		firefox --screenshot ./lps/$i.png $URL
		echo "Shot $i times"
		i=$((i+1))
		# sleep 1	
	fi
done