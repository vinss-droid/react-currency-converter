import { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import Swal from 'sweetalert2';

const Converter = () => {

    useEffect(() => {

        getAvaibleCurrencies();

    }, []);

    const [ currencies, setCurrencies ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ convert, setConvert ] = useState({

        from: '',
        to: '',
        amount: ''

    });
    const [ error, setError ] = useState({

        error: true,
        message: ''

    });
    const [resultConvert, setResultConvert] = useState('');

    const currenciesCode = [
        'STN', 'XAG', 'XAU', 'PLN', 'UGX', 'GGP', 'MWK', 'NAD', 'ALL', 'BHD', 'JEP', 'BWP', 'MRU', 'BMD', 'MNT', 'FKP', 'PYG', 'AUD', 'KYD', 'RWF', 'WST', 'SHP', 'SOS', 'SSP', 'BIF', 'SEK', 'CUC', 'BTN', 'MOP', 'XDR', 'IMP', 'INR', 'BYN', 'BOB', 'SRD', 'GEL', 'ZWL', 'EUR', 'BBD', 'RSD', 'SDG', 'VND', 'VES', 'ZMW', 'KGS', 'HUF', 'BND', 'BAM', 'CVE', 'BGN', 'NOK', 'BRL', 'JPY', 'HRK', 'HKD', 'ISK', 'IDR', 'KRW', 'KHR', 'XAF', 'CHF', 'MXN', 'PHP', 'RON', 'RUB', 'SGD', 'AED', 'KWD', 'CAD', 'PKR', 'CLP', 'CNY', 'COP', 'AOA', 'KMF', 'CRC', 'CUP', 'GNF', 'NZD', 'EGP', 'DJF', 'ANG', 'DOP', 'JOD', 'AZN', 'SVC', 'NGN', 'ERN', 'SZL', 'DKK', 'ETB', 'FJD', 'XPF', 'GMD', 'AFN', 'GHS', 'GIP', 'GTQ', 'HNL', 'GYD', 'HTG', 'XCD', 'GBP', 'AMD', 'IRR', 'JMD', 'IQD', 'KZT', 'KES', 'ILS', 'LYD', 'LSL', 'LBP', 'LRD', 'AWG', 'MKD', 'LAK', 'MGA', 'ZAR', 'MDL', 'MVR', 'MUR', 'MMK', 'MAD', 'XOF', 'MZN', 'MYR', 'OMR', 'NIO', 'NPR', 'PAB', 'PGK', 'PEN', 'ARS', 'SAR', 'QAR', 'SCR', 'SLL', 'LKR', 'SBD', 'VUV', 'USD', 'DZD', 'BDT', 'BSD', 'BZD', 'CDF', 'UAH', 'YER', 'TMT', 'UZS', 'UYU', 'CZK', 'SYP', 'TJS', 'TWD', 'TZS', 'TOP', 'TTD', 'THB', 'TRY', 'TND'
    ];

    const getAvaibleCurrencies = () => {

        axios
            .get(`https://api.getgeoapi.com/v2/currency/list?api_key=${process.env.REACT_APP_API_KEY}&format=json`)

            .then((response) => {

                const curs = [...currencies];

                currenciesCode.map((code) => {

                    curs.push({ label: `${response.data.currencies[code]} (${code})`, value: code });

                    return 200;

                });

                setCurrencies(curs);
                setLoading(false);

            })
            
            .catch((err) => {

                Swal.fire(
                    'Error',
                    'Error to get currencies',
                    'error'
                );

            });
    }

    const submitFormHandller = (e) => {

        setLoading(true);

        e.preventDefault();

        if (convert.from !== '' && convert.to !== '' && convert.amount !== '') {

            convertNow();
            
        } else {

            Swal.fire(
                'Error',
                `Please enter all field !`,
                'error'
            );

            setLoading(false);
            
        }

    }

    const convertNow = () => {

        const from = convert.from;
        const to = convert.to;
        const amount = convert.amount;

        axios
            .get(`https://api.getgeoapi.com/v2/currency/convert?api_key=${process.env.REACT_APP_API_KEY}&from=${from}&to=${to}&amount=${amount}&format=json`)

            .then((res) => {

                let result = res.data.rates[to].rate_for_amount;
                let resultFinal = Number(result);

                setResultConvert(resultFinal);
                setLoading(false);

            })

            .catch((err) => {
                
                setLoading(false);

                Swal.fire(
                    'Error',
                    `Failed to convert currencies, please try again !`,
                    'error'
                );
            
            });

    }

  return (
    <div className="container text-white">
        <div className="row justify-content-center mt-5">
            <h2 className="text-center fw-bold mb-3">
                Convert The Currency
            </h2>
            <div className="col-sm-12 col-md-12 col-lg-10">
                <div className="card shadow">
                    <div className="card-body">
                        <form onSubmit={submitFormHandller}>
                            <div className="container">
                                <div className="row justify-content-center mt-4">
                                    <div className="col-sm-12 col-md-12 col-lg-5">
                                        { loading ? (

                                            <Select isDisabled isLoading isClearable options={currencies} className="text-dark-important" id='fromCurrencies'></Select>

                                        ) : (

                                            <Select onChange={(opt) => { 

                                                if (opt) {  
                                                    setConvert({...convert, from: opt.value });
                                                    setError({...error, error:false, message:'' });
                                                }
                                                else { 
                                                    setError({...error, error: true, message: 'Please enter all field'});
                                                    setConvert({...convert, from: '' });
                                                }

                                            } } isClearable options={currencies} className="text-dark-important"></Select>

                                        ) }
                                        <input type="number" className="form-control mt-2" placeholder='enter mount' id='amount' onChange={(e) => {

                                            if (e.target.value) {

                                                setConvert({...convert, amount: e.target.value});
                                                setError({ ...error, error:false, message:'' })
                                                
                                            } else {
                                                
                                                setError({ ...error, error:true, message:'Please enter all field' });
                                                setConvert({...convert, amount: '' });

                                            }

                                        }} />
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-lg-2 mb-3">
                                        <img src="https://img.icons8.com/ios/50/000000/currency-exchange.png" className="d-block ms-auto me-auto pt-3" alt='https://img.icons8.com/ios/50/000000/currency-exchange.png'/>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-lg-5 mb-5">
                                    { loading ? (

                                        <Select isDisabled isLoading isClearable options={currencies} className="text-dark-important"></Select>

                                    ) : (

                                        <Select isClearable options={currencies} className="text-dark-important" onChange={(opt) => { 

                                            if (opt) {  
                                                setConvert({...convert, to: opt.value });
                                                setError({...error, error:false, message:'' });
                                            }
                                            else { 
                                                setError({...error, error: true, message: 'Please enter all field'});
                                                setConvert({...convert, to: '' });
                                            }

                                        } }></Select>

                                    ) }
                                        <input value={ !resultConvert ? '' : resultConvert } type="number" className="form-control mt-2" readOnly />
                                    </div>
                                    <div className="d-grid mb-3">
                                        <button className={ loading ? 'btn btn-convert disabled' : 'btn btn-convert' }>
                                            Convert
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Converter
