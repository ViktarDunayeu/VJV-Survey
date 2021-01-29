import { LightningElement, api, track } from "lwc";

import { label } from "./labels.js";

export default class QuestionCard extends LightningElement {
  @api question;

  label = label;

  @track message = '';

  @track isDialogVisible = false;
  @track originalMessage;

  deleteQuestionClick() {
    this.originalMessage = 'deleteQuestion';
    this.message = label.confirm_question_delete_message;
    this.isDialogVisible = true;
  }

  deleteQuestion() {
    const deleteEvent = new CustomEvent("delete", {
      detail: this.question.Position__c
    });
    this.dispatchEvent(deleteEvent);
  }

  editQuestion() {
    const editEvent = new CustomEvent("edit", {
      detail: this.question.Position__c
    });
    this.dispatchEvent(editEvent);
  }

  addOptionalQuestion() {
    const addOptionalEvent = new CustomEvent("addoptional", {
      detail: this.question.Position__c
    });
    this.dispatchEvent(addOptionalEvent);
  }

  addOptionalQuestionClick() {
    this.originalMessage = 'addOptional';
    this.message = label.add_optional_full_confirm_message;
    this.isDialogVisible = true;
  }

  handleCongirmationPopupClick(event) {
    if(event.detail.originalMessage === 'addOptional') {
      if(event.detail.status === 'confirm') {
        this.addOptionalQuestion();
      }
    } else if(event.detail.originalMessage === 'deleteQuestion') {
      if(event.detail.status === 'confirm') {
        this.deleteQuestion();
      }
    }
    this.message = '';
    this.originalMessage = '';
    this.isDialogVisible = false;
  }
  
  downQuestion() {
    const downEvent = new CustomEvent("down", {
      detail: this.question.Position__c
    });
    this.dispatchEvent(downEvent);
  }

  upQuestion() {
    const upEvent = new CustomEvent("up", {
      detail: this.question.Position__c
    });
    this.dispatchEvent(upEvent);
  }
}