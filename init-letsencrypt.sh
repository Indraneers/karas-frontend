#!/bin/bash

if ! [ -x "$(command -v docker compose)" ]; then
  echo 'Error: docker compose is not installed.' >&2
  exit 1
fi

# Check for hostname arguments
if [ -z "$1" ]; then
  echo "Usage: $0 <hostname1> <hostname2> ..."
  echo "Example: $0 example.org www.example.org"
  exit 1
fi

hostnames=("$@")
rsa_key_size=4096
data_path="./certbot"
email="" # Adding a valid address is strongly recommended
staging=0 # Set to 1 if you're testing your setup to avoid hitting request limits

if [ -d "$data_path" ]; then
  echo "Existing data found for ${hostnames[*]}. Replacing existing certificates."
fi

if [ ! -e "$data_path/conf/options-ssl-nginx.conf" ] || [ ! -e "$data_path/conf/ssl-dhparams.pem" ]; then
  echo "### Downloading recommended TLS parameters ..."
  mkdir -p "$data_path/conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf > "$data_path/conf/options-ssl-nginx.conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem > "$data_path/conf/ssl-dhparams.pem"
  echo
fi

for hostname in "${hostnames[@]}"; do
  echo "### Creating dummy certificate for $hostname ..."
  path="/etc/letsencrypt/live/$hostname"
  mkdir -p "$data_path/conf/live/$hostname"
  docker compose run --rm --entrypoint "\
    openssl req -x509 -nodes -newkey rsa:$rsa_key_size -days 1\
      -keyout '$path/privkey.pem' \
      -out '$path/fullchain.pem' \
      -subj '/CN=localhost'" certbot
  echo
done

echo "### Starting nginx ..."
docker compose up --force-recreate -d frontend
echo

for hostname in "${hostnames[@]}"; do
  echo "### Deleting dummy certificate for $hostname ..."
  docker compose run --rm --entrypoint "\
    rm -Rf /etc/letsencrypt/live/$hostname && \
    rm -Rf /etc/letsencrypt/archive/$hostname && \
    rm -Rf /etc/letsencrypt/renewal/$hostname.conf" certbot
  echo
done

echo "### Requesting Let's Encrypt certificates for ${hostnames[*]} ..."
# Join $hostnames to -d args
domain_args=""
for hostname in "${hostnames[@]}"; do
  domain_args="$domain_args -d $hostname"
done

# Select appropriate email arg
case "$email" in
  "") email_arg="--register-unsafely-without-email" ;;
  *) email_arg="--email $email" ;;
esac

# Enable staging mode if needed
if [ $staging != "0" ]; then staging_arg="--staging"; fi

docker compose run --rm --entrypoint "\
  certbot certonly --webroot -w /var/www/certbot \
    $staging_arg \
    $email_arg \
    $domain_args \
    --rsa-key-size $rsa_key_size \
    --agree-tos \
    --force-renewal \
    --cert-name ${hostnames[0]}" certbot
echo

echo "### Reloading nginx ..."
docker compose exec frontend nginx -s reload