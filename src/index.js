import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeService from './js/exchange-service.js';

function clearFields() {
  $('#location').val("");
  $('.showErrors').text("");
}

function displayExchangeStats(response) {
  
}

function displayErrors(error) {
  $('.show-errors').text(`${error}`);
}

$(document).ready(function() {
  $('#exchange-button').click(function() {
    let cashFrom = $('#cash-i-have').val();
    let cashTo = $('#cash-i-want').val();
    let amount = $('#cash-amount').val();
    clearFields();
    ExchangeService.getExchanged(cashFrom, cashTo, amount)
      .then(function(exchangeResponse) {
        if (exchangeResponse instanceof Error) {
          throw Error(`ExchangeRate API error: ${exchangeResponse.message}`);
        }
        displayExchangeStats(exchangeResponse);
      })
      .catch(function(error) {
        displayErrors(error.message);
      });
  });
});