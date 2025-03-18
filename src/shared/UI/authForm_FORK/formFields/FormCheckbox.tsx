import { Checkbox } from '@/shared/UI/checkbox/Checkbox'
import React, { ComponentProps } from 'react'
import { Control, FieldValues, useController, UseControllerProps } from 'react-hook-form'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import s from '../AuthForm.module.scss'

//создаю чекбокс пропс чтобы не экспортировать лишний раз 
type CheckboxProps = {
	label?: string
} & ComponentProps<typeof CheckboxRadix.Root>

type Props<T extends FieldValues> = 
	Omit<UseControllerProps<T>, 'control' | 'rules'>
	& Omit<CheckboxProps, 'checked' | 'onCheckedChange' | 'onBlur' | 'onChange'>
& {
	control: Control<T>
}

export const FormCheckbox = <T extends FieldValues>({control, name, ...rest}: Props<T>) => {

	//хук который создает контроль (локальный стейт который бкдет отслеживать ненативный чекбокс )
		const {
		field: {onChange, value, ...field}, 
		fieldState: {error} //для доставания ошибки
	} = useController({
			control,
			name: name,
			
		})
		
	return (
		<div>
			<Checkbox
				checked={value} onCheckedChange={onChange} {...field}
				{...rest}
				
			/>
			{error && <p className={s.checkboxoError}>{error.message}</p>} 
		</div>
	)
}
