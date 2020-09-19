# xml-pdf.js
The purpose of this project is to develop a JavaScript library which could convert easily any XML document to PDF format,  respect a related DTD schema. The main goal of this library would be making programmers and users able to produce well-formed scientific PDF base on Encoded-Texts. 


# Run with Docker

To run the node application on a docker container , clone the ripository: 
```
git clone https://github.com/shae128/xml-pdf.js.git
```

build the docker image (pay attention to the dot at the end of the command): 
```
docker build -t shae128/xml-pdf .
```

after building docker iamge, start docker container:
```
docker run -p 49160:3000 -d shae128/xml-pdf
```

done! Now the application is accessible via: 
```
127.0.0.1:49162
```

## Map docker container to runnig apache server
If you already have apache web server up and running on your server, and you would like to map apache 80 port to docker container, you need to enable these apache modules:
```
sudo a2enmod proxy
sudo a2enmod proxy_http
```

then you need to add these lines to your apache config file which is on `/etc/apache2/sites-enabled/000-default.conf` on the Ubuntu server, but the config file location could vary (Do not forget to replace example.com with you domain)

```
<VirtualHost *:80>
  ProxyPreserveHost On
  ProxyRequests Off
  ServerName example.com
  ServerAlias example.com
  ProxyPass / http://localhost:49160/
  ProxyPassReverse / http://localhost:49160/
</VirtualHost>
```
Now the application would be accessible as the default web-app on your domain. Of course, you could config subdomain to access the app, rather than using your main domain. For such purpose, use add these lines to the apache config file instead

```
<VirtualHost *:80>
  ProxyPreserveHost On
  ProxyRequests Off
  ServerName subdomain.example.com
  ServerAlias subdomain.example.com
  ProxyPass / http://localhost:49160/
  ProxyPassReverse / http://localhost:49160/
</VirtualHost>
```


Contributing
============
If you want to contribute to this project and make it better, your help is very welcome. Contributing is also a great way to learn more about social coding on Github, new technologies and and their ecosystems and how to make constructive, helpful bug reports, feature requests and the noblest of all contributions: a good, clean pull request.

# Contribution Guidelines

Please ensure your pull request adheres to the following guidelines:

- Search previous suggestions before making a new one, as yours may be a duplicate.
- Make an individual pull request for each suggestion.
- New categories, or improvements to the existing categorization are welcome.
- Keep descriptions short and simple, but descriptive.
- Make sure your text editor is set to remove trailing whitespace.
- Use the `#readme` anchor for GitHub READMEs to link them directly

Thank you in advance
