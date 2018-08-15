module.exports = IskPrinter;

let EveSwaggerInterface = require('eve_swagger_interface');

// Set up page load functions.
window.onload = (() => {
  // loadToken();
  let charId = localStorage.getItem('mostRecentActiveCharacter');
  if (charId && (characterSelect = document.getElementById(charId))) {
    characterSelect.classList.add('btn-secondary', 'active');
    ip.charData.id = charId;
  } else {
    localStorage.removeItem('mostRecentActiveCharacter');
  }
});

// Establish a namespace.
if (typeof ip === 'undefined') ip = {};

ip.charData = {};
var marketData = {};
var dataIsFresh;
var typeNames = {};
var suggestedOrders = [];
var maxId;
var verbose;
var itemData = {};

// RUN MAIN FUNCTIONS. 
function IskPrinter() {

  verbose = true;
  checkToken()
      .then(() => initializeApis())
      // .then(() => getCharId())
      // .catch(() => sendToCcp())
      .then(() => Promise.all([
        readSelectedOptions(),
        loadSavedData(),
      ]))
      .then(() => retrieveData())
      .then(() => buildItemList())
      .then(() => getTypeNames())
      .then(() => removeExpiredItems())
      .then(() => getHistoriesOfItems(7))
      .then(() => readSkills())
      .then(() => fillDataGaps())
      .then(() => calcIskToInvest())
      .then(() => calcScores())
      .then(() => removeAlreadyTrading())
      .then(() => suggestOrders())
      .then(() => saveAndOverwrite())
      .then(() => printResults())
      .then(() => getHistoriesOfItems(1));
}

// Check the expiration on the access token.
function checkToken() {
  return new Promise((resolve, reject) => {

    // if (ip.accessToken && (ip.accessToken.expiryTimestamp - Date.now() > 30 * 1000)) {
    //   console.log('Token is valid.');
    //   resolve();
    // } else {
      refreshToken().then(() => {
        consoleAndStatus('Token refreshed.');
        resolve();
      });

      // sendToCcp();
    // }
  });
}

function refreshToken() {
  return new Promise((resolve, reject) => {

    let char_id = getIdOfActiveCharacter();
    if (!char_id) {
      return reject();
    }
    let options = {
      headers: {
        'Access-Control-Allow-Origin': '*',
      //   'Content-Type': 'application/json',
      },
      method: 'GET',
    };
    fetch(`${ip.REDIRECTURI}api/characters/${char_id}/refreshToken`, options)
        .then(response => response.text())
        .then(data => {
          if (!ip.accessToken) ip.accessToken = {};
          ip.accessToken.tokenString = data;
          ip.accessToken.expiryTimestamp = Date.now() + 1199 * 1000;
          localStorage.setItem('mostRecentAccessToken', JSON.stringify(ip.accessToken));
          return resolve();
        });
  });
}

function getIdOfActiveCharacter() {
  let characterId = localStorage.getItem('mostRecentActiveCharacter');
  if (!characterId) {
    consoleAndStatus('Please select a character from the dropdown in the upper right corner.\n'
    + 'Add one first, if necessary.');
    return null;
  }
  ip.charData.id = characterId;
  return characterId;
}


// Inititalize the ESI APIs.
function initializeApis() {
  return new Promise((resolve, reject) => {
    ip.esiApis = {
      character: new EveSwaggerInterface.CharacterApi(),
      location: new EveSwaggerInterface.LocationApi(),
      market: new EveSwaggerInterface.MarketApi(),
      skills: new EveSwaggerInterface.SkillsApi(),
      universe: new EveSwaggerInterface.UniverseApi(),
      wallet: new EveSwaggerInterface.WalletApi(),
    };
    resolve();
  });
}

// Retrieve the character's id, which is used for all other functions.
function getCharId() {
  consoleAndStatus('Retrieving character id...');

  return new Promise((resolve, reject) => {

    let options = {
      headers: {Authorization: 'Bearer ' + ip.accessToken.tokenString},
      method: 'get',
    };

    fetch('https://esi.tech.ccp.is/verify/', options)
        .then(response => {
          if (response == undefined || !response.ok) {
            consoleAndStatus('Encountered id retrieval error. Retrying in ' + ip.WAITDELAY + ' seconds...');
            window.setTimeout(() => {
              getCharId().then(() => resolve());
            }, ip.WAITDELAY * 1000);
          } else {
            response.json()
                .then(data => {
                  ip.charData.id = data.CharacterID;
                  resolve();
                });
          }
        });
  });
}

// Attempt to retrieve the ip.accessToken from the URL.
// function loadToken() {
//   console.log('Checking URL for token...');
//   var urlParams = parseURLParams(window.location.href);
//   var urlToken = urlParams && urlParams.access_token; // Initialize to boolean. Might be an object later.
//   var mostRecentAccessToken = JSON.parse(localStorage.getItem('mostRecentAccessToken'));

//   // If there is a url token, record its properties.
//   if (urlToken) {
//     urlToken = {};
//     urlToken.tokenString = urlParams.access_token[0];
//     urlToken.expiresIn = urlParams.expires_in[0];
//     urlToken.timestamp = Date.now();
//     urlToken.expiryTimestamp = Date.now() + urlToken.expiresIn * 1000;
//   }
  
//   // If there is NOT a url token and there is NOT a saved token, leave ip.accessToken as null.
//   if (!urlToken && !mostRecentAccessToken) {
//     console.log('No token found.');
//     return false;
//   }

//   console.log('Found a token.');

//   // If there is a url token, but NOT a saved token, use the url token.
//   if (urlToken && !mostRecentAccessToken) {
//     ip.accessToken = urlToken;
//     localStorage.setItem('mostRecentAccessToken', JSON.stringify(ip.accessToken));
//     return true;
//   }

//   // If there is NOT a url token, but there is a saved token, use the saved token.
//   if (!urlToken && mostRecentAccessToken) {
//     ip.accessToken = mostRecentAccessToken;
//     return true;
//   }

//   // If we've reached this point, there is both a url token and a saved token.
//   // If they are identical, use the saved token, which has an accurate timestamp.
//   if (urlToken.tokenString == mostRecentAccessToken.tokenString) {
//     ip.accessToken = mostRecentAccessToken;
//     return true;
//   }

//   // Otherwise, use the url token, because it is newer.
//   ip.accessToken = urlToken;
//   localStorage.setItem('mostRecentAccessToken', JSON.stringify(ip.accessToken));
//   return true;
// }

// // Display message, wait 3 seconds, and send user to CCP login.
// function sendToCcp() {
//   return new Promise((resolve, reject) => {
//     consoleAndStatus('No valid access token. Sending you to CCP login...');
//     setTimeout(() => {
//       window.location.replace(LOGONURL);
//     }, 3 * 1000);
//   });
// }

// Read selected options.
function readSelectedOptions() {
  return new Promise((resolve, reject) => {
    // ip.structureId = document.getElementById("station").value;
    resolve();
  });
}

// Load saved data.
function loadSavedData() {
  return new Promise((resolve, reject) => {

    // If there is saved data for this character that is less than 5 minutes old, load it.
    let tempCharData = localStorage.getItem(ip.charData.id);
    if (tempCharData) {
      tempCharData = JSON.parse(tempCharData);
      let dataAge = Date.now() - tempCharData.timestamp;

      // dataIsFresh = (dataAge < 5 * 60 * 1000);

      // ---- FOR DEBUGGING ---- //
      dataIsFresh = false;
      console.log('Data is ' + (dataIsFresh ? '' : 'not ') + 'fresh.');

      if (dataIsFresh) {
        console.log('Loading saved data from ' + (dataAge / 1000 / 60).toFixed(1) + ' minutes ago...');
        ip.charData = tempCharData;
      }
      //itemData = JSON.parse(localStorage.getItem('itemData'));
      itemVolHistory = JSON.parse(localStorage.getItem('itemVolHistory'));
      itemData = {};
      if (!itemVolHistory) itemVolHistory = {};
      // if (typeof itemVolHistory[ip.regionId] === 'undefined') itemVolHistory[ip.regionId] = {};
      if (!ip.charData) ip.charData = {};
    }
    resolve();
  });
}

// Retrieve data from CCP.
function retrieveData() {
  return loadTypeNames()
      .then(() => Promise.all([
        getCharOrders(ip.charData.id),
        getCharSkills(ip.charData.id),
        getCharStats(ip.charData.id),
        getCharTransactions(ip.charData.id),
        getCharWalletBal(ip.charData.id),
        getCurrentLocation(ip.charData.id),
        getReprocessedValues(),
      ])).then(() => {
        if (!dataIsFresh) {
          ip.charData.timestamp = Date.now();
          localStorage.setItem(ip.charData.id, JSON.stringify(ip.charData));
        }
        return Promise.resolve();
      }).then(() => 
        getStructureOrders(ip.structureId)
      );
}

// Get the current location of the character.
function getCurrentLocation(characterId) {
  return new Promise((resolve, reject) => {
    consoleAndStatus('Getting location info...');

    getCharacterLocation(characterId)
        .then((data) => getSolarSystemInfo(data.solar_system_id))
        .then((data) => getConstellationInfo(data.constellation_id))
        .then((data) => resolve());
  });
}

// Get solar system info.
function getCharacterLocation(characterId) {
  consoleAndStatus('Getting character location...');
  let options = OPTS;
  options.token = ip.accessToken.tokenString;
  return wrapperForFetch(
    ip.esiApis.location,
    'getCharactersCharacterIdLocation',
    characterId,
    options
  ).then(response => {
    if (!response.data.structure_id) {
      consoleAndStatus('Please dock your character the station in which you want to trade.');
      return new Error('Character is not docked.');
    } else {
      ip.structureId = response.data.structure_id;
      return response.data;
    }
  });
}

// Get solar system info.
function getSolarSystemInfo(solarSystemId) {
  return new Promise((resolve, reject) => {
    consoleAndStatus('Getting solar system info...');
    let options = OPTS;
    // options.token = ip.accessToken.tokenString;
    return wrapperForFetch(
      ip.esiApis.universe,
      'getUniverseSystemsSystemId',
      solarSystemId,
      options)
      .then(response => {
        resolve(response.data);
      })
  });
}

// Get constellation info.
function getConstellationInfo(constellationId) {
  return new Promise((resolve, reject) => {
    consoleAndStatus('Getting constellation info...');
    let options = OPTS;
    // options.token = ip.accessToken.tokenString;
    return wrapperForFetch(
      ip.esiApis.universe,
      'getUniverseConstellationsConstellationId',
      constellationId,
      options)
      .then(response => {
        ip.regionId = response.data.region_id;
        resolve(response.data);
      })
  });
}

function getReprocessedValues() {
  return new Promise((resolve, reject) => {
    consoleAndStatus('Downloading reprocessing data...');
    let options = {
      headers: {
        'Access-Control-Allow-Origin': '*',
      //   'Content-Type': 'application/json',
      },
      method: 'GET',
    };
    fetch(`${ip.REDIRECTURI}api/types/materialsIndex`, options)
        .then(response => response.text())
        .then(dataString => JSON.parse(dataString))
        .then(data => {
          // console.log(data);
          ip.reprocessingData = data;
          return resolve();
        });
  });
}

function buildItemList() {
  if (dataIsFresh) return Promise.resolve();

  return new Promise((resolve, reject) => {

    consoleAndStatus('Building item list...');

    let allOrders = marketData[ip.structureId].orders;
    itemData = {};

    console.log(`Keys in allOrders = ${Object.keys(allOrders).length}.`);

    for (var i = 0; i < allOrders.length; i += 1) {

      let order = allOrders[i];
      let typeId = order.type_id;

      if (!itemData[typeId]) {
        itemData[typeId] = {};
        itemData[typeId].typeId = typeId;
        itemData[typeId].buyOrders = 0;
        itemData[typeId].sellOrders = 0;
      }

      if (order.is_buy_order) {
        itemData[typeId].buyOrders += 1;

        if (!itemData[typeId].maxBuy || (order.price > itemData[typeId].maxBuy)) {
          itemData[typeId].maxBuy = order.price;
        }
      } else {
        itemData[typeId].sellOrders += 1;

        if (!itemData[typeId].minSell || (order.price < itemData[typeId].minSell)) {
          itemData[typeId].minSell = order.price;
        }
      }
      status('Processed data... Order ' + (i + 1) + ' of ' + allOrders.length);
    }
    localStorage.setItem('itemData', JSON.stringify(itemData));
    maxId = Math.max(...Object.keys(itemData));
    resolve();
  }); 
}

function removeAlreadyTrading() {
  consoleAndStatus('Omitting items already being traded...');
  return new Promise((resolve, reject) => {
    let id;
    for (let i = 0; i < ip.charData.alreadyTrading.length; i += 1) {
      id = ip.charData.alreadyTrading[i];
      //console.log('checking ' + typeNames[id]);
      if (itemData[id]) {
        //console.log('removing ' + typeNames[id]);
        delete itemData[id];
      }
    }
    resolve();
  });
}

function removeExpiredItems() {
  return new Promise((resolve, reject) => {
    for (let typeId in itemData) {
      if (typeNames[typeId].toLowerCase().includes('expired') && itemData[typeId]) {
        delete itemData[typeId];
      }
    }
    maxId = Math.max(...Object.keys(itemData));
    resolve();
  });
}

// Save the downloaded data.
function saveAndOverwrite(data, dataName) {
  return new Promise((resolve, reject) => {

    if (dataIsFresh) {
      return resolve();
    }
    consoleAndStatus('Saving...');
    //ip.charData.timestamp = Date.now();
    //localStorage.setItem(ip.charData.id, JSON.stringify(ip.charData));
    localStorage.setItem('typeNames', JSON.stringify(typeNames));
    localStorage.setItem('itemVolHistory', JSON.stringify(itemVolHistory));
    //localStorage.setItem('itemData', JSON.stringify(itemData));
    resolve();
  });
}

// Print the results.
function printResults() {
  return new Promise((resolve, reject) => {

    let tbl = document.createElement('table');
    let tbdy = document.createElement('tbody');

    let tableHeaders = [
      'Type Name',
      'Score',
      'Buy Price',
      'Sell Price',
      // 'Margin',
      // 'Average Buy Volume',
      // 'Average Sell Volume',
      // 'Number of Competing Buy Orders',
      // 'Number of Competing Sell Orders',
      'Amount to Buy',
    ];
    let th;
    let tr = document.createElement('tr');
    for (let column in tableHeaders) {
      th = document.createElement('th');
      th.appendChild(document.createTextNode(tableHeaders[column]));
      tr.appendChild(th);
    }
    tbdy.appendChild(tr);

    let decimals = (number, places) => {
      let args = [
        undefined,
        {
          minimumFractionDigits: places,
          maximumFractionDigits: places
        }
      ]
      return number.toLocaleString(...args);
    };

    let tableData = [
      (item) => item.typeName,
      (item) => decimals(item.score, 2),
      (item) => decimals(item.priceFloor, 2),
      (item) => decimals(item.priceCeiling, 2),
      // (item) => decimals(item.margin, 2),
      // (item) => decimals(itemVolHistory[ip.regionId][item.typeId].avgBuyVol, 2),
      // (item) => decimals(itemVolHistory[ip.regionId][item.typeId].avgSellVol, 2),
      // (item) => item.buyOrders,
      // (item) => item.sellOrders,
      (item) => decimals(item.amountToBuy, 0),
    ];

    for (let row in suggestedOrders) {
      let tr = document.createElement('tr');
      let td;
      for (let column in tableHeaders) {
        td = document.createElement('td');
        td.appendChild(document.createTextNode(tableData[column](suggestedOrders[row])));
        tr.appendChild(td);
      }
      tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    tbl.classList.add("table", "d-flex");
    tbl.setAttribute("style", "width: auto");
    tableDiv = document.getElementById('tableDiv');
    tableDiv.appendChild(tbl);
    if (tableDiv.childNodes.length > 1) {
      tableDiv.removeChild(tableDiv.childNodes[0]);
    }

    consoleAndStatus('Wallet Balance = ' + ip.charData.walletBal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) + '\n' +
        'Additional Unescrowed Buy Order Costs = ' + ip.charData.additionalIskToCover.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) + '\n' +
        'Available ISK to Invest = ' + ip.charData.iskToInvest.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}));
    verbose = false;
    resolve();
  });
}

// Send to the console and also update the status shown on the page.
function consoleAndStatus(content) {
  if (verbose) {
    status(content);
  }
  console.log(content);
}

// Update the status shown on the page.
function status(content) {
  let status = document.getElementById('status');
  content = content.replace(/\n/g, '<br />');
  status.innerHTML = content;
}

// Used to call functions that could return an error due to bad server response.
function wrapperForFetch(api, fetchFunctionName, ...fetchArgs) {
  return new Promise((resolve, reject) => {
    let result;
    api[fetchFunctionName](...fetchArgs, (error, data, response) => {
      result = {error: error, data: data, response: response};
      //console.log(result);
      resolve(result);
    });
  }).then(result => {
    return new Promise((resolve, reject) => {
      if (!result.response || Math.floor(result.response.status / 100) == 5) {
        consoleAndStatus('Encountered server-side 5xx error.\nRetrying in ' + ip.WAITDELAY + ' seconds...');
        window.setTimeout(() => {
          resolve(wrapperForFetch(api, fetchFunctionName, ...fetchArgs));
        }, ip.WAITDELAY * 1000);
      } else if (result.response.status == 404) {
        // Remove this item from the data.
        reject(404);
      } else {
        resolve(result);
      }
    });
  });
}

function loadTypeNames() {
  return new Promise((resolve, reject) => {
    let typeNamesString = localStorage.getItem('typeNames');
    if (typeNamesString == null || typeNamesString == 'undefined') {
      typeNames = {};
    } else {
      typeNames = JSON.parse(localStorage.getItem('typeNames'))
    }
    return resolve();
  });
}

// ---- Beginning of Standard Eve API Requests ---- //

// Use character id to get character stats.
function getCharStats(characterId) {
  if (dataIsFresh) return Promise.resolve();

  return new Promise(function(resolve, reject) {
    consoleAndStatus('Downloading character stats...');
    ip.esiApis.character.getCharactersCharacterId(characterId, OPTS, (error, data, response) => {
      if (!response.ok) {
        reject(response.statusText);
      } else {
        ip.charData.charStats = data;
        resolve();
      }
    });
  });
}

// Use character id to get character orders.
function getCharOrders(characterId) {
  //if (dataIsFresh) return Promise.resolve();

  consoleAndStatus('Downloading character orders...');
  let options = OPTS;
  options.token = ip.accessToken.tokenString;
  return wrapperForFetch(ip.esiApis.market,'getCharactersCharacterIdOrders', characterId, options)
    .then(response => {
      //console.log(response.data);
      ip.charData.usedOrders = response.data.length;
      ip.charData.additionalIskToCover = 0;
      ip.charData.alreadyTrading = [];
      for (let i = 0; i < response.data.length; i += 1) {
        if (response.data[i].is_buy_order) {
          ip.charData.additionalIskToCover += (response.data[i].price * response.data[i].volume_remain - response.data[i].escrow);
        }
        ip.charData.alreadyTrading.push(response.data[i].type_id);
      }
    });
}

// Use character id to get character skills.
function getCharSkills(characterId) {
  //if (dataIsFresh) return Promise.resolve();

  consoleAndStatus('Downloading character skills...');
  let options = OPTS;
  options.token = ip.accessToken.tokenString;
  return wrapperForFetch(ip.esiApis.skills,'getCharactersCharacterIdSkills', characterId, options)
    .then(response => {
      ip.charData.skills = response.data.skills;
    });
}

// Use character id to get character transactions.
function getCharTransactions(characterId) {
  if (dataIsFresh) return Promise.resolve();

  return new Promise(function(resolve, reject) {
    consoleAndStatus('Downloading character transactions...');
    let options = OPTS;
    options.token = ip.accessToken.tokenString;
    ip.esiApis.wallet.getCharactersCharacterIdWalletTransactions(characterId, options, (error, data, response) => {
      if (error) {
        reject(response.statusText);
      } else {
        ip.charData.charTransactions = data;
        resolve();
      }
    });
  });
}

// Use character id to get character wallet balance.
function getCharWalletBal(characterId) {
  consoleAndStatus('Downloading character wallet balance...');
  let options = OPTS;
  options.token = ip.accessToken.tokenString;
  return wrapperForFetch(
    ip.esiApis.wallet,
    'getCharactersCharacterIdWallet',
    characterId,
    options
  ).then(response => {
      ip.charData.walletBal = response.data;
  });
}

// Use structure id to get structure orders.
function getStructureOrders() {
  if (dataIsFresh) return Promise.resolve();

    // First, get the number of pages.
    consoleAndStatus('Downloading structure orders...');
    let options = OPTS;
    options.token = ip.accessToken.tokenString;
    if (!marketData[ip.structureId]) marketData[ip.structureId] = {};
    marketData[ip.structureId].orders = [];

    let p = Promise.resolve();
    let totalOrders = 0;

    // Call the API once just to get the total number of pages.
    return wrapperForFetch(ip.esiApis.market,'getMarketsStructuresStructureId', ip.structureId, options)     
      .then(response => {
        totalPages = response.response.header['x-pages'];
        for (let i = 1; i <= totalPages; i +=1) {
          p = p.then(() => {
              options.page = i;
              return wrapperForFetch(ip.esiApis.market,'getMarketsStructuresStructureId', ip.structureId, options)
          }).then(response => {
            return new Promise((resolveInner, rejectInner) => {
              totalOrders += response.data.length;
              consoleAndStatus('Retrieved structure orders page ' + i + ' of ' + totalPages + '.');
              marketData[ip.structureId].orders = marketData[ip.structureId].orders.concat(response.data);
              resolveInner();
            });
          })
        }
    }).then(() => p);
}

// Retrieve item market histories if the current data is older than the threshold (in days).
function getHistoriesOfItems(threshold) {
  let statusUpdate = 'Getting histories of items...';
  consoleAndStatus(statusUpdate);

  return new Promise((resolve, reject) => {
    p = Promise.resolve();
    for (let typeId in itemData) {
      p = p.then(() => {
        // Don't bother retrieving data unless it's more than 7 days old.
        if (typeof itemVolHistory === 'undefined') itemVolHistory = {};
        // delete itemVolHistory.undefined;
        if (typeof itemVolHistory[ip.regionId] === 'undefined') itemVolHistory[ip.regionId] = {};
        if (typeof itemVolHistory[ip.regionId][typeId] === 'undefined') itemVolHistory[ip.regionId][typeId] = {};
        let needToRetrieve = Date.now() - itemVolHistory[ip.regionId][typeId].dataAge > threshold * 24 * 60 * 60 * 1000;
        needToRetrieve = !itemVolHistory[ip.regionId][typeId].dataAge || needToRetrieve;
        needToRetrieve = itemVolHistory[ip.regionId][typeId].avgBuyVol == null || needToRetrieve;
        if (needToRetrieve) {
          return getHistoryOfItem(typeId);
        } else {
          return Promise.resolve();
        }
      });
    }
    resolve();
  }).then(() => p);
}

function getHistoryOfItem(typeId) {
  let options = OPTS;
  return wrapperForFetch(ip.esiApis.market,'getMarketsRegionIdHistory', ip.regionId, typeId, options)
    .then(response => {
      let statusUpdate = 'Retrieved market history of ' + typeNames[typeId] + '\n(item ' + typeId + ' of ' + maxId + ').';
      consoleAndStatus(statusUpdate);

      let history = analyzeHistory(typeId, response.data);
      if (typeof itemVolHistory[ip.regionId][typeId] === 'undefined') itemVolHistory[ip.regionId][typeId] = {};
      itemVolHistory[ip.regionId][typeId].maxPrice = history.maxPrice;
      itemVolHistory[ip.regionId][typeId].avgBuyVol = history.avgDailyBuyVol;
      itemVolHistory[ip.regionId][typeId].avgSellVol = history.avgDailySellVol;
      itemVolHistory[ip.regionId][typeId].dataAge = Date.now();
      localStorage.setItem('itemVolHistory', JSON.stringify(itemVolHistory));
    })
    .catch(reason => {
      if (reason == 404) {

        // Remove the item from the data.
        let statusUpdate = 'Removing obsolete item ' + typeNames[typeId] + ' from data set.';
        consoleAndStatus(statusUpdate);

        delete itemData[typeId];
        localStorage.setItem('itemData', JSON.stringify(itemData));
      } else {
        console.log("Encountered " + reason + " error during item history retrieval!");
      }
    });
}

function analyzeHistory(typeId, data) {

  //console.log("Determining buy and sell orders...");
  let firstDate = data[0] ? data[0].date : Date.now() - 1000 * 60 * 60 * 24;
  let finalDate = Date.now();
  let dateSpan = (finalDate - firstDate) / 1000 / 60 / 60 / 24;
  let maxPrice = 0;

  itemVolHistory[ip.regionId][typeId].totalVolumeOfBuys = 0;
  itemVolHistory[ip.regionId][typeId].totalVolumeOfSells = 0;
  itemVolHistory[ip.regionId][typeId].movingMaxBuyTotal = 0;
  itemVolHistory[ip.regionId][typeId].movingMinSellTotal = 0;
  itemVolHistory[ip.regionId][typeId].maxBuyMovingAvg = itemData[typeId].maxBuy;
  itemVolHistory[ip.regionId][typeId].minSellMovingAvg = itemData[typeId].minSell;
  let buyFraction;
  
  for (let i = 0; i < data.length; i += 1) {

    maxPrice = Math.max(maxPrice, data[i].highest);
    
    //console.log("Determining buy and sell orders for day " + data[i].date);
    let a = [
      [ data[i].highest,              // [0][0]
        data[i].lowest            ],  // [0][1]
      [ itemVolHistory[ip.regionId][typeId].minSellMovingAvg,     // [1][0]
        itemVolHistory[ip.regionId][typeId].maxBuyMovingAvg   ]   // [1][1]
    ];
    
    //TODO Use linear algebra to identify the option with minimum error.
    let x = [data[i].highest,                   data[i].lowest                     ];
    let y = [itemVolHistory[ip.regionId][typeId].minSellMovingAvg, itemVolHistory[ip.regionId][typeId].maxBuyMovingAvg   ];
    //let beta = Math.transpose(x);

    // Calculate the simple error for each option.
    let b = [
      [ a[0][0] - a[1][0],    // [0][0] = highest - minSell
        a[0][0] - a[1][1] ],  // [0][1] = highest - maxBuy
      [ a[0][1] - a[1][0],    // [1][0] = lowest - minSell
        a[0][1] - a[1][1] ]   // [1][1] = lowest - maxBuy
    ];
    
    // Square the errors.
    for (let j = 0; j < b.length; j += 1) {
      for (let k = 0; k < b[j].length; k += 1) {
        b[j][k] *= b[j][k];
      }
    }
    
    // Calculate the total error for each possibility.
    let error = [
      [ b[0][0] + b[1][0],  // [0][0] = highestIsSell and LowestIsSell
        b[0][0] + b[1][1]], // [0][1] = highestIsSell and LowestIsBuy
      [ b[0][1] + b[1][0],  // [1][0] = highestIsBuy and LowestIsSell
        b[0][1] + b[1][1]]  // [1][1] = highestIsBuy and LowestIsBuy
    ];
    
    // Initialize a pair of indices that will correspond to the min error.
    let minIndex = {
      j : 0,
      k : 0
    };
    
    // Find the option with the minimum error.
    for (let j = 0; j < error.length; j += 1) {
      for (let k = 0; k < error[j].length; k += 1) {
        if (error[j][k] < error[minIndex.j][minIndex.k]) {
          minIndex.j = j;
          minIndex.k = k;
        }
      }
    }
    buyFraction = getBuyFraction(typeId, data, i, minIndex);
    updateCumulativeTotals(typeId, data, i, buyFraction);
  }
  //Logger.log("Computed average average buy volume of " + this.avgBuyVolumePerDay);
  let avgBuyVolumePerDay = itemVolHistory[ip.regionId][typeId].totalVolumeOfBuys / dateSpan; 
  let avgSellVolumePerDay = itemVolHistory[ip.regionId][typeId].totalVolumeOfSells / dateSpan;
  return {
    maxPrice: maxPrice,
    avgDailyBuyVol: avgBuyVolumePerDay,
    avgDailySellVol: avgSellVolumePerDay,
  };

}

function getBuyFraction(typeId, data, i, minIndex) {
  switch (10 * minIndex.j + minIndex.k) {
    case 00:
      // Highest and lowest are both sell.
      return 0;
    case 01:
      // Highest price is sell and lowest price is buy.
      return (data[i].highest - data[i].average)
      / (data[i].highest - data[i].lowest);
    case 10:
      // Highest is buy and lowest is sell.
      // This is not possible. Make an assumption.
      let totalCumulativeVolume = itemVolHistory[ip.regionId][typeId].totalVolumeOfBuys + itemVolHistory[ip.regionId][typeId].totalVolumeOfSells;
      if (totalCumulativeVolume == 0) {
        // If there's nothing to go on, assume they're 50-50 split.
        return 0.5;
      } else {
        // If we do have prior volume data, then assume it has the same
        // distribution as what has already been seen.
        return itemVolHistory[ip.regionId][typeId].totalVolumeOfBuys / totalCumulativeVolume;
      }
    case 11:
      // Highest and lowest are both buy.
      return 1;
    default:
      throw new Error('Impossible combination if j and k. Please debug me.');
  }
  
}

function updateCumulativeTotals(typeId, data, i, buyFraction) {
  let buyVolume = data[i].volume * buyFraction; 
  let sellVolume = data[i].volume - buyVolume;
  itemVolHistory[ip.regionId][typeId].totalVolumeOfBuys += buyVolume; 
  itemVolHistory[ip.regionId][typeId].totalVolumeOfSells += sellVolume; 
  itemVolHistory[ip.regionId][typeId].movingMaxBuyTotal += buyVolume * data[i].lowest;
  itemVolHistory[ip.regionId][typeId].movingMinSellTotal += sellVolume * data[i].highest;
  if (itemVolHistory[ip.regionId][typeId].totalVolumeOfBuys > 0) {
    itemVolHistory[ip.regionId][typeId].maxBuyMovingAvg = itemVolHistory[ip.regionId][typeId].movingMaxBuyTotal / itemVolHistory[ip.regionId][typeId].totalVolumeOfBuys;
  }
  if (itemVolHistory[ip.regionId][typeId].totalVolumeOfSells > 0) {
    itemVolHistory[ip.regionId][typeId].minSellMovingAvg = itemVolHistory[ip.regionId][typeId].movingMinSellTotal / itemVolHistory[ip.regionId][typeId].totalVolumeOfSells;
  }
}

function readSkills() {
  //if (dataIsFresh) {return Promise.resolve();}

  consoleAndStatus('Calculating, taxes, fees, and available orders...');
  return new Promise((resolve, reject) => {
    ip.charData.salesTax = 0.02;
    ip.charData.brokerFees = 0.03;
    ip.charData.availOrders = 5;
    for (let i = 0; i < ip.charData.skills.length; i += 1) {
      switch (ip.charData.skills[i].skill_id) {
        case 3443: // Trade
          ip.charData.availOrders += 4 * ip.charData.skills[i].trained_skill_level;
          break;
        case 3444: // Retail
          ip.charData.availOrders += 8 * ip.charData.skills[i].trained_skill_level;
          break;
        case 16596: // Wholesale
          ip.charData.availOrders += 16 * ip.charData.skills[i].trained_skill_level;
          break;
        case 18580: // Tycoon
          ip.charData.availOrders += 32 * ip.charData.skills[i].trained_skill_level;
          break;
        case 16622: // Accounting
          ip.charData.salesTax -= 0.10 * ip.charData.salesTax * ip.charData.skills[i].trained_skill_level;
          break;
        case 3446: // Broker Relations
          ip.charData.brokerFees -= 0.001 * ip.charData.skills[i].trained_skill_level;
          break;
      }
    }

    ip.charData.buyFeeAndTax = ip.charData.brokerFees;
    console.log("Buy fee and tax = " + ip.charData.buyFeeAndTax);
    ip.charData.sellFeeAndTax = ip.charData.brokerFees + ip.charData.salesTax;
    console.log("Sell fee and tax = " + ip.charData.sellFeeAndTax);

    ip.charData.availOrders -= ip.charData.usedOrders;
    ip.charData.availOrders -= RESERVEDORDERS;
    ip.charData.availOrders = Math.max(0, ip.charData.availOrders);
    console.log("Available orders to use = " + ip.charData.availOrders);
    resolve();
  });
}

function fillDataGaps() {
  return new Promise((resolve, reject) => {
    for (let typeId in itemData) {
      if (!itemData[typeId].maxBuy) itemData[typeId].maxBuy = 0;
      if (!itemData[typeId].minSell) itemData[typeId].minSell = 0;
      if (!itemData[typeId].margin) itemData[typeId].margin = 0;
      if (!itemVolHistory[ip.regionId][typeId].avgBuyVol) itemVolHistory[ip.regionId][typeId].avgBuyVol = 0;
      if (!itemVolHistory[ip.regionId][typeId].avgSellVol) itemVolHistory[ip.regionId][typeId].avgSellVol = 0;
      if (!itemData[typeId].buyOrders) itemData[typeId].buyOrders = 0;
      if (!itemData[typeId].sellOrders) itemData[typeId].sellOrders = 0;
      if (!itemData[typeId].score) itemData[typeId].score = 0;
    }
    resolve();
  });
}

function calcIskToInvest() {
  return new Promise((resolve, reject) => {
    console.log('Calculating investable ISK...');

    // TODO Also subtract value of most expensive ship + associated fittings.
    ip.charData.iskToInvest = Math.max(0, ip.charData.walletBal - ip.charData.additionalIskToCover);
    console.log("Isk to invest = " + ip.charData.iskToInvest);

    resolve();
  });
}

function calcScores() {
  console.log('Calculating item scores...');
  // return new Promise((resolve, reject) => {
  p = [];
  console.log(`Keys in itemData = ${Object.keys(itemData).length}.`);
  for (let typeId in itemData) {
    p.push(reprocessedValue(typeId).then(reprocessedValue => {
      itemData[typeId].reprocessedValue = reprocessedValue;
      itemData[typeId].priceFloor = Math.max(itemData[typeId].maxBuy + 0.01, reprocessedValue * 0.67);
      itemData[typeId].priceCeiling = itemData[typeId].minSell == 0 ? itemVolHistory[ip.regionId][typeId].maxPrice * 1.05 : itemData[typeId].minSell - 0.01;
      itemData[typeId].margin = itemData[typeId].priceCeiling * (1 - TAXFEEFACTOR * ip.charData.sellFeeAndTax) - itemData[typeId].priceFloor * (1 + TAXFEEFACTOR * ip.charData.buyFeeAndTax);
      let maxBuyPossible = Math.floor(ip.charData.iskToInvest / (itemData[typeId].priceFloor * (1 + ip.charData.buyFeeAndTax)));
      let maxSuggested = ORDER_DAYS * Math.min(itemVolHistory[ip.regionId][typeId].avgBuyVol / (itemData[typeId].buyOrders + 1), itemVolHistory[ip.regionId][typeId].avgSellVol / (itemData[typeId].sellOrders + 1));
      itemData[typeId].amountToBuy = Math.min(maxBuyPossible, maxSuggested);
      itemData[typeId].score = itemData[typeId].margin * itemData[typeId].amountToBuy;
      itemData[typeId].amountToBuy = Math.ceil(itemData[typeId].amountToBuy);
      itemData[typeId].profitRatio = itemData[typeId].score / itemData[typeId].priceFloor;
    }));
  }
  return Promise.all(p);
  // });
  // .then((p) => p.then(() => resolve()));
}

function reprocessedValue(feedTypeId) {
  return new Promise((resolve, reject) => {
    let reprocessedValue = 0;
    let productPrice;
    for (let productTypeId in ip.reprocessingData[feedTypeId]) {
      if (itemData[productTypeId]) {
        if (itemData[productTypeId].minSell) {
          productPrice = itemData[productTypeId].minSell;
        } else if (itemData[productTypeId].maxBuy) {
          productPrice = itemData[productTypeId].maxBuy;
        } else {
          productPrice = 0;
        }
        productQuantity = ip.reprocessingData[feedTypeId][productTypeId];

        reprocessedValue += productQuantity * productPrice;
      }
    }
    if (ip.reprocessingData[feedTypeId]) {
      reprocessedValue /= ip.reprocessingData[feedTypeId].feedQuantity;
    }
    return resolve(reprocessedValue);
  });
}


function suggestOrders() {
  consoleAndStatus('Determining orders to suggest...');
  return new Promise((resolve, reject) => {

    let allResults = [];
    for (let typeId in itemData) {      
      allResults.push(itemData[typeId]);
    }
    allResults.sort((a, b) => {
        return a.score > b.score ? -1 : 1;
    });

    let bestRoster = [];
    let currentRoster = [];
    let bestScore = 0;
    let currentScore = 0;
    let i = 0;
    let iskUsed;
    let ordersUsed = 0;

    let remainingBudget = ip.charData.iskToInvest;

    console.log(allResults)
    while ((i < allResults.length) && (ordersUsed < ip.charData.availOrders)) {
      if (totalCost(allResults[i]) <= remainingBudget) {
        currentRoster.push(allResults[i]);
        ordersUsed += 1;
        remainingBudget -= totalCost(allResults[i])
      }
      i += 1;
    }
      
    iskUsed = currentRoster.reduce((accum, currentItem) => accum + totalCost(currentItem), 0);
    let expectedProfit = currentRoster.reduce((accum, currentItem) => accum + currentItem.score, 0);
    suggestedOrders = currentRoster;
    console.log('ISK used = ' + iskUsed);
    console.log('Expected profit = ' + expectedProfit + ' (' + (expectedProfit / iskUsed * 100) + '%).');
    resolve();
  });
}

function totalCost(item) {
  return item.priceFloor * (1 + ip.charData.buyFeeAndTax) * item.amountToBuy;
}

function getTypeNames() {
  consoleAndStatus('Getting remaining typeNames...');
  return new Promise((resolve, reject) => {
    p = Promise.resolve();
    for (let typeId in itemData) {
      if (!typeNames[typeId]) {
        p = p.then(() => getTypeName(typeId))
          .then(name => {
            typeNames[typeId] = name;
            checkForExpired(typeId);
            localStorage.setItem('typeNames', JSON.stringify(typeNames));
        });
      } else {
        checkForExpired(typeId);
      }
    }
    resolve();
  }).then(() => {
    return p;
  });
}

function checkForExpired(typeId) {
  if (typeNames[typeId].toLowerCase().includes('expired')) {
    delete itemData[typeId];
  } else {
    itemData[typeId].typeName = typeNames[typeId];
  }
}

function getTypeName(typeId) {
  let options = OPTS;
  return wrapperForFetch(ip.esiApis.universe,'getUniverseTypesTypeId', typeId, options)
    .then(response => {
      typeNames[typeId] = response.data.name;
      status('Retrieved name of ' + typeNames[typeId] + '\n(item ' + typeId + ' of ' + maxId + ').');
      return typeNames[typeId];
    });
}

// ---- End of IskPrinter ---- //