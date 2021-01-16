import deleteLabel from "@salesforce/label/c.delete";
import deleteTitle from "@salesforce/label/c.delete_trigger_rule";
import operatorLabel from "@salesforce/label/c.operator";
import fieldLabel from "@salesforce/label/c.field";
import objectLabel from "@salesforce/label/c.object";
import errorMessage from "@salesforce/label/c.errorMessage";
import clearTitle from "@salesforce/label/c.clear_trigger_rules_fields";

const importedLabels = {
    deleteLabel,
    deleteTitle,
    operatorLabel,
    fieldLabel,
    objectLabel,
    errorMessage,
    clearTitle
}

export {
    importedLabels
}