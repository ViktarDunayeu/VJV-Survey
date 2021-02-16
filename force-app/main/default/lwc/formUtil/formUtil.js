import trueLabel from "@salesforce/label/c.true";
import falseLabel from "@salesforce/label/c.false";
import { questionFields } from "c/fieldService";

const questionTypes = {
  PICKLIST: "Picklist",
  RADIOBUTTON: "RadioButton",
  TEXT: "Text",
  CHECKBOX: "Checkbox",
  RATING: "Rating"
};

const operatorTypes = {
  NULL: "IS NULL",
  CONTAINS: "CONTAINS",
  NOT_CONTAINS : "NOT CONTAINS",
  LESS_THAN: "LESS THAN",
  GREATER_THAN: "GREATER THAN",
  EQUALS: "EQUALS",
  NOT_EQUALS: "NOT EQUALS",
  ANY_CHANGE: "ANY CHANGE"
};

const booleanPicklistOptions = [
  {
    label: trueLabel,
    value: "TRUE"
  },
  {
    label: falseLabel,
    value: "FALSE"
  }
];

const findQuestionByPosition = (questions, position) => {
  return questions.filter((question) => {
    return question[questionFields.POSITION] === position;
  })[0];
}

export { 
  questionTypes, 
  operatorTypes, 
  booleanPicklistOptions,
  findQuestionByPosition
};