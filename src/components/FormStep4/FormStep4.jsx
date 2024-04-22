import useGlobal from '../GlobalProvider/useGlobal';

export default function FormStep4() {

    const { isPlanSelected, planValueSelected, selectedPeriod, planAdsOnSelected, setButtonClicked } = useGlobal();
    const plans = {
        0: 'Arcade',
        1: 'Advacned',
        2: 'Pro'
    }

    const displayPlanAndPeriod = (plans) => {
        if(isPlanSelected.isSelected === true) {
            return <p>{`${plans[isPlanSelected.element]}(${selectedPeriod ? 'Anual' : 'Mensal'})`}</p>; 
        }
    }
    const displayPlanValue = () => {
        if(isPlanSelected.isSelected === true) {
            return <p>{`R$ ${planValueSelected},00`}</p>; 
        }
    }

    const displayAdsonSelected = () => {
        const arrayOfValues = Object.values(planAdsOnSelected).map(item => item.value);
        const arrayOfTitles = Object.values(planAdsOnSelected).map(item => item.title);
        let titles = [];
        arrayOfValues.forEach((item, index) => {
            if(item !== undefined) {
                titles.push(
                    <div key={index} className="ads-on-title">
                        <span>{`${arrayOfTitles[index]}`}</span>
                        <p>{`+R$ ${arrayOfValues[index]},00/${selectedPeriod ? 'ano' : 'mês'}`}</p>
                    </div>)
            }
        })
        return titles;  
    }

    const displayTotal = () => {
        let total = planValueSelected;
        for (const [, value] of Object.entries(planAdsOnSelected)) {
            if(value.value !== undefined){
                total += value.value;  
            }
            
        }
        return `R$ ${total},00`; 
    }

    const handleChange = () => {
        setButtonClicked(true);
    }
    
  
    return (
        <section  className="form-wrapper">
            <h1>Finalizando</h1>
            <p className='form-subtitle'>Confirme se está tudo certo antes de finalizar.</p>

            <div className="chosed-services">
                <div className="chosed-plan-wrapper">
                    <div>
                        {displayPlanAndPeriod(plans)}
                        <button onClick={() => handleChange()}>Mudar</button>
                    </div>
                    <div className="value-chosed-plan">
                        <span>{displayPlanValue()}</span>
                    </div>
                </div>
                
                <div className="adds-on-text">
                    {displayAdsonSelected()}
                    
                </div>
            </div>
            <div className="total-amount">
                <span>{`Total (${selectedPeriod ? 'por ano' : 'por mês'})`}</span>
                <p>{displayTotal()}</p>
            </div>
        </section>
    )
}
