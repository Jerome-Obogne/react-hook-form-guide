'use client'

import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import dayjs, { Dayjs } from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AffiliateModel from '../Model/models'
import {z} from 'zod'



type Affiliate_Model = z.infer<typeof AffiliateModel>


const Forms = () => {



    const {
        control,
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState:{errors,isSubmitting,getValues},
    } = useForm<Affiliate_Model>({
        defaultValues:{
            hospitalName:'',
            hospitalAddr:'',
            schedDetails:[
                {
                    isCheck:false,
                    days:'Monday',
                    dateFrom:'',
                    dateTo:''
                },
                {
                    isCheck:false,
                    days:'Tuesday',
                    dateFrom:'',
                    dateTo:''
                },
                {
                    isCheck:false,
                    days:'Wednesday',
                    dateFrom:'',
                    dateTo:''
                },
                {
                    isCheck:false,
                    days:'Thursday',
                    dateFrom:'',
                    dateTo:''
                },
                {
                    isCheck:false,
                    days:'Friday',
                    dateFrom:'',
                    dateTo:''
                }
            ]
        }
    }

    );

    const {fields}= useFieldArray({
        control,
        name:'schedDetails'
    })

    const handleFormSubmit =(data:any)=>{
        console.log("DATA >>", data)


    const modifiedDetails = data.schedDetails.filter((data2)=>data2.isCheck);
    // const sample = {
    //     ...data,
    //     schedDetails:modifiedDetails
    // }

    const result2 = {...data, schedDetails: modifiedDetails}
        console.log(result2)
        reset()
    }



     const toDayjs = (timeString: string): Dayjs | null => {
        return timeString ? dayjs(timeString, 'HH:mm: A') : null;
      };

      const toTimeString = (dayjsObject: Dayjs | null): string => {
        return dayjsObject ? dayjsObject.format('HH:mm: A') : '';
      };

      const handleCheckboxChange = (index: number, checked: boolean) => {
        setValue(`schedDetails.${index}.isCheck`, checked);

        // Clear date fields if unchecked
        if (!checked) {
            setValue(`schedDetails.${index}.dateFrom`, '');
            setValue(`schedDetails.${index}.dateTo`, '');
        }
    };



console.log("renDEs")
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div>
        <form onSubmit={handleSubmit(handleFormSubmit)}>


            <TextField
            {...register("hospitalName")}
            label="Hospital Name"

            />


            <TextField
             {...register("hospitalAddr")}
            label="Hospital Address"
            />


            <h2 style={{margin:'30px 0px'}} >Dynamic Forms</h2>
            {
                fields.map((data:any,index:number)=>{


                return (


                    <div key={data.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>

                    <Checkbox
                        checked={watch(`schedDetails.${index}.isCheck`)}
                        {...register(`schedDetails.${index}.isCheck`)}
                        // onChange={(e) => {
                        //     const checked = e.target.checked;
                        //     setValue(`schedDetails.${index}.isCheck`, checked);
                        //     if (!checked) {
                        //         setValue(`schedDetails.${index}.dateFrom`, '');
                        //         setValue(`schedDetails.${index}.dateTo`, '');
                        //     }
                        // }}
                        onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                    />



                    <TextField
                    value={data.days}
                    label={data.days}

                    />


                    <Controller
                        control={control}
                        name={`schedDetails.${index}.dateFrom`}
                        render={({ field: { value, onChange } }) => (
                        <>
                            <TimePicker
                            disabled={!watch(`schedDetails.${index}.isCheck`)}

                            label="From"
                            value={toDayjs(value) || null}

                            onChange={(newValue: Dayjs | null) =>{

                                if (!watch(`schedDetails.${index}.isCheck`)) {
                                    onChange(toTimeString(null))
                                }
                                else{
                                    setValue(`schedDetails.${index}.dateFrom`,"")
                                    onChange(toTimeString(newValue))}


                                }
                            }

                            />
                        </>
                        )}
                    />

                    <Controller
                        control={control}

                        name={`schedDetails.${index}.dateTo`}
                        render={({ field: { value, onChange } }) => (
                        <>
                            <TimePicker
                            disabled={!watch(`schedDetails.${index}.isCheck`)}
                            label="To"
                            value={toDayjs(value) || null}
                            onChange={(newValue: Dayjs | null) =>{

                                if (!watch(`schedDetails.${index}.isCheck`)) {
                                    onChange(toTimeString(null))
                                }
                                else{
                                    onChange(toTimeString(newValue))}

                                }
                            }
                            />
                        </>
                        )}
                    />


             </div>

)})

            }


            <button type='submit' disabled={isSubmitting} >
                Add

            </button>


        </form>


    </div>
    </LocalizationProvider>
  )
}

export default Forms
