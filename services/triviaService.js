/* 
 This file should contain the code necessary to fetch trivia questions from an external API and process them in order for them to be ready to actually be used in game.
*/

async function fetchToken() {
  // Need to consider when a session token will NOT return succesfully

  let tokenRes = await fetch(
    "https://opentdb.com/api_token.php?command=request"
  );
  let tokenResBody = await tokenRes.json();

  // console.log(tokenResBody);
  return tokenResBody.token;
}

async function fetchQuestions() {
  let token = await fetchToken();
  // console.log("trying to fetch token before questions: ", token);
  let url = `https://opentdb.com/api.php?amount=1&token=${token}`;

  let questionResponse = await fetch(url);

  let questionsResponseBody = await questionResponse.json();

  console.log("questionsResponseBody: ", questionsResponseBody.results);
  return questionsResponseBody.results;
}

export default fetchQuestions;
