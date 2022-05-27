const Reader = require('@maxmind/geoip2-node').Reader;

/**
 * Discovery Service offer functionality for IPv4 address geolocalization
 */
const DiscoveryService = {

  /**
   * Geo accept a list of ip and return a list of object containing the ip and geolocalization information
   * 
   * @param {*} ips Array of ip as string 
   * @returns list of the ip geolocalization
   */
  geo: async (ips) => {
    return geolocalizeIps(ips).then(locations => {
      return locations;
    }).catch(err => {
      return err;
    })
  }
}

/**
 * Geolocalize multiple ips
 * @param {*} ips array of ip as string
 * @returns Promise
 */
const geolocalizeIps = async (ips) => {

  const promise = new Promise((resolve, reject) => {
    if (ips.length) {
      Promise.all(
        ips.map((ip) => {
          return geolocalizeIp(ip);
        })
      ).then(geos => {
        resolve(geos)
      })
    } else {
      reject('Ips array must not be empty')
    }
  });

  return promise;
}

/**
 * Geolocalize an ip address
 * @param {*} ip string of the ip
 * @returns Promise
 */
const geolocalizeIp = (ip) => {

  return new Promise((resolve) => {
    Reader.open('database/GeoLite2-City.mmdb').then(async reader => {
      try {
        const response = await reader.city(ip);

        const countryISO = response.country.isoCode;
        const cityName = response?.city?.names?.en || "Unknown";
        const latlong = [response?.location?.latitude, response?.location?.longitude]

        resolve({ ip, geo: { countryISO, cityName, latlong } });
      } catch (err) {
        console.log(err);
        resolve({ ip, status: "invalid" });
      }
    }).catch(err => console.log(err));
  });
}

module.exports = DiscoveryService;