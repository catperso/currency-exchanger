export default class ExchangeService {  
  static getExchanged(cashFrom, cashTo, amount) {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${cashFrom}/${cashTo}/${amount}`)
      .then(function(response) {
        if (!response.ok) {
          let myBad = response.json();
          console.log(myBad);
          console.log(myBad.PromiseResult['error-type']);
          throw Error(myBad['error-type']);
        }
        return response.json();
      })
      .catch(function(error) {
        console.log(error.message);
        console.log(error.json());
        return Error(error.json());
      });
  }
}