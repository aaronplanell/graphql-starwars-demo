# Graphql Starwars Demo

### Description
Check and run the code created by Lee Byron [@leeb](https://twitter.com/leeb):
 * The code: [https://github.com/graphql/graphql-js/tree/master/src/__tests__](https://github.com/graphql/graphql-js/tree/master/src/__tests__)

### Instalation
```sh
$ git clone https://github.com/aaronplanell/graphql-starwars-demo.git
$ cd graphql-starwars-demo
$ npm install
$ npm start
```

### Modifying the code
If you need to modify the code, remember compile it before before run it:
```sh
$ npm compile
$ npm start
```

### Interesting tests
 * Return one field:
    * [http://localhost:3000/graphql?query={ hero { name } }](http://localhost:3000/graphql?query={hero{name}})
 * Return one field, filtering by the episode:
    * [http://localhost:3000/graphql?query={ hero (episode: EMPIRE) { name } }](http://localhost:3000/graphql?query={hero(episode:EMPIRE){name}})
 * Return various fields and a its list of friends (nested by characterInterface):
    * [http://localhost:3000/graphql?query={ hero { id, name, friends { id, name } } }](http://localhost:3000/graphql?query={hero{id,name,friends{id,name}}})
 * The same, but returning the list of friends of every friend. An example of how GraphQL can nest queries.
    * [http://localhost:3000/graphql?query={ hero { id, name, friends { id, name, appearsIn, friends { name } } } }](http://localhost:3000/graphql?query={hero{id,name,friends{id,name,appearsIn,friends{name}}}})
 * Return one field filtering by ID:
    * [http://localhost:3000/graphql?query={ human (id: "1000") { name } }](http://localhost:3000/graphql?query={human(id:"1000"){name}})
 * The same, but with an alias:
    * [http://localhost:3000/graphql?query={ luke: human (id: "1000") { name } }](http://localhost:3000/graphql?query={luke:human(id:"1000"){name}})
 * The same (using aliases), but with two persons:
    * [http://localhost:3000/graphql?query={ luke: human (id: "1000") { name }, leia: human (id: "1003") { name }}](http://localhost:3000/graphql?query={luke:human(id:"1000"){name},leia:human(id:"1003"){name}})
 * Adding their planet:
    * [http://localhost:3000/graphql?query={ luke: human (id: "1000") { name, homePlanet }, leia: human (id: "1003") { name, homePlanet }}](http://localhost:3000/graphql?query={luke:human(id:"1000"){name,homePlanet},leia:human(id:"1003"){name,homePlanet}})
 * With 'fragments'. It avoids to rewrite name of fields twice:
    * [http://localhost:3000/graphql?query={ luke: human (id: "1000") { ...fragmentOfHuman }, leia: human (id: "1003") { ...fragmentOfHuman }}, fragment fragmentOfHuman on Human { name, homePlanet }](http://localhost:3000/graphql?query={%20luke:%20human%20(id:%20%221000%22)%20{%20...fragmentOfHuman%20},%20leia:%20human%20(id:%20%221003%22)%20{%20...fragmentOfHuman%20}},%20fragment%20fragmentOfHuman%20on%20Human%20{%20name,%20homePlanet%20})

### Thanks
Thanks to:
* Lee Byron [@leeb](https://twitter.com/leeb).

### Contact info
Mail: [aaronplanell@gmail.com](mailto:aaronplanell@gmail.com)
