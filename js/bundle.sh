#!/bin/bash

# Minify JavaScripts

# If the output file already exists, we don't want to double its size. Remove it.
if [ -e "./kudosplease-min.js" ]; then
    echo -e "Removing existing copy of $BUNDLEFILE."
    rm main-min.js
fi

yui-compressor -o kudosplease-min.js kudosplease.js

echo -e "\nDone."
exit 0
