import { questionTypes } from "c/formUtil";
import { label } from "./labels.js";

const initQuestionFields = (data) => {
  let questions = [];
  data.forEach((question) => {
    let previewInput = { ...JSON.parse(JSON.stringify(question)) };
    if (previewInput.IsVisible__c === false) {
      previewInput.Label__c += " (" + label.dependentQuestion + ")";
    }
    previewInput.IsVisible__c = true;
    previewInput.IsDisabled = true;
    questions.push(previewInput);
  });

  questions.forEach((question) => {
    let fieldType = "is" + question.Type__c;
    question[fieldType] = true;
    let options = [];

    switch (question.Type__c) {
      case questionTypes.CHECKBOX:
        question.Answer = [];
        break;
      case questionTypes.PICKLIST:
        options = [{ label: "--" + label.none + "--", value: null }];
        break;
      default:
    }

    if (question.Question_Options__r) {
      question.Question_Options__r.forEach((option) => {
        options.push({ label: option.Value__c, value: option.Value__c });
      });

      question.Question_Options__r = options;
    }
  });

  return questions;
};

export { initQuestionFields };