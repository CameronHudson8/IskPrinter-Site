import { AuthenticatorInterface } from 'src/app/services/authenticator/authenticator.interface';
import { Deal } from 'src/app/entities/DealFinder/Deal';
import { FakeLocalStorage } from './FakeLocalStorage';
import { LocalStorageInterface } from './LocalStorageInterface';
import { Order } from 'src/app/entities/Order';

// Establish a global state.
const ip: any = { charData: {} };

const fakeLocalStorage = new FakeLocalStorage();

const RESERVEDORDERS = 0;
const TAXFEEFACTOR = 0;
const ORDER_DAYS = 1;
const OPTS = {};

let itemData = {};
const marketData = {};
let typeNames = {};
let dataIsFresh;
let maxId;
let verbose;
let itemVolHistory = {};

export class DealFinder {

    authenticatorService: AuthenticatorInterface;
    localStorage: LocalStorageInterface;
    typeIds: number[];
    structureOrders: Order[];
    suggestedDeals: Deal[];
    verbose: boolean;

    constructor(authenticatorService: AuthenticatorInterface, localStorage?: LocalStorageInterface) {
        this.authenticatorService = authenticatorService;
        this.localStorage = localStorage || new FakeLocalStorage();
    }

    async findDeals(characterId: number, regionId: number, { verbose }: { verbose: boolean }): Promise<Deal[]> {

        this.typeIds = await this.getTypeIds();
        this.localStorage.setItem('typeIds', JSON.stringify(this.typeIds));
        console.log(`getting market history for typeId ${this.typeIds[0]}`);
        const volumeHistory = await this.getVolumeHistory(regionId, this.typeIds[1]);
        console.log(volumeHistory); 

        return [
            // new Deal(typeId, volume, buyPrice, sellPrice, fees),
            new Deal(28392, 1, 200, 800, 2),
            new Deal(2819, 28, 2849, 98943, 38),
            new Deal(294903, 3028, 1084928, 5029052, 10892),
        ].sort((deal1, deal2) => deal2.profit - deal1.profit);

        ip.charData.id = characterId;
        this.verbose = verbose || false;

        // await this.retrieveData();
        // await this.buildItemList();
        // await this.getTypeNames();
        // await this.removeExpiredItems();
        // await this.getHistoriesOfItems(7);
        // await this.readSkills();
        // await this.fillDataGaps();
        // await this.calcIskToInvest();
        // await this.calcScores();
        // await this.removeAlreadyTrading();
        return this.suggestOrders();

    }

    private async getTypeIds(): Promise<number[]> {

        // Try to load cached data first
        if (this.typeIds) {
            return this.typeIds;
        }
        const storedTypeIds = JSON.parse(this.localStorage.getItem('typeIds'));
        if (storedTypeIds) {
            return storedTypeIds;
        }

        // Fetch fresh data
        const marketGroupsResponse = await this.authenticatorService.requestWithAuth(
            'get',
            'https://esi.evetech.net/latest/markets/groups'
        );
        const marketGroupIds = marketGroupsResponse.body as number[];

        const typeIds: number[] = await marketGroupIds
            .map(async (marketGroupId) => {
                let marketGroupResponse;
                marketGroupResponse = await this.authenticatorService.requestWithAuth(
                    'get',
                    `https://esi.evetech.net/latest/markets/groups/${marketGroupId}`,
                );
                const groupTypeIds: number[] = (marketGroupResponse.body as any).types;
                return groupTypeIds;
            })
            .reduce(async(previousValue, currentValue) => [
                ...(await previousValue),
                ...(await currentValue)
            ]);
        
        return typeIds;
    }

    private async getVolumeHistory(regionId: number, typeId: number) {
        let response;
        try {
            response = await this.authenticatorService.requestWithAuth(
                'get',
                `https://esi.evetech.net/latest/markets/${regionId}/history`,
                {
                    params: { type_id: typeId }
                }
            );
        } catch (err) {
            if (err.status === 404) {
                return [];
            }
            throw err;
        }
        const typeIds = response.body as number[];
        return typeIds;
    }

    private async getMarketOrdersInStructure(structureId: number): Promise<Order[]> {

        const response = await this.authenticatorService.requestWithAuth(
            'get',
            `https://esi.evetech.net/latest/markets/structures/${structureId}`,
        );
        const orders = (<Order[]>response.body).map((order) => ({
            ...order,
            issued: new Date(order.issued)
        }));
        return orders;

    }

    refreshToken() {
        return new Promise((resolve, reject) => {

            let char_id = this.getIdOfActiveCharacter();
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
            fetch(`${ip.REDIRECTURI}api/characters/${char_id}/this.refreshToken`, options)
                .then(response => response.text())
                .then(data => {
                    if (!ip.accessToken) ip.accessToken = {};
                    ip.accessToken.tokenString = data;
                    ip.accessToken.expiryTimestamp = Date.now() + 1199 * 1000;
                    fakeLocalStorage.setItem('mostRecentAccessToken', JSON.stringify(ip.accessToken));
                    return resolve();
                });
        });
    }

    getIdOfActiveCharacter() {
        return ip.charData.id;
    }

    // Retrieve the character's id, which is used for all other functions.
    getCharId() {
        this.consoleAndStatus('Retrieving character id...');

        return new Promise((resolve, reject) => {

            let options = {
                headers: { Authorization: 'Bearer ' + ip.accessToken.tokenString },
                method: 'get',
            };

            fetch('https://esi.tech.ccp.is/verify/', options)
                .then(response => {
                    if (response == undefined || !response.ok) {
                        this.consoleAndStatus('Encountered id retrieval error. Retrying in ' + ip.WAITDELAY + ' seconds...');
                        window.setTimeout(() => {
                            this.getCharId().then(() => resolve());
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

    // // Load saved data.
    // loadSavedData() {
    //   return new Promise((resolve, reject) => {

    //     // If there is saved data for this character that is less than 5 minutes old, load it.
    //     let tempCharData = fakeLocalStorage.getItem(ip.charData.id);
    //     if (tempCharData) {
    //       tempCharData = JSON.parse(tempCharData);
    //       let dataAge = Date.now() - tempCharData.timestamp;

    //       // dataIsFresh = (dataAge < 5 * 60 * 1000);

    //       // ---- FOR DEBUGGING ---- //
    //       dataIsFresh = false;
    //       console.log('Data is ' + (dataIsFresh ? '' : 'not ') + 'fresh.');

    //       if (dataIsFresh) {
    //         console.log('Loading saved data from ' + (dataAge / 1000 / 60).toFixed(1) + ' minutes ago...');
    //         ip.charData = tempCharData;
    //       }
    //       //itemData = JSON.parse(fakeLocalStorage.getItem('itemData'));
    //       let itemVolHistory = JSON.parse(fakeLocalStorage.getItem('itemVolHistory'));
    //       itemData = {};
    //       if (!itemVolHistory) itemVolHistory = {};
    //       // if (typeof itemVolHistory[ip.regionId] === 'undefined') itemVolHistory[ip.regionId] = {};
    //       if (!ip.charData) ip.charData = {};
    //     }
    //     resolve();
    //   });
    // }

    // Retrieve data from CCP.
    async retrieveData(): Promise<void> {
        await Promise.all([
            this.getCharOrders(ip.charData.id),
            this.getCharSkills(ip.charData.id),
            this.getCharStats(ip.charData.id),
            this.getCharTransactions(ip.charData.id),
            this.getCharWalletBal(ip.charData.id),
            this.getCurrentLocation(ip.charData.id),
            this.getReprocessedValues(),
            this.getStructureOrders()
        ]);
    }

    // Get the current location of the character.
    getCurrentLocation(characterId) {
        return new Promise((resolve, reject) => {
            this.consoleAndStatus('Getting location info...');

            this.getCharacterLocation(characterId)
                .then((data) => this.getSolarSystemInfo(data.solar_system_id))
                .then((data: any) => this.getConstellationInfo(data.constellation_id))
                .then((data) => resolve());
        });
    }

    // Get solar system info.
    getCharacterLocation(characterId) {
        this.consoleAndStatus('Getting character location...');
        let options: any = OPTS;
        options.token = ip.accessToken.tokenString;
        return this.wrapperForFetch(
            ip.esiApis.location,
            'getCharactersCharacterIdLocation',
            characterId,
            options
        ).then((response: any) => {
            if (!response.data.structure_id) {
                this.consoleAndStatus('Please dock your character the station in which you want to trade.');
                return new Error('Character is not docked.');
            } else {
                ip.structureId = response.data.structure_id;
                return response.data;
            }
        });
    }

    // Get solar system info.
    getSolarSystemInfo(solarSystemId) {
        return new Promise((resolve, reject) => {
            this.consoleAndStatus('Getting solar system info...');
            let options = OPTS;
            // options.token = ip.accessToken.tokenString;
            return this.wrapperForFetch(
                ip.esiApis.universe,
                'getUniverseSystemsSystemId',
                solarSystemId,
                options)
                .then((response: any) => {
                    resolve(response.data);
                })
        });
    }

    // Get constellation info.
    getConstellationInfo(constellationId) {
        return new Promise((resolve, reject) => {
            this.consoleAndStatus('Getting constellation info...');
            let options = OPTS;
            // options.token = ip.accessToken.tokenString;
            return this.wrapperForFetch(
                ip.esiApis.universe,
                'getUniverseConstellationsConstellationId',
                constellationId,
                options)
                .then((response: any) => {
                    ip.regionId = response.data.region_id;
                    resolve(response.data);
                })
        });
    }

    getReprocessedValues() {
        return new Promise((resolve, reject) => {
            this.consoleAndStatus('Downloading reprocessing data...');
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

    buildItemList() {
        if (dataIsFresh) return Promise.resolve();

        return new Promise((resolve, reject) => {

            this.consoleAndStatus('Building item list...');

            let allOrders = marketData[ip.structureId].orders;
            itemData = {};

            console.log(`Keys in allOrders = ${Object.keys(allOrders).length}.`);

            for (let i = 0; i < allOrders.length; i += 1) {

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
                this.status('Processed data... Order ' + (i + 1) + ' of ' + allOrders.length);
            }
            fakeLocalStorage.setItem('itemData', JSON.stringify(itemData));
            maxId = Math.max(...Object.keys(itemData).map((key) => Number(key)));
            resolve();
        });
    }

    removeAlreadyTrading() {
        this.consoleAndStatus('Omitting items already being traded...');
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

    removeExpiredItems() {
        return new Promise((resolve, reject) => {
            for (let typeId in itemData) {
                if (typeNames[typeId].toLowerCase().includes('expired') && itemData[typeId]) {
                    delete itemData[typeId];
                }
            }
            maxId = Math.max(...Object.keys(itemData).map((key) => Number(key)));
            resolve();
        });
    }

    // Save the downloaded data.
    saveAndOverwrite() {
        return new Promise((resolve, reject) => {

            if (dataIsFresh) {
                return resolve();
            }
            this.consoleAndStatus('Saving...');
            //ip.charData.timestamp = Date.now();
            //fakeLocalStorage.setItem(ip.charData.id, JSON.stringify(ip.charData));
            fakeLocalStorage.setItem('typeNames', JSON.stringify(typeNames));
            fakeLocalStorage.setItem('itemVolHistory', JSON.stringify(itemVolHistory));
            //fakeLocalStorage.setItem('itemData', JSON.stringify(itemData));
            resolve();
        });
    }

    // Print the results.
    printResults() {
        return new Promise((resolve, reject) => {

            console.log(this.suggestedDeals);

            resolve();
        });
    }

    // Send to the console and also update the status shown on the page.
    consoleAndStatus(content) {
        if (verbose) {
            this.status(content);
        }
        console.log(content);
    }

    // Update the status shown on the page.
    status(content) {
        // no op
    }

    // Used to call functions that could return an error due to bad server response.
    wrapperForFetch(api, fetchFunctionName, ...fetchArgs) {
        return new Promise((resolve, reject) => {
            let result;
            api[fetchFunctionName](...fetchArgs, (error, data, response) => {
                result = { error: error, data: data, response: response };
                //console.log(result);
                resolve(result);
            });
        }).then((result: any) => {
            return new Promise((resolve, reject) => {
                if (!result.response || Math.floor(result.response.status / 100) == 5) {
                    this.consoleAndStatus('Encountered server-side 5xx error.\nRetrying in ' + ip.WAITDELAY + ' seconds...');
                    window.setTimeout(() => {
                        resolve(this.wrapperForFetch(api, fetchFunctionName, ...fetchArgs));
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

    loadTypeNames() {
        return new Promise((resolve, reject) => {
            let typeNamesString = fakeLocalStorage.getItem('typeNames');
            if (typeNamesString == null || typeNamesString == 'undefined') {
                typeNames = {};
            } else {
                typeNames = JSON.parse(fakeLocalStorage.getItem('typeNames'))
            }
            return resolve();
        });
    }

    // ---- Beginning of Standard Eve API Requests ---- //

    // Use character id to get character stats.
    getCharStats(characterId) {
        if (dataIsFresh) return Promise.resolve();

        return new Promise(function (resolve, reject) {
            this.consoleAndStatus('Downloading character stats...');
            ip.esiApis.character.getCharactersCharacterId(characterId, {}, (error, data, response) => {
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
    getCharOrders(characterId) {
        //if (dataIsFresh) return Promise.resolve();

        this.consoleAndStatus('Downloading character orders...');
        let options: any = OPTS;
        options.token = ip.accessToken.tokenString;
        return this.wrapperForFetch(ip.esiApis.market, 'getCharactersCharacterIdOrders', characterId, options)
            .then((response: any) => {
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
    getCharSkills(characterId) {
        //if (dataIsFresh) return Promise.resolve();

        this.consoleAndStatus('Downloading character skills...');
        let options: any = OPTS;
        options.token = ip.accessToken.tokenString;
        return this.wrapperForFetch(ip.esiApis.skills, 'getCharactersCharacterIdSkills', characterId, options)
            .then((response: any) => {
                ip.charData.skills = response.data.skills;
            });
    }

    // Use character id to get character transactions.
    getCharTransactions(characterId) {
        if (dataIsFresh) return Promise.resolve();

        return new Promise(function (resolve, reject) {
            this.consoleAndStatus('Downloading character transactions...');
            let options: any = OPTS;
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
    getCharWalletBal(characterId) {
        this.consoleAndStatus('Downloading character wallet balance...');
        let options: any = OPTS;
        options.token = ip.accessToken.tokenString;
        return this.wrapperForFetch(
            ip.esiApis.wallet,
            'getCharactersCharacterIdWallet',
            characterId,
            options
        ).then((response: any) => {
            ip.charData.walletBal = response.data;
        });
    }

    // Use structure id to get structure orders.
    getStructureOrders() {
        if (dataIsFresh) return Promise.resolve();

        // First, get the number of pages.
        this.consoleAndStatus('Downloading structure orders...');
        let options: any = OPTS;
        options.token = ip.accessToken.tokenString;
        if (!marketData[ip.structureId]) marketData[ip.structureId] = {};
        marketData[ip.structureId].orders = [];

        let p = Promise.resolve();
        let totalOrders = 0;

        // Call the API once just to get the total number of pages.
        return this.wrapperForFetch(ip.esiApis.market, 'getMarketsStructuresStructureId', ip.structureId, options)
            .then((response: any) => {
                const totalPages = response.response.header['x-pages'];
                for (let i = 1; i <= totalPages; i += 1) {
                    p = p.then(() => {
                        options.page = i;
                        return this.wrapperForFetch(ip.esiApis.market, 'getMarketsStructuresStructureId', ip.structureId, options)
                    }).then((response: any) => {
                        return new Promise((resolveInner, rejectInner) => {
                            totalOrders += response.data.length;
                            this.consoleAndStatus('Retrieved structure orders page ' + i + ' of ' + totalPages + '.');
                            marketData[ip.structureId].orders = marketData[ip.structureId].orders.concat(response.data);
                            resolveInner();
                        });
                    })
                }
            }).then(() => p);
    }

    // Retrieve item market histories if the current data is older than the threshold (in days).
    getHistoriesOfItems(threshold) {
        let statusUpdate = 'Getting histories of items...';
        this.consoleAndStatus(statusUpdate);

        return new Promise((resolve, reject) => {
            let p = Promise.resolve();
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
                        return this.getHistoryOfItem(typeId);
                    } else {
                        return Promise.resolve();
                    }
                });
            }
            resolve(p);
        }).then((p) => p);
    }

    getHistoryOfItem(typeId) {
        let options = OPTS;
        return this.wrapperForFetch(ip.esiApis.market, 'getMarketsRegionIdHistory', ip.regionId, typeId, options)
            .then((response: any) => {
                let statusUpdate = 'Retrieved market history of ' + typeNames[typeId] + '\n(item ' + typeId + ' of ' + maxId + ').';
                this.consoleAndStatus(statusUpdate);

                let history = this.analyzeHistory(response.data);
                if (typeof itemVolHistory[ip.regionId][typeId] === 'undefined') itemVolHistory[ip.regionId][typeId] = {};
                itemVolHistory[ip.regionId][typeId].maxPrice = history.maxPrice;
                itemVolHistory[ip.regionId][typeId].avgBuyVol = history.avgDailyBuyVol;
                itemVolHistory[ip.regionId][typeId].avgSellVol = history.avgDailySellVol;
                itemVolHistory[ip.regionId][typeId].dataAge = Date.now();
                fakeLocalStorage.setItem('itemVolHistory', JSON.stringify(itemVolHistory));
            })
            .catch(reason => {
                if (reason == 404) {

                    // Remove the item from the data.
                    let statusUpdate = 'Removing obsolete item ' + typeNames[typeId] + ' from data set.';
                    this.consoleAndStatus(statusUpdate);

                    delete itemData[typeId];
                    fakeLocalStorage.setItem('itemData', JSON.stringify(itemData));
                } else {
                    console.log("Encountered " + reason + " error during item history retrieval!");
                }
            });
    }

    analyzeHistory(data) {

        //console.log("Determining buy and sell orders...");
        let firstDate = data[0] ? data[0].date : Date.now() - 1000 * 60 * 60 * 24;
        let finalDate = Date.now();
        let dateSpan = (finalDate - firstDate) / 1000 / 60 / 60 / 24;
        let maxPrice = 0;

        const workingData = {
            totalVolumeOfBuys: 0,
            totalVolumeOfSells: 0,
            movingMaxBuyTotal: 0,
            movingMinSellTotal: 0,
            maxBuyMovingAvg: 0, // = itemData[typeId].maxBuy;
            minSellMovingAvg: 0, // = itemData[typeId].minSell;
        };

        let buyFraction;

        for (let i = 0; i < data.length; i += 1) {

            maxPrice = Math.max(maxPrice, data[i].highest);

            //console.log("Determining buy and sell orders for day " + data[i].date);
            let a = [
                [
                    data[i].highest,              // [0][0]
                    data[i].lowest                // [0][1]
                ], 
                [
                    workingData.minSellMovingAvg, // [1][0]
                    workingData.maxBuyMovingAvg   // [1][1]
                ]  
            ];

            console.log(`data[i].highest: ${data[i].highest}.`);
            console.log(`data[i].lowest: ${data[i].lowest}.`);
            console.log(`workingData.minSellMovingAvg: ${workingData.minSellMovingAvg}.`);
            console.log(`workingData.maxBuyMovingAvg: ${workingData.maxBuyMovingAvg}.`);

            //TODO Use linear algebra to identify the option with minimum error.
            let x = [
                data[i].highest,
                data[i].lowest
            ];
            let y = [
                workingData.minSellMovingAvg,
                workingData.maxBuyMovingAvg
            ];
            //let beta = Math.transpose(x);

            // Calculate the simple error for each option.
            let b = [
                [a[0][0] - a[1][0],    // [0][0] = highest - minSell
                a[0][0] - a[1][1]],  // [0][1] = highest - maxBuy
                [a[0][1] - a[1][0],    // [1][0] = lowest - minSell
                a[0][1] - a[1][1]]   // [1][1] = lowest - maxBuy
            ];

            console.log(`b: ${b}.`);

            // Square the errors.
            for (let j = 0; j < b.length; j += 1) {
                for (let k = 0; k < b[j].length; k += 1) {
                    b[j][k] *= b[j][k];
                }
            }

            // Calculate the total error for each possibility.
            let error = [
                [b[0][0] + b[1][0],  // [0][0] = highestIsSell and LowestIsSell
                b[0][0] + b[1][1]], // [0][1] = highestIsSell and LowestIsBuy
                [b[0][1] + b[1][0],  // [1][0] = highestIsBuy and LowestIsSell
                b[0][1] + b[1][1]]  // [1][1] = highestIsBuy and LowestIsBuy
            ];

            // Initialize a pair of indices that will correspond to the min error.
            let minIndex = {
                j: 0,
                k: 0
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
            console.log(`residuals: ${error}.`);
            buyFraction = this.getBuyFraction(workingData, data, i, minIndex);
            this.updateCumulativeTotals(workingData, data, i, buyFraction);
        }
        //Logger.log("Computed average average buy volume of " + this.avgBuyVolumePerDay);
        let avgBuyVolumePerDay = workingData.totalVolumeOfBuys / dateSpan;
        let avgSellVolumePerDay = workingData.totalVolumeOfSells / dateSpan;
        return {
            maxPrice: maxPrice,
            avgDailyBuyVol: avgBuyVolumePerDay,
            avgDailySellVol: avgSellVolumePerDay,
        };

    }

    // WARNING: This is a temporary refactor.
    // This function will MUTATE the workingData parameter.
    getBuyFraction(workingData, data, i, minIndex) {
        switch (10 * minIndex.j + minIndex.k) {
            case 0:
                // Highest and lowest are both sell.
                return 0;
            case 1:
                // Highest price is sell and lowest price is buy.
                return (data[i].highest - data[i].average)
                    / (data[i].highest - data[i].lowest);
            case 10:
                // Highest is buy and lowest is sell.
                // This is not possible. Make an assumption.
                let totalCumulativeVolume = workingData.totalVolumeOfBuys + workingData.totalVolumeOfSells;
                if (totalCumulativeVolume == 0) {
                    // If there's nothing to go on, assume they're 50-50 split.
                    return 0.5;
                } else {
                    // If we do have prior volume data, then assume it has the same
                    // distribution as what has already been seen.
                    return workingData.totalVolumeOfBuys / totalCumulativeVolume;
                }
            case 11:
                // Highest and lowest are both buy.
                return 1;
            default:
                throw new Error('Impossible combination if j and k. Please debug me.');
        }

    }

    // WARNING: This is a temporary refactor.
    // This function will MUTATE the workingData parameter.
    updateCumulativeTotals(workingData, data, i, buyFraction) {
        let buyVolume = data[i].volume * buyFraction;
        let sellVolume = data[i].volume - buyVolume;
        workingData.totalVolumeOfBuys += buyVolume;
        workingData.totalVolumeOfSells += sellVolume;
        workingData.movingMaxBuyTotal += buyVolume * data[i].lowest;
        workingData.movingMinSellTotal += sellVolume * data[i].highest;
        if (workingData.totalVolumeOfBuys > 0) {
            workingData.maxBuyMovingAvg = workingData.movingMaxBuyTotal / workingData.totalVolumeOfBuys;
        }
        if (workingData.totalVolumeOfSells > 0) {
            workingData.minSellMovingAvg = workingData.movingMinSellTotal / workingData.totalVolumeOfSells;
        }
    }

    readSkills() {
        //if (dataIsFresh) {return Promise.resolve();}

        this.consoleAndStatus('Calculating, taxes, fees, and available orders...');
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

    fillDataGaps() {
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

    calcIskToInvest() {
        return new Promise((resolve, reject) => {
            console.log('Calculating investable ISK...');

            // TODO Also subtract value of most expensive ship + associated fittings.
            ip.charData.iskToInvest = Math.max(0, ip.charData.walletBal - ip.charData.additionalIskToCover);
            console.log("Isk to invest = " + ip.charData.iskToInvest);

            resolve();
        });
    }

    calcScores() {
        console.log('Calculating item scores...');
        // return new Promise((resolve, reject) => {
        const p = [];
        console.log(`Keys in itemData = ${Object.keys(itemData).length}.`);
        for (let typeId in itemData) {
            p.push(this.reprocessedValue(typeId).then((reprocessedValue: number) => {
                itemData[typeId].this.reprocessedValue = this.reprocessedValue;
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

    reprocessedValue(feedTypeId) {
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
                    const productQuantity = ip.reprocessingData[feedTypeId][productTypeId];

                    reprocessedValue += productQuantity * productPrice;
                }
            }
            if (ip.reprocessingData[feedTypeId]) {
                reprocessedValue /= ip.reprocessingData[feedTypeId].feedQuantity;
            }
            return resolve(this.reprocessedValue);
        });
    }


    async suggestOrders(): Promise<Deal[]> {
        this.consoleAndStatus('Determining orders to suggest...');

        const allResults = [];
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
            if (this.totalCost(allResults[i]) <= remainingBudget) {
                currentRoster.push(allResults[i]);
                ordersUsed += 1;
                remainingBudget -= this.totalCost(allResults[i])
            }
            i += 1;
        }

        iskUsed = currentRoster.reduce((accum, currentItem) => accum + this.totalCost(currentItem), 0);
        let expectedProfit = currentRoster.reduce((accum, currentItem) => accum + currentItem.score, 0);
        this.suggestedDeals = currentRoster;
        console.log('ISK used = ' + iskUsed);
        console.log('Expected profit = ' + expectedProfit + ' (' + (expectedProfit / iskUsed * 100) + '%).');
        return this.suggestedDeals;
    }

    totalCost(item) {
        return item.priceFloor * (1 + ip.charData.buyFeeAndTax) * item.amountToBuy;
    }

    getTypeNames() {
        this.consoleAndStatus('Getting remaining typeNames...');
        return new Promise((resolve, reject) => {
            let p = Promise.resolve();
            for (let typeId in itemData) {
                if (!typeNames[typeId]) {
                    p = p.then(() => this.getTypeName(typeId))
                        .then(name => {
                            typeNames[typeId] = name;
                            this.checkForExpired(typeId);
                            fakeLocalStorage.setItem('typeNames', JSON.stringify(typeNames));
                        });
                } else {
                    this.checkForExpired(typeId);
                }
            }
            resolve(p);
        }).then((p) => {
            return p;
        });
    }

    checkForExpired(typeId) {
        if (typeNames[typeId].toLowerCase().includes('expired')) {
            delete itemData[typeId];
        } else {
            itemData[typeId].typeName = typeNames[typeId];
        }
    }

    getTypeName(typeId) {
        let options = OPTS;
        return this.wrapperForFetch(ip.esiApis.universe, 'getUniverseTypesTypeId', typeId, options)
            .then((response: any) => {
                typeNames[typeId] = response.data.name;
                this.status('Retrieved name of ' + typeNames[typeId] + '\n(item ' + typeId + ' of ' + maxId + ').');
                return typeNames[typeId];
            });
    }

}
