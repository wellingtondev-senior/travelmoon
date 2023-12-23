'use client'
import React, { useState, Fragment } from 'react';
import { FaArrowRight, FaPaperPlane } from 'react-icons/fa';
import Image from 'next/image';

// Components
import { Button } from '@/app/components/Button';

// Services
import { api } from '@/app/services/api';

import { TripData } from '@/app/types';

export function Quiz() {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [optionSelected, setOptionSelected] = useState('');
    const [show, setShow] = useState(false);
    const [trip, setTrip] = useState<any>();
    const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false);
    const [quizAnswers, setQuizAnswers] = useState<string[]>([]); // Array para armazenar as respostas do quiz

    const quiz = [
        {
            id: 0,
            question: 'Seu Nome',
            answer: ''
        },
        {
            id: 1,
            question: 'Seu E-mail',
            answer: ''
        },
        {
            id: 2,
            question: 'Com quem você pretende viajar?',
            answer: '',
            options: [
                {label: 'Sozinho', value: 'SOZINHO'},
                {label: 'Casal', value: 'CASAL'},
                {label: 'Amigos', value: 'AMIGOS'},
                {label: 'Família', value: 'FAMILIA'},
            ]
        },
        {
            id: 3,
            question: 'Quantos dias você deseja ficar?',
            answer: '',
            options: [
                {label: 'De 1 a 3', value: '1_3'},
                {label: 'De 4 a 7', value: '4_7'},
                {label: 'De 8 a 15', value: '8_5'},
                {label: 'Mais de 15', value: '15>'},
            ]
        },
        {
            id: 4,
            question: 'Pretende comemorar algo especial?',
            answer: '',
            options: [
                {label: 'Lua de Mel', value: 'LUA_DE_MEL'},
                {label: 'Aniversário', value: 'ANIVERSARIO'},
                {label: 'Aniversário de relacionamento', value: 'ANIVERSARIO_DE_RELACIONAMENTO'},
                {label: 'Outro', value: 'OUTRO'},
                {label: 'Não estou comemorando', value: 'NAO_ESTOU_COMEMORANDO'}
            ]
        },
        {
            id: 5,
            question: 'Qual perfil te define mais?',
            answer: '',
            options: [
                {label: 'Pé na Areia', value: 'PE_NA_AREIA'},
                {label: 'Aventureiro', value: 'AVENTUREIRO'},
                {label: 'Amante da Gastronomia', value: 'AMANTE_DA_GASTRONOMIA'},
                {label: 'Historiador', value: 'HISTORIADOR'},
                {label: 'Louco pela natureza', value: 'LOUCO_PELA_NATUREZA'}
            ]
        },
        {
            id: 6,
            question: 'Que época do ano pretende viajar?',
            answer: '',
            options: [
                {label: 'Inverno', value: 'INVERNO'},
                {label: 'Primavera', value: 'VERAO'},
                {label: 'Verão', value: 'PRIMAVERA'},
                {label: 'Outono', value: 'OUTONO'},
            ]
        },
        {
            id: 7,
            question: 'Qual o seu orçamento (por pessoa)?',
            answer: '',
            options: [
                {label: 'Até 15.000,00', value: '15<='},
                {label: 'De 15 a 25',  value: '15_25'},
                {label: 'De 25 a 40', value: '25_40'},
                {label: 'De 40 a 60', value: '40_60'},
                {label: 'Acima de 60', value: '60>'},
            ]
        }
    ];

    const validateAndProceed = () => {
        if (quiz[questionIndex].options) {
            if (!optionSelected) {
                alert('Por favor, selecione uma opção antes de avançar.');
                return;
            }
        } else {
            if (!optionSelected.trim()) {
                alert('Por favor, digite uma resposta antes de avançar.');
                return;
            }
        }

        setQuestionIndex(index => index + 1);
        setOptionSelected('');
    };

    async function handleNext() {
        console.log(quizAnswers)

        if (questionIndex < quiz.length - 1) {
            validateAndProceed();
        }

        console.log(quizAnswers)
        if (questionIndex === quiz.length - 1) {
            try {
                const res = await api.post(`open/quiz`, {
                    name: "Kaique",
                    email: "kaique@email.com",
                    who_travel_with: 'SOZINHO',
                    days: "15>",
                    special_commemoration: "NAO_ESTOU_COMEMORANDO",
                    profile: "AMANTE_DA_GASTRONOMIA",
                    season_to_travel: "VERAO",
                    budget: "15<="  
                })

                setTrip(res.data.data)
                console.log(res)
            } catch (e) {
                console.log(e)
            }
        }
    }

    function handleSelectedOption(option: string) {
        setOptionSelected(option);
        setIsNextButtonEnabled(true);
        setQuizAnswers((answers) => {
            const updatedAnswers = [...answers];
            updatedAnswers[questionIndex] = option; // Armazena o value da opção selecionada
            return updatedAnswers;
        });
    }

    return (
        <div className='bg-purple p-5 md:p-10 rounded-3xl w-full min-h-[350px] md:min-h-[500px] lg:h-[904px] flex flex-col justify-between'>
            
                <h1 className={`text-white text-lg md:text-5xl lg:text-7xl mb-10 ${!trip ? 'block' : 'hidden'}`}>
                    {show ? quiz[questionIndex].question : 'Encontre a Viagem Perfeita.'}
                </h1>
            

            {show && !trip ? (
                <Fragment>
                    <div className='flex flex-col'>
                        {quiz[questionIndex].options && quiz[questionIndex].options?.map(item => (
                            <button
                                onClick={() => handleSelectedOption(item.label)}
                                key={item.label}
                                className={`border border-white rounded-full mb-5 p-3 lg:p-7
                                    ${item.label === optionSelected ? 'text-purple bg-gray font-bold' : 'text-white bg-transparent'}`
                                }
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-row justify-between">
                        {!quiz[questionIndex].options && (
                            <input
                                className='w-11/12 text-white border-2 bg-transparent rounded-full border-white py-4 px-7 lg:py-10 lg:px:14'
                                value={optionSelected}
                                onChange={(e) => {
                                    setOptionSelected(e.target.value);
                                    setIsNextButtonEnabled(!!e.target.value.trim());
                                }}
                            />
                        )}

                        <button
                            onClick={handleNext}
                            className={`rounded-full w-12 h-12 lg:w-24 lg:h-24 ml-auto bg-gray text-purple flex items-center justify-center focus:outline-none
                                ${questionIndex === quiz.length - 1 && !isNextButtonEnabled ? 'cursor-not-allowed' : ''}`}
                            disabled={questionIndex === quiz.length - 1 && !isNextButtonEnabled}
                        >
                            {questionIndex === quiz.length - 1 ?
                                <FaPaperPlane className='text-xl' />
                                :
                                <FaArrowRight className="text-xl" />
                            }
                        </button>
                    </div>
                </Fragment>
            ) : trip ? (
                <div className='flex flex-col justify-between h-full'>
                    <h1 className='text-white text-lg md:text-3xl lg:text-7xl mb-10'>
                        Encontramos a viagem perfeita para você
                    </h1>

                    <div className="w-full relative max-h-[282px] max-w-[282px] lg:max-h-[350px] lg:max-w-[350px] mx-auto aspect-square">
                        <Image
                            src={trip.banner_image_url ? trip.banner_image_url : ''}
                            alt="sobre nós - travelmoon"
                            fill
                            className="rounded-full object-cover"
                        />
                    </div>

                    <h1 className='text-white text-2xl md:text-3xl lg:text-7xl mt-6'>{trip.name}</h1>
                </div>
            ) : (
                <Button onClick={() => setShow(true)} bgColor="gray" textColor="purple" size="lg" className='w-[278px]'>
                    Começa Aqui
                </Button>
            )}
        </div>
    );
}
