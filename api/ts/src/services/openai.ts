import { Configuration, OpenAIApi } from "openai";

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

// ================== Part One: Summarizing Patient Handoff Form ================== //

/**
 * askQuestion :: String -> Promise<String>
 * Print the result itself using this code snippet:
 * ( OUTPUT ).then(function(res) {console.log(res);});
 */
export async function askQuestion(longText: string, question: string) {
  const gptPrompt = longText + "\n\n" + question;
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: gptPrompt,
    temperature: 0.1,
    // Increase max_tokens for demo
    max_tokens: 512,
  });
  return completion!.data!.choices![0].text;
}

// ================== Part Two: Answering IPASS Questions ================== //

// Illness Severity: Classify as Stable, Watcher, or Unstable
// askQuestion(medicalText, "What was the illness severity?").then(function(res) {console.log(res)}); console.log("\n");
// askQuestion(medicalText, "Does this patient require more attention?").then(function(res) {console.log(res)}); console.log("\n\n");

// Patient Summary: Summary statement
// askQuestion(medicalText, "What were the events leading up to hospital admission?").then(function(res) {console.log(res)}); console.log("\n");
// askQuestion(medicalText, "List all the treatments that the patient was started on:").then(function(res) {console.log(res)}); console.log("\n\n");

// Action List: To do list, time line and ownership
// askQuestion(medicalText, "What might still need to be done?").then(function(res) {console.log(res)}); console.log("\n");
// askQuestion(medicalText, "Who should we contact?").then(function(res) {console.log(res)}); console.log("\n\n");

// Situation Awareness and Contingency Planning
// askQuestion(medicalText, "Is there any treatment the patient should not be given?").then(function(res) {console.log(res)}); console.log("\n");
// askQuestion(medicalText, "Are any emergency scenarios likely?  What should be done in case of an emergency?").then(function(res) {console.log(res)}); console.log("\n\n");

// Synthesis by Receiver
// Make it so that we can dynamically ask questions

const IPASSQuestions = [
  "What was the illness severity?",
  "Does this patient require more attention?",
  "What were the events leading up to hospital admission?",
  "List all the treatments that the patient was started on:",
  "What might still need to be done?",
  "Who should we contact?",
  "Is there any treatment the patient should not be given?",
  "Are any emergency scenarios likely?  What should be done in case of an emergency?",
];

export async function createHandoffReportText(
  longText: string,
  doctorName: string
) {
  let report: any = {};

  report.title =
    (await askQuestion(longText, "What is the patient's name?")) +
    " Handoff Report";
  report.date = new Date();
  report.subtitle = `Handoff Report - ${doctorName}`;
  report.summary = await askQuestion(longText, "Tl;dr");
  report.I =
    (await askQuestion(longText, IPASSQuestions[0])) +
    "\n" +
    (await askQuestion(longText, IPASSQuestions[1]));
  report.P =
    (await askQuestion(longText, IPASSQuestions[2])) +
    "\n" +
    (await askQuestion(longText, IPASSQuestions[3]));
  report.A =
    (await askQuestion(longText, IPASSQuestions[4])) +
    "\n" +
    (await askQuestion(longText, IPASSQuestions[5]));
  report.S =
    (await askQuestion(longText, IPASSQuestions[6])) +
    "\n" +
    (await askQuestion(longText, IPASSQuestions[7]));

  return [report, report.title];
}

// ================== Part Three: Translating for Patient ================== //

/**
 * translate :: String -> Promise<String>
 */
export async function translate(summary: string, language: string) {
  const gptPrompt = "Translate this into " + language + ":\n\n" + summary;
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: gptPrompt,
    temperature: 0.1,
    // Increase max_tokens for demo
    max_tokens: 512,
  });
  return completion!.data!.choices![0].text;
}

// Broken below
// translate(askQuestion(medicalText, "Tl;dr"), "Chinese").then(function(res) {console.log(res)});

export async function createPatientReportText(
  longText: string,
  doctorName: string,
  language?: string
) {
  let report: any = {};

  report.title =
    (await askQuestion(longText, "What is the patient's name?")) +
    " Patient Summary";
  report.date = new Date();
  report.subtitle = `Patient Summary - ${doctorName}`;
  report.summary = await askQuestion(longText, "Tl;dr");
  if (language) {
    report.translation = await translate(report.summary, language);
  }

  console.log("hi");

  return [report, report.title];
}
