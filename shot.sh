#!/bin/bash
i=1
URL="http://192.168.0.104:8888"
# GOOGLE="www.google.com"
while [[ $i<5 ]]; do
	response=$(curl --write-out %{http_code} --silent --output /dev/null $URL)
	if [[ response != 404 ]]
	then
		# firefox --screenshot $i.jpg http://192.168.0.104:8888 --window-size=550,900
		firefox --screenshot $i.jpg $URL --window-size=550,900
		echo "Shot $i times"
		i=$((i+1))
		# sleep 1
	fi
done