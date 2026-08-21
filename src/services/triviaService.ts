/* 
 This file should contain the code necessary to fetch trivia questions from an external API and process them in order for them to be ready to actually be used in game.
*/

interface TokenResponseBody {
  response_code: number;
  response_message: string;
  token: string;
}

async function fetchToken(): Promise<string> {
  // Need to consider when a session token will NOT return succesfully

  const tokenRes = await fetch(
    "https://opentdb.com/api_token.php?command=request"
  );

  const tokenData = (await tokenRes.json()) as TokenResponseBody;

  return tokenData.token;
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
