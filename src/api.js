export const createGame = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      name: data.name,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  return response.json();
};

export const createScores = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      user: data.user,
      score: data.score,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  return response.json();
};

export const fetchScore = async (url) => {
  const response = await fetch(url);
  return response.json();
};
