/* 
 This file should contain the code necessary to fetch trivia questions from an external API and process them in order for them to be ready to actually be used in game.
*/

async function fetchQuestions() {
  let questionResponse = await fetch(
    "https://opentdb.com/api.php?amount=1&type=multiple"
  );

  let questionsResponseBody = await questionResponse.json();
  //   console.log("Succes:", questionsResponseBody);

  let questions = questionsResponseBody.results[0].question;
  console.log(questions);
}

export default fetchQuestions;
