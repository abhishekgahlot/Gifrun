//  Install imagick

// md5 conversion
for F in *; do   mv "$F" "$(md5sum "$F" | cut -d' ' -f1).${F##*.}"; done


# for gif thumbnail conversion
for F in *; 
do  convert "$F"'[0]' ${F%.*}".jpg"
done

import os
import subprocess
data = {}
for subdir, dirs, files in os.walk('gifs'):
  for file in files:
    if file.endswith('.gif'):
      md5 = subprocess.check_output(["md5sum" ,os.path.join(subdir, file)]).split()[0]
      path = os.path.join(subdir, file)
      data[md5] = path
      os.rename(path, os.path.join(subdir, md5+'.gif'))

import os
import subprocess
data = {}
for subdir, dirs, files in os.walk('gifs'):
  for file in files:
    if file.endswith('.gif'):
      path = os.path.join(subdir, file)
      os.rename(path, os.path.join('new_gif', file))

