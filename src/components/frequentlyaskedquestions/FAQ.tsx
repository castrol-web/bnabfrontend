import { useState } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

type FAQProps = {
    question: string;
    answer: string;
};

const FAQ = ({ question, answer }: FAQProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const {t} = useTranslation();

    return (
        <div
            className="mb-4 transition-all duration-300 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 shadow-sm hover:shadow-md"
        >
            <button
                type='button'
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-4 text-left text-lg font-medium text-gray-800 dark:text-gray-100"
            >
                <span>{t(question)}</span>
                <span className="text-orange-500">
                    {isOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
                </span>
            </button>

            <div
                className={`px-4 pb-4 text-sm text-gray-600 dark:text-gray-300 transition-all duration-300 ease-in-out ${isOpen ? 'block' : 'hidden'
                    }`}
            >
                {t(answer)}
            </div>

        </div>
    );
};

export default FAQ;