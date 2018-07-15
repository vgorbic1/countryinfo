## Country Info

This application was build by request from [InfoSec Institute](https://www.infosecinstitute.com/). The project includes a front end application and back end API. Back end API utilizes resources from [RESTCountries](http://restcountries.eu/) project. The resources are customized and displayed with the front end application.

This is a link to a working demo at [countryinfo.gorbich.com](https://countryinfo.gorbich.com/)

### Features
- Search by country name or by ISO 3166-1 2-letter or 3-letter country code. The search may yield a list of countries, which include the entered searching term in their name.
- There is a limit of 50 countries to display.
- Pagination is provided for convenience.
- The list of countries is sorted in alphabetical order,
but can be sorted by population.
- The search provides the number of countries in the list, listed regions, subregions, and their corresponding number of appearance.
- Search displays country name, country codes, country flag, country region and subregion (if exist), country population, and languages.

### Technologies used

#### Front end
React with the following modules:
- [classnames](https://github.com/JedWatson/classnames) to conditionally join HTML classes.
- [axios](https://www.npmjs.com/package/axios) as a promise based HTTP client.
- [react bootstrap table](https://github.com/AllenFang/react-bootstrap-table) to display customized tables.

#### Backend
- [Guzzle 6](http://docs.guzzlephp.org/en/stable/#) as PHP HTTP client

Below you will find some information on how to perform common tasks.<br>
#### Local install
Use PHP built-in web server. PHP (v. 5.4 and up) should be installed globally. Start server using the following command:
```
php -S 0.0.0.0:8080
```

Use Composer to install dependencies (Guzzle). 
#### Front End
Use Node Package Manager and 'package-lock.json' to install all dependencies.

Make sure that 'package.json' proxy key has the same port that you have used for your local PHP server:
```
"proxy": "http://localhost:8080"
```

Suggest further improvement: [gorbich.com/contact](http://gorbich.com/contact/)
