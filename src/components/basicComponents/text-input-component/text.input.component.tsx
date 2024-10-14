import { ReactNode } from "react";
import BaseComponent from "../../../classes/base.component";
import { IonInput, IonLabel } from "@ionic/react";

type TextFieldTypes = 'text' | 'password';

interface TextInputComponentProps {
    textLabel?: string;
    typeInput?: TextFieldTypes;
    placeHolder?: string;
    style: CSSModuleClasses;
}

interface StateInput {
    textInput: string
}

export default class TextInputComponent extends BaseComponent<TextInputComponentProps> {

     constructor(props: TextInputComponentProps){
        super(props)

        this.state = {
            inputValue: ''
        }
     }

      handleInputChange = (event: CustomEvent) => {
        this.setState({ inputValue: event.detail.value!});
      };

    render(): ReactNode {
        const { typeInput = 'text' } = this.props;

        return (
            <>
            <div className={this.props.style.containerInput}>

                <IonLabel position="floating" className={this.state.inputValue != ''  ? 'active' : this.props.style.labelInput}>{this.props.textLabel}</IonLabel>

                <IonInput className={this.props.style.textInput}
                        onIonInput={this.handleInputChange}
                        type={typeInput}
                        placeholder={' s'}
                ></IonInput>
            </div>
            </>
        )
    }
}
