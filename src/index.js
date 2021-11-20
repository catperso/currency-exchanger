import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeService from './js/exchange-service.js';

function clearFields() {
  $('#cash-i-want').val("");
  $('#cash-i-have').val("");
  $('#amount').val("");
  $('#show-errors').html("");
  $('.output-card').hide();
  $('.conversion-zone').hide();
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
  $('.output-card').slideDown();
  $('.conversion-zone').fadeIn();
}

function displayErrors(error) {
  let errorOutput = [];
  errorOutput.push("<p class='error-message'>API Error ");
  if (parseInt(error) === 400) {
    errorOutput.push(`<${error}: bad request> - malformed currency code, please use a valid code! (ex: USD, EUR, etc)`);
  } else if (parseInt(error) === 404) {
    errorOutput.push(`<${error}: not found> - unsupported currency code(s), please use one of the codes from the menus!`);
  } else if (parseInt(error) === 403) {
    errorOutput.push(`<${error}: forbidden> - invalid key, please make sure your API key is valid!`);
  } else {
    errorOutput.push(`<${error}> - something went wrong!`);
  }
  errorOutput.push('</p>');
  $('#show-errors').html(errorOutput.join(''));
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
          throw Error(exchangeResponse.message);
        }
        displayExchangeStats(exchangeResponse, amount);
      })
      .catch(function(error) {
        displayErrors(error.message);
      });
  });
});