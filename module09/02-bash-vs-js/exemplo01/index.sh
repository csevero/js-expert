FOLDER_AMOUNT=4
for index in $(seq 1 $FOLDER_AMOUNT);do
# 1,2 -> bash01,bash02
# 3,4 -> shell01,shell02

# variable to save folder name, $index -ge 3, if index is greater or equal 3, && if condition is true || else
folder=$([ $index -ge 3 ] && echo shell-0$index || echo bash-0$index)
# -p used to create the folder if it already exists
mkdir -p $folder

# using the pwd to get complete path and concatening with the folder's name
cd $(pwd)/$folder
# after access folder with cd we're initilizing a npm project, and to don't return the return, we're sending it to /dev/null
npm init -y --scope @csevero --silent > /dev/null
# after initialize our project, we're getting the content or our package.json and formatting it using the jq to bring just the name and version of project
cat package.json | jq '{n: .name, v: .version}'
cd ..
done

# deleting all folders or files that initialize with bash or shell
rm -rf bash* shell*