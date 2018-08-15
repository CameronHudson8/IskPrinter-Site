// Establish a namespace.
if (typeof ip === 'undefined') ip = {};

// App-specific parameters:
ip.isLocal = window.location.href.indexOf('localhost') > -1 ? true : false;
ip.CLIENTID = ip.isLocal ?
    '66c2e9a0e1164a9ab88006abe1e8c7ab' :
    'bf9674bde4cd432193ac5644daf38b07';
ip.REDIRECTURI = ip.isLocal ? 
    'http://localhost:8080/' :
    'https://iskprinter.com/';

ip.WAITDELAY = 5;
//var STRUCTUREID = 1022734985679; // 1DQ1-A - #% Thetastar of David %#
// ip.ITEMQUANTITY = 50;


// Authorization request parameters:

BASEURL = 'login.eveonline.com';
RESPONSETYPE = 'token'; // Get an access token for Implicit Flow (as opposed to an authorization code for permanent access)
SCOPES = [
  /*
  'esi-alliances.read_contacts.v1',
  'esi-assets.read_assets.v1',
  'esi-assets.read_corporation_assets.v1',
  'esi-bookmarks.read_character_bookmarks.v1',
  'esi-bookmarks.read_corporation_bookmarks.v1',
  'esi-calendar.read_calendar_events.v1',
  'esi-calendar.respond_calendar_events.v1',
  'esi-characters.read_agents_research.v1',
  'esi-characters.read_blueprints.v1',
  'esi-characters.read_chat_channels.v1',
  'esi-characters.read_contacts.v1',
  'esi-characters.read_corporation_roles.v1',
  'esi-characters.read_fatigue.v1',
  'esi-characters.read_fw_stats.v1',
  'esi-characters.read_loyalty.v1',
  'esi-characters.read_medals.v1',
  'esi-characters.read_notifications.v1',
  'esi-characters.read_opportunities.v1',
  'esi-characters.read_standings.v1',
  'esi-characters.read_titles.v1',
  'esi-characters.write_contacts.v1',
  */
  'esi-characterstats.read.v1',
  /*
  'esi-clones.read_clones.v1',
  'esi-clones.read_implants.v1',
  'esi-contracts.read_character_contracts.v1',
  'esi-contracts.read_corporation_contracts.v1',
  'esi-corporations.read_blueprints.v1',
  'esi-corporations.read_contacts.v1',
  'esi-corporations.read_container_logs.v1',
  'esi-corporations.read_corporation_membership.v1',
  'esi-corporations.read_divisions.v1',
  'esi-corporations.read_facilities.v1',
  'esi-corporations.read_fw_stats.v1',
  'esi-corporations.read_medals.v1',
  'esi-corporations.read_outposts.v1',
  'esi-corporations.read_standings.v1',
  'esi-corporations.read_starbases.v1',
  'esi-corporations.read_structures.v1',
  'esi-corporations.read_titles.v1',
  'esi-corporations.track_members.v1',
  'esi-corporations.write_structures.v1',
  'esi-fittings.read_fittings.v1',
  'esi-fittings.write_fittings.v1',
  'esi-fleets.read_fleet.v1',
  'esi-fleets.write_fleet.v1',
  'esi-industry.read_character_jobs.v1',
  'esi-industry.read_character_mining.v1',
  'esi-industry.read_corporation_jobs.v1',
  'esi-industry.read_corporation_mining.v1',
  'esi-killmails.read_corporation_killmails.v1',
  'esi-killmails.read_killmails.v1',
  */
  'esi-location.read_location.v1',
  /*
  'esi-location.read_online.v1',
  'esi-location.read_ship_type.v1',
  'esi-mail.organize_mail.v1',
  'esi-mail.read_mail.v1',
  'esi-mail.send_mail.v1',
  */
  'esi-markets.read_character_orders.v1',
  /*
  'esi-markets.read_corporation_orders.v1',
  */
  'esi-markets.structure_markets.v1',
  /*
  'esi-planets.manage_planets.v1',
  'esi-planets.read_customs_offices.v1',
  'esi-search.search_structures.v1',
  'esi-skills.read_skillqueue.v1',
  */
  'esi-skills.read_skills.v1',
  /*
  'esi-ui.open_window.v1',
  'esi-ui.write_waypoint.v1',
  'esi-universe.read_structures.v1',
  */
  'esi-wallet.read_character_wallet.v1',
  /*
  'esi-wallet.read_corporation_wallets.v1',
  */
];
var STATE = 'default';
var LOGONURL = 'https://' + BASEURL + '/oauth/authorize?'
    + 'response_type=' + RESPONSETYPE
    + '&redirect_uri=' + ip.REDIRECTURI
    + '&client_id=' + ip.CLIENTID
    + '&scope=' + SCOPES.join(' ');
    + '&state=' + STATE;
var VERIFYURL = 'https://' + BASEURL + '/oauth/verify';

var OPTS = { 
  'datasource': "tranquility", // {String} The server name you would like data from
  'userAgent': "userAgent_example", // {String} Client identifier, takes precedence over headers
  'xUserAgent': "xUserAgent_example" // {String} Client identifier, takes precedence over User-Agent
};
var REGIONID = 10000060;
var RESERVEDORDERS = 16;
var TAXFEEFACTOR = 2;
var ORDER_DAYS = 5;