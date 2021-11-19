Moralis.Cloud.define("testFunction", async (request) => {
  
    const unitQuery = new Moralis.Query("Unit");
    unitQuery.greaterThan(request.params.name, request.params.number);
    const tokenResult = await unitQuery.find();
    const results = tokenResult.map((token) => token.attributes);
    
    return results;
    /* 
    npm install moralis-admin-cli
    cd into project folder
    Create folder called cloud
    Create cloudFunctions.js file
    Get absolute path to cloud folder
    Paste this: 
    moralis-admin-cli watch-cloud-folder --moralisApiKey A9elberQhUDgyxV --moralisApiSecret 2Si7I6NAvu53o1x --moralisSubdomain subdomain.moralis.io --autoSave 1 --moralisCloudfolder "C:\Users\Chris\Documents\MORALIS\Projects\888 - Moralis From Scratch\solving-issues-for-clients\19 - test cloud\cloud"

    */
  });

  Moralis.Cloud.define("helloWorld", async (request) => {

    const logger = Moralis.Cloud.getLogger();
    logger.info(`Hello ${request.params.name}, your favourite number is ${request.params.num}`);
    
    return request.user
    
  });


  Moralis.Cloud.define("movement", async (request) => {

    const newHP = Number(request.params.HP)
    const newMP = Number(request.params.MP)

  const query = new Moralis.Query("Unit")
  query.equalTo("MP", newMP)
  query.lessThan("HP", newHP)
  const res = await query.find({useMasterKey:true})
  const result = res.map((unit) => unit.attributes)
  return result 
  
},{
  fields : {
    MP : {
      required: true,

      options: val => {
        return val >= 4 && val <= 6;
      },
      error: "Must be between 4 and 6"
    },
    HP : {
      required: true,

      options: val => {
        return val >= 20 && val <= 65;
      },
      error: "Must be between 20 and 65"
    },
  }
});


// HTTP REQUESTS

Moralis.Cloud.define("request1", async (request) => {

  let results = ""
  let _url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false"

  return Moralis.Cloud.httpRequest({
    url: _url
  }).then(function(httpResponse) {
    results = JSON.parse(httpResponse.text);
    return results
  },function(httpResponse) {

    console.error('Request failed with response code ' + httpResponse.status);
  });
})

Moralis.Cloud.define("request2", async (request) => {

  let results = ""
  let num = request.params.num
  let _url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${num}&page=1&sparkline=false`

  return Moralis.Cloud.httpRequest({
    url: _url
  }).then(function(httpResponse) {
    results = JSON.parse(httpResponse.text);
    return results
  },function(httpResponse) {

    console.error('Request failed with response code ' + httpResponse.status);
  });
})
  

Moralis.Cloud.define("request3", async (request) => {

  let results = ""
  let num = request.params.num
  let _url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${num}&page=1&sparkline=false`

  return Moralis.Cloud.httpRequest({
    url: _url
  }).then(function(httpResponse) {
    results = JSON.parse(httpResponse.text);
    let res = results.map((result) => {
      let obj = {}
      obj[result.id] = result.current_price
      return obj
    })
    return res
  },function(httpResponse) {

    console.error('Request failed with response code ' + httpResponse.status);
  });
})


Moralis.Cloud.beforeSave("Unit", (request) => {
  
  // do any additional beforeSave logic here
  },{
    fields: {
      upkeep : {
        required:true,
        options: upkeep => {
          return upkeep <= 3;
        },
        error: 'You must set upkeep under 4'
      }
    }
  });


Moralis.Cloud.afterSave("Unit", (request) =>{
  let RequestLog = Moralis.Object.extend("RequestLog")
  let requestLog = new RequestLog()
  
  requestLog.set("user", request.user)
  requestLog.set("object", request.object)
  requestLog.set("ip", request.ip)
  requestLog.set("headers", request.headers)
  requestLog.set("triggerName", request.triggerName)
  requestLog.set("original", request.original)
  requestLog.set("master", request.master)
  requestLog.set("installationId", request.installationId)

  return requestLog.save()
  // return request
 })

 Moralis.Cloud.beforeDelete("Unit", async (request) => {
  
  // LOGIC

  if (!3 > 2) {
    throw "Can't delete this unit because...";
  }
});


Moralis.Cloud.afterDelete("Unit", (request) => {

  // LOGIC
  const three = 3
  const two = 2

  const logic = three > two

  // HANDLE IT IF TRUE
  if(logic){
    let RequestLog = Moralis.Object.extend("RequestLog")
    let requestLog = new RequestLog()
    
    requestLog.set("user", request.user)
    requestLog.set("object", request.object)
    requestLog.set("ip", request.ip)
    requestLog.set("headers", request.headers)
    requestLog.set("triggerName", request.triggerName)
    requestLog.set("original", request.original)
    requestLog.set("master", request.master)
    requestLog.set("installationId", request.installationId)
  
    return requestLog.save()
  }
});


// Properties available
Moralis.Cloud.beforeFind('MyObject', (req) => {
  let query = req.query; // the Moralis.Query
  let user = req.user; // the user
  let triggerName = req.triggerName; // beforeFind
  let isMaster = req.master; // if the query is run with masterKey
  let isCount = req.count; // if the query is a count operation
  let logger = req.log; // the logger
  let installationId = req.installationId; // The installationId

  
  // Selecting keys
  let query1 = req.query; // the Moralis.Query
  query1.select(['key1', 'key2']);

  // Asynchronous support
  let query2 = req.query;
  return aPromise().then((results) => {
    // do something with the results
    query2.containedIn('key', results);
  });

});

Moralis.Cloud.define("createUnit", async (request) => {

  // Extending class with prototype methods and functions
  let Unit = Moralis.Object.extend('Unit', {
    getRandomNumber: function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getRandomName: function () {
        const first = ["Hope", "Launa", "Katherine", "", "Walker", "Moses", "Tayna", "Rosia", "Yahaira", "Tommy", "Elwanda", "Clorinda", "Sheron", "Kayla", "Clementina", "Rene", "Rex", "Kathy", "Latoya", "Shirleen", "Shoshana"];
        const second = ["tor", "sson", "", "dotor", "ninho", "tastic", "ly", "dor", "den", "ray"];
        const getRandomNumber = (max) => Math.floor(Math.random() * max);
        return `${first[getRandomNumber(first.length)]}${second[getRandomNumber(second.length)]}`;
    },
    shuffle: function (array) {
        let i = Math.floor(Math.random() * (array.length));
        let j = Math.floor(Math.random() * (array.length));
        while (i === j) { j = Math.floor(Math.random() * (array.length)); }
        return [array[i], array[j]];
    },
    getAbilities: function () {
        const abilities = ["Intelligent", "Quick", "Resilient", "Strong", "Dextrous", "Loyal", "Brave"]
        let array = this.shuffle(abilities)
        if (array[0] === array[1]) { array = this.shuffle(abilities) }
        return array;
    },
},
    {
        create: function (id) {
            let unit = new Unit();
            if(id){
              unit.set('user', id);
            }
            unit.set('name', unit.getRandomName());
            unit.set('abilities', unit.getAbilities());
            unit.set('HP', unit.getRandomNumber(20, 65));
            unit.set('MP', unit.getRandomNumber(4, 6));
            unit.set('XP', unit.getRandomNumber(30, 60));
            unit.set('upkeep', unit.getRandomNumber(0, 3));
            unit.set('melee', `${unit.getRandomNumber(1, 8)}-${unit.getRandomNumber(1, 4)}`);
            unit.set('ranged', `${unit.getRandomNumber(1, 8)}-${unit.getRandomNumber(1, 4)}`);
            unit.set('accuracy', `${unit.getRandomNumber(2, 7) * 10}%`);

            // Set ACL
            // const user = Moralis.User.current()
            // unit.setACL(new Moralis.ACL(user))
            
            // Set NEW ACL
            const user = id
            if(user){
              let acl = new Moralis.ACL()
              acl.setReadAccess(user, true)
              acl.setWriteAccess(user, true)
              acl.setRoleReadAccess("TheAdmin", true)
              acl.setRoleWriteAccess("TheAdmin", true)
              unit.setACL(acl)
            }
            
            // Save
            unit.save();
        }
    });

    await Unit.create(request.user);
})


Moralis.Cloud.job("myJob2", (request) =>  {
  // params: passed in the job call
  // headers: from the request that triggered the job
  // log: the Moralis Server logger passed in the request
  // message: a function to update the status message of the job object
  
  const run = async () => await Moralis.Cloud.run("createUnit", {})
  return run()
});



Moralis.Cloud.define("testConfig", async (request) => {
  const config = await Moralis.Config.get({useMasterKey: true});
  const privateParam = config.get("MY_SECRET_SOMETHING");
  return privateParam
});