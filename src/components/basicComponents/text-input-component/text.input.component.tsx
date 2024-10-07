import { ReactNode } from "react";
import BaseComponent from "../../../classes/base.component";
import { IonInput, IonLabel } from "@ionic/react";
import style from '../../styleComponents/input.module.css'

type TextFieldTypes = 'text' | 'password';

interface TextInputComponentProps {
    useLabel?: boolean;
    textLabel?: string;
    typeInput?: TextFieldTypes;
    placeHolder?: string;
    style: CSSModuleClasses;
}

export default class TextInputComponent extends BaseComponent<TextInputComponentProps> {


    render(): ReactNode {
        const { useLabel = false } = this.props;
        const { typeInput = 'text' } = this.props;

        return (
            <>
                { useLabel ? (
                    <IonLabel className={this.props.style.textLabel}
                    > {this.props.textLabel} </IonLabel>
                ): (
                    <></>
                ) 
                }

                <IonInput  className={this.props.style.textInput}
                           type={typeInput}
                           placeholder={this.props.placeHolder}
                ></IonInput>
                


            </>
        )
    }
}
