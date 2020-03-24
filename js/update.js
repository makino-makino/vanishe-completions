const UPDATE_URL = "http://localhost:5001/update";

const setLocalStorage = obj => {
  return new Promise(resolve => {
    chrome.storage.local.set(obj, () => resolve());
  });
};

const getLocalStorage = (key = null) => {
  return new Promise(resolve => {
    chrome.storage.local.get(key, item => {
      key ? resolve(item[key]) : resolve(item);
    });
  });
};

const update = async () => {
  let dict = await getLocalStorage("dict");

  let first = 0;

  if (!dict.length) {
    dict = [];
  } else {
    dict = dict.sort((a, b) => {
      return a.id - b.id;
    });

    first = Number(dict[dict.length - 1].id) + 1;
  }

  const res = await axios.get(`${UPDATE_URL}?first=${first}`);
  const decodedRes = res.data.map(({ id, yomi, kaki }) => {
    const decodedYomi = decodeURIComponent(yomi);
    const decodedKaki = decodeURIComponent(kaki);

    return { id, yomi: decodedYomi, kaki: decodedKaki };
  });

  const result = dict.concat(decodedRes);
  await setLocalStorage({ dict: result });

  dict = await getLocalStorage("dict");
};

const reset = async () => {
  await setLocalStorage({ dict: [] });
};

reset();
