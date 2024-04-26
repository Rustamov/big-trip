const AUTHORIZATION = 'Basic hS2sfsdfvfgfS44wcl1sa2j13dsdsd';
const END_POINT = 'https://17.ecmascript.htmlacademy.pro/big-trip/';

const headers = { 'Authorization': AUTHORIZATION }; // auth header with bearer token

const getData = async (onSuccess, onFail) => {
  try {
    const eventsResponse = await fetch(`${END_POINT}points`, { headers });
    const offersResponse = await fetch(`${END_POINT}offers`, { headers });
    const destinationsResponse = await fetch(`${END_POINT}destinations`, { headers });

    const events = await eventsResponse.json();
    const offers = await offersResponse.json();
    const destinations = await destinationsResponse.json();

    onSuccess(events, offers, destinations);
  } catch (err) {
    onFail(err);
  }
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://25.javascript.htmlacademy.pro/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export { getData, sendData };
