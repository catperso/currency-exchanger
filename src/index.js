import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeService from './js/exchange-service.js';

function clearFields() {
  $('#cash-i-want').val("");
  $('#cash-i-have').val("");
  $('#amount').val("");
  $('#show-errors').text("");
}

function displayExchangeStats(response, startingCash) {
  let startingCurrency = response.base_code;
  let endingCurrency = response.target_code;
  let endingCash = response.conversion_result;
  let exchangeRate = response.conversion_rate;
  $('#initial-currency').text(startingCurrency);
  $('#initial-amount').text(startingCash);
  $('#conversion-rate').text(exchangeRate);
  $('#resultant-currency').text(endingCurrency);
  $('#resultant-amount').text(endingCash);
}

function displayErrors(error) {
  $('#show-errors').text(`${error}`);
}

$(document).ready(function() {
  $('#currency-exchange').submit(function(event) {
    event.preventDefault();
    let cashFrom = $('#cash-i-have').val();
    let cashTo = $('#cash-i-want').val();
    let amount = $('#amount').val();
    clearFields();
    ExchangeService.getExchanged(cashFrom, cashTo, amount)
      .then(function(exchangeResponse) {
        if (exchangeResponse instanceof Error) {
          //throw Error(`ExchangeRate API error: ${exchangeResponse.message}`);
          throw Error(exchangeResponse);
        }
        displayExchangeStats(exchangeResponse, amount);
      })
      .catch(function(error) {
        displayErrors(error['error-type']);
      });
  });
});