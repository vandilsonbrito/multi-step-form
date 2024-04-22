import { useForm } from 'react-hook-form';
import useGlobal from '../GlobalProvider/useGlobal';
import { useEffect, useRef } from 'react';

export default function FormStep1() {

    const { register, handleSubmit, formState: { errors, isValid }, trigger  } = useForm({
        mode: 'onBlur',
        reValidateMode: 'onBlur'
    });
    // Global State
    const { name, setName, email, setEmail, phone, setPhone, isBtnSubmitActive, setIsFirstStepAllInputValid } = useGlobal();
    const buttonRef = useRef(null);

    useEffect(() => {
        isBtnSubmitActive && buttonRef.current.click();
    }, [isBtnSubmitActive])

    const onNameChange = (e) => {
        const { value } = e.target;
        setName(value);  
        trigger('name');
    };

    const onEmailChange = (e) => {
        const { value } = e.target;
        setEmail(value);
        trigger('email');
    };

    const onPhoneChange = (e) => {
        const { value } = e.target;
        setPhone(value); 
        trigger('phone');
    };

    const onSubmit = () => {
        //console.log("Data: ", data);
    }

    useEffect(() => {
        setIsFirstStepAllInputValid(isValid) 

    }, [isValid, setIsFirstStepAllInputValid])

    return (
        <div className="form-wrapper">
            <h1>Informações Pessoais</h1>
            <p className='form-subtitle'>Por favor, forneça seu nome, e-mail e telefone.</p>

            <form 
                className='form-step1' 
                onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name">Nome</label>
                <input
                type="tel"
                id="name" 
                {...register("name", { 
                        required: "Insira um nome",
                        pattern: {
                            value: /^[A-Za-z]+(?: [A-Za-z]+)*$/
 
                        }
                    })}
                onChange={onNameChange}
                value={name} 
                className='input-step1'                   
                />
                {errors?.name && <p className='error-message'>{errors.name.message}</p>}

                <label htmlFor="email">E-mail</label>
                <input
                type="email"
                id="email"
                {...register("email", {
                    required: "Insira um e-mail",
                    pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Endereço de email inválido"
                    },
                })}
                onChange={onEmailChange}
                value={email}
                className='input-step1' 
                />
                {errors?.email && <p className='error-message'>{errors.email.message}</p>}

                <label htmlFor="phone">Telefone</label>
                <input
                type="tel"
                id="phone" 
                {...register("phone", { 
                    required: "Insira um número de telefone",
                    pattern: {
                        value: /^\d{2}\d{5}\d{4}$/,
                        message: "Número de telefone inválido"
                    }  
                })}
                onChange={onPhoneChange}
                value={phone}
                className='input-step1' 
                />
                {errors?.phone && <p className='error-message'>{errors.phone.message}</p>}
                
                <input 
                    type="submit" 
                    className='btn-submit' 
                    ref={buttonRef}
                    ></input>
            </form>

        </div>
    )
}
