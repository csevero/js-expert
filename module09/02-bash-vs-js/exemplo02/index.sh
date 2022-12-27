docker run -p "8080:80" -d nginx
sleep .5

curl --silent localhost:8080

# print the running containers, filter just for the container that name is nginx and getting the first column that is the container ID
CONTAINER_ID=$(docker ps | grep nginx | awk '{print $1}')

echo logs
# printing the CONTAINER_ID and using the xargs to get the return from the echo and store it to a temporary variable called id, and get the id and used with docker logs
echo $CONTAINER_ID | xargs -I {id} docker logs {id}

echo rm
# using the same logic that above but now to delete the container
echo $CONTAINER_ID | xargs -I {id} docker rm -f {id}