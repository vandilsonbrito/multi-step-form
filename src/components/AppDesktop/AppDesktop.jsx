import useGlobal from '../GlobalProvider/useGlobal';
import FormStep1 from "../FormStep1/FormStep1";
import FormStep2 from "../FormStep2/FormStep2";
import FormStep3 from "../FormStep3/FormStep3";
import FormStep4 from "../FormStep4/FormStep4";
import FormStep5 from "../FormStep5/FormStep5";
import { useEffect, useRef, useState } from "react";
import '../../scss/indexDesktop.scss';

function AppDesktop() {

    const { setIsBtnSubmitActive, isFirstStepAllInputValid, isPlanSelected, setButtonClicked, buttonClicked, previousButton, nextButton } = useGlobal();
    const [formStep, setFormStep] = useState(1);
    const butonPreviousRef = useRef(null);
    const butonNextRef = useRef(null);

    const handlePrevious = (formStep) => {
        setFormStep(formStep - 1);
        formStep <= 1 ? setFormStep(1) : formStep;
    }

    const handleNext = (formStep) => {
        setFormStep(formStep + 1);
        formStep >= 5 ? setFormStep(5)  : formStep;
    }
    
    // Handle 'Plan change button' from step4 
    useEffect(() => {
        if (buttonClicked) {
            setFormStep(2)
            setButtonClicked(false)
        }
    }, [buttonClicked, setButtonClicked])

    const formScreenDisplay = (formStep) => {
        switch (formStep) {
            case 1: return <FormStep1/>;
            case 2: return <FormStep2/>;
            case 3: return <FormStep3/>;
            case 4: return <FormStep4/>;
            case 5: return <FormStep5/>;
            default: return <FormStep1/>
        }
    }

    // Handle visual step change (colored circles)
    useEffect(() => {
        const circleSteps = document.getElementsByClassName('circle-steps');
        circleSteps[formStep - 1]?.classList.add('step-selected');
        circleSteps[formStep - 2]?.classList.remove('step-selected') || circleSteps[formStep]?.classList.remove('step-selected') || circleSteps[formStep + 1]?.classList.remove('step-selected') ;
        
        if(formStep === 5 ) circleSteps[formStep - 2]?.classList.add('step-selected');
    }, [formStep])

    useEffect(() => {
        previousButton && butonPreviousRef.current.click();
        nextButton && butonNextRef.current.click();
    }, [previousButton, nextButton])
    
    const handleSubmit = () => {
        setIsBtnSubmitActive(true);
        if(formStep === 1 && isFirstStepAllInputValid) handleNext(formStep);
        else if(formStep === 2 && isPlanSelected.isSelected) handleNext(formStep);
        else if(formStep === 3 || formStep === 4) handleNext(formStep);
       /*  handleNext(formStep) */
    }
        
    return (
        <>
            <main className='principal-container'>
                <div className="container-form-wrapper-desktop">
                    <div className='container-img-hero-desktop'>
                        <div className='circle-steps-wrapper-desktop'>

                            <div className="steps-container">
                                <span className="circle-steps">1</span>
                                <div className="steps-info">
                                    <span>Step 1</span>
                                    <p>Suas informações</p>
                                </div>
                            </div>
                            <div className="steps-container">
                                <span className="circle-steps">2</span>
                                <div className="steps-info">
                                    <span>Step 2</span>
                                    <p>Escolha um plano</p>
                                </div>
                            </div>
                            <div className="steps-container">
                                <span className="circle-steps">3</span>
                                <div className="steps-info">
                                    <span>Step 3</span>
                                    <p>Complementos</p>
                                </div>
                            </div>
                            <div className="steps-container">
                                <span className="circle-steps">4</span>
                                <div className="steps-info">
                                    <span>Step 4</span>
                                    <p>Resumo</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="form-wrapper-desktop">
                            {formScreenDisplay(formStep)}
                            <div className={`${formStep < 5 ? "button-wrapper-desktop" : "button-hide"}`}>
                                <button
                                    className="button-previous"
                                    type="button"
                                    onClick={() => handlePrevious(formStep)}>{`${formStep > 1 ? 'Voltar' : ''}`}
                                </button>
                                <button
                                    className="button-next"
                                    type="button"
                                    onClick={() => handleSubmit()}>{`${formStep === 4 ? 'Confirmar' : 'Próximo'}`}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default AppDesktop;
