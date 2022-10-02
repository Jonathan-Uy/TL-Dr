import { Configuration, OpenAIApi } from "openai";

const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));
// Temporary: Make an API call to our Python "PDF -> String" program instead
const medicalText = "Relevant Complaint(s) and Concerns:\nUpon arrival: Patient presented with five days of increased urinary frequency, urgency and dysuria as well as 48 hours of fever and rigors. He was hypotensive and tachycardic upon arrival to the emergency department.The internal medicine service was consulted. The following issues were addressed during the hospitalization:\n\nSummary Course in Hospital (Issues Addressed):\nFever and urinary symptoms: A preliminary diagnosis of pyelonephritis was established. Other causes of fever were possible but less likely. The patient was hypotensive on initial assessment with a blood pressure of 80/40. Serum lactate was elevated at 6.1. A bolus of IV fluid was administered (1.5L) but the patient remained hypotensive. Our colleagues from ICU were consulted. An arterial line was inserted for hemodynamic monitoring. Hemodynamics were supported with levophed and crystalloids. Piptazo was started after blood and urine cultures were drawn. After 12 hours serum lactate had normalized and hemodynamics had stabilized. Blood cultures were positive for E.Coli that was sensitive to all antibiotics. The patient was stepped down to oral ciprofloxacin to complete a total 14 day course of antibiotics. On further review it was learned that the patient has been experiencing symptoms of prostatism for the last year. An abdominal ultrasound performed for elevated liver enzymes and acute kidney injury confirmed a severely enlarged prostate. Urinary retention secondary to BPH was the likely underlying mechanism that contributed to the development of pyelonephritis in this patient. He was started on Tamsulosin 0.4mg PO qhs and tolerated it well with no orthostatic intolerance. Post void residuals show 150-200cc of retained urine in the bladder. An outpatient referral to Urology has been requested by our team.\n\nElevated liver enzymes and creatinine. Both of these were thought to be related to end organ hypoperfusion in the setting of sepsis. Values improved with the administration of IV fluid and stabilization of the patients hemodynamics. Abdominal ultrasound with doppler flow and urine analysis ruled out other possible etiologies. Liver enzymes remain slightly above normal values at the time of discharge. We ask that the patients' family physician repeat these tests in 2 weeks' time to ensure complete resolution.";

// ================== Part One: Summarizing Patient Handoff Form ================== //

/**
 * askQuestion :: String -> Promise<String>
 * Print the result itself using this code snippet:
 * ( OUTPUT ).then(function(res) {console.log(res);});
 */
export async function askQuestion(longText: string, question: string){
    const gptPrompt = longText + "\n\n" + question;
    const completion = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: gptPrompt,
        temperature: 0.1,
        // Increase max_tokens for demo
        // max_tokens: 2048,
    })
    return completion!.data!.choices![0].text;
}

// askQuestion(medicalText, "Tl;dr").then(function(res) {console.log(res)}); console.log("\n");

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

// ================== Part Three: Translating for Patient ================== //

/**
 * translate :: String -> Promise<String>
 */
export async function translate(summary: string, language: string){
    const gptPrompt = "Translate this into " + language + ":\n\n" + summary;
    const completion = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: gptPrompt,
        temperature: 0.1,
        // Increase max_tokens for demo
        // max_tokens: 2048,
    })
    return completion!.data!.choices![0].text;
}

// Broken below
// translate(askQuestion(medicalText, "Tl;dr"), "Chinese").then(function(res) {console.log(res)});