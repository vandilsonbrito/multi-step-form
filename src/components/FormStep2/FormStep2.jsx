import useGlobal from '../GlobalProvider/useGlobal';
import iconArcade from '../../assets/images/icon-arcade.svg';
import iconAdvanced from '../../assets/images/icon-advanced.svg';
import iconPro from '../../assets/images/icon-pro.svg';
import { useEffect, useMemo, useState } from 'react';
import '../../scss/formStep2.scss';


export default function FormStep2() {

  const { setIsPlanSelected, isPlanSelected, setSelectedPeriod, selectedPeriod, setPlanValueSelected, planValueSelected } = useGlobal();
  const [indexButtonSelected, setIndexButtonSelected] = useState(undefined);
  const plansValue = useMemo(() => ({
    false: {
      0: {
        label: "R$ 20,00/mês",
        value: 20
      },
      1: {
        label: "R$ 28,00/mês",
        value: 28
      },
      2: {
        label: "R$ 35,00/mês",
        value: 35
      }
    },
    true: {
      0: {
        label: "R$ 105,00/ano",
        value: 105
      },
      1: {
        label: "R$ 158,00/ano",
        value: 158
      },
      2: {
        label: "R$ 209,00/ano",
        value: 209
      }
    }
  }), [])


  // Handle visual selected button and set storage variable of selected button index
  useEffect(() => {
      let plansButton = document.getElementsByClassName('plans-wrapper-button');
      plansButton = Array.from(plansButton);

      plansButton.map((elem, index) => {
          if(elem === plansButton[isPlanSelected.element]) {
            elem.classList.add('selected-plan');
            setIndexButtonSelected(index);
          }
      })

      plansButton.forEach(function(element, index) {
          element.addEventListener('click', () => {
              plansButton.map((el) => {
                  el.classList.remove('selected-plan');
              })
              element.classList.add('selected-plan');
              setIsPlanSelected({ isSelected: true, element: index });
          })
      })
      
  }, [isPlanSelected, planValueSelected, setPlanValueSelected, setIsPlanSelected]);

  // Storage value plan selection
  useEffect(() => {
     if(plansValue[selectedPeriod][indexButtonSelected]) {
        setPlanValueSelected(plansValue[selectedPeriod][indexButtonSelected].value);
      }
      
  }, [indexButtonSelected, plansValue, selectedPeriod, setPlanValueSelected])

  // Handle the selected period (yearly or monthly) label 
  useEffect(() => {
    let discountMessage = document.getElementsByClassName('discount-message');
    discountMessage = Array.from(discountMessage);
    let plansLabelToggleSwitch = document.getElementsByClassName('plans-toggle-label');
    plansLabelToggleSwitch = Array.from(plansLabelToggleSwitch);

    if (selectedPeriod && discountMessage) {
      discountMessage.forEach(function(elem) {
        elem.classList.remove('hidden-discount');
        elem.classList.add('reveal-discount');   

      })
      plansLabelToggleSwitch[0].classList.remove('period-selected');
      plansLabelToggleSwitch[1].classList.add('period-selected');
      
    }
    else {
      discountMessage.forEach(function(elem) {
        elem.classList.remove('reveal-discount');    
        elem.classList.add('hidden-discount');

      })
      plansLabelToggleSwitch[0].classList.add('period-selected');
      plansLabelToggleSwitch[1].classList.remove('period-selected');
    }

    let domPlansValue = document.getElementsByTagName('h6');
    domPlansValue = Array.from(domPlansValue);

    domPlansValue.map((elem, index) => {
        elem.textContent = plansValue[selectedPeriod][index]?.label;
    })

}, [plansValue, selectedPeriod])

  // Handle the button click event for each plan and update the state of which one is selected
  const handleToggleSwitch = () => {
    setSelectedPeriod(!selectedPeriod);
  };

  return (
    <section className="form-wrapper">
        <h1>Escolha seu plano</h1>
        <p className='form-subtitle'>Você tem a opção de pagar mensalmente ou anual.</p>
            
        <div className="plans">
            <button className="plans-wrapper-button">
                <img src={iconArcade} alt="" loading="eager" />
                <div className="text-plans">
                    <h5 className=''>Arcade</h5>
                    <h6></h6>
                    <div>
                      <p className='discount-message hidden-discount'>2 meses grátis</p>
                    </div>
                </div>
            </button>
            <button className="plans-wrapper-button">
                <img src={iconAdvanced} alt="" loading="eager" />
                <div className="text-plans">
                    <h5 className=''>Advanced</h5>
                    <h6></h6>
                    <p className='discount-message hidden-discount'>2 meses grátis</p>
                </div>
            </button>
            <button className="plans-wrapper-button">
                <img src={iconPro} alt="" loading="eager" />
                <div className="text-plans">
                    <h5 className=''>Pro</h5>
                    <h6></h6>
                    <p className='discount-message hidden-discount'>2 meses grátis</p>
                </div>
            </button>
        </div>

        <form className='form-step2'>

          <p className='plans-toggle-label period-selected'>Mensal</p>
          <div className="toggle-switch-container">
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={selectedPeriod}
                  onChange={handleToggleSwitch}
                />
                <span className="toggle-slider"></span>
              </label>
          </div>
          <p className='plans-toggle-label'>Anual</p>

        </form>
        
    </section>
  )
}
