Keycloak playground
====

## Overview

![overview](https://github.com/wtakase/keycloak-playground/blob/main/img/keycloak_playground.png "overview")


## Prerequirement
* Docker
* Docker compose


## Build

```
git clone https://github.com/wtakase/keycloak-playground.git
cd keycloak-playground
docker-compose build
```

## Start and tail logs

```
docker-compose up -d
docker-compose logs -f keycloak

# Wait until the following message is displayed

Admin console listening on http://127.0.0.1:9990
```

## Access Web UI

* Access `http://localhost:3000`

```
Username	Password	Roles
------------------------------------------
user01		user01		user
user02		user02		admin
user03		user03		user,admin
user04		user04
```

## Get access token and hit REST API using curl

```
curl -XPOST 'http://localhost:8080/auth/realms/my_realm/protocol/openid-connect/token' \
 --header 'Content-Type: application/x-www-form-urlencoded' \
 --data-urlencode 'grant_type=password' \
 --data-urlencode 'client_id=nodejs-microservice' \
 --data-urlencode 'client_secret=72a854a4-890c-4585-b302-344adf494da5' \
 --data-urlencode 'username=user01' \
 --data-urlencode 'password=user01'

curl -XGET http://localhost:8888/test/anonymous -H "Authorization: bearer YOUR_ACCESS_TOKEN"
curl -XGET http://localhost:8888/test/user -H "Authorization: bearer YOUR_ACCESS_TOKEN"
curl -XGET http://localhost:8888/test/admin -H "Authorization: bearer YOUR_ACCESS_TOKEN"
```


## Login to Keycloak admin console

* Access `http://localhost:8080` with `keycloak_admin/keycloak_admin`


## Save Keycloak realm

```
docker-compose exec keycloak /opt/jboss/keycloak/bin/standalone.sh \
-Djboss.socket.binding.port-offset=100 -Dkeycloak.migration.action=export \
-Dkeycloak.migration.provider=singleFile \
-Dkeycloak.migration.realmName=my_realm \
-Dkeycloak.migration.usersExportStrategy=REALM_FILE \
-Dkeycloak.migration.file=/keycloak/my_realm.json

# Wait until the following message is displayed

Admin console listening on http://127.0.0.1:10090

Ctrl + c
```

## Stop

* `Ctrl + c` to stop log tailing

```
docker-compose down -v
```
