import {label} from "./labels.js";
import { questionFields, optionFields  } from "c/fieldService";

const columns = [
  { label: label.question, fieldName: questionFields.LABEL },
  { label: label.type, fieldName: questionFields.TYPE },
  { label: label.options, fieldName: 'Question_Options__r'},
  {
      type: 'button',
      initialWidth: 100,
      typeAttributes: {
          label: label.select,
          name: 'select'
      }
  },
];

const getQuestionsTableStyle = () => { 
  const questionStyle = document.createElement('style');
  questionStyle.innerText = '.questionsTable .slds-th__action{background-color: #70d1f4; color: white;} ' + 
  '.slds-table_header-fixed_container {overflow: hidden} ' + 
  '.slds-has-focus .slds-th__action, .slds-th__action:hover {background-color: #53b7da !important;}';
  return questionStyle;
}

const reduceOptionsToString = (options) => {
  return options.reduce((accumulator, currentItem, index) => {
    accumulator += currentItem[optionFields.VALUE];
          
    if(index !== options.length - 1) {
     accumulator += ", ";
    }

    return accumulator;
    }, 
  "");
};

const transformStandardQuestions = (standardQuestions) => {
  return standardQuestions.map((standardQuestion) => {
    const displayedQuestion = {
      [questionFields.ID]: standardQuestion[questionFields.ID],
      [questionFields.LABEL]: standardQuestion[questionFields.LABEL],
      [questionFields.TYPE]: standardQuestion[questionFields.TYPE]
    };
  
    if(!standardQuestion.Question_Options__r || standardQuestion.Question_Options__r.length === 0) {
      displayedQuestion.Question_Options__r  = label.none;
    } else {
      displayedQuestion.Question_Options__r = reduceOptionsToString(standardQuestion.Question_Options__r);
    }
  
    return displayedQuestion;
  }).sort((firstQuestion, secondQuestion) => {
    return firstQuestion[questionFields.LABEL].toLowerCase().localeCompare(secondQuestion[questionFields.LABEL].toLowerCase());
  });
}

export {
  columns,
  getQuestionsTableStyle,
  transformStandardQuestions,
}