#!/bin/bash
# Source: https://www.freecodecamp.org/news/how-to-implement-runtime-environment-variables-with-create-react-app-docker-and-nginx-7f9d42a91d70/

echo "Creating env-config.js, using /env.template "

dirbase=/usr/share/nginx/html
publicpath=''
while getopts "d:p:" opt; do
    case $opt in
        d) dirbase=$OPTARG;;
        p) publicpath=$OPTARG;;
        *) echo "script usage: $(basename \$0) [-d /base/dir (default: /usr/share/nginx/html)] [-p /publicpath (default: <empty>)]" >&2
        exit 1;;
    esac
done
shift "$(($OPTIND -1))"

fullpath=$dirbase$publicpath

rm -rf $fullpath/env-config.js
touch $fullpath/env-config.js

echo "window.env = {" >> $fullpath/env-config.js

# Read each line in .env file
# Each line represents key=value pairs
while read -r line || [[ -n "$line" ]];
do
  # Split env variables by character `=`
  if printf '%s\n' "$line" | grep -q -e '='; then
    varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
  fi

  # Read value of current variable if exists as Environment variable
  value=$(printf '%s\n' "${!varname}")
  # Otherwise use value from .env file
  [[ -z $value ]] && value=${varvalue}
  
  # Append configuration property to JS file
  echo "  $varname: '$value'," >> $fullpath/env-config.js
done < $dirbase/.env.template

printf '};\n' >> $fullpath/env-config.js
