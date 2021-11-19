export default class ExchangeService {  
  static getExchanged(cashFrom, cashTo, amount) {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${cashFrom}/${cashTo}/${amount}`)
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.status);
        }
        return response.json();
      })
      .catch(function(error) {
        return Error(error.message);
      });
  }
}