import FormModalWrapper from "src/app/modules/modals/FormModalWrapper";
import EditLocationForm from "./EditLocationForm";

export default function AddLocation() {
    return (
        <FormModalWrapper title={'Add New Location'}>
            <EditLocationForm location={null} submitButtonLabel="Add Location"></EditLocationForm>
        </FormModalWrapper>
    )
}
