#! /bin/bash

parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parent_path"

browserify IskPrinterUnbundled.js -s IskPrinter > IskPrinter.js