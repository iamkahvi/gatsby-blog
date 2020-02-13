inputFile=$1
outputFile=$2
DATE=`date +%Y-%m-%d`

title=$(head -n 1 $inputFile | sed -E 's/^(.*),.*$/\1/g')
authorFull=$(head -n 1 $inputFile | sed -E 's/^.*,(.*)$/\1/g')
author=$(head -n 1 $inputFile | sed -E 's/^.*, (.*) .*$/\1/g')

sed -E "s/(^$author.*$)/\\1\<hr>/g" $inputFile > $outputFile
sed -E -i '' "s/(^[^$authorFull^<hr>].*$)/> \1"$'\r'"/g" $outputFile
#sed -E -i '' "s/(^$authorFull[^h].*$)/> \1/g" $outputFile
sed -E -i '' "s/^>[^\w]*$//g" $outputFile
sed -i '' "1s/.*/---"$'\r'"layout: post "$'\r'"title: $title Highlights "$'\r'"date: $DATE "$'\r'"--- "$'\r'"by $authorFull"$'\r'"/g" $outputFile

open -a Writer\ Pro $outputFile
