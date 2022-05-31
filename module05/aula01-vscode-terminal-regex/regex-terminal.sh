
# get all files that have end .test.js
# find . -name '*.test.js'

# get all files that have .test.js but don't are on node_modules directory
# find . -name '*.test.js' -not -path '*node_modules**'

# get all files that have extension .js but don't are on node_modules directory
# find . -name '*.js' -not -path '*node_module**'

# npm i -g ipt
# we can use the ipt to show a interactive mode to select a specific item of our return
# find . -name '*.js' -not -path '*node_modules**' | ipt

CONTENT="'use strict';"
find . -name '*.js' -not -path '*node_modules**' \
# using ipt -o we need select items that we want to add use strict, if we comment this line the script will add use script in all files
# | ipt -o \
| xargs -I '{file}' sed -i "" -e '1s/^/\'$CONTENT'\
/g' {file}
# 1s -> first line
# ^ -> first column
# \'$CONTENT'\ -> replace by our variable
# implicit break line 