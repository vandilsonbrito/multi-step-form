import { useEffect, useMemo, useState } from "react";
import useGlobal from '../GlobalProvider/useGlobal';

export default function FormStep3() {

    const { selectedPeriod, planAdsOnSelected, setPlanAdsOnSelected } = useGlobal();
    const [checkboxChanged, setCheckBoxChanged] = useState(undefined);

    const addsOnPlans = useMemo(() => ({
        false: {
            0: {
                title: 'Serviço online',
                label: "R$ 6,00/mês",
                value: 6
              },
            1: {
                title: 'Mais espaço',
                label: "R$ 10,00/mês",
                value: 10
              },
            2: {
                title: 'Perfil customizável',
                label: "R$ 10,00/mês",
                value: 10
              }
          },
          true: {
            0: {
                title: 'Serviço online',
                label: "R$ 60,00/ano",
                value: 60
              },
            1: {
                title: 'Mais espaço',
                label: "R$ 95,00/ano",
                value: 95
              },
            2: {
                title: 'Perfil customizável',
                label: "R$ 95,00/ano",
                value: 95
              }
          }
    }), []);

    // Display ads-on label on the screen according to the selected period.
    useEffect(() => {
        let domAdsOnValue = document.getElementsByClassName('plans-amount-period');
        domAdsOnValue = Array.from(domAdsOnValue);
        domAdsOnValue.map((elem, index) => {
            elem.textContent = addsOnPlans[selectedPeriod][index].label;
        })

    }, [selectedPeriod, addsOnPlans])


    // Storage ads-on value
    useEffect(() => {
        const buttonWrapper = document.getElementsByClassName('plans-wrapper-button-step3');
        let selectedAdsOn = document.getElementsByClassName('checkbox-step3-container');
        selectedAdsOn = Array.from(selectedAdsOn);

        selectedAdsOn.forEach((item, index) => {
            const isChecked = item.children[0].checked;
            setPlanAdsOnSelected(prevState => ({
                ...prevState,
                [index]: {
                    title: isChecked ? addsOnPlans[selectedPeriod][index].title : undefined,
                    label: isChecked ? addsOnPlans[selectedPeriod][index].label : undefined,
                    value: isChecked ? addsOnPlans[selectedPeriod][index].value : undefined,
                }                    
            }));                      
            buttonWrapper[index].classList.remove('selected-plan');
            if(isChecked) {
                buttonWrapper[index].classList.add('selected-plan');
            }
        }); 

    }, [selectedPeriod, addsOnPlans, setPlanAdsOnSelected, checkboxChanged])


    // Display on the screen if there is any selected value
    useEffect(() => {
        let selectedAdsOn = document.getElementsByClassName('checkbox-step3-container');
        selectedAdsOn = Array.from(selectedAdsOn);
        
        selectedAdsOn.forEach((item, index) => {
            if(planAdsOnSelected[index].value !== undefined) {
                item.children[0].checked = true;
            }
        })
    }, [planAdsOnSelected, setPlanAdsOnSelected]);


    return (
        <section className="form-wrapper">
            <h1>Escolha complementos</h1>
            <p className='form-subtitle'>Complementos ajuda melhorar sua experiência de jogo.</p>

            <div className="plans-step3">
                <div className="plans-wrapper-button-step3">
                    <div className="plans-wrapper">
                        <div className="checkbox-step3-container">
                            <input type="checkbox" id="checkbox" name="online-service" onClick={() => setCheckBoxChanged(1)}/>
                        </div>
                        <div className="text-plans">
                            <h5 className=''>Serviço online</h5>
                            <h6>Acesso a jogos multiplayer</h6>
                        </div>
                    </div>
                    <div className="plans-amount-period">
                        <p></p>
                    </div>
                </div>
                <div className="plans-wrapper-button-step3">
                    <div className="plans-wrapper">
                        <div className="checkbox-step3-container">
                            <input type="checkbox" id="checkbox" name="larger-storage" onClick={() => setCheckBoxChanged(2)}/>
                        </div>
                        <div className="text-plans">
                            <h5 className=''>Mais espaço</h5>
                            <h6>Extra 1TB de espaço na nuvem</h6>
                        </div>
                    </div>
                    <div className="plans-amount-period">
                        <p></p>
                    </div>
                </div>
                <div className="plans-wrapper-button-step3">
                    <div className="plans-wrapper">
                        <div className="checkbox-step3-container">
                            <input type="checkbox" id="checkbox" name="customizable-profile" onClick={() => setCheckBoxChanged(3)}/>
                        </div>
                        <div className="text-plans">
                            <h5 className=''>Perfil customizável</h5>
                            <h6>Customize tema no seu perfil</h6>
                        </div>
                    </div>
                    <div className="plans-amount-period">
                        <p></p>
                    </div>
                </div>
            </div>
        
        </section>
    )
}


