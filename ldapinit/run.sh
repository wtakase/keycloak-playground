#!/bin/sh

export LDAPTLS_REQCERT=never

until ldapwhoami -H ldaps://ldap:3636 -x -D 'cn=Directory Manager' -w $DS_DM_PASSWORD; do
    echo 'Try again'
    sleep 1
done

dsconf -D 'cn=Directory Manager' -w $DS_DM_PASSWORD ldap://ldap:3389 backend create --suffix $DS_BASE_DN --be-name userRoot

for LDIF in `find /ldif -name *.ldif`; do
    echo $LDIF
    ldapmodify -H ldaps://ldap:3636 -f $LDIF -D 'cn=Directory Manager' -w $DS_DM_PASSWORD
done
