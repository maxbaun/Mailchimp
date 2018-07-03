################
# General Jobs #
################
default: up-default

restart: reset default

################
# Compose Jobs #
################
up-default:
	docker-compose up -d

clean:
	docker stop `docker ps -aq`
	docker rm `docker ps -aq`

reset: clean remove-images

remove-images:
	docker rmi -f `docker images -a -q`

start:
	docker-compose stop $(app) && docker-compose up -d $(app) && docker-compose logs -f $(app)
