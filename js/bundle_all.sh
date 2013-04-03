#!/bin/bash

# Minify JavaScripts

# If the output file already exists, we don't want to double its size. Remove it.
if [ -e "./main-min.js" ]; then
    rm main-min.js
fi

cat kudosplease.js main.js prism.js > main-combined.js

yui-compressor -o main-min.js main-combined.js

rm main-combined.js

echo -e "\nDone."
exit 0
