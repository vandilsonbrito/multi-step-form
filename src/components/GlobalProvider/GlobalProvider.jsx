import { createContext, useState } from "react";
import PropTypes from 'prop-types';

export const GlobalContext = createContext();
    
export default function GlobalProvider({ children }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isBtnSubmitActive, setIsBtnSubmitActive] = useState(false);
    const [isFirstStepAllInputValid, setIsFirstStepAllInputValid] = useState(false);
    const [isSecondStepAllInputValid, setIsSecondStepAllInputValid] = useState(false);
    const [isPlanSelected, setIsPlanSelected] = useState({ isSelected: false, element: undefined, value: undefined });
    const [selectedPeriod, setSelectedPeriod] = useState(false);
    const [planValueSelected, setPlanValueSelected] = useState(0);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [planAdsOnSelected, setPlanAdsOnSelected] = useState({
         0: {   
            title: undefined,
            label: undefined,
            value: undefined
         }, 
         1: {
            title: undefined,
            label: undefined,
            value: undefined
         },
         2: {
            title: undefined,
            label: undefined,
            value: undefined
         },    
    });


    return (
        <GlobalContext.Provider 
            value={{ 
                name, setName, 
                email, setEmail, 
                phone, setPhone, 
                isBtnSubmitActive, setIsBtnSubmitActive, 
                isFirstStepAllInputValid, setIsFirstStepAllInputValid, 
                isSecondStepAllInputValid,setIsSecondStepAllInputValid, 
                isPlanSelected, setIsPlanSelected, 
                selectedPeriod, setSelectedPeriod, 
                planValueSelected, setPlanValueSelected, 
                planAdsOnSelected, setPlanAdsOnSelected,
                buttonClicked, setButtonClicked,
            }}>
            {children}
        </GlobalContext.Provider>
    );
}


GlobalProvider.propTypes = {
    children: PropTypes.node
};