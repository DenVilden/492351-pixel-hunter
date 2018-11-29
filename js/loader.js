const SERVER_URL = `https://es.dump.academy/pixel-hunter`;

const DEFAULT_NAME = `Kappa`;
const APP_ID = 3751463022;

const checkStatus = response => {
  if (response.ok) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = res => res.json();

export default class Loader {
  static async loadData() {
    const response = await fetch(`${SERVER_URL}/questions`);
    const res = await checkStatus(response);
    return toJSON(res);
  }

  static async loadResults(name = DEFAULT_NAME) {
    const response = await fetch(`${SERVER_URL}/stats/:${APP_ID}-:${name}`);
    const res = await checkStatus(response);
    return toJSON(res);
  }

  static async saveResults(data, name = DEFAULT_NAME) {
    data = Object.assign({ name }, data);
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    const response = await fetch(
      `${SERVER_URL}/stats/:${APP_ID}-:${name}`,
      requestSettings
    );
    return checkStatus(response);
  }
}
