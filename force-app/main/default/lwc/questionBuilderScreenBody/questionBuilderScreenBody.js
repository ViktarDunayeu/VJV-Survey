/* eslint-disable @lwc/lwc/no-api-reassignments */
import { LightningElement, api, track } from "lwc";
import createQuestionList from "@salesforce/apex/QuestionController.createQuestionList";
import createQuestion from "@salesforce/apex/QuestionController.createQuestion";

export default class QuestionBuilderScreenBody extends LightningElement {
  @api templates;
  @api standardQuestions;
  @api questions;

  @track question;
  @track displayedQuestions;
  @track hasQuestions = false;
  @track editQuestionPosition;

  noTemplate;
  templateOptionsValue;

  connectedCallback() {
    this.questions = JSON.parse(JSON.stringify(this.questions));
    this.initQuestions();
    this.initQuestion();

    this.noTemplate = {
      label: "No Template",
      value: "0"
    };

    this.templateOptionsValue = this.noTemplate.value;
  }

  get templateOptions() {
    let templateOptions = this.templates.map((template) => {
      return {
        label: template.Name,
        value: template.Id
      };
    });
    templateOptions.push(this.noTemplate);
    return templateOptions;
  }

  initQuestions() {
    if (!this.questions) {
      createQuestionList()
        .then((result) => {
          this.questions = result;

          this.updateDisplayedQuestions();
          this.hasQuestions = this.questions.length > 0;
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.updateDisplayedQuestions();
      this.hasQuestions = this.questions.length > 0;
    }
  }

  initQuestion() {
    createQuestion()
      .then((result) => {
        this.question = result;

        this.template
          .querySelectorAll("c-question-form")[0]
          .setQuestion(this.question);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addQuestion(event) {
    const question = event.detail;
    question.Position__c = this.questions.length + 1;

    this.questions = JSON.parse(JSON.stringify(this.questions));
    this.questions.push(question);

    this.hasQuestions = this.questions.length > 0;
    this.updateDisplayedQuestions();
    this.sendQuestionsChangeEvent();
    this.initQuestion();
  }

  editQuestion(event) {
    let position = +event.detail;
    this.editQuestionPosition = position;

    const questionForEdit = this.questions.filter((question) => {
      return +question.Position__c === +position;
    })[0];

    this.template
      .querySelectorAll("c-question-form")[0]
      .setQuestionForEdit(questionForEdit);
  }

  cancelEditQuestion() {
    this.editQuestionPosition = null;
    this.initQuestion();
  }

  deleteQuestion(event) {
    let position = +event.detail;
    position--;

    this.questions = JSON.parse(JSON.stringify(this.questions));
    this.questions.splice(position, 1);

    for (let i = position; i < this.questions.length; i++) {
      this.questions[i].Position__c = i + 1;
    }

    this.updateDisplayedQuestions();
    this.hasQuestions = this.questions.length > 0;
    this.sendQuestionsChangeEvent();
  }

  updateQuestion(event) {
    const updatedQuestion = event.detail;

    this.questions = this.questions.map((question) => {
      if (+question.Position__c === +this.editQuestionPosition) {
        return {
          ...updatedQuestion,
          Position__c: this.editQuestionPosition
        };
      }
      return question;
    });

    this.editQuestionPosition = null;
    this.updateDisplayedQuestions();
    this.sendQuestionsChangeEvent();
  }

  downQuestion(event) {
    const position = +event.detail;

    if (position === this.questions.length) return;

    let relocatableQuestion = {},
      lowerQuestion = {};
    let relocatableIndex, lowerIndex;

    this.questions = JSON.parse(JSON.stringify(this.questions));
    this.questions.forEach((question, index) => {
      if (+question.Position__c === position) {
        relocatableQuestion = question;
        relocatableIndex = index;
      } else if (+question.Position__c === position + 1) {
        lowerQuestion = question;
        lowerIndex = index;
      }
    });

    if (+this.editQuestionPosition === +lowerQuestion.Position__c) {
      this.editQuestionPosition = relocatableQuestion.Position__c;
    } else if (
      +this.editQuestionPosition === +relocatableQuestion.Position__c
    ) {
      this.editQuestionPosition = lowerQuestion.Position__c;
    }

    lowerQuestion.Position__c--;
    relocatableQuestion.Position__c++;

    this.questions[relocatableIndex] = lowerQuestion;
    this.questions[lowerIndex] = relocatableQuestion;

    this.updateDisplayedQuestions();
    this.sendQuestionsChangeEvent();
  }

  upQuestion(event) {
    const position = +event.detail;

    if (position === 1) return;

    let relocatableQuestion = {},
      upperQuestion = {};
    let relocatableIndex, upperIndex;

    this.questions = JSON.parse(JSON.stringify(this.questions));
    this.questions.forEach((question, index) => {
      if (+question.Position__c === position) {
        relocatableQuestion = question;
        relocatableIndex = index;
      } else if (+question.Position__c === position - 1) {
        upperQuestion = question;
        upperIndex = index;
      }
    });

    if (+this.editQuestionPosition === +upperQuestion.Position__c) {
      this.editQuestionPosition = relocatableQuestion.Position__c;
    } else if (
      +this.editQuestionPosition === +relocatableQuestion.Position__c
    ) {
      this.editQuestionPosition = upperQuestion.Position__c;
    }

    upperQuestion.Position__c++;
    relocatableQuestion.Position__c--;

    this.questions[relocatableIndex] = upperQuestion;
    this.questions[upperIndex] = relocatableQuestion;

    this.updateDisplayedQuestions();
    this.sendQuestionsChangeEvent();
  }

  updateDisplayedQuestions() {
    this.displayedQuestions = [...this.questions];
  }

  sendQuestionsChangeEvent() {
    const questionsChangeEvent = new CustomEvent("questionschange", {
      detail: { questions: [...this.questions] }
    });
    this.dispatchEvent(questionsChangeEvent);
  }
}
