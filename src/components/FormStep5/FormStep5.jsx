import ThankingImg from '../../assets/images/icon-thank-you.svg';
import '../../scss/formStep5.scss';

export default function FormStep5() {
    
  return (
      <div className="thanking-wrapper">
          <img src={ThankingImg} alt="" loading="eager"/>
          <h1>Obrigado!</h1>
          <p>Agradecemos pela sua inscrição! Espero que se divirta usando nossa plataforma.</p>
      </div>
  )
}
