import { label } from "./labels.js";
import { receiverFields } from "c/fieldService";

const TYPE_TEXT = "text";
const FIELD_NAME = "Name";
const FIELD_DISPLAYED_NAME = "DisplayedName";
const FIELD_STANDARD_TYPE = "Type";
const RECORD_TYPE_CONTACT = "Contact";
const RECORD_TYPE_USER = "User";
const RECORD_TYPE_LEAD = "Lead";

const columns = [
    { label: label.type, fieldName: receiverFields.TYPE, type: TYPE_TEXT },
    { label: label.Name, fieldName: FIELD_DISPLAYED_NAME, type: TYPE_TEXT },
    {
        type: "button",
        initialWidth: 100,
        typeAttributes: {
            label: label.delete_button,
            name: "delete"
        }
    }
];

const columnsMember = [
    { label: label.type, fieldName: FIELD_STANDARD_TYPE, type: TYPE_TEXT },
    { label: label.Name, fieldName: FIELD_NAME, type: TYPE_TEXT },
    {
        type: "button",
        initialWidth: 100,
        typeAttributes: {
            label: label.add,
            name: "add"
        }
    }
];

const getResultTableStyle = () => {
    const resultStyle = document.createElement('style');
    resultStyle.innerText = '.resultTable .slds-th__action{background-color: #b9b4ff; color: white;} ' + 
    '.slds-table_header-fixed_container {overflow: hidden} ' + 
    '.resultTable .slds-has-focus .slds-th__action, .resultTable .slds-th__action:hover {background-color: #9090ff !important;}';
    return resultStyle;
}

const getReceiversTableStyle = () => {
    const receiversStyle = document.createElement('style');
    receiversStyle.innerText = '.emailTable .slds-th__action{background-color:#409fff; color: white;} ' + 
    '.slds-table_header-fixed_container {overflow: hidden} ' + 
    '.emailTable .slds-has-focus .slds-th__action, .emailTable .slds-th__action:hover {background-color: #0082de !important;}';
    return receiversStyle;
}

const isReceiverExist = (receivers, value) => {
    return receivers.find((receiver) => {
        return receiver[receiverFields.VALUE].localeCompare(value) === 0
    });
};

const deleteReceiver = (receiverList, filterValue) => {
    return receiverList.filter((receiver) => {
        return receiver[receiverFields.VALUE] !== filterValue;
    });
}

const createDisplayedMap = (objectList) => {
    return objectList.map((element) => {
        return { label: element.Name, value: element.Id };
    });
}

const getObjectName = (objectList, objectId) => {
    return objectList.find((element) => {
        return objectId === element.Id;
    }).Name;
}

const callReportValidity = (input, message) => {
    input.setCustomValidity(message);
    input.reportValidity();
}

const createMemberList = (result) => {
    let memberList = [];
    result.forEach(memberListByType => {
        let recordType = "";
        if(memberListByType.length > 0){
            let uniquePrefix = memberListByType[0].Id.substr(0,3);
            switch (uniquePrefix){
                case '005' :
                    recordType = RECORD_TYPE_USER;
                    break;
                case '00Q' :
                    recordType = RECORD_TYPE_LEAD;
                    break;
                default: recordType = RECORD_TYPE_CONTACT;
            }
        }
        memberListByType.forEach(member => {
            let copyMember = {...member};
            copyMember.Type = recordType;
            memberList.push(copyMember);
        });
    });
    return memberList;
}

export {
    columns,
    columnsMember,
    getResultTableStyle,
    getReceiversTableStyle,
    isReceiverExist,
    deleteReceiver,
    createDisplayedMap,
    getObjectName,
    callReportValidity,
    createMemberList
};